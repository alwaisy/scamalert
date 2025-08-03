<template>
  <div class="flex gap-2 w-full justify-between">
    <SharedUpvoteButton
      :upvotes="upvotesCount"
      :scam-id="scamId"
      :is-upvoted="isUpvoted"
      @update:upvotes="handleUpvotesUpdate"
      @update:is-upvoted="handleIsUpvotedUpdate"
    />
    <Button variant="outline" size="sm" class="gap-2" @click="handleShare">
      <Icon name="lucide:share" class="w-4 h-4" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

interface Props {
  upvotesCount: number;
  scamId: string;
  isUpvoted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isUpvoted: false,
});

const emit = defineEmits<{
  "update:upvotesCount": [count: number];
  "update:is-upvoted": [value: boolean];
}>();

const config = useRuntimeConfig();
const clientUrl = config.public.clientUrl;

const scamUrl = `${clientUrl}/scams/${props.scamId}`;

const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(scamUrl);

    toast("Scam URL copied");
  } catch (error) {
    console.error("Failed to copy:", error);
    toast("Failed to copy", {
      description: "Please try again",
    });
  }
};

const handleUpvotesUpdate = (count: number) => {
  emit("update:upvotesCount", count);
};

const handleIsUpvotedUpdate = (value: boolean) => {
  emit("update:is-upvoted", value);
};
</script>
