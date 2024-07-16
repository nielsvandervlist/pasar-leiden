import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'wordpress-api-nielsvandervlist.eu', // Replace with your SMTP server details
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // Add these to your .env.local file
        pass: process.env.SMTP_PASS, // Add these to your .env.local file
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    attachments?: { filename: string; path: string; cid?: string }[];
}

export const sendEmail = async (options: EmailOptions) => {
    try {
        await transporter.sendMail({
            from: '"Your Name" <your-email@example.com>', // Replace with your sender details
            ...options,
        });
    } catch (err) {
        console.error('Failed to send email:', err);
        throw err;
    }
};
