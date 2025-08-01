<template>
  <div class="py-8 space-y-8">
    <!-- Hero Section -->
    <ScamsHero :scams="mockScams" />

    <!-- Filters -->
    <ScamsFilters
      :scams="mockScams"
      :filters="filters"
      @filter-change="handleFilterChange"
      @open-sheet="sheetOpen = true"
    />

    <!-- Filter Sheet -->
    <ScamsFilterSheet
      :open="sheetOpen"
      :scams="mockScams"
      :filters="filters"
      @update:open="sheetOpen = $event"
      @filter-change="handleFilterChange"
    />

    <!-- Results Count -->
    <!-- <div class="text-sm text-muted-foreground">
      Showing {{ filteredScams.length }} of {{ mockScams.length }} scams
    </div> -->

    <!-- Scams Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ScamsItem v-for="scam in paginatedScams" :key="scam.id" :scam="scam" />
    </div>

    <!-- Pagination -->
    <ScamsPagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { SCAMS_PER_PAGE } from "~/config/project";
import { mockScams } from "~/lib/mock/scam-mock";

definePageMeta({
  layout: "core",
});

// Filters
const filters = ref({
  search: "",
  type: "all",
  platform: "all",
  location: "all",
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = SCAMS_PER_PAGE;

// Sheet state
const sheetOpen = ref(false);

// Filter scams based on current filters
const filteredScams = computed(() => {
  let filtered = mockScams;

  // Search filter
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase();
    filtered = filtered.filter(
      (scam) =>
        scam.title.toLowerCase().includes(searchLower) ||
        scam.content.toLowerCase().includes(searchLower) ||
        scam.victim.username.toLowerCase().includes(searchLower)
    );
  }

  // Type filter
  if (filters.value.type !== "all") {
    filtered = filtered.filter((scam) => scam.type === filters.value.type);
  }

  // Platform filter
  if (filters.value.platform !== "all") {
    filtered = filtered.filter((scam) =>
      scam.platform.includes(filters.value.platform)
    );
  }

  // Location filter
  if (filters.value.location !== "all") {
    filtered = filtered.filter((scam) =>
      scam.location.includes(filters.value.location)
    );
  }

  return filtered;
});

// Pagination calculations
const totalPages = computed(() =>
  Math.ceil(filteredScams.value.length / itemsPerPage)
);

const paginatedScams = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredScams.value.slice(start, end);
});

// Reset to page 1 when filters change
const handleFilterChange = (newFilters: typeof filters.value) => {
  filters.value = newFilters;
  currentPage.value = 1;
};

// SEO
useHead({
  title: "Scam Reports - ScamAlert Pakistan",
  meta: [
    {
      name: "description",
      content:
        "Browse real scam reports from Pakistan. Learn from others' experiences to protect yourself from fraud, fake jobs, romance scams, and more.",
    },
  ],
});
</script>
