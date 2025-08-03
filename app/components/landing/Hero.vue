<template>
  <div
    class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <PatternBackground />
    </div>

    <!-- Main Content -->
    <div class="relative max-w-screen-lg mx-auto px-4 py-16 sm:py-24 lg:py-32">
      <div class="text-center">
        <!-- Main Headline -->
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          Pakistan Ka Pehla
          <span class="text-primary">Scam Alert</span>
          Platform
        </h1>

        <!-- Urdu Subtitle -->
        <div class="text-xl sm:text-2xl text-muted-foreground mb-4 font-medium">
          آپ کے خاندان کو دھوکہ دہی سے بچائیں
        </div>

        <!-- English Subtitle -->
        <p
          class="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Real stories from real Pakistani families. Learn from others'
          experiences to protect yourself and your loved ones from scams across
          Pakistan and South Asia.
        </p>

        <!-- Key Statistics -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          <div
            class="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
          >
            <div class="text-2xl font-bold text-primary">₨4.2T</div>
            <div class="text-sm text-muted-foreground">
              Pakistan's Annual Scam Losses
            </div>
          </div>

          <div
            class="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
          >
            <div class="text-2xl font-bold text-primary">47%</div>
            <div class="text-sm text-muted-foreground">Face Scams Weekly</div>
          </div>

          <div
            class="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
          >
            <div class="text-2xl font-bold text-destructive">4%</div>
            <div class="text-sm text-muted-foreground">
              Victims Recover Money
            </div>
          </div>

          <div
            class="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
          >
            <div class="text-2xl font-bold text-primary">27.2M</div>
            <div class="text-sm text-muted-foreground">South Asian Victims</div>
          </div>
        </div>

        <!-- Call to Action Buttons -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Button size="lg" class="w-full sm:w-auto">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Browse Scam Stories
          </Button>

          <Button variant="outline" size="lg" class="w-full sm:w-auto">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12-5c0 5.523-4.477 10-10 10S2 12.477 2 7s4.477-10 10-10 10 4.477 10 10z"
              />
            </svg>
            Share Your Experience
          </Button>
        </div>

        <!-- Trust Indicators -->
        <div
          class="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            100% Free Platform
          </div>

          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Anonymous Sharing
          </div>

          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Community Verified
          </div>

          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Multi-Language Support
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Hero section for ScamAlert.pk landing page
</script>
