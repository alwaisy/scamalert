<template>
  <Button
    variant="outline"
    size="sm"
    class="gap-2 w-full sm:w-auto"
    @click="$emit('open')"
  >
    <Icon name="lucide:filter" class="w-4 h-4" />
    Filters
    <Badge variant="secondary" class="ml-1 text-xs">
      {{ activeFiltersCount }}
    </Badge>
  </Button>
</template>

<script setup lang="ts">
interface Props {
  activeFiltersCount: number;
}

interface Emits {
  (e: "open"): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
