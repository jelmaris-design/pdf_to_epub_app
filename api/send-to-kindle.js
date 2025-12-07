// Vercel Serverless Function: Send to Kindle
const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
    console.log('API Handler Initialized');
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { recipientEmail, fileName, fileData, title, author } = req.body;

        if (!recipientEmail || !fileName || !fileData) {
            return res.status(400).json({
                error: 'Missing required fields: recipientEmail, fileName, fileData'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(recipientEmail)) {
            // Vercel Serverless Function: Send to Kindle
            const sgMail = require('@sendgrid/mail');

            export default async function handler(req, res) {
                console.log('API Handler Initialized');
                // Add CORS headers
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
                res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

                // Handle OPTIONS request
                if (req.method === 'OPTIONS') {
                    return res.status(200).end();
                }

                // Only allow POST
                if (req.method !== 'POST') {
                    return res.status(405).json({ error: 'Method not allowed' });
                }

                try {
                    const { recipientEmail, fileName, fileData, title, author } = req.body;

                    if (!recipientEmail || !fileName || !fileData) {
                        return res.status(400).json({
                            error: 'Missing required fields: recipientEmail, fileName, fileData'
                        });
                    }

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(recipientEmail)) {
                        return res.status(400).json({ error: 'Invalid email format' });
                    }

                    const apiKey = process.env.SENDGRID_API_KEY;
                    const fromEmail = process.env.FROM_EMAIL || 'noreply@pdftoepub.app';

                    if (!apiKey) {
                        return res.status(500).json({
                            error: 'SendGrid API key not configured'
                        });
                    }

                    sgMail.setApiKey(apiKey);

                    const msg = {
                        to: recipientEmail,
                        from: fromEmail,
                        subject: `[Kindle] ${title || 'New Book'}`,
                        text: `Here is your book: ${title || 'Unknown Title'}\nBy: ${author || 'Unknown Author'}\n\nPlease ensure ${fromEmail} is in your Approved Personal Document E-mail List on Amazon.`,
                        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Georgia', serif; color: #2b2118; background-color: #f5e6d3; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #c5a059; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                    .header { text-align: center; border-bottom: 2px solid #c5a059; padding-bottom: 20px; margin-bottom: 30px; }
                    .title { font-size: 24px; color: #1a1614; margin: 0; font-weight: bold; }
                    .author { font-size: 18px; color: #5c4d3c; margin-top: 10px; font-style: italic; }
                    .content { text-align: center; line-height: 1.6; font-size: 16px; }
                    .footer { margin-top: 40px; font-size: 12px; text-align: center; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
                    .highlight { color: #c5a059; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 class="title">${title || 'New Book'}</h1>
                        <p class="author">by ${author || 'Unknown Author'}</p>
                    </div>
                    <div class="content">
                        <p>Your EPUB file is attached and ready for your Kindle.</p>
                        <p>Happy Reading!</p>
                    </div>
                    <div class="footer">
                        <p>Sent via PDF to EPUB Converter</p>
                        <p>Please ensure <span class="highlight">${fromEmail}</span> is in your<br>Approved Personal Document E-mail List on Amazon.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
                        attachments: [
                            {
                                content: fileData,
                                filename: fileName,
                                type: 'application/epub+zip',
                                disposition: 'attachment'
                            }
                        ]
                    };

                    await sgMail.send(msg);

                    return res.status(200).json({
                        success: true,
                        message: `EPUB sent to ${recipientEmail}`
                    });

                } catch (error) {
                    console.error('SendGrid error:', error);

                    if (error.response) {
                        console.error('SendGrid response:', error.response.body);
                    }

                    return res.status(500).json({
                        error: 'Failed to send email',
                        details: error.message
                    });
                }
            }