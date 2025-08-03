<template>
  <Card
    class="group cursor-pointer border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 bg-card/50 hover:bg-card"
  >
    <!-- Card Content - Clickable -->
    <NuxtLink :to="`/scams/${props.scam.scamId}`">
      <CardContent class="px-6">
        <!-- Quote Icon & Type Badge -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Icon name="lucide:quote" class="w-4 h-4 text-primary" />
            </div>
            <Badge variant="secondary" class="text-xs font-medium">
              {{ formatScamType(scam.type) }}
            </Badge>
          </div>

          <!-- Date -->
          <p class="text-xs text-muted-foreground">
            {{ getFormattedDate(scam.createdAt) }}
          </p>
        </div>

        <!-- Content Preview -->
        <div class="mb-0">
          <blockquote
            class="text-sm text-muted-foreground leading-relaxed line-clamp-4"
          >
            "{{ getContentPreview(scam.content) }}"
          </blockquote>
        </div>
      </CardContent>
    </NuxtLink>

    <!-- Card Footer - Non-clickable -->
    <CardFooter class="px-6">
      <div class="flex items-center justify-between w-full">
        <!-- Share Button -->
        <Button
          variant="ghost"
          size="sm"
          class="transition-opacity duration-200"
          @click.stop="handleShare"
        >
          <Icon name="lucide:share" class="w-4 h-4" />
        </Button>

        <!-- Upvote CTA Button -->
        <!-- <SharedUpvoteButton
          :upvotes="scam.upvotesCount"
          :scam-id="scam.scamId"
          :is-upvoted="scam.isUpvoted"
          @update:upvotes="handleUpvotesUpdate"
          @update:is-upvoted="handleIsUpvotedUpdate"
        /> -->
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import { toast } from "vue-sonner";
import type { ScamListItem } from "~/lib/types";

interface Props {
  scam: ScamListItem;
}

/* interface Emits {
  "update:scam": [scam: ScamListItem];
} */

const props = defineProps<Props>();
// const emit = defineEmits<Emits>();

const config = useRuntimeConfig();
const clientUrl = config.public.clientUrl;

const formatScamType = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getContentPreview = (content: string) => {
  // Return first 150 characters with proper word boundary
  if (content.length <= 150) return content;
  const truncated = content.substring(0, 150);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
};

const getFormattedDate = (dateString: string) => {
  // Handle invalid dates or 1970 fallback
  if (!dateString || dateString === "1970-01-01T00:00:00.000Z") {
    return "Recently";
  }

  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Recently";
    }

    // Check if it's the 1970 epoch date (invalid fallback)
    if (date.getFullYear() === 1970) {
      return "Recently";
    }

    // Use VueUse formatTimeAgo for clean, localized formatting
    return formatTimeAgo(date);
  } catch {
    console.warn("Invalid date format:", dateString);
    return "Recently";
  }
};

/* const handleUpvotesUpdate = (count: number) => {
  // Update the scam object with new upvote count
  const updatedScam = {
    ...props.scam,
    upvotesCount: count,
  };
  emit("update:scam", updatedScam);
};

const handleIsUpvotedUpdate = (value: boolean) => {
  // Update the scam object with new upvote status
  const updatedScam = {
    ...props.scam,
    isUpvoted: value,
  };
  emit("update:scam", updatedScam);
}; */

const scamUrl = `${clientUrl}/scams/${props.scam.scamId}`;

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
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
