<template>
  <NuxtErrorBoundary @error="handleError">
    <div class="py-6 space-y-6">
      <!-- Back Button -->
      <div class="flex items-center justify-between">
        <Button variant="outline" size="sm" class="gap-2" as-child>
          <NuxtLink to="/scams">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Back to Scams
          </NuxtLink>
        </Button>

        <div v-if="data" class="flex items-center gap-2">
          <Button variant="ghost" size="sm" @click="handleShare">
            <Icon name="lucide:share" class="w-4 h-4" />
          </Button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="space-y-6">
        <div class="space-y-4">
          <Skeleton class="h-8 w-3/4" />
          <Skeleton class="h-4 w-1/2" />
          <Skeleton class="h-6 w-24" />
        </div>
        <Card class="p-6">
          <div class="space-y-3">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-2/3" />
          </div>
        </Card>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-destructive mb-4">
          <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-4" />
          <h2 class="text-xl font-semibold">Scam Not Found</h2>
          <p class="text-muted-foreground mt-2">
            {{ error?.message || "The scam you're looking for doesn't exist" }}
          </p>
        </div>
        <Button as-child>
          <NuxtLink to="/scams">Back to Scams</NuxtLink>
        </Button>
      </div>

      <!-- Scam Details -->
      <div v-else-if="data" class="space-y-6">
        <!-- Header -->
        <ScamHeader
          :title="data.title"
          :type="data.type"
          :is-anonymous="data.isAnonymous"
          :author-username="data.author.username"
          :upvotes-count="data.upvotesCount"
          :created-at="data.createdAt"
        />

        <!-- Content -->
        <ScamContent :content="data.content" />

        <!-- Evidence -->
        <ScamEvidence :evidence-urls="data.evidenceUrls" />

        <!-- Metadata -->
        <ScamMetadata :platforms="data.platforms" :locations="data.locations" />

        <!-- Actions -->
        <Card>
          <CardContent>
            <div class="flex items-center justify-between">
              <div class="text-sm text-muted-foreground">
                Share this report to help others stay safe
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm" @click="handleShare">
                  <Icon name="lucide:share" class="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" as-child>
                  <NuxtLink to="/submit">
                    <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                    Report Similar
                  </NuxtLink>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Not Found State -->
      <div v-else-if="!pending && !data" class="text-center py-16">
        <div class="text-muted-foreground mb-4">
          <Icon name="lucide:search" class="w-12 h-12 mx-auto mb-4" />
          <h2 class="text-xl font-semibold">Scam Not Found</h2>
          <p class="text-muted-foreground mt-2">
            The scam you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Button as-child>
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
          <Button @click="clearError">Try Again</Button>
          <Button variant="outline" @click="navigateTo('/scams')">
            Back to Scams
          </Button>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

// Route params
const route = useRoute();
const scamId = route.params.id as string;

// Page meta
definePageMeta({
  layout: "core",
});

// API composable
const { fetchScam } = useScams();

// Use useAsyncData for data fetching with built-in caching
const { data, pending, error } = await useAsyncData(
  `scam-${scamId}`,
  () => fetchScam(scamId),
  {
    server: true,
    default: () => null,
  }
);

// Prefetch data for better performance
onServerPrefetch(async () => {
  await fetchScam(scamId);
});

// Actions
const config = useRuntimeConfig();
const scamUrl = `${config.public.clientUrl}/scams/${scamId}`;

const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(scamUrl);
    toast("Link copied to clipboard");
  } catch (error) {
    console.error("Failed to copy:", error);
    toast("Failed to copy link");
  }
};

// Error handler
const handleError = (err: Error) => {
  console.error("Scam detail page error:", err);
};

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
