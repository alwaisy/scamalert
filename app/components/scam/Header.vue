<template>
  <div class="space-y-4">
    <h1 class="text-3xl font-bold leading-tight">{{ title }}</h1>
    <div class="flex items-center gap-4 text-sm text-muted-foreground">
      <div class="flex items-center gap-2">
        <Icon name="lucide:user" class="w-4 h-4" />
        <span>{{ isAnonymous ? "Anonymous" : authorUsername }}</span>
      </div>
      <!-- <div class="flex items-center gap-2">
        <Icon name="lucide:thumbs-up" class="w-4 h-4" />
        <span>{{ upvotesCount }} upvotes</span>
      </div> -->
    </div>

    <!-- Scam Type Badge -->
    <Badge variant="secondary" class="text-sm">
      {{ formatScamType(type) }}
    </Badge>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  type: string;
  isAnonymous: boolean;
  authorUsername: string;
  upvotesCount: number;
}

defineProps<Props>();

const formatScamType = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>
