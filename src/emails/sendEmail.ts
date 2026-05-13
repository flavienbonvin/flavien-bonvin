import { resend } from "@utils/resend";
import { confirmationEmailTemplate } from "./confirmationTemplate";

export const sendNewsletterEmail = async (to: string, uuid: string) => {
    await resend.emails.send({
        from: "Flavien Bonvin <hello@flavienbonvin.com>",
        to: [to],
        subject: "One step left - confirm your subscription",
        html: confirmationEmailTemplate(uuid),
    });
};
