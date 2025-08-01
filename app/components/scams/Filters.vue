<template>
  <Card class="py-4">
    <CardContent class="px-4">
      <!-- Desktop: Search + 3 filters in one row -->
      <div class="hidden lg:flex gap-x-2">
        <!-- Search -->
        <div class="flex-1">
          <Input
            v-model="searchQuery"
            placeholder="Search scams..."
            class="w-full"
            @input="handleSearch"
          />
        </div>

        <!-- Scam Type Filter -->
        <div>
          <Select v-model="selectedType" @update:model-value="handleTypeChange">
            <SelectTrigger>
              <SelectValue placeholder="Scam type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem v-for="type in scamTypes" :key="type" :value="type">
                {{ formatScamType(type) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Platform Filter -->
        <div>
          <Select
            v-model="selectedPlatform"
            @update:model-value="handlePlatformChange"
          >
            <SelectTrigger>
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem
                v-for="platform in platforms"
                :key="platform"
                :value="platform"
              >
                {{ platform }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Location Filter -->
        <div>
          <Select
            v-model="selectedLocation"
            @update:model-value="handleLocationChange"
          >
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem
                v-for="location in locations"
                :key="location"
                :value="location"
              >
                {{ location }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <!-- Mobile/Tablet: Search + Filter button in one row -->
      <div class="lg:hidden flex gap-x-2">
        <!-- Search -->
        <div class="flex-1">
          <Input
            v-model="searchQuery"
            placeholder="Search scams..."
            class="w-full"
            @input="handleSearch"
          />
        </div>

        <!-- Filter Button -->
        <div>
          <ScamsFilterButton
            :active-filters-count="activeFiltersCount"
            @open="$emit('open-sheet')"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Scam } from "~/lib/mock/types";

interface Props {
  scams: Scam[];
  filters: {
    search: string;
    type: string;
    platform: string;
    location: string;
  };
}

interface Emits {
  (
    e: "filter-change",
    filters: {
      search: string;
      type: string;
      platform: string;
      location: string;
    }
  ): void;
  (e: "open-sheet"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const searchQuery = ref(props.filters.search);
const selectedType = ref(props.filters.type);
const selectedPlatform = ref(props.filters.platform);
const selectedLocation = ref(props.filters.location);

// Extract unique values from scams
const scamTypes = computed(() => {
  return [...new Set(props.scams.map((scam) => scam.type))];
});

const platforms = computed(() => {
  return [...new Set(props.scams.flatMap((scam) => scam.platform))];
});

const locations = computed(() => {
  return [...new Set(props.scams.flatMap((scam) => scam.location))];
});

const formatScamType = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const emitFilters = () => {
  emit("filter-change", {
    search: searchQuery.value,
    type: selectedType.value,
    platform: selectedPlatform.value,
    location: selectedLocation.value,
  });
};

const handleSearch = () => {
  emitFilters();
};

const handleTypeChange = () => {
  emitFilters();
};

const handlePlatformChange = () => {
  emitFilters();
};

const handleLocationChange = () => {
  emitFilters();
};

// Calculate active filters count
const activeFiltersCount = computed(() => {
  let count = 0;
  if (props.filters.search.trim()) count++;
  if (props.filters.type !== "all") count++;
  if (props.filters.platform !== "all") count++;
  if (props.filters.location !== "all") count++;
  return count;
});
</script>
