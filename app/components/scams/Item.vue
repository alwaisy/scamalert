<template>
  <Card
    class="py-4 cursor-pointer shadow-none hover:shadow-md transition-shadow"
  >
    <NuxtLink
      :to="`/scams/${props.scam.scamId}`"
      class="h-full flex flex-col gap-y-6"
    >
      <CardHeader class="px-4">
        <CardTitle class="text-lg leading-tight">
          {{ scam.title }}
        </CardTitle>
      </CardHeader>

      <CardContent class="flex-1 px-4">
        <!-- Type Badge -->
        <Badge variant="secondary" class="text-xs">
          {{ formatScamType(scam.type) }}
        </Badge>

        <!-- Platform Tag -->
        <!-- <div class="flex gap-1">
        <Badge
          v-if="scam.platform.length > 0"
          variant="outline"
          class="text-[10px] px-1.5 py-0.5"
        >
          {{ scam.platform[0] }}
        </Badge>
      </div> -->

        <!-- Location Tag -->
        <!-- <div class="flex gap-1">
        <Badge
          v-if="scam.location.length > 0"
          variant="outline"
          class="text-[10px] px-1.5 py-0.5 bg-accent/50"
        >
          📍 {{ scam.location[0] }}
        </Badge>
      </div> -->
      </CardContent>
    </NuxtLink>

    <CardFooter class="pt-0 mt-auto px-4">
      <div class="flex gap-2 w-full justify-between">
        <SharedUpvoteButton
          :upvotes="scam.upvotesCount"
          :scam-id="scam.scamId"
          :is-upvoted="scam.isUpvoted"
          @update:upvotes="handleUpvotesUpdate"
          @update:is-upvoted="handleIsUpvotedUpdate"
        />
        <Button
          variant="outline"
          size="sm"
          class="gap-2"
          @click.stop="handleShare"
        >
          <Icon name="lucide:share" class="w-4 h-4" />
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import type { ScamListItem } from "~/lib/types";

interface Props {
  scam: ScamListItem;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:scam": [scam: ScamListItem];
}>();

const config = useRuntimeConfig();
const clientUrl = config.public.clientUrl;

const formatScamType = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const handleUpvotesUpdate = (count: number) => {
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
};

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
