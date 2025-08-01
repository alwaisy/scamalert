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
    "@nuxtjs/kinde",
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

  routeRules: {
    "/submit": {
      appMiddleware: ["auth-logged-in"],
    },
  },
});
