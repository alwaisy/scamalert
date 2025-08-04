<template>
  <NuxtErrorBoundary @error="handleError">
    <div class="py-6 space-y-6">
      <!-- Hero Section -->
      <ScamsHero
        :total-scams="data?.length || 0"
        :total-upvotes="0"
        :total-comments="0"
      />

      <!-- Filters -->
      <ScamsFilters
        :scam-types="data?.map(scam => (scam as any).type).filter(Boolean) || []"
        :platforms="data?.flatMap(scam => (scam as any).platforms || []).filter(Boolean) || []"
        :locations="data?.flatMap(scam => (scam as any).locations || []).filter(Boolean) || []"
        :filters="filters"
        @filter-change="handleFilterChange"
        @open-sheet="sheetOpen = true"
      />

      <!-- Filter Sheet -->
      <ScamsFilterSheet
        :open="sheetOpen"
        :scam-types="data?.map(scam => (scam as any).type).filter(Boolean) || []"
        :platforms="data?.flatMap(scam => (scam as any).platforms || []).filter(Boolean) || []"
        :locations="data?.flatMap(scam => (scam as any).locations || []).filter(Boolean) || []"
        :filters="filters"
        @update:open="sheetOpen = $event"
        @filter-change="handleFilterChange"
      />

      <!-- Loading State -->
      <div v-if="pending" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card v-for="i in 6" :key="i" class="p-6 bg-card/50">
            <div class="space-y-4">
              <Skeleton class="h-4 w-3/4" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-2/3" />
              <div class="pt-2 border-t border-border/50">
                <Skeleton class="h-3 w-1/2" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div
          class="bg-destructive/5 border border-destructive/20 rounded-lg p-8 max-w-md mx-auto"
        >
          <Icon
            name="lucide:alert-circle"
            class="w-12 h-12 mx-auto mb-4 text-destructive"
          />
          <h2 class="text-xl font-semibold mb-2">Failed to Load Scams</h2>
          <p class="text-muted-foreground mb-4">
            {{ error?.message || "An unexpected error occurred" }}
          </p>
          <Button class="mt-2" @click="refresh">
            <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>

      <!-- Results Count -->

      <!-- Scams Grid -->
      <div
        v-else-if="data && data.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <ScamsItem
          v-for="scam in data"
          :key="scam.id"
          :scam="scam"
          @update:scam="handleScamUpdate"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!pending && (!data || data.length === 0)"
        class="text-center py-16"
      >
        <div class="max-w-md mx-auto">
          <div
            class="bg-muted/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
          >
            <Icon name="lucide:search" class="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 class="text-xl font-semibold mb-2">No Scams Found</h2>
          <p class="text-muted-foreground mb-6">
            Try adjusting your filters or search terms, or be the first to
            report a scam.
          </p>
          <Button variant="outline" @click="$router.push('/submit')">
            <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
            Report First Scam
          </Button>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination && pagination.totalPages > 1"
        class="flex justify-center pt-4"
      >
        <ScamsPagination
          :current-page="pagination.page"
          :total-pages="pagination.totalPages"
          @update:current-page="handlePageChange"
        />
      </div>
    </div>

    <!-- Error Template -->
    <template #error="{ error: templateError, clearError }">
      <div class="text-center py-12">
        <div
          class="bg-destructive/5 border border-destructive/20 rounded-lg p-8 max-w-md mx-auto"
        >
          <Icon
            name="lucide:alert-circle"
            class="w-12 h-12 mx-auto mb-4 text-destructive"
          />
          <h2 class="text-xl font-semibold mb-2">Something went wrong</h2>
          <p class="text-muted-foreground mb-4">
            {{ templateError?.message || "An unexpected error occurred" }}
          </p>
          <div class="flex gap-2 justify-center">
            <Button @click="clearError">
              <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" @click="navigateTo('/scams')">
              <Icon name="lucide:home" class="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
import type { Pagination, ScamFilters, ScamListItem } from "~/lib/types";

definePageMeta({
  layout: "core",
});

// API composable
const { fetchScams } = useScams();

// Route and query
const route = useRoute();
const router = useRouter();

// Filters from query params
const filters = computed<ScamFilters>(() => ({
  search: (route.query.search as string) || undefined,
  type: (route.query.type as string) || undefined,
  location: (route.query.location as string) || undefined,
  status: (route.query.status as string) || "approved",
  sortBy: (route.query.sortBy as string) || "createdAt",
  sortOrder: (route.query.sortOrder as "asc" | "desc") || "desc",
  page: parseInt(route.query.page as string) || 1,
  limit: parseInt(route.query.limit as string) || 20,
}));

// Sheet state
const sheetOpen = ref(false);

// Use useAsyncData for data fetching with built-in caching
const { data, pending, error, refresh } = await useAsyncData(
  "scams",
  () => fetchScams(filters.value),
  {
    watch: [filters],
    server: true, // Enable SSR for better SEO
    default: () => [], // Provide default empty array
    transform: (response) => response as ScamListItem[], // Transform to proper type
  }
);

console.log(
  "data for upvotes",
  data.value?.filter((scam) => scam.isUpvoted)
);

// Prefetch data for better performance
onServerPrefetch(async () => {
  await fetchScams(filters.value);
});

// Extract pagination from the API response
const pagination = computed<Pagination | null>(() => {
  // This would need to be adjusted based on your API response structure
  return null;
});

// Handle filter changes
const handleFilterChange = (newFilters: Partial<ScamFilters>) => {
  const updatedFilters = { ...filters.value, ...newFilters, page: 1 };

  // Update URL with new filters
  router.push({
    query: Object.fromEntries(
      Object.entries(updatedFilters).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    ),
  });
};

// Handle page changes
const handlePageChange = (page: number) => {
  router.push({
    query: { ...route.query, page: page.toString() },
  });
};

// Handle scam updates (upvotes, etc.)
const handleScamUpdate = (updatedScam: ScamListItem) => {
  if (data.value) {
    const index = data.value.findIndex((scam) => scam.id === updatedScam.id);
    if (index !== -1) {
      data.value[index] = updatedScam;
    }
  }
};

// Error handler
const handleError = (err: Error) => {
  console.error("Scams page error:", err);
};

// SEO
useHead({
  title: "Scam Reports - ScamAlert Pakistan",
  meta: [
    {
      name: "description",
      content:
        "Browse and search through real scam reports from Pakistan. Learn about different types of scams and how to protect yourself.",
    },
  ],
});
</script>
