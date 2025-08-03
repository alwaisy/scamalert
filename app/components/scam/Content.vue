<template>
  <Card>
    <CardContent>
      <p class="text-base leading-relaxed whitespace-pre-wrap">
        {{ content }}
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  content: string;
}

defineProps<Props>();
</script>
