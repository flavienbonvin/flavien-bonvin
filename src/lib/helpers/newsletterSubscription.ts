import { createNewSubscription, isEmailAlreadySubscribed } from "@data/subscriptionValidation";
import { BLOG_AUDIENCE_ID, RESEND_API_KEY } from "astro:env/server";
import { ROUTES } from "const";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);
const audienceId = BLOG_AUDIENCE_ID;

const isEmailAlreadyOnResend = async (email: string) => {
    const { data } = await resend.contacts.list({ audienceId });
    return data?.data.some((contact) => contact.email === email);
};

export const generateTokenForEmail = async (email: string) => {
    // We do not want to save a new email if the user is already subscribed
    // Also, we don't want to send an error to avoid leaking information
    const emailAlreadySubscribed = await isEmailAlreadySubscribed(email);
    // const emailAlreadyOnResend = await isEmailAlreadyOnResend(email);
    // if (emailAlreadySubscribed || emailAlreadyOnResend) {
    //     throw new Error("Email already subscribed");
    // }

    // const token = await createNewSubscription(email);
    // return token;
};

export const sendNewsletterSubscriptionEmail = async (token: string, email: string) => {
    await resend.emails.send({
        from: "Flavien Bonvin <hello@flavienbonvin.com>",
        to: [email],
        subject: "Welcome to my newsletter 🦆!",
        html: getNewsletterTemplate(token),
    });
};

const getNewsletterTemplate = (token: string) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
    </head>
    <style>
        body {
            background-color: #ffffff;
            color: #303030;
            font-family:
                -apple-system,
                BlinkMacSystemFont,
                Segoe UI,
                Roboto,
                Oxygen,
                Ubuntu,
                Cantarell,
                Fira Sans,
                Droid Sans,
                Helvetica Neue,
                sans-serif;
        }
        a {
            font-size: 14px;
            color: #008574;
        }
        p {
            font-size: 14px;
        }
    </style>
    <body>
        <table
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="max-width: 37.5em; padding-left: 12px; padding-right: 12px; margin: 0 auto"
        >
            <tbody>
                <tr style="width: 100%">
                    <td>
                        <h1 style="font-size: 24px; font-weight: bold; margin: 40px 0; padding: 0">
                            Welcome and thanks you for subscribing!
                        </h1>
                        <p>
                            You're just one step away from getting my lovely articles delivered
                            right to your inbox!
                        </p>
                        <p>
                            I want to confirm that the email address you provided is yours because
                            neither Google, Proton, nor I like to send emails to the wrong
                            addresses!
                        </p>
                        <a
                            href="https://flavienbonvin.com${ROUTES.newsletterValidate}?token=${token}"
                            style="
                                text-decoration: underline;
                                display: block;
                                margin: 24px 0;
                                font-size: 16px;
                                text-align: center;
                            "
                            target="_blank"
                            >Click here to confirm your email address</a
                        >
                        <p style="line-height: 24px; margin: 24px 0; margin-bottom: 14px">
                            Alternatively, you can copy and paste this URL to your browser:
                        </p>
                        <code
                            style="
                                display: inline-block;
                                padding: 16px 4.5%;
                                width: 90.5%;
                                font-size: 12px;
                                background-color: #f4f4f4;
                                border-radius: 5px;
                                border: 1px solid #eee;
                                margin-bottom: 24px;
                            "
                            >https://flavienbonvin.com${ROUTES.newsletterValidate}?token=${token}</code
                        >
                        <p>Have a lovely day!</p>
                        <p>Flavien 🦆</p>
                        <div style="border-bottom: 1px solid #ababab; margin: 24px 0"></div>
                        <p
                            style="
                                font-size: 14px;
                                line-height: 24px;
                                margin: 24px 0;
                                color: #ababab;
                                margin-top: 14px;
                                margin-bottom: 32px;
                            "
                        >
                            If you didn't subscribed to my newsletter, you can safely ignore this.
                            But you might miss on some exciting articles!
                        </p>
                        <img
                            alt="Flavien Bonvin logo"
                            height="32"
                            width="32"
                            src="https://flavienbonvin.com/android-chrome-192x192.png"
                            style="
                                display: block;
                                outline: none;
                                border: none;
                                text-decoration: none;
                            "
                        />
                        <p
                            style="
                                line-height: 22px;
                                margin: 16px 0;
                                color: #898989;
                                margin-top: 12px;
                                margin-bottom: 24px;
                            "
                        >
                            <a
                                href="https://flavienbonvin.com/"
                                style="color: #898989; text-decoration: underline"
                                target="_blank"
                                >flavienbonvin.com</a
                            >
                            🦆
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
`;
};
