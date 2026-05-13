import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { env } from "cloudflare:workers";
import { resend } from "@utils/resend";

export const prerender = false;

const putOptions = { expirationTtl: 60 * 30 };
const alreadySubMessage = "An error occurred, did you already subscribe?";

export const server = {
    subscribeNewsletter: defineAction({
        accept: "form",
        input: z.object({
            email: z.email(),
        }),
        handler: async ({ email }) => {
            try {
                const subKV = env.NEWSLETTER_TOKENS;
                const alreadySub = await subKV.get(`email:${email}`);
                if (alreadySub) {
                    throw new ActionError({
                        message: alreadySubMessage,
                        code: "INTERNAL_SERVER_ERROR",
                    });
                }

                const subInResend = await resend.contacts.get({ email });
                const isSubscribed = !subInResend.data?.unsubscribed;
                if (isSubscribed) {
                    throw new ActionError({
                        message: alreadySubMessage,
                        code: "INTERNAL_SERVER_ERROR",
                    });
                }

                const uuid = crypto.randomUUID();
                await subKV.put(`email:${email}`, uuid, putOptions);
                await subKV.put(`uuid:${uuid}`, email, putOptions);
                // TODO send email

                return { success: true };
            } catch (e: any) {
                throw new ActionError({
                    message: alreadySubMessage,
                    code: "INTERNAL_SERVER_ERROR",
                });
            }
        },
    }),
};
