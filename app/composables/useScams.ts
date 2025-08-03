import type {
  ScamDetail,
  ScamDetailResponse,
  ScamFilters,
  ScamsListResponse,
} from "~/lib/types";

export const useScams = () => {
  // Fetch scams list using useAsyncData
  const fetchScams = async (filters: ScamFilters = {}) => {
    const query = new URLSearchParams();

    // Add filters to query
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
      }
    });

    const response = await $fetch<ScamsListResponse>(`/api/scams?${query}`);
    return response.data || [];
  };

  // Fetch single scam using useAsyncData
  const fetchScam = async (scamId: string): Promise<ScamDetail> => {
    if (!scamId) {
      throw new Error("Scam ID is required");
    }

    const response = await $fetch<ScamDetailResponse>(`/api/scams/${scamId}`);
    return response.data;
  };

  return {
    fetchScams,
    fetchScam,
  };
};
