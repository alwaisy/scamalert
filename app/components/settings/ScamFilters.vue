<template>
  <Card>
    <CardContent class="p-4">
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex items-center gap-2">
          <Label for="status-filter">Status:</Label>
          <Select v-model="statusFilter">
            <SelectTrigger class="w-32">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center gap-2">
          <Label for="sort-by">Sort by:</Label>
          <Select v-model="sortBy">
            <SelectTrigger class="w-32">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date</SelectItem>
              <!-- <SelectItem value="upvotes">Upvotes</SelectItem> -->
              <!-- <SelectItem value="comments">Comments</SelectItem> -->
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center gap-2">
          <Label for="sort-order">Order:</Label>
          <Select v-model="sortOrder">
            <SelectTrigger class="w-24">
              <SelectValue placeholder="Desc" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  statusFilter: string;
  sortBy: string;
  sortOrder: string;
}

interface Emits {
  (
    e: "update:statusFilter" | "update:sortBy" | "update:sortOrder",
    value: string
  ): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Computed properties for v-model
const statusFilter = computed({
  get: () => props.statusFilter,
  set: (value: string) => emit("update:statusFilter", value),
});

const sortBy = computed({
  get: () => props.sortBy,
  set: (value: string) => emit("update:sortBy", value),
});

const sortOrder = computed({
  get: () => props.sortOrder,
  set: (value: string) => emit("update:sortOrder", value),
});
</script>
