export default defineNuxtRouteMiddleware(async (_to) => {
  const authStore = useAuthStore();

  // Initialize auth if not already done
  if (!authStore.isInitialized) {
    try {
      await authStore.initializeAuth();
    } catch (error) {
      console.error(
        "Auth initialization failed in logged-out middleware:",
        error
      );
      // If auth fails, assume user is not logged in and continue
      return;
    }
  }

  // If user is authenticated, redirect to scams page
  if (authStore.isAuthenticated) {
    return navigateTo("/scams");
  }
});
