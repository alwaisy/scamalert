<template>
  <footer class="relative bg-background border-t border-border">
    <!-- Big Background Text -->
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
    >
      <h2
        class="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-foreground/[0.03] select-none whitespace-nowrap"
      >
        SCAMALERT
      </h2>
    </div>

    <!-- Footer Content -->
    <div class="relative mx-auto max-w-screen-lg px-4 py-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <!-- Left: Logo and Description -->
        <div class="text-center md:text-left">
          <SharedLogo class="mb-4 justify-center md:justify-start" />
          <p class="text-sm text-muted-foreground mb-2">
            Pakistan's first community-driven scam alert platform
          </p>
          <p class="text-xs text-muted-foreground">
            Brought to you by
            <a
              href="https://reddit.com/r/PakStartups"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              r/PakStartups
            </a>
          </p>
        </div>

        <!-- Right: Minimal Links -->
        <div class="flex flex-col md:flex-row items-center gap-6">
          <nav class="flex items-center gap-6 text-sm">
            <NuxtLink
              to="/about"
              class="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/guide"
              class="text-muted-foreground hover:text-primary transition-colors"
            >
              Guide
            </NuxtLink>
            <a
              href="mailto:contact@scamalert.pk"
              class="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          <!-- Social/Community Link -->
          <a
            href="https://reddit.com/r/PakStartups"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <Icon name="lucide:message-circle" size="16" />
            Community
          </a>
        </div>
      </div>

      <!-- Bottom Copyright - Centered -->
      <div class="border-t border-border mt-8 pt-6 text-center">
        <p class="text-xs text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} ScamAlert.pk • Protecting
          Pakistani families from fraud
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Modern slim footer with big background text
</script>
