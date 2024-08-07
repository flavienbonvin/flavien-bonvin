import { db, eq, SubscriptionValidation } from "astro:db";

export const isEmailAlreadySubscribed = async (email: string) => {
    const [subscription] = await db
        .select({ id: SubscriptionValidation.id })
        .from(SubscriptionValidation)
        .where(eq(SubscriptionValidation.email, email));
    return !!subscription;
};

export const createNewSubscription = async (email: string) => {
    const token = crypto.randomUUID().toString();
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
