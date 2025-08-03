import { defineStore } from "pinia";

// Interface for the combined user data from our API
interface AuthUser {
  // Appwrite data
  $id: string;
  email: string;
  name: string;
  emailVerification: boolean;

  // Local database data
  localId?: number;
  username?: string;
  status?: string;
  createdAt?: Date;
}

interface ApiError {
  data?: {
    message?: string;
  };
  message?: string;
  status?: number;
  statusCode?: number;
}

export const useAuthStore = defineStore("auth", {
  // State
  state: () => ({
    user: null as AuthUser | null,
    isLoading: false,
    isInitialized: false,
  }),

  // Getters
  getters: {
    isAuthenticated: (state) => {
      return state.isInitialized && !!state.user;
    },
  },

  // Actions
  actions: {
    async checkAuth() {
      try {
        this.isLoading = true;
        const user = await $fetch("/api/user");

        if (user) {
          this.user = user as AuthUser;
          this.isInitialized = true;
          return { success: true, user: user };
        } else {
          this.user = null;
          this.isInitialized = true;
          return { success: false, user: null };
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        this.user = null;
        this.isInitialized = true;
        return { success: false, user: null };
      } finally {
        this.isLoading = false;
      }
    },

    async initializeAuth() {
      if (!this.isInitialized) {
        await this.checkAuth();
      }
    },

    // PASSWORDLESS ONLY - Send magic link
    async sendMagicLink(email: string) {
      try {
        this.isLoading = true;

        const formData = new FormData();
        formData.append("email", email);

        const response = await $fetch("/api/auth/magic-link", {
          method: "POST",
          body: formData,
        });

        return { success: true, message: response.message };
      } catch (error: unknown) {
        console.error("Magic link failed:", error);
        const apiError = error as ApiError;
        return {
          success: false,
          error:
            apiError.data?.message ||
            apiError.message ||
            "Failed to send magic link",
        };
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        this.isLoading = true;

        try {
          await $fetch("/api/auth/signout", {
            method: "POST",
          });
        } catch (innerError: unknown) {
          // Check if this is a redirect (which means success)
          const error = innerError as ApiError;
          if (error.status === 302 || error.statusCode === 302) {
            // Logout succeeded
            this.user = null;
            this.isInitialized = true;
            return { success: true };
          }
          throw error;
        }

        this.user = null;
        this.isInitialized = true;
        return { success: true };
      } catch (error: unknown) {
        console.error("Logout failed:", error);
        return { success: false, error: "Logout failed" };
      } finally {
        this.isLoading = false;
      }
    },
  },
});
