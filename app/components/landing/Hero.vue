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
          Community
        </h1>

        <!-- Urdu Subtitle -->
        <div class="text-xl sm:text-2xl text-muted-foreground mb-4 font-medium">
          آپ کے خاندان کو دھوکہ دہی سے بچائیں
        </div>

        <!-- English Subtitle -->
        <p
          class="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          A simple platform where Pakistani families share their scam
          experiences to warn others. Real stories, real protection - because
          together we're stronger than any scammer.
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
          <NuxtLink to="/scams">
            <Button size="lg" class="w-full sm:w-auto">
              <Icon name="f7:book" class=" mr-2" size="20" />
              Browse Scam Stories
            </Button>
          </NuxtLink>

          <NuxtLink to="/submit">
            <Button variant="outline" size="lg" class="w-full sm:w-auto">
              <Icon name="lucide:share" size="18" />
              Share Your Experience
            </Button>
          </NuxtLink>
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
