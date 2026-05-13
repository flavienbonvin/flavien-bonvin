import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { env } from "cloudflare:workers";
import { resend } from "@utils/resend";

const tokenTtl = { expirationTtl: 60 * 30 };

function throwAlreadySubscribed(): never {
    throw new ActionError({
        message: "An error occurred, did you already subscribe?",
        code: "CONFLICT",
    });
}

export const server = {
    subscribeNewsletter: defineAction({
        accept: "form",
        input: z.object({
            email: z.email(),
        }),
        handler: async ({ email }) => {
            try {
                const subKV = env.NEWSLETTER_TOKENS;

                const pendingToken = await subKV.get(`email:${email}`);
                if (pendingToken) throwAlreadySubscribed();

                const { data } = await resend.contacts.get({ email });
                const isSubscribed = data && !data.unsubscribed;
                if (isSubscribed) throwAlreadySubscribed();

                const uuid = crypto.randomUUID();
                await subKV.put(`email:${email}`, uuid, tokenTtl);
                await subKV.put(`uuid:${uuid}`, email, tokenTtl);
                return { success: true };
            } catch (e: any) {
                if (e instanceof ActionError) {
                    throw e;
                }

                throw new ActionError({
                    message: "Something went wrong, please try again.",
                    code: "INTERNAL_SERVER_ERROR",
                });
            }
        },
    }),
};
