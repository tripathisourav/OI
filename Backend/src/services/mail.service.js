import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text }) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Oi <onboarding@resend.dev>",
            to: [to],
            subject,
            html,
            text
        });

        if (error) {
            console.error("Resend error:", error);
            throw new Error(error.message);
        }

        console.log("Email sent successfully:", data);

        return data;

    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}