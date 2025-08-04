<script setup lang="ts">
import "vue-sonner/style.css"; // vue-sonner v2 requires this import

// Default SEO settings
useHead({
  titleTemplate: "%s - ScamAlert",
  meta: [
    {
      name: "description",
      content:
        "Community-driven scam protection platform for Pakistan. Report scams, stay informed, and protect others from fraud.",
    },
    { property: "og:site_name", content: "ScamAlert" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:site", content: "@scamalert" },
    { name: "theme-color", content: "#ff4545" },
  ],
});

// Default site config
useSeoMeta({
  title: "ScamAlert - Community Scam Protection",
  description:
    "Community-driven scam protection platform for Pakistan. Report scams, stay informed, and protect others from fraud.",
  ogTitle: "ScamAlert - Community Scam Protection",
  ogDescription:
    "Community-driven scam protection platform for Pakistan. Report scams, stay informed, and protect others from fraud.",
  twitterTitle: "ScamAlert - Community Scam Protection",
  twitterDescription:
    "Community-driven scam protection platform for Pakistan. Report scams, stay informed, and protect others from fraud.",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster position="top-center" />
    <NuxtLoadingIndicator color="#ff2056" :height="8" />
  </NuxtLayout>
</template>
