export default defineNuxtRouteMiddleware(async (_to) => {
  // Skip auth check during SSR to avoid issues
  if (import.meta.server) {
    return;
  }

  const authStore = useAuthStore();

  // Initialize auth if not already done
  if (!authStore.isInitialized) {
    try {
      await authStore.initializeAuth();
    } catch (error) {
      console.error("Auth initialization failed in middleware:", error);
      // If auth fails, redirect to login
      return navigateTo("/login");
    }
  }

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }
});
