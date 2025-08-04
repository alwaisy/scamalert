<template>
  <div class="min-h-screen bg-background">
    <!-- Simple Header -->
    <header
      class="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div class="mx-auto max-w-screen-lg px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <SharedLogo />

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink
              to="/scams"
              class="text-muted-foreground hover:text-primary transition-colors"
            >
              Browse Scams
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/submit"
              class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Report Scam
            </NuxtLink>
          </nav>

          <!-- Mobile Menu Button -->
          <Button variant="ghost" size="sm" class="md:hidden">
            <Icon name="lucide:menu" class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <slot />
  </div>
</template>
