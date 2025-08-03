export default defineNuxtRouteMiddleware(async (_to) => {
  const authStore = useAuthStore();

  // Initialize auth if not already done
  if (!authStore.isInitialized) {
    await authStore.initializeAuth();
  }

  // If user is authenticated, redirect to scams page
  if (authStore.isAuthenticated) {
    return navigateTo("/scams");
  }
});
