<template>
  <Card class="overflow-hidden border-0 shadow-sm">
    <!-- Header with gradient background -->
    <div
      class="bg-gradient-to-r from-destructive/10 to-orange-500/10 p-6 border-b"
    >
      <div class="flex items-start gap-4">
        <!-- Alert Icon -->
        <div
          class="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0"
        >
          <Icon name="lucide:alert-triangle" class="w-6 h-6 text-destructive" />
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Badges Row -->
          <div class="flex items-center gap-2 mb-3">
            <Badge variant="destructive" class="text-xs font-medium">
              {{ formatScamType(type) }}
            </Badge>
            <Badge variant="outline" class="text-xs">
              {{ formatDate(createdAt) }}
            </Badge>
          </div>

          <!-- Title -->
          <h1
            class="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight"
          >
            {{ title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <div class="flex items-center gap-1">
              <Icon name="lucide:user" class="w-4 h-4" />
              <span>{{ isAnonymous ? "Anonymous" : authorUsername }}</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="lucide:clock" class="w-4 h-4" />
              <span>{{ formatTimeAgo(createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  type: string;
  isAnonymous: boolean;
  authorUsername: string;
  upvotesCount: number;
  createdAt?: string;
}

defineProps<Props>();

const formatScamType = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (dateString?: string) => {
  if (!dateString || dateString === "1970-01-01T00:00:00.000Z") {
    return "Recently";
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime()) || date.getFullYear() === 1970) {
      return "Recently";
    }
    return date.toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Recently";
  }
};

const formatTimeAgo = (dateString?: string) => {
  if (!dateString || dateString === "1970-01-01T00:00:00.000Z") {
    return "Recently";
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime()) || date.getFullYear() === 1970) {
      return "Recently";
    }
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch {
    return "Recently";
  }
};
</script>
