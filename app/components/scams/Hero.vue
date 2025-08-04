<template>
  <Card
    class="bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden relative border-0 shadow-sm"
  >
    <!-- Content -->
    <CardContent class="relative z-10 p-8 lg:p-12 text-center">
      <div class="mb-6">
        <!-- <div
          class="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4"
        >
          <Icon name="lucide:shield-alert" class="w-4 h-4 text-primary" />
          <span class="text-sm font-medium text-primary">Live Database</span>
        </div> -->
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight"
        >
          Pakistan Scam Database
        </h1>
        <p
          class="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          Real stories from real victims. Learn from others' experiences to
          protect yourself and your family from scams across Pakistan.
        </p>
      </div>

      <!-- Enhanced Stats -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div
          class="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3"
        >
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="font-bold text-primary text-lg">{{ totalScams }}</span>
          <span class="text-muted-foreground">Reports</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="lucide:clock" class="w-4 h-4" />
          <span>Updated daily</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  totalScams: number;
  totalUpvotes: number;
  totalComments: number;
}

defineProps<Props>();
</script>
