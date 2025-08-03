<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Minimal Header -->
    <header class="border-b border-border bg-card flex-shrink-0">
      <div class="mx-auto max-w-screen-lg px-4 py-4">
        <div class="flex items-center justify-center">
          <NuxtLink to="/" class="flex items-center gap-2 font-medium">
            <div
              class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
            >
              <Shield class="size-4" />
            </div>
            ScamAlert
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 mx-auto max-w-screen-lg px-4 w-full">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-card flex-shrink-0">
      <div class="mx-auto max-w-screen-lg px-4 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="text-center md:text-left">
            <p class="text-sm text-muted-foreground">
              &copy; 2024 ScamAlert. Stay safe, stay informed.
            </p>
          </div>

          <!-- Help Link (always show) -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/guide"
              class="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Help & Guide
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Shield } from "lucide-vue-next";
</script>
