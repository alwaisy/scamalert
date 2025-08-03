import ImageKit from "imagekit";
import { z } from "zod";

// ImageKit configuration
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

// Validation schema
const signatureSchema = z.object({
  fileName: z.string().min(1).max(100),
  folder: z.string().default("scamalert/evidence"),
});

export default defineEventHandler(async (event) => {
  try {
    // Check authentication
    const user = event.context.user;
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Authentication required",
      });
    }

    // Parse and validate query parameters
    const query = getQuery(event);
    const validatedData = signatureSchema.parse(query);

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = validatedData.fileName.split(".").pop() || "jpg";
    const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;

    // Generate signature for client-side upload
    const expire = Math.floor(Date.now() / 1000) + 3600; // 1 hour expiry
    const signature = imagekit.getAuthenticationParameters(expire.toString());

    return {
      success: true,
      data: {
        signature: signature.signature,
        expire: signature.expire,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        fileName: uniqueFileName,
        folder: validatedData.folder,
      },
      message: "Upload signature generated successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: (error as z.ZodError).issues,
      });
    }

    console.error("Error generating upload signature:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to generate upload signature",
    });
  }
});
