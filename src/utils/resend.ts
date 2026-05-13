import { Resend } from "resend";
import { env } from "cloudflare:workers";

const resendAPIKey = env.RESEND_API_KEY;
if (!resendAPIKey) {
    throw new Error("RESEND_API_KEY is required");
}

export const resend = new Resend(resendAPIKey);
