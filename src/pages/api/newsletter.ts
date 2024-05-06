import type { APIRoute } from "astro";
import { Resend } from "resend";
import { z } from "zod";

export const prerender = false;

const audienceId = import.meta.env.BLOG_AUDIENCE_ID;
const resend = new Resend(import.meta.env.RESEND_API_KEY);

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

        await resend.contacts.create({
            email,
            audienceId,
        });

        return new Response(null, { status: 200 });
    } catch (e) {
        return new Response(
            JSON.stringify({
                message: "An unexpected error occurred.",
            }),
            { status: 400 },
        );
    }
};
