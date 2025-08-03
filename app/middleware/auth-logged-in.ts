export default defineNuxtRouteMiddleware(async (_to) => {
  // Skip auth check during SSR to avoid issues
  if (process.server) {
    return;
  }

  const authStore = useAuthStore();

  // Initialize auth if not already done
  if (!authStore.isInitialized) {
    await authStore.initializeAuth();
  }

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }
});
