// server/api/auth/magic-link.post.ts
import {
  ALLOWED_EMAIL_DOMAINS,
  type AllowedEmailDomain,
} from "../../../app/config/project";
import { createAdminClient } from "../../lib/appwrite";

export default defineEventHandler(async (event) => {
  // Extract the form data
  const formData = await readFormData(event);
  const email = formData.get("email") as string;

  // Validate email domain
  const domain = email.split("@")[1]?.toLowerCase();
  if (
    !domain ||
    !ALLOWED_EMAIL_DOMAINS.includes(domain as AllowedEmailDomain)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Email domain not allowed. Please use a supported email provider.",
    });
  }

  // Create the Appwrite client.
  const { account } = createAdminClient();

  // Create magic link session
  const config = useRuntimeConfig(event);
  const clientUrl = config.public.clientUrl || "http://localhost:3000";
  const redirectUrl = `${clientUrl}/verify`;

  await account.createMagicURLToken("unique()", email, redirectUrl);

  return { success: true, message: "Magic link sent to your email!" };
});
