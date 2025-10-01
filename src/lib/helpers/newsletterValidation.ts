import { deleteSubscription, getSubscriptionFromToken } from "@data/subscriptionValidation";
import { isDateSmallerThan30Minutes } from "@helpers/date";
import { BLOG_AUDIENCE_ID, RESEND_API_KEY } from "astro:env/server";
import { Resend } from "resend";

const audienceId = BLOG_AUDIENCE_ID;
const resend = new Resend(RESEND_API_KEY);

export const validateNewsletterSubscription = async (token?: string) => {
    if (!token) {
        throw new Error("No token provided");
    }

    const subscription = await getSubscriptionFromToken(token);
    if (!subscription) {
        throw new Error("Invalid token");
    }

    const isSubscriptionValid = isDateSmallerThan30Minutes(subscription?.createdAt);
    if (!isSubscriptionValid) {
        await deleteSubscription(token);
        throw new Error("Subscription is too old");
    }

    await createNewContact(subscription.email);
    await deleteSubscription(token);
};

const createNewContact = async (email: string) => {
    await resend.contacts.create({
        email,
        audienceId,
    });
};
