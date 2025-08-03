export default defineNuxtPlugin(async () => {
  // Initialize auth store on client side
  const authStore = useAuthStore();
  await authStore.initializeAuth();
});
