<template>
  <Button
    :variant="buttonVariant"
    size="sm"
    class="gap-2 transition-all duration-200"
    :class="buttonClass"
    :disabled="isLoading"
    @click="handleToggleUpvote"
  >
    <Icon
      name="icon-park-outline:heart"
      class="w-4 h-4 transition-all duration-200"
      :class="iconClass"
    />
    <span class="text-xs">
      {{ buttonText }}
    </span>
    <span class="font-semibold text-xs">{{ upvotes }}</span>
  </Button>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

interface Props {
  upvotes: number;
  scamId: string;
  isUpvoted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isUpvoted: false,
});

const emit = defineEmits<{
  "update:upvotes": [count: number];
  "update:is-upvoted": [value: boolean];
}>();

const isLoading = ref(false);

// Local state for optimistic updates
const localUpvotes = ref(props.upvotes);
const localIsUpvoted = ref(props.isUpvoted);

// Watch for prop changes to sync local state
watch(
  () => props.upvotes,
  (newValue) => {
    localUpvotes.value = newValue;
  }
);

watch(
  () => props.isUpvoted,
  (newValue) => {
    localIsUpvoted.value = newValue;
  }
);

// Make button state reactive to local state
const buttonVariant = computed(() =>
  localIsUpvoted.value ? "default" : "outline"
);
const buttonClass = computed(() => ({
  "bg-primary text-primary-foreground": localIsUpvoted.value,
}));
const iconClass = computed(() => ({
  "text-red-500": localIsUpvoted.value,
}));
const buttonText = computed(() =>
  localIsUpvoted.value ? "Felt their pain" : "Wanna feel their pain?"
);

const handleToggleUpvote = async () => {
  // Check if user is authenticated using the Pinia auth store
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    toast("Please login to feel their pain");
    return;
  }

  if (isLoading.value) return;

  isLoading.value = true;

  // Optimistic update - immediately update local state
  const wasUpvoted = localIsUpvoted.value;
  localIsUpvoted.value = !wasUpvoted;
  localUpvotes.value = wasUpvoted
    ? localUpvotes.value - 1
    : localUpvotes.value + 1;

  // Emit optimistic updates immediately
  emit("update:upvotes", localUpvotes.value);
  emit("update:is-upvoted", localIsUpvoted.value);

  try {
    const response = await $fetch(`/api/scams/${props.scamId}/upvote`, {
      method: "POST",
    });

    if (response.success) {
      // Update local state with API response to ensure consistency
      localUpvotes.value = response.data.upvotesCount;
      localIsUpvoted.value = response.data.hasUpvoted; // API returns hasUpvoted, not isUpvoted

      // Emit final updates
      emit("update:upvotes", localUpvotes.value);
      emit("update:is-upvoted", localIsUpvoted.value);

      // Show success message
      const action = localIsUpvoted.value ? "added" : "removed";
      toast(`Vote ${action} successfully`);
    } else {
      // Revert optimistic update on failure
      localIsUpvoted.value = wasUpvoted;
      localUpvotes.value = wasUpvoted
        ? localUpvotes.value + 1
        : localUpvotes.value - 1;

      emit("update:upvotes", localUpvotes.value);
      emit("update:is-upvoted", localIsUpvoted.value);

      toast("Failed to vote");
    }
  } catch (error: unknown) {
    console.error("Error toggling upvote:", error);

    // Revert optimistic update on error
    localIsUpvoted.value = wasUpvoted;
    localUpvotes.value = wasUpvoted
      ? localUpvotes.value + 1
      : localUpvotes.value - 1;

    emit("update:upvotes", localUpvotes.value);
    emit("update:is-upvoted", localIsUpvoted.value);

    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null &&
          "message" in error.data
        ? String(error.data.message)
        : typeof error === "object" && error !== null && "message" in error
        ? String(error.message)
        : "Failed to vote";

    toast("Error", {
      description: errorMessage,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
