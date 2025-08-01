<template>
  <div class="py-8 space-y-8">
    <!-- Back Button -->
    <Button variant="outline" size="sm">
      <NuxtLink to="/scams">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Back to Scams
      </NuxtLink>
    </Button>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-6">
      <Skeleton class="h-8 w-3/4" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-2/3" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-destructive mb-4">
        <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-4" />
        <h2 class="text-xl font-semibold">Scam Not Found</h2>
        <p class="text-muted-foreground mt-2">
          The scam you're looking for doesn't exist.
        </p>
      </div>
      <Button class="mt-4" as-child>
        <NuxtLink to="/scams">Back to Scams </NuxtLink>
      </Button>
    </div>

    <!-- Scam Details -->
    <div v-else-if="scam" class="space-y-8">
      <!-- Header -->
      <div class="space-y-4">
        <h1 class="text-3xl font-bold leading-tight">{{ scam.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <Icon name="lucide:user" class="w-4 h-4" />
            <span>{{
              scam.victim.anonymous ? "Anonymous" : scam.victim.username
            }}</span>
          </div>
        </div>
      </div>

      <!-- Scam Type Badge -->
      <Badge variant="secondary" class="text-sm">
        {{ formatScamType(scam.type) }}
      </Badge>

      <!-- Content -->
      <Card>
        <CardContent class="pt-6">
          <p class="text-base leading-relaxed whitespace-pre-wrap">
            {{ scam.content }}
          </p>
        </CardContent>
      </Card>

      <!-- Metadata -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Platforms -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Platforms Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="platform in scam.platform"
                :key="platform"
                variant="outline"
                class="text-sm"
              >
                {{ platform }}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <!-- Locations -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="location in scam.location"
                :key="location"
                variant="outline"
                class="text-sm"
              >
                📍 {{ location }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Comments Section -->
      <Card>
        <CardHeader>
          <CardTitle class="text-lg"
            >Comments ({{ scam.comments.length }})</CardTitle
          >
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-if="scam.comments.length === 0"
            class="text-center py-8 text-muted-foreground"
          >
            <Icon
              name="lucide:message-circle"
              class="w-8 h-8 mx-auto mb-2 opacity-50"
            />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="comment in scam.comments"
              :key="comment.id"
              class="border-b border-border pb-4 last:border-b-0"
            >
              <div class="flex items-start gap-3">
                <Avatar class="w-8 h-8">
                  <AvatarFallback class="text-xs">
                    {{ comment.poster.username.charAt(0).toUpperCase() }}
                  </AvatarFallback>
                </Avatar>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-sm">{{
                      comment.poster.username
                    }}</span>
                    <span class="text-xs text-muted-foreground"
                      >• recently</span
                    >
                  </div>
                  <p class="text-sm text-foreground">{{ comment.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockScams } from "~/lib/mock/scam-mock";
import type { Scam } from "~/lib/mock/types";

// Route params
const route = useRoute();
const scamId = route.params.id as string;

// Page meta
definePageMeta({
  layout: "core",
});

// State
const pending = ref(true);
const error = ref<string | null>(null);
const scam = ref<Scam | null>(null);

// Find the scam by ID
const findScam = () => {
  const foundScam = mockScams.find((s) => s.id === scamId);
  if (foundScam) {
    scam.value = foundScam;
    error.value = null;
  } else {
    error.value = "Scam not found";
    scam.value = null;
  }
  pending.value = false;
};

// Initialize
onMounted(() => {
  findScam();
});

// Watch for route changes
watch(
  () => route.params.id,
  () => {
    pending.value = true;
    findScam();
  }
);

// Utility functions
const formatScamType = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// SEO
useHead(() => ({
  title: scam.value
    ? `${scam.value.title} - ScamAlert Pakistan`
    : "Scam Details - ScamAlert Pakistan",
  meta: [
    {
      name: "description",
      content: scam.value
        ? `Read about ${scam.value.title}. Learn from this scam report to protect yourself from similar fraud.`
        : "Scam details page",
    },
  ],
}));
</script>
