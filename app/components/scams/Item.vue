<template>
  <Card
    class="py-4 cursor-pointer shadow-none hover:shadow-md transition-shadow"
  >
    <NuxtLink :to="scamUrl" class="h-full flex flex-col gap-y-6">
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
        <Button
          variant="outline"
          size="sm"
          class="gap-2"
          @click.stop="handleUpvote"
        >
          <Icon name="icon-park-outline:heart" class="w-4 h-4" />
          <span class="text-xs">Feel your pain</span>
          <span class="font-semibold text-xs">{{ scam.upvotes }}</span>
        </Button>
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
import type { Scam } from "~/lib/mock/types";

interface Props {
  scam: Scam;
}

const props = defineProps<Props>();

const formatScamType = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const handleUpvote = () => {
  // TODO: Implement upvote functionality
  console.log("Upvoted!");
};

const scamUrl = `/scams/${props.scam.id}`;

const router = useRouter();

const handleShare = async () => {
  try {
    const fullUrl = router.resolve(scamUrl).href;
    await navigator.clipboard.writeText(fullUrl);

    toast("Scam URL copied", {
      description: "Scam URL copied to clipboard",
      action: {
        label: "View",
        onClick: () => window.open(fullUrl, "_blank"),
      },
    });
  } catch (error) {
    console.error("Failed to copy:", error);
    toast("Failed to copy", {
      description: "Please try again",
    });
  }
};
</script>
