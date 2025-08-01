export default defineEventHandler(async (event) => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: {
      KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL || "NOT_SET",
      NODE_ENV: process.env.NODE_ENV,
    },
    jwks: {
      uri: process.env.KINDE_ISSUER_URL
        ? `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`
        : "NOT_SET",
    },
  };
});
