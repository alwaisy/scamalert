<template>
  <div
    class="bg-muted flex flex-col items-center justify-center"
    style="min-height: calc(100vh - 80px - 88px)"
  >
    <div class="flex w-full max-w-sm flex-col gap-6">
      <AuthRegisterForm @error="handleError" />

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
  title: "Create Account - ScamAlert",
  meta: [
    {
      name: "description",
      content:
        "Join ScamAlert to report scams and help others stay safe online.",
    },
    {
      property: "og:title",
      content: "Create Account - ScamAlert",
    },
    {
      property: "og:description",
      content:
        "Join ScamAlert to report scams and help others stay safe online.",
    },
  ],
});

const error = ref("");

const handleError = (message: string) => {
  error.value = message;
};
</script>
