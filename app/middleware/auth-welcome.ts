export default defineNuxtRouteMiddleware(async (to) => {
  // If user is not logged in and trying to access welcome page, allow it
  // (this happens after registration)
  if (to.path === "/welcome") {
    return; // Allow access to welcome page
  }

  const authStore = useAuthStore();

  // Initialize auth if not already done
  if (!authStore.isInitialized) {
    await authStore.initializeAuth();
  }

  // Only redirect if user is logged in and trying to access scams page
  if (authStore.isAuthenticated && to.path === "/scams") {
    // Check if this is their first visit (you could add a flag to user data)
    // For now, we'll redirect to welcome page if they haven't seen it
    const hasSeenWelcome = useCookie("has-seen-welcome");

    if (!hasSeenWelcome.value) {
      hasSeenWelcome.value = "true";
      return navigateTo("/welcome");
    }
  }
});
