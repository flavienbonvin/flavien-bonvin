import { deleteSubscription, getSubscriptionFromToken } from "@data/subscriptionValidation";
import { isDateSmallerThan30Minutes } from "@helpers/date";
import { Resend } from "resend";

const audienceId = import.meta.env.BLOG_AUDIENCE_ID;
const resend = new Resend(import.meta.env.RESEND_API_KEY);

const createNewContact = async (email: string) => {
    await resend.contacts.create({
        email,
        audienceId,
    });
};

export const handleNewsletterSubscription = async (token?: string) => {
    if (!token) {
        throw new Error("No token provided");
    }

    const subscription = await getSubscriptionFromToken(token);
    if (!subscription) {
        throw new Error("Invalid token");
    }

    const isSubscriptionValid = isDateSmallerThan30Minutes(subscription?.createdAt);
    if (!isSubscriptionValid) {
        throw new Error("Subscription is too old");
    }

    await createNewContact(subscription.email);
    await deleteSubscription(token);
};
