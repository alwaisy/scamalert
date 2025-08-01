<template>
  <div v-if="totalPages > 1" class="flex justify-center">
    <div class="flex items-center gap-4 w-full justify-between">
      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === 1"
        class="gap-2"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        <Icon name="lucide:chevron-left" class="w-4 h-4" />
        Previous
      </Button>

      <span class="text-xs text-muted-foreground">
        {{ currentPage }} / {{ totalPages }}
      </span>

      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === totalPages"
        class="gap-2"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        Next
        <Icon name="lucide:chevron-right" class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
}

interface Emits {
  (e: "update:currentPage", page: number): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
