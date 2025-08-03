import type { ScamFilters, ScamsListResponse } from "~/lib/types";

export const useUserScams = () => {
  // Fetch user's scams
  const fetchUserScams = async (filters: ScamFilters = {}) => {
    const query = new URLSearchParams();

    // Add filters to query
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
      }
    });

    const response = await $fetch<ScamsListResponse>(
      `/api/scams/user?${query}`
    );
    return response;
  };

  // Delete a scam
  const deleteScam = async (scamId: string) => {
    try {
      const response = await $fetch(`/api/scams/${scamId}`, {
        method: "DELETE",
      });
      return { success: true, data: response };
    } catch (error) {
      console.error("Error deleting scam:", error);
      return { success: false, error: "Failed to delete scam" };
    }
  };

  return {
    fetchUserScams,
    deleteScam,
  };
};
