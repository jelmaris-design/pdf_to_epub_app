// Vercel Serverless Function: Send to Kindle
const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { recipientEmail, fileName, fileData, title, author } = req.body;

        // Validate inputs
        if (!recipientEmail || !fileName || !fileData) {
            return res.status(400).json({
                error: 'Missing required fields: recipientEmail, fileName, fileData'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(recipientEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Set SendGrid API key
        const apiKey = process.env.SENDGRID_API_KEY;
        const fromEmail = process.env.FROM_EMAIL || 'noreply@pdftoepub.app';

        if (!apiKey) {
            return res.status(500).json({
                error: 'SendGrid API key not configured'
            });
        }

        sgMail.setApiKey(apiKey);

        // Prepare email
        const msg = {
            to: recipientEmail,
            from: fromEmail,
            subject: 'Convert',
            text: `${title || 'Book'} by ${author || 'Unknown'}\n\nEPUB file attached.`,
            html: `<p><strong>${title || 'Book'}</strong> by ${author || 'Unknown'}</p><p>EPUB file attached.</p>`,
            attachments: [
                {
                    content: fileData, // base64 string
                    filename: fileName,
                    type: 'application/epub+zip',
                    disposition: 'attachment'
                }
            ]
        };

        // Send email
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
