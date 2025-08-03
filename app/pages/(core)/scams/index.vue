<template>
  <NuxtErrorBoundary @error="handleError">
    <div class="py-8 space-y-8">
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
      <div v-if="pending" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card v-for="i in 6" :key="i" class="p-6">
            <div class="space-y-4">
              <Skeleton class="h-4 w-3/4" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-2/3" />
            </div>
          </Card>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-destructive mb-4">
          <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-4" />
          <h2 class="text-xl font-semibold">Failed to Load Scams</h2>
          <p class="text-muted-foreground mt-2">
            {{ error?.message || "An unexpected error occurred" }}
          </p>
        </div>
        <Button class="mt-4" @click="refresh"> Try Again </Button>
      </div>

      <!-- Results Count -->
      <div
        v-else-if="pagination && data && data.length > 0"
        class="text-sm text-muted-foreground"
      >
        Showing {{ data.length }} of {{ pagination.total }} scams
      </div>

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
        class="text-center py-12"
      >
        <Icon
          name="lucide:search"
          class="w-12 h-12 mx-auto mb-4 text-muted-foreground"
        />
        <h2 class="text-xl font-semibold">No Scams Found</h2>
        <p class="text-muted-foreground mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>

      <!-- Pagination -->
      <ScamsPagination
        v-if="pagination && pagination.totalPages > 1"
        :current-page="pagination.page"
        :total-pages="pagination.totalPages"
        @update:current-page="handlePageChange"
      />
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
            Go to Scams
          </Button>
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
