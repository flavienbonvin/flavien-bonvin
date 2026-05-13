export const confirmationEmailTemplate = (token: string): string => {
    const confirmUrl = `https://flavienbonvin.com/newsletter/validate?token=${token}`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm your subscription</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fafafa; font-family: Georgia, Cambria, 'Times New Roman', Times, serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa;">
    <tr>
      <td align="center" style="padding: 48px 16px;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px;">

          <tr>
            <td style="padding-bottom: 32px; border-bottom: 2px solid #d4edbc;">
              <span style="font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 14px; font-weight: 500; color: #1a1a1a;">
                flavien bonvin
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding-top: 40px; padding-bottom: 40px;">
              <p style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.2; letter-spacing: -0.02em;">
                One step left.
              </p>
              <p style="margin: 0 0 32px 0; font-size: 15px; color: #71717a; line-height: 1.6;">
                Confirm your email to start receiving articles straight to your inbox.
              </p>

              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border: 1px solid #d4d4d8;">
                    <a href="${confirmUrl}"
                       style="display: inline-block; padding: 12px 24px; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a1a1a; text-decoration: none;">
                      Confirm subscription
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="border-top: 1px solid #e4e4e7; padding-top: 24px; padding-bottom: 8px;">
              <p style="margin: 0; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 11px; color: #a1a1aa; line-height: 1.6;">
                Didn't sign up? You can safely ignore this email.<br />
                This link expires in 30 minutes.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top: 16px;">
              <p style="margin: 0 0 4px 0; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 10px; color: #a1a1aa;">
                If the button doesn't work, copy and paste this URL:
              </p>
              <p style="margin: 0; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 10px; color: #71717a; word-break: break-all;">
                ${confirmUrl}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
