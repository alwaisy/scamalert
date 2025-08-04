<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <LandingHero />

    <!-- Problem Section -->
    <LandingProblem />

    <!-- Solution Section -->
    <LandingSolution />

    <!-- Statistics Section -->
    <LandingStats />

    <!-- Community Trust Section -->
    <LandingTrust />

    <!-- Call to Action Section -->
    <LandingCTA />

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
// Landing page for ScamAlert.pk
definePageMeta({
  layout: "default",
});

// SEO optimization for Pakistan and South Asia
useHead({
  title:
    "ScamAlert - Pakistan Ka Pehla Scam Alert Platform | Protect Your Family",
  meta: [
    {
      name: "description",
      content:
        "Pakistan aur South Asia ki sabse badi scam reporting community. Real stories, real protection. Apne ghar walon ko fraud se bachayiye. Free scam alerts aur awareness.",
    },
    {
      name: "keywords",
      content:
        "Pakistan scams, fraud alert, scam stories, family protection, South Asia fraud, online safety Pakistan, scam awareness",
    },
    {
      property: "og:title",
      content: "ScamAlert - Protect Pakistani Families from Scams",
    },
    {
      property: "og:description",
      content:
        "Join thousands of Pakistani families sharing scam experiences to protect each other. Real stories, real protection.",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_PK" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "geo.region", content: "PK" },
    { name: "geo.country", content: "Pakistan" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>
