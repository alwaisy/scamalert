<template>
  <NuxtLink
    to="/"
    class="flex items-center space-x-2 text-primary font-bold transition-colors hover:text-primary/80"
  >
    <Icon
      name="streamline-plump:leaf-protect-remix"
      size="24"
      :class="iconClass"
    />
    <span class="text-xl" :class="textClass"> ScamAlert </span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  iconClass?: string;
  textClass?: string;
}

withDefaults(defineProps<Props>(), {
  iconClass: "",
  textClass: "",
});
</script>
