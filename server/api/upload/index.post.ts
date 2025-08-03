import ImageKit from "imagekit";
import { z } from "zod";

// ImageKit configuration
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

// Validation schema
const uploadSchema = z.object({
  file: z.string(), // Base64 encoded file
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

    // Parse and validate request body
    const body = await readBody(event);
    const validatedData = uploadSchema.parse(body);

    // Validate file size (max 5MB)
    const fileSize = Buffer.byteLength(validatedData.file, "base64");
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (fileSize > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: "File size too large. Maximum size is 5MB.",
      });
    }

    // Validate file type
    const fileBuffer = Buffer.from(validatedData.file, "base64");
    const fileSignature = fileBuffer.toString("hex", 0, 4);

    // Check for common image signatures
    const validSignatures = [
      "ffd8ff", // JPEG
      "89504e47", // PNG
      "47494638", // GIF
      "52494646", // WebP
    ];

    const isValidImage = validSignatures.some((sig) =>
      fileSignature.toLowerCase().startsWith(sig)
    );

    if (!isValidImage) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = validatedData.fileName.split(".").pop() || "jpg";
    const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: validatedData.file,
      fileName: uniqueFileName,
      folder: validatedData.folder,
      useUniqueFileName: false, // We're already generating unique name
      tags: ["scamalert", "evidence"],
      responseFields: ["url", "fileId", "name"],
    });

    return {
      success: true,
      data: {
        url: uploadResponse.url,
        fileId: uploadResponse.fileId,
        fileName: uploadResponse.name,
        size: fileSize,
      },
      message: "File uploaded successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: (error as z.ZodError).issues,
      });
    }

    console.error("Error uploading file:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to upload file",
    });
  }
});
