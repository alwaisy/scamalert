<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Enhanced Header -->
    <header
      class="border-b border-border/50 bg-background/80 backdrop-blur-sm flex-shrink-0"
    >
      <div class="mx-auto max-w-screen-lg px-4 py-4">
        <div class="flex items-center justify-center">
          <SharedLogo />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 mx-auto max-w-screen-lg px-4 w-full">
      <slot />
    </main>

    <!-- Minimal Footer -->
    <footer
      class="border-t border-border/50 bg-background/80 backdrop-blur-sm flex-shrink-0"
    >
      <div class="mx-auto max-w-screen-lg px-4 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="text-center md:text-left">
            <p class="text-sm text-muted-foreground">
              &copy; {{ new Date().getFullYear() }} ScamAlert.pk • Protecting
              Pakistani families
            </p>
          </div>

          <!-- Help Link -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/guide"
              class="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Help & Guide
            </NuxtLink>
            <a
              href="https://reddit.com/r/PakStartups"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Community
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Clean auth layout with enhanced header
</script>
