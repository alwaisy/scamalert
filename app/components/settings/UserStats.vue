<template>
  <div class="flex items-center gap-x-4 mb-6">
    <Card class="py-4">
      <CardContent>
        <div class="flex items-center gap-2">
          <Icon name="lucide:file-text" class="text-primary" size="24" />
          <div class="flex items-center gap-x-2">
            <p class="text-sm text-muted-foreground">Total Scams</p>
            <p class="text-2xl font-bold">{{ totalScams }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="py-4">
      <CardContent>
        <div class="flex items-center gap-2">
          <Icon name="lucide:check-circle" class="text-green-600" size="24" />
          <div class="flex items-center gap-x-2">
            <p class="text-sm text-muted-foreground">Approved</p>
            <p class="text-2xl font-bold">{{ approvedCount }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Comments Card - DISABLED FOR MVP -->
    <!-- <Card>
      <CardContent class="p-4">
        <div class="flex items-center gap-2">
          <Icon name="lucide:message-circle" class="w-5 h-5 text-blue-600" />
          <div>
            <p class="text-sm text-muted-foreground">Total Comments</p>
            <p class="text-2xl font-bold">{{ totalComments }}</p>
          </div>
        </div>
      </CardContent>
    </Card> -->

    <!-- Upvotes Card - DISABLED FOR MVP -->
    <!-- <Card>
      <CardContent class="p-4">
        <div class="flex items-center gap-2">
          <Icon name="lucide:thumbs-up" class="w-5 h-5 text-blue-600" />
          <div>
            <p class="text-sm text-muted-foreground">Total Upvotes</p>
            <p class="text-2xl font-bold">{{ totalUpvotes }}</p>
          </div>
        </div>
      </CardContent>
    </Card> -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalScams: number;
  approvedCount: number;
  totalComments: number;
  totalUpvotes: number;
}

defineProps<Props>();
</script>
