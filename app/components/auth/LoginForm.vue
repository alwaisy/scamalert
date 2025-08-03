<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">Welcome back</CardTitle>
        <CardDescription> Sign in to your account to continue </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <div class="grid gap-6">
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="m@example.com"
                required
                :disabled="isLoading"
              />
            </div>
            <div class="grid gap-3">
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                required
                :disabled="isLoading"
              />
            </div>

            <!-- Error Message -->
            <div
              v-if="error"
              class="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
            >
              <p class="text-sm text-destructive">{{ error }}</p>
            </div>

            <ClientOnly>
              <Button type="submit" class="w-full" :disabled="isLoading">
                <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                {{ isLoading ? "Signing in..." : "Sign in" }}
              </Button>
            </ClientOnly>
            <div class="text-center text-sm">
              Don't have an account?
              <NuxtLink to="/register" class="underline underline-offset-4">
                Sign up
              </NuxtLink>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";

interface Props {
  class?: string;
}

defineProps<Props>();

const { login, isLoading } = useAuthStore();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const error = ref("");

const emit = defineEmits<{
  error: [message: string];
}>();

const handleSubmit = async () => {
  console.log("Login form submitted"); // Debug log
  error.value = ""; // Clear previous errors

  const result = await login(form.value.email, form.value.password);

  if (result.success) {
    console.log("Login successful, redirecting..."); // Debug log
    await router.push("/scams");
  } else {
    const errorMessage = result.error || "Login failed";
    console.log("Login failed:", errorMessage); // Debug log
    error.value = errorMessage;
    emit("error", errorMessage);
  }
};
</script>
