<template>
  <Sheet :open="open" @update:open="$emit('update:open', $event)">
    <SheetContent side="bottom" class="h-[85vh]">
      <SheetHeader class="border-b border-border pb-4">
        <SheetTitle class="text-xl font-bold">Filter Scams</SheetTitle>
        <SheetDescription class="text-muted-foreground">
          Refine your search by scam type, platform, and location
        </SheetDescription>
      </SheetHeader>

      <div class="flex-1 overflow-y-auto py-6">
        <div class="space-y-8 px-4">
          <!-- Scam Type Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Icon name="lucide:shield-alert" class="w-5 h-5 text-primary" />
              <label class="text-sm font-semibold text-foreground">
                Scam Type
              </label>
            </div>
            <Select
              v-model="selectedType"
              @update:model-value="handleTypeChange"
            >
              <SelectTrigger class="h-12 w-full">
                <SelectValue placeholder="Select scam type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" class="font-medium"
                  >All Types</SelectItem
                >
                <SelectItem v-for="type in scamTypes" :key="type" :value="type">
                  {{ formatScamType(type) }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Platform Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Icon name="lucide:smartphone" class="w-5 h-5 text-primary" />
              <label class="text-sm font-semibold text-foreground"
                >Platform</label
              >
            </div>
            <Select
              v-model="selectedPlatform"
              @update:model-value="handlePlatformChange"
            >
              <SelectTrigger class="h-12 w-full">
                <SelectValue placeholder="Select platform..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" class="font-medium"
                  >All Platforms</SelectItem
                >
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
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Icon name="lucide:map-pin" class="w-5 h-5 text-primary" />
              <label class="text-sm font-semibold text-foreground">
                Location
              </label>
            </div>
            <Select
              v-model="selectedLocation"
              @update:model-value="handleLocationChange"
            >
              <SelectTrigger class="h-12 w-full">
                <SelectValue placeholder="Select location..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" class="font-medium"
                  >All Locations</SelectItem
                >
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
      </div>

      <SheetFooter class="border-t border-border pt-4">
        <div class="flex gap-3 w-full">
          <Button variant="outline" class="flex-1" @click="clearAllFilters">
            Clear All
          </Button>
          <Button
            variant="outline"
            class="flex-1"
            @click="$emit('update:open', false)"
          >
            Cancel
          </Button>
          <Button class="flex-1" @click="$emit('update:open', false)">
            Apply Filters
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import type { Scam } from "~/lib/mock/types";

interface Props {
  open: boolean;
  scams: Scam[];
  filters: {
    search: string;
    type: string;
    platform: string;
    location: string;
  };
}

interface Emits {
  (e: "update:open", value: boolean): void;
  (
    e: "filter-change",
    filters: {
      search: string;
      type: string;
      platform: string;
      location: string;
    }
  ): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

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
    search: props.filters.search, // Keep search from parent
    type: selectedType.value,
    platform: selectedPlatform.value,
    location: selectedLocation.value,
  });
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

const clearAllFilters = () => {
  selectedType.value = "all";
  selectedPlatform.value = "all";
  selectedLocation.value = "all";
  emitFilters();
};
</script>
