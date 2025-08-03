export default defineNuxtPlugin((nuxtApp) => {
  // Vue error handler
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error("Vue Error:", error);
    console.error("Component:", instance);
    console.error("Info:", info);

    // You can send to error reporting service here
    // Example: Sentry.captureException(error)
  };

  // Nuxt error hook
  nuxtApp.hook("vue:error", (error, instance, info) => {
    console.error("Nuxt Vue Error:", error);
    console.error("Component:", instance);
    console.error("Info:", info);
  });

  // App error hook
  nuxtApp.hook("app:error", (error) => {
    console.error("App Error:", error);
  });

  // Global error handler for unhandled promise rejections
  if (import.meta.client) {
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled Promise Rejection:", event.reason);
      event.preventDefault();
    });

    window.addEventListener("error", (event) => {
      console.error("Global Error:", event.error);
    });
  }
});
