<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">Create an account</CardTitle>
        <CardDescription> Join us to start reporting scams </CardDescription>
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

            <Button type="submit" class="w-full" :disabled="isLoading">
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? "Creating account..." : "Create Account" }}
            </Button>
            <div class="text-center text-sm">
              Already have an account?
              <NuxtLink to="/login" class="underline underline-offset-4">
                Sign in
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

const { register, isLoading } = useAuthStore();
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
  error.value = ""; // Clear previous errors

  const result = await register(form.value.email, form.value.password);

  if (result.success) {
    // User is now automatically logged in, redirect to welcome
    await router.push("/welcome");
  } else {
    const errorMessage = result.error || "Registration failed";
    error.value = errorMessage;
    emit("error", errorMessage);
  }
};
</script>
