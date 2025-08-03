import { defineStore } from "pinia";

interface AuthUser {
  id: number;
  email: string;
  username: string;
  status: string;
}

interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

interface LoginResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

interface RegisterResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

interface ApiError {
  data?: {
    message?: string;
  };
  statusMessage?: string;
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
        const response = await $fetch<AuthResponse>("/api/auth/me", {
          credentials: "include", // Include cookies in request
        });

        if (response.success && response.user) {
          this.user = response.user;
          this.isInitialized = true;
          return { success: true, user: response.user };
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

    async login(email: string, password: string) {
      try {
        this.isLoading = true;
        const response = await $fetch<LoginResponse>("/api/auth/login", {
          method: "POST",
          body: { email, password },
          credentials: "include", // Include cookies in request
        });

        if (response.success && response.user) {
          this.user = response.user;
          this.isInitialized = true;
          return { success: true, user: response.user };
        } else {
          return {
            success: false,
            error: response.error || "Login failed",
          };
        }
      } catch (error: unknown) {
        console.error("Login failed:", error);
        const apiError = error as ApiError;
        return {
          success: false,
          error:
            apiError.data?.message || apiError.statusMessage || "Login failed",
        };
      } finally {
        this.isLoading = false;
      }
    },

    async register(email: string, password: string) {
      try {
        this.isLoading = true;
        const response = await $fetch<RegisterResponse>("/api/auth/register", {
          method: "POST",
          body: { email, password },
          credentials: "include", // Include cookies in request
        });

        if (response.success && response.user) {
          this.user = response.user;
          this.isInitialized = true;
          return { success: true, user: response.user };
        } else {
          return {
            success: false,
            error: response.error || "Registration failed",
          };
        }
      } catch (error: unknown) {
        console.error("Registration failed:", error);
        const apiError = error as ApiError;
        return {
          success: false,
          error:
            apiError.data?.message ||
            apiError.statusMessage ||
            "Registration failed",
        };
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        this.isLoading = true;
        await $fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include", // Include cookies in request
        });
        this.user = null;
        this.isInitialized = true;
        return { success: true };
      } catch (error) {
        console.error("Logout failed:", error);
        return { success: false, error: "Logout failed" };
      } finally {
        this.isLoading = false;
      }
    },
  },
});
