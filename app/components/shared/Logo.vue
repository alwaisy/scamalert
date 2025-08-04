<template>
  <NuxtLink to="/" class="flex items-center space-x-2">
    <Icon
      name="streamline-plump:leaf-protect-remix"
      size="24"
      class="text-primary hover:text-primary/80"
      :class="iconClass"
    />
    <span
      class="text-xl font-bold transition-all hover:font-medium"
      :class="textClass"
    >
      ScamAlert
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  iconClass?: string;
  textClass?: string;
}

withDefaults(defineProps<Props>(), {
  iconClass: "",
  textClass: "text-foreground",
});
</script>
