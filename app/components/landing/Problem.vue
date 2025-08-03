<template>
  <section class="py-16 sm:py-24 bg-gradient-to-b from-white to-secondary/20">
    <div class="max-w-screen-lg mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
        >
          Hamari Sabhyata, <span class="text-destructive">Unka Faida</span>
        </h2>
        <p class="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Scammers exploit the trust and family values that make South Asian
          culture beautiful. It's time to turn our community strength into
          protection.
        </p>
      </div>

      <!-- Problem Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <!-- Trust Exploitation -->
        <Card
          class="p-6 h-full bg-white/70 backdrop-blur-sm border-destructive/20"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-foreground mb-3">
              Trust Ka Faida
            </h3>
            <p class="text-muted-foreground">
              Pakistani families trust easily. Scammers use our "rishta"
              culture, religious values, and respect for elders against us.
            </p>
          </div>
        </Card>

        <!-- Family WhatsApp Groups -->
        <Card
          class="p-6 h-full bg-white/70 backdrop-blur-sm border-destructive/20"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-foreground mb-3">
              WhatsApp Ki Galat Khabrein
            </h3>
            <p class="text-muted-foreground">
              Family groups spread fake investment schemes, lottery wins, and
              "beta in trouble" messages faster than wildfire.
            </p>
          </div>
        </Card>

        <!-- Economic Pressure -->
        <Card
          class="p-6 h-full bg-white/70 backdrop-blur-sm border-destructive/20"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-foreground mb-3">
              Paison Ki Majboori
            </h3>
            <p class="text-muted-foreground">
              Economic pressure makes families vulnerable to "get rich quick"
              schemes and fake opportunities.
            </p>
          </div>
        </Card>
      </div>

      <!-- Regional Statistics -->
      <div
        class="bg-gradient-to-r from-destructive/5 to-accent/5 rounded-2xl p-8 border border-destructive/20"
      >
        <div class="text-center mb-8">
          <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            South Asia: Scam Capital of the World?
          </h3>
          <p class="text-muted-foreground">
            Our region faces the highest scam vulnerability globally due to
            cultural factors
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-destructive mb-2">₨4.2T</div>
            <div class="text-sm text-muted-foreground">
              Pakistan Annual Loss
            </div>
            <div class="text-xs text-muted-foreground mt-1">4.2% of GDP</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-bold text-destructive mb-2">27.2M</div>
            <div class="text-sm text-muted-foreground">Indian Victims</div>
            <div class="text-xs text-muted-foreground mt-1">
              Highest globally
            </div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-bold text-destructive mb-2">₨50K</div>
            <div class="text-sm text-muted-foreground">Average Family Loss</div>
            <div class="text-xs text-muted-foreground mt-1">Per incident</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-bold text-destructive mb-2">85%</div>
            <div class="text-sm text-muted-foreground">Phone & SMS Scams</div>
            <div class="text-xs text-muted-foreground mt-1">Primary method</div>
          </div>
        </div>
      </div>

      <!-- Cultural Context -->
      <div class="mt-16 text-center">
        <div class="max-w-3xl mx-auto">
          <h3 class="text-2xl font-bold text-foreground mb-6">
            Why Are We Easy Targets?
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div class="flex items-start gap-3">
              <div
                class="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"
              ></div>
              <div>
                <div class="font-semibold text-foreground">
                  High Trust Society
                </div>
                <div class="text-sm text-muted-foreground">
                  We believe in people easily - "bharosa" is our strength and
                  weakness
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"
              ></div>
              <div>
                <div class="font-semibold text-foreground">Elder Respect</div>
                <div class="text-sm text-muted-foreground">
                  Scammers pose as authorities, doctors, bank officials - hard
                  to refuse
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"
              ></div>
              <div>
                <div class="font-semibold text-foreground">
                  Family First Mentality
                </div>
                <div class="text-sm text-muted-foreground">
                  "Beta in trouble" scams work because family comes before
                  everything
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"
              ></div>
              <div>
                <div class="font-semibold text-foreground">
                  Limited Digital Literacy
                </div>
                <div class="text-sm text-muted-foreground">
                  Fast tech adoption but limited awareness of online risks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Problem section highlighting cultural vulnerabilities
</script>
