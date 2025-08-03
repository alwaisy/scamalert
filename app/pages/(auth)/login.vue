<template>
  <div
    class="bg-muted flex flex-col items-center justify-center"
    style="min-height: calc(100vh - 80px - 88px)"
  >
    <div class="flex w-full max-w-md flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign In to ScamAlert</CardTitle>
          <CardDescription>
            Enter your email to receive a secure sign-in link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                required
                :disabled="isLoading"
              />
            </div>

            <Button type="submit" :disabled="isLoading" class="w-full">
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              Send Sign-In Link
            </Button>
          </form>

          <div
            v-if="success"
            class="mt-4 p-3 bg-primary/10 border border-primary/20 rounded text-sm"
          >
            ✅ Magic link sent! Check your email and click the link to sign in.
          </div>

          <div
            v-if="error"
            class="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive"
          >
            {{ error }}
          </div>
        </CardContent>
        <CardFooter class="flex flex-col gap-4">
          <div class="text-center text-sm text-muted-foreground">
            No passwords needed - just your email!
          </div>
        </CardFooter>
      </Card>

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
import { Loader2 } from "lucide-vue-next";

definePageMeta({
  layout: "auth",
  middleware: ["auth-logged-out"],
});

useHead({
  title: "Sign In - ScamAlert",
  meta: [
    {
      name: "description",
      content: "Sign in to ScamAlert using a secure link sent to your email.",
    },
    {
      property: "og:title",
      content: "Sign In - ScamAlert",
    },
    {
      property: "og:description",
      content: "Sign in to ScamAlert using a secure link sent to your email.",
    },
  ],
});

const authStore = useAuthStore();
const { isLoading } = storeToRefs(authStore);

const form = ref({
  email: "",
});

const error = ref("");
const success = ref(false);

const handleSubmit = async () => {
  error.value = "";
  success.value = false;

  const result = await authStore.sendMagicLink(form.value.email);

  if (result.success) {
    success.value = true;
    form.value.email = ""; // Clear form
  } else {
    error.value = result.error || "Failed to send magic link";
  }
};
</script>
