import { resend } from "@/lib/resend";
import MagicLinkEmail from "@/components/emails/MagicLinkEmail";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { Awaitable } from "next-auth";

export async function sendVerificationRequest(
	params: SendVerificationRequestParams,
): Promise<void> {
	const { identifier, url, provider, theme } = params;
	const { host } = new URL(url);

	try {
		const data = await resend.emails.send({
			from: provider.from,
			to: [identifier],
			subject: `Log in to ${host}`,
			text: text({ url, host }),
			react: MagicLinkEmail({ url, host }),
		});
		// return { success: true, data };
	} catch (error) {
		throw new Error("Failed to send the verification Email.");
	}
}

function text({ url, host }: { url: string; host: string }) {
	return `Sign in to ${host}\n${url}\n\n`;
}
