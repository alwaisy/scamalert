<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-screen-lg mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
        >
          <span class="text-primary">Bharosemand</span> Community
        </h2>
        <p class="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Built on Pakistani values of trust, family, and community protection.
          Your safety and privacy are our highest priority.
        </p>
      </div>

      <!-- Trust Pillars -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <!-- Islamic Values -->
        <Card
          class="p-6 text-center h-full bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
        >
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="hugeicons:halal" size="32" class="text-green-300" />
          </div>
          <h3 class="text-lg font-bold text-foreground mb-3">
            Halal Information
          </h3>
          <p class="text-sm text-muted-foreground">
            Truth and honesty in all reports. No false information or misleading
            content.
          </p>
        </Card>

        <!-- Family Protection -->
        <Card
          class="p-6 text-center h-full bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200"
        >
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon
              name="hugeicons:security-check"
              size="32"
              class="text-blue-400"
            />
          </div>
          <h3 class="text-lg font-bold text-foreground mb-3">
            Ghar Ki Suraksha
          </h3>
          <p class="text-sm text-muted-foreground">
            Your family's privacy is sacred. Anonymous sharing protects your
            identity.
          </p>
        </Card>

        <!-- Community Verification -->
        <Card
          class="p-6 text-center h-full bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200"
        >
          <div
            class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="lucide:verified" size="32" class="text-purple-400" />
          </div>
          <h3 class="text-lg font-bold text-foreground mb-3">
            Community Verified
          </h3>
          <p class="text-sm text-muted-foreground">
            Real families verify scam reports. No fake stories or spam allowed.
          </p>
        </Card>

        <!-- Data Protection -->
        <Card
          class="p-6 text-center h-full bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
        >
          <div
            class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="mage:home-security-lock" size="32" class="text-orange-400" />
          </div>
          <h3 class="text-lg font-bold text-foreground mb-3">Data Mehfooz</h3>
          <p class="text-sm text-muted-foreground">
            Bank-level security. Your personal information never shared or sold.
          </p>
        </Card>
      </div>

      <!-- Privacy Assurance -->
      <div
        class="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12 mb-20"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Privacy Features -->
          <div>
            <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Aapki Privacy, <span class="text-primary">Hamari Zimmedari</span>
            </h3>

            <p class="text-muted-foreground mb-6">
              We're just getting started, but your safety comes first. Here's
              what we promise:
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-foreground">
                    Anonymous Sharing Always
                  </div>
                  <div class="text-sm text-muted-foreground">
                    Share without name, email, or phone number. Just your story.
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-foreground">
                    No Money, No Ads
                  </div>
                  <div class="text-sm text-muted-foreground">
                    This is free forever. We're not selling anything or making
                    money from this.
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-foreground">
                    Community Moderation
                  </div>
                  <div class="text-sm text-muted-foreground">
                    Real Pakistani families help verify stories. No fake posts
                    allowed.
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-foreground">
                    Simple & Honest
                  </div>
                  <div class="text-sm text-muted-foreground">
                    No complicated terms. What you see is what you get.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Why Share Your Story -->
          <div>
            <div class="bg-white rounded-lg p-6 border border-border">
              <h4 class="text-xl font-bold text-foreground mb-4">
                Why Share Your Story?
              </h4>

              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <Icon name="material-symbols:help-outline-rounded" size="20" class="text-green-300" />
                  </div>
                  <div>
                    <div class="font-semibold text-foreground">
                      Help Your Community
                    </div>
                    <div class="text-sm text-muted-foreground">
                      Warn other families
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                  >
                    <Icon name="hugeicons:anonymous" size="20" class="text-blue-400" />
                  </div>
                  <div>
                    <div class="font-semibold text-foreground">
                      Completely Anonymous
                    </div>
                    <div class="text-sm text-muted-foreground">
                      No one knows it's you
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
                  >
                    <Icon name="fluent-emoji-high-contrast:seedling" size="20" class="text-purple-400" />
                  </div>
                  <div>
                    <div class="font-semibold text-foreground">
                      Turn Pain into Purpose
                    </div>
                    <div class="text-sm text-muted-foreground">
                      Help others avoid your pain
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"
                  >
                    <Icon name="ion:time-outline" size="20" class="text-orange-400" />
                  </div>
                  <div>
                    <div class="font-semibold text-foreground">
                      It Takes 2 Minutes
                    </div>
                    <div class="text-sm text-muted-foreground">
                      Simple form, quick share
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Language Support -->
      <div class="text-center mb-16">
        <h3 class="text-2xl font-bold text-foreground mb-6">
          Aapki Zuban Mein - In Your Language
        </h3>

        <div class="flex flex-wrap items-center justify-center gap-6">
          <div
            class="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg"
          >
            <span class="text-lg">🇵🇰</span>
            <span class="font-semibold text-foreground">Urdu</span>
          </div>

          <div
            class="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg"
          >
            <span class="text-lg">🇬🇧</span>
            <span class="font-semibold text-foreground">English</span>
          </div>

          <div
            class="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg"
          >
            <span class="text-lg">🇮🇳</span>
            <span class="font-semibold text-foreground">Hindi</span>
            <span class="text-xs text-muted-foreground">(Coming Soon)</span>
          </div>

          <div
            class="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg"
          >
            <span class="text-lg">🇧🇩</span>
            <span class="font-semibold text-foreground">Bengali</span>
            <span class="text-xs text-muted-foreground">(Coming Soon)</span>
          </div>
        </div>
      </div>

      <!-- Community Testimonials -->
      <!-- 
      <div class="bg-gradient-to-r from-accent/5 to-secondary/10 rounded-2xl p-8 lg:p-12">
        <div class="text-center mb-8">
          <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Pakistani Families Trust ScamAlert
          </h3>
          <p class="text-muted-foreground">
            Real feedback from real families across Pakistan
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card class="p-6 bg-white">
            <div class="mb-4">
              <div class="flex items-center gap-1 mb-2">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <p class="text-sm text-muted-foreground italic">
                "Meri family ne ek fake investment scheme se bach gaye thanks to
                ScamAlert. Anonymous reporting se koi dar nahi tha."
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold text-primary">AF</span>
              </div>
              <div>
                <div class="font-semibold text-foreground">Ayesha F.</div>
                <div class="text-xs text-muted-foreground">Lahore</div>
              </div>
            </div>
          </Card>

          <Card class="p-6 bg-white">
            <div class="mb-4">
              <div class="flex items-center gap-1 mb-2">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <p class="text-sm text-muted-foreground italic">
                "Platform bilkul safe hai. Maine apna experience share kiya, ab
                doosre families protected hain. Bohat acha lagta hai."
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold text-primary">MK</span>
              </div>
              <div>
                <div class="font-semibold text-foreground">Muhammad K.</div>
                <div class="text-xs text-muted-foreground">Karachi</div>
              </div>
            </div>
          </Card>

          <Card class="p-6 bg-white">
            <div class="mb-4">
              <div class="flex items-center gap-1 mb-2">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <p class="text-sm text-muted-foreground italic">
                "Meri ammi ko phone pe scam karne ki koshish hui. ScamAlert 
                ki stories padh kar unhe samajh aa gaya. Alhamdulillah!"
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold text-primary">SS</span>
              </div>
              <div>
                <div class="font-semibold text-foreground">Sadia S.</div>
                <div class="text-xs text-muted-foreground">Islamabad</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      -->
    </div>
  </section>
</template>

<script setup lang="ts">
// Trust section highlighting Pakistani cultural values and security
</script>
