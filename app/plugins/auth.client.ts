export default defineNuxtPlugin(async () => {
  // Initialize auth store on client side
  const authStore = useAuthStore();

  // Only initialize if not already done
  if (!authStore.isInitialized) {
    try {
      await authStore.initializeAuth();
    } catch (error) {
      console.error("Auth initialization failed:", error);
      // Don't throw - let the app continue with unauthenticated state
    }
  }
});
