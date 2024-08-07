import { deleteSubscription, getSubscriptionFromToken } from "@data/subscriptionValidation";
import { isDateSmallerThan30Minutes } from "@helpers/date";
import { Resend } from "resend";

const audienceId = import.meta.env.BLOG_AUDIENCE_ID;
const resend = new Resend(import.meta.env.RESEND_API_KEY);

const createNewContact = async (email: string) => {
    await resend.contacts.create({
        email,
        audienceId,
    });
};

export const handleNewsletterSubscription = async (token?: string) => {
    if (!token) {
        throw new Error("No token provided");
    }

    const subscription = await getSubscriptionFromToken(token);
    if (!subscription) {
        throw new Error("Invalid token");
    }

    const isSubscriptionValid = isDateSmallerThan30Minutes(subscription?.createdAt);
    if (!isSubscriptionValid) {
        throw new Error("Subscription is too old");
    }

    await createNewContact(subscription.email);
    await deleteSubscription(token);
};

export const getNewsletterTemplate = (token: string) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
    
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
      </head>
      <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">The sales intelligence platform that helps you uncover qualified leads.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
      </div>
    
      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tbody>
            <tr style="width:100%">
              <td><img alt="Koala" height="50" src="https://react-email-demo-9fn3mchcm-resend.vercel.app/static/koala-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="170" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">Hi <!-- -->Alan<!-- -->,</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Koala, the sales intelligence platform that helps you uncover qualified leads and close deals faster.</p>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                  <tbody>
                    <tr>
                      <td><a href="https://getkoala.com" style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px" target="_blank"><span><!--[if mso]><i style="mso-font-width:300%;mso-text-raise:18" hidden>&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Get started</span><span><!--[if mso]><i style="mso-font-width:300%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span></a></td>
                    </tr>
                    <tr>${token}</tr>
                  </tbody>
                </table>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Koala team</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">470 Noor Ave STE B #1148, South San Francisco, CA 94080</p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>`;
};
