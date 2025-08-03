<template>
  <section
    class="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"
  >
    <div class="max-w-screen-lg mx-auto px-4">
      <!-- Main CTA -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          Aaj Hi <span class="text-primary">Community</span> Join Kariye
        </h2>

        <p
          class="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Every day you wait, more Pakistani families lose their savings. Your
          story could be the warning that saves someone's life savings today.
        </p>

        <!-- Urgency Stats -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
        >
          <div
            class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-destructive/20"
          >
            <div class="text-2xl font-bold text-destructive">₨11.5 Cr</div>
            <div class="text-xs text-muted-foreground">
              Lost daily in Pakistan
            </div>
          </div>

          <div
            class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-destructive/20"
          >
            <div class="text-2xl font-bold text-destructive">2,300</div>
            <div class="text-xs text-muted-foreground">New victims daily</div>
          </div>

          <div
            class="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-destructive/20"
          >
            <div class="text-2xl font-bold text-primary">1 Story</div>
            <div class="text-xs text-muted-foreground">
              Can save 1000+ families
            </div>
          </div>
        </div>

        <!-- Primary Actions -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <NuxtLink to="/submit">
            <Button size="lg" class="w-full sm:w-auto text-lg px-8 py-4">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="12 9v3m0 0v3m0-3h3m-3 0H9m12-5c0 5.523-4.477 10-10 10S2 12.477 2 7s4.477-10 10-10 10 4.477 10 10z"
                />
              </svg>
              Share Your Scam Story
            </Button>
          </NuxtLink>

          <NuxtLink to="/scams">
            <Button
              variant="outline"
              size="lg"
              class="w-full sm:w-auto text-lg px-8 py-4"
            >
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Browse Scam Reports
            </Button>
          </NuxtLink>
        </div>

        <!-- Secondary message -->
        <p class="text-sm text-muted-foreground">
          100% free • Anonymous sharing • Pakistani families only
        </p>
      </div>

      <!-- Two Path Approach -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <!-- Left: For Victims -->
        <Card
          class="p-8 bg-gradient-to-br from-destructive/5 to-red-50 border-destructive/20"
        >
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="simple-line-icons:support" size="32" class="text-destructive" />
            </div>
            <h3 class="text-2xl font-bold text-foreground mb-3">
              Aap Scam Ka Shikar Hue Hain?
            </h3>
            <p class="text-muted-foreground mb-6">
              You're not alone. Help prevent others from the same pain. Your
              experience is powerful protection for thousands.
            </p>
          </div>

          <div class="space-y-4 mb-6">
            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-green-600 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm"
                >Share anonymously - no one will know it's you</span
              >
            </div>

            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-green-600 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm"
                >Help other families avoid the same trap</span
              >
            </div>

            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-green-600 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm"
                >Turn your pain into community protection</span
              >
            </div>
          </div>

          <NuxtLink to="/submit">
            <Button class="w-full" size="lg"> Share My Experience → </Button>
          </NuxtLink>
        </Card>

        <!-- Right: For Protectors -->
        <Card
          class="p-8 bg-gradient-to-br from-primary/5 to-blue-50 border-primary/20"
        >
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="streamline-plump:leaf-protect" size="32" class="text-primary" />
            </div>
            <h3 class="text-2xl font-bold text-foreground mb-3">
              Apne Family Ko Bachana Chahte Hain?
            </h3>
            <p class="text-muted-foreground mb-6">
              Learn from real victim experiences. Stay ahead of scammers with
              community knowledge and protect your loved ones.
            </p>
          </div>

          <div class="space-y-4 mb-6">
            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-green-600 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm"
                >Read real scam stories from Pakistani families</span
              >
            </div>

            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-green-600 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm"
                >Get alerts about new scam methods in your area</span
              >
            </div>

            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-green-600 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm">Educate elderly parents and relatives</span>
            </div>
          </div>

          <NuxtLink to="/scams">
            <Button variant="outline" class="w-full" size="lg">
              Start Learning →
            </Button>
          </NuxtLink>
        </Card>
      </div>

      <!-- Final Motivation -->
      <div
        class="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 lg:p-12 text-center"
      >
        <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Pakistan Ka Har Ghar Mehfooz Ho - Every Pakistani Home Safe
        </h3>

        <p class="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Together, we can make Pakistan scam-free. When families share
          experiences, scammers lose their power. Your participation matters -
          every story saves lives.
        </p>

        <!-- Community Impact -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8"
        >
          <div>
            <div class="text-3xl font-bold text-primary mb-1">50,000+</div>
            <div class="text-sm text-muted-foreground">Families to protect</div>
          </div>

          <div>
            <div class="text-3xl font-bold text-primary mb-1">₨100Cr+</div>
            <div class="text-sm text-muted-foreground">To save annually</div>
          </div>

          <div>
            <div class="text-3xl font-bold text-primary mb-1">1 Goal</div>
            <div class="text-sm text-muted-foreground">Scam-free Pakistan</div>
          </div>
        </div>

        <!-- Final CTA -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <NuxtLink to="/submit">
            <Button
              size="lg"
              class="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              Join the Movement Today
            </Button>
          </NuxtLink>

          <NuxtLink to="/guide">
            <Button variant="ghost" size="lg" class="w-full sm:w-auto">
              Learn How It Works
            </Button>
          </NuxtLink>
        </div>

        <!-- Social Proof -->
        <div class="mt-8 pt-8 border-t border-border/50">
          <p class="text-sm text-muted-foreground mb-4">
            Trusted by Pakistani families across the country
          </p>

          <div
            class="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div class="flex items-center gap-2">
              <div class="w-8 h-5 bg-green-500 rounded-sm"></div>
              <span>Karachi families</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-8 h-5 bg-blue-500 rounded-sm"></div>
              <span>Lahore communities</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-8 h-5 bg-purple-500 rounded-sm"></div>
              <span>Islamabad residents</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-8 h-5 bg-orange-500 rounded-sm"></div>
              <span>All over Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Call-to-action section motivating Pakistani families to join
</script>
