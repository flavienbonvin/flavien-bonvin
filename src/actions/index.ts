import {
    generateTokenForEmail,
    sendNewsletterSubscriptionEmail,
} from "@helpers/newsletterSubscription";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
    subscribeNewsletter: defineAction({
        accept: "form",
        input: z.object({ email: z.string().email() }),
        handler: async ({ email }) => {
            try {
                const token = await generateTokenForEmail(email);
                await sendNewsletterSubscriptionEmail(token, email);
                return { success: token };
            } catch (error: any) {
                throw new ActionError({
                    // message: "An error occurred, did you already subscribe?",
                    message: error.message,
                    code: "INTERNAL_SERVER_ERROR",
                    stack: error.stack,
                });
            }
        },
    }),
};
