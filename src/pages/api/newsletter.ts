import {
    generateTokenForEmail,
    sendNewsletterSubscriptionEmail,
} from "@helpers/newsletterSubscription";
import type { APIRoute } from "astro";
import { z } from "zod";

export const prerender = false;

const emailSchema = z.string().email();

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email } = await request.json();
        const isValidEmail = emailSchema.safeParse(email);
        if (!isValidEmail.success) {
            return new Response(
                JSON.stringify({
                    message: "The provided email is invalid.",
                }),
                { status: 400 },
            );
        }

        try {
            const token = await generateTokenForEmail(email);
            await sendNewsletterSubscriptionEmail(token, email);

            return new Response(null, { status: 200 });
        } catch (e) {
            return new Response(
                JSON.stringify({
                    message: "An unexpected error occurred. Are you already subscribed?",
                }),
                { status: 400 },
            );
        }
    } catch (e) {
        return new Response(
            JSON.stringify({
                message: "An unexpected error occurred.",
            }),
            { status: 500 },
        );
    }
};
