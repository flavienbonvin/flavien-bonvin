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
        handler: async (input) => {
            const { email } = input;
            try {
                const token = await generateTokenForEmail(email);
                await sendNewsletterSubscriptionEmail(token, email);
                console.log({ email });
                return { success: true };
            } catch (error) {
                throw new ActionError({
                    message: "An error occurred, did you already subscribe?",
                    code: "INTERNAL_SERVER_ERROR",
                });
            }
        },
    }),
};
