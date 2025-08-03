<template>
  <div
    class="bg-muted flex flex-col items-center justify-center"
    style="min-height: calc(100vh - 80px - 88px)"
  >
    <div class="flex w-full max-w-sm flex-col gap-6">
      <AuthLoginForm @error="handleError" />

      <!-- Help Link -->
      <div class="text-center">
        <NuxtLink
          to="/guide"
          class="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
        >
          Need help? View our guide
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["auth-logged-out"],
});

useHead({
  title: "Sign In - ScamAlert",
  meta: [
    {
      name: "description",
      content: "Sign in to your ScamAlert account to browse and report scams.",
    },
    {
      property: "og:title",
      content: "Sign In - ScamAlert",
    },
    {
      property: "og:description",
      content: "Sign in to your ScamAlert account to browse and report scams.",
    },
  ],
});

const error = ref("");

const handleError = (message: string) => {
  error.value = message;
};
</script>
