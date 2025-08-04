<script setup lang="ts">
import "vue-sonner/style.css"; // vue-sonner v2 requires this import
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster position="top-center" />
    <NuxtLoadingIndicator color="#ff2056" :height="8" />
  </NuxtLayout>
</template>
