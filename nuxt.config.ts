// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "shadcn-nuxt",
    "@pinia/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./app/components/ui"
     */
    componentDir: "./app/components/ui",
  },

  runtimeConfig: {
    // Private (server-side only)
    tursoDatabaseUrl: process.env.TURSO_DATABASE_URL,
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
    imagekitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    imagekitUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    appwriteKey: process.env.APPWRITE_KEY,

    // Public (client-side accessible)
    public: {
      clientUrl: process.env.NUXT_PUBLIC_CLIENT_URL,
      appwriteEndpoint: process.env.PUBLIC_APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.PUBLIC_APPWRITE_PROJECT,
    },
  },
});
