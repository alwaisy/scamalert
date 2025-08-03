import ImageKit from "imagekit";

// ImageKit configuration
export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

// Helper function to generate signed URLs for secure access
export const generateSignedUrl = (
  filePath: string,
  options?: {
    transformation?: string;
    expires?: number;
  }
) => {
  return imagekit.url({
    path: filePath,
    transformation: options?.transformation
      ? [{ name: options.transformation }]
      : undefined,
    signed: true,
    expireSeconds: options?.expires || 3600, // 1 hour default
  });
};

// Helper function to delete files
export const deleteFile = async (fileId: string) => {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

// Helper function to get file details
export const getFileDetails = async (fileId: string) => {
  try {
    const details = await imagekit.getFileDetails(fileId);
    return details;
  } catch (error) {
    console.error("Error getting file details:", error);
    return null;
  }
};
