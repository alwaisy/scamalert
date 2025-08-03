interface UploadSignature {
  signature: string;
  expire: number;
  publicKey: string;
  urlEndpoint: string;
  fileName: string;
  folder: string;
}

interface UploadResult {
  url: string;
  fileId: string;
  fileName: string;
  size: number;
}

export const useImageUpload = () => {
  // Get upload signature from server
  const getUploadSignature = async (
    fileName: string,
    folder = "scamalert/evidence"
  ) => {
    try {
      const response = await $fetch<{
        success: boolean;
        data: UploadSignature;
      }>("/api/upload/signature", {
        method: "GET",
        params: { fileName, folder },
      });

      if (!response.success) {
        throw new Error("Failed to get upload signature");
      }

      return response.data;
    } catch (error) {
      console.error("Error getting upload signature:", error);
      throw error;
    }
  };

  // Upload file directly to ImageKit from client
  const uploadFile = async (
    file: File,
    folder = "scamalert/evidence"
  ): Promise<UploadResult> => {
    try {
      // Validate file
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("File size too large. Maximum size is 5MB.");
      }

      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
        );
      }

      // Get upload signature
      const signature = await getUploadSignature(file.name, folder);

      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data:image/...;base64, prefix
          const base64Data = result.split(",")[1];
          if (base64Data) {
            resolve(base64Data);
          } else {
            reject(new Error("Failed to convert file to base64"));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Upload to ImageKit using FormData approach
      const formData = new FormData();
      formData.append("file", base64);
      formData.append("fileName", signature.fileName);
      formData.append("folder", signature.folder);
      formData.append("signature", signature.signature);
      formData.append("expire", signature.expire.toString());
      formData.append("publicKey", signature.publicKey);

      const uploadResponse = await $fetch<{
        success: boolean;
        data: UploadResult;
        message: string;
      }>("/api/upload/client", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.success) {
        throw new Error(uploadResponse.message || "Upload failed");
      }

      return uploadResponse.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  // Upload multiple files
  const uploadMultipleFiles = async (
    files: File[],
    folder = "scamalert/evidence"
  ): Promise<UploadResult[]> => {
    const uploadPromises = files.map((file) => uploadFile(file, folder));
    return Promise.all(uploadPromises);
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    getUploadSignature,
  };
};
