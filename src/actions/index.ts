import {
    generateTokenForEmail,
    sendNewsletterSubscriptionEmail,
} from "@helpers/newsletterSubscription";
import { ActionError, defineAction } from "astro:actions";
import { RESEND_API_KEY } from "astro:env/server";
import { z } from "astro:schema";

export const server = {
    subscribeNewsletter: defineAction({
        accept: "form",
        input: z.object({ email: z.string().email() }),
        handler: async ({ email }) => {
            try {
                const token = await generateTokenForEmail(email);
                await sendNewsletterSubscriptionEmail(token, email);
                return { success: true };
            } catch (error) {
                throw new ActionError({
                    message: "An error occurred, did you already subscribe?",
                    code: "INTERNAL_SERVER_ERROR",
                });
            }
        },
    }),
    testAction: defineAction({
        accept: "form",
        handler: async () => {
            try {
                return { success: RESEND_API_KEY };
            } catch (error) {
                throw new ActionError({
                    message: "An error occurred during the test",
                    code: "INTERNAL_SERVER_ERROR",
                });
            }
        },
    }),
};
