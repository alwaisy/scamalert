<template>
  <div
    class="bg-muted flex flex-col items-center justify-center"
    style="min-height: calc(100vh - 80px - 88px)"
  >
    <div class="flex w-full max-w-md flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Verifying Magic Link</CardTitle>
          <CardDescription>
            Please wait while we verify your magic link...
          </CardDescription>
        </CardHeader>
        <CardContent class="text-center">
          <div v-if="isVerifying" class="space-y-4">
            <Loader2 class="h-8 w-8 animate-spin mx-auto" />
            <p class="text-sm text-muted-foreground">Signing you in...</p>
          </div>

          <div v-else-if="error" class="space-y-4">
            <div
              class="p-4 bg-destructive/10 border border-destructive/20 rounded"
            >
              <p class="text-sm text-destructive">{{ error }}</p>
            </div>
            <Button variant="outline" class="w-full" @click="goToLogin">
              Back to Sign In
            </Button>
          </div>

          <div v-else class="space-y-4">
            <div class="p-4 bg-primary/10 border border-primary/20 rounded">
              <p class="text-sm">✅ Successfully signed in! Redirecting...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Verifying Sign In - ScamAlert",
  meta: [
    {
      name: "description",
      content: "Verifying your magic link sign in to ScamAlert.",
    },
  ],
});

const router = useRouter();
const route = useRoute();

const isVerifying = ref(true);
const error = ref("");

const goToLogin = () => {
  router.push("/login");
};

// Handle magic link verification on page load
onMounted(async () => {
  const { userId, secret } = route.query;

  if (!userId || !secret) {
    error.value =
      "Invalid or expired magic link. Please request a new sign-in link.";
    isVerifying.value = false;
    return;
  }

  try {
    // Call the server-side verification endpoint
    await $fetch(`/api/magic-verify?userId=${userId}&secret=${secret}`);

    // Refresh the auth store to reflect the new authentication state
    const authStore = useAuthStore();
    await authStore.refreshAuth();

    // If we reach here, verification was successful
    setTimeout(() => {
      router.push("/scams");
    }, 1000);
  } catch (err: unknown) {
    console.error("Magic link verification error:", err);
    const errorObj = err as {
      message?: string;
      statusMessage?: string;
      statusCode?: number;
    };

    // Provide more user-friendly error messages
    if (errorObj.statusCode === 400) {
      error.value =
        "This magic link has expired or is invalid. Please request a new sign-in link.";
    } else if (errorObj.statusMessage?.includes("Verification failed")) {
      error.value =
        "Unable to verify your sign-in link. Please try requesting a new one.";
    } else {
      error.value =
        "Something went wrong during verification. Please try signing in again.";
    }
  } finally {
    isVerifying.value = false;
  }
});
</script>
