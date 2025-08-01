export default defineEventHandler(() => {
  return {
    message: "Webhook endpoint is working!",
    endpoint: "/api/kinde-webhook",
    method: "POST",
  };
});
