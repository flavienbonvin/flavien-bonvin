import { db, eq, SubscriptionValidation } from "astro:db";

const isEmailAlreadySubscribed = async (email: string) => {
    const [subscription] = await db
        .select({ email: SubscriptionValidation.email })
        .from(SubscriptionValidation)
        .where(eq(SubscriptionValidation.email, email));

    return !!subscription;
};

export const createNewSubscription = async (email: string) => {
    const token = crypto.randomUUID();
    const emailAlreadySubscribed = await isEmailAlreadySubscribed(email);

    // We do not want to save a new email if the user is already subscribed
    // Also, we don't want to send an error to avoid leaking information
    if (emailAlreadySubscribed) {
        return;
    }

    await db.insert(SubscriptionValidation).values({
        email,
        token,
        createdAt: new Date(),
    });

    return token;
};

export const getSubscriptionFromToken = async (token: string) => {
    const [subscription] = await db
        .select()
        .from(SubscriptionValidation)
        .where(eq(SubscriptionValidation.token, token));

    return subscription;
};

export const deleteSubscription = async (token: string) => {
    await db.delete(SubscriptionValidation).where(eq(SubscriptionValidation.token, token));
};
