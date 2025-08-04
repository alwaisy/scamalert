<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
      <div class="mx-auto max-w-screen-lg px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
          About ScamAlert
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pakistan's first community-driven platform to protect families from
          scams
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="mx-auto max-w-screen-lg px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <!-- Mission -->
          <div>
            <h2 class="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p class="text-muted-foreground mb-4">
              Every day, Pakistani families lose money to scams. We created
              ScamAlert so people can share their experiences and protect
              each other.
            </p>
            <p class="text-muted-foreground mb-6">
              When one person shares their story, entire communities become
              safer.
            </p>
            <div class="flex items-center gap-4">
              <Badge variant="outline" class="text-primary">Anonymous</Badge>
              <Badge variant="outline" class="text-primary"
                >Community-Driven</Badge
              >
              <Badge variant="outline" class="text-primary">Real Stories</Badge>
            </div>
          </div>

          <!-- Visual -->
          <div
            class="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 text-center"
          >
            <Icon
              name="streamline-plump:leaf-protect-remix"
              class="w-24 h-24 mx-auto text-primary mb-4"
            />
            <h3 class="text-xl font-semibold text-foreground mb-2">
              Protecting Pakistani Families
            </h3>
            <p class="text-muted-foreground">One shared experience at a time</p>
          </div>
        </div>

        <!-- Community Section -->
        <div
          class="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center"
        >
          <h2 class="text-3xl font-bold text-foreground mb-6">
            Built by the Community
          </h2>
          <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
            ScamAlert is brought to you by <strong>r/PakStartups</strong>,
            Pakistan's largest Reddit community for entrepreneurs and
            innovators.
          </p>
          <div class="flex justify-center items-center gap-6 flex-wrap">
            <a
              href="https://reddit.com/r/PakStartups"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Icon name="lucide:message-circle" class="w-5 h-5" />
              Visit r/PakStartups
            </a>
            <div class="text-sm text-muted-foreground">
              <p><strong>15,000+</strong> Pakistani entrepreneurs</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "About ScamAlert - Protecting Pakistani Families from Fraud",
  meta: [
    {
      name: "description",
      content:
        "Learn about ScamAlert, Pakistan's first community-driven scam alert platform. Built by r/PakStartups to protect families from fraud.",
    },
  ],
});
</script>
