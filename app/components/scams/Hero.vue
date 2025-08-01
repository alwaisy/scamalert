<template>
  <Card
    class="bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden relative shadow-none border-0"
  >
    <!-- Background Illustration -->
    <!-- <div
      class="absolute right-0 top-0 bottom-0 flex items-center opacity-20 pointer-events-none"
    >
      <img
        src="/assets/images/scams-hero.svg"
        alt=""
        class="h-full w-auto max-w-xs lg:max-w-sm object-contain"
      />
    </div> -->

    <!-- Content -->
    <CardContent class="relative z-10 p-8 lg:p-12 text-center">
      <h1
        class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight"
      >
        Pakistan Scam Database
      </h1>
      <p
        class="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
      >
        Real stories from real victims. Learn from others' experiences to
        protect yourself from scams across Pakistan. Together, we can build a
        safer digital community.
      </p>

      <!-- Stats with Badges -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
      >
        <Badge variant="outline" class="text-lg px-4 py-2">
          <span class="font-bold text-primary">{{ totalScams }}</span>
          <span class="ml-2">Scams</span>
        </Badge>

        <Badge variant="outline" class="text-lg px-4 py-2 flex">
          <span class="font-bold text-primary">{{ totalUpvotes }}</span>
          <span class="ml-2">Votes</span>
        </Badge>

        <Badge variant="outline" class="text-lg px-4 py-2">
          <span class="font-bold text-primary">{{ totalComments }}</span>
          <span class="ml-2">Comments</span>
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Scam } from "~/lib/mock/types";

interface Props {
  scams: Scam[];
}

const props = defineProps<Props>();

const totalScams = computed(() => props.scams.length);
const totalUpvotes = computed(() =>
  props.scams.reduce((sum, scam) => sum + scam.upvotes, 0)
);
const totalComments = computed(() =>
  props.scams.reduce((sum, scam) => sum + scam.comments.length, 0)
);
</script>
