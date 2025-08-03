<template>
  <NuxtErrorBoundary @error="handleError">
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
        <Skeleton class="h-4 w-1/2" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-destructive mb-4">
          <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-4" />
          <h2 class="text-xl font-semibold">Scam Not Found</h2>
          <p class="text-muted-foreground mt-2">
            {{ error?.message || "An unexpected error occurred" }}
          </p>
        </div>
        <Button class="mt-4" as-child>
          <NuxtLink to="/scams">Back to Scams</NuxtLink>
        </Button>
      </div>

      <!-- Scam Details -->
      <div v-else-if="data" class="space-y-4">
        <!-- Header -->
        <ScamHeader
          :title="data.title"
          :type="data.type"
          :is-anonymous="data.isAnonymous"
          :author-username="data.author.username"
          :upvotes-count="data.upvotesCount"
        />

        <!-- Content -->
        <ScamContent :content="data.content" />

        <!-- Evidence -->
        <ScamEvidence :evidence-urls="data.evidenceUrls" />

        <!-- Metadata -->
        <ScamMetadata :platforms="data.platforms" :locations="data.locations" />

        <!-- Actions -->
        <!-- <Card>
          <CardContent>
            <ScamActions
              :upvotes-count="data.upvotesCount"
              :scam-id="data.scamId"
              :is-upvoted="data.isUpvoted"
              @update:upvotes-count="handleUpvotesUpdate"
              @update:is-upvoted="handleIsUpvotedUpdate"
            />
          </CardContent>
        </Card> -->

        <!-- Comments Section - DISABLED FOR MVP -->
        <!-- <ScamComments :comments="data.comments" /> -->
      </div>

      <!-- Not Found State -->
      <div v-else-if="!pending && !data" class="text-center py-12">
        <div class="text-muted-foreground mb-4">
          <Icon name="lucide:search" class="w-12 h-12 mx-auto mb-4" />
          <h2 class="text-xl font-semibold">Scam Not Found</h2>
          <p class="text-muted-foreground mt-2">
            The scam you're looking for doesn't exist.
          </p>
        </div>
        <Button class="mt-4" as-child>
          <NuxtLink to="/scams">Back to Scams</NuxtLink>
        </Button>
      </div>
    </div>

    <!-- Error Template -->
    <template #error="{ error: templateError, clearError }">
      <div class="text-center py-12">
        <div class="text-destructive mb-4">
          <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-4" />
          <h2 class="text-xl font-semibold">Something went wrong</h2>
          <p class="text-muted-foreground mt-2">
            {{ templateError?.message || "An unexpected error occurred" }}
          </p>
        </div>
        <div class="flex gap-2 justify-center">
          <Button class="mt-4" @click="clearError"> Try Again </Button>
          <Button class="mt-4" variant="outline" @click="navigateTo('/scams')">
            Back to Scams
          </Button>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
// Route params
const route = useRoute();
const scamId = route.params.id as string;

// Page meta
definePageMeta({
  layout: "core",
  // middleware: ["auth-logged-in"],
});

// API composable
const { fetchScam } = useScams();

// Use useAsyncData for data fetching with built-in caching
const { data, pending, error } = await useAsyncData(
  `scam-${scamId}`,
  () => fetchScam(scamId),
  {
    server: true, // Enable SSR for better SEO
    default: () => null, // Provide default null
  }
);

// Prefetch data for better performance
onServerPrefetch(async () => {
  await fetchScam(scamId);
});

// Error handler
const handleError = (err: Error) => {
  console.error("Scam detail page error:", err);
};

/* // Handle upvote updates
const handleUpvotesUpdate = (count: number) => {
  console.log("Received upvotes update:", count);
  if (data.value) {
    data.value.upvotesCount = count;
    console.log("Updated upvotes count in data");
  }
};

const handleIsUpvotedUpdate = (value: boolean) => {
  console.log("Received isUpvoted update:", value);
  if (data.value) {
    data.value.isUpvoted = value;
    console.log("Updated isUpvoted in data");
    // Force reactivity
    triggerRef(data);
  }
}; */

// SEO
useHead(() => ({
  title: data.value
    ? `${data.value.title} - ScamAlert Pakistan`
    : "Scam Details - ScamAlert Pakistan",
  meta: [
    {
      name: "description",
      content: data.value
        ? `Read about ${data.value.title}. Learn from this scam report to protect yourself from similar fraud.`
        : "Scam details page",
    },
  ],
}));
</script>
