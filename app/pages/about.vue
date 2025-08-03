<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
      <div class="mx-auto max-w-screen-lg px-4">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About ScamAlert.pk
          </h1>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pakistan's first community-driven platform dedicated to protecting
            families from scams and fraud
          </p>
        </div>
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
              Every day, Pakistani families lose money to sophisticated scams.
              From fake investment schemes to online shopping frauds, these
              criminals target our most vulnerable communities.
            </p>
            <p class="text-muted-foreground mb-4">
              ScamAlert.pk was created to break this cycle. We believe that when
              people share their experiences, entire communities become safer.
            </p>
            <div class="flex items-center gap-4 mt-6">
              <Badge variant="outline" class="text-primary">
                Community-Driven
              </Badge>
              <Badge variant="outline" class="text-primary">
                Anonymous Reporting
              </Badge>
              <Badge variant="outline" class="text-primary">
                Real Stories
              </Badge>
            </div>
          </div>

          <!-- Visual Element -->
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

        <!-- How It Works -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-foreground text-center mb-12">
            How It Works
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card class="text-center p-6">
              <CardHeader>
                <div
                  class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Icon
                    name="lucide:message-square-plus"
                    class="w-8 h-8 text-primary"
                  />
                </div>
                <CardTitle>Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-muted-foreground">
                  Report scams you've encountered to warn others in the
                  community
                </p>
              </CardContent>
            </Card>

            <Card class="text-center p-6">
              <CardHeader>
                <div
                  class="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Icon name="lucide:users" class="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Community Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-muted-foreground">
                  Other users verify and add evidence to build trust
                </p>
              </CardContent>
            </Card>

            <Card class="text-center p-6">
              <CardHeader>
                <div
                  class="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Icon
                    name="lucide:shield-check"
                    class="w-8 h-8 text-secondary"
                  />
                </div>
                <CardTitle>Stay Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-muted-foreground">
                  Browse reports to avoid falling victim to known scams
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Community -->
        <div
          class="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 mb-16"
        >
          <div class="text-center">
            <h2 class="text-3xl font-bold text-foreground mb-6">
              Built by the Community
            </h2>
            <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
              ScamAlert.pk is proudly brought to you by
              <strong>r/PakStartups</strong>, Pakistan's largest Reddit
              community for entrepreneurs and innovators.
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
                <p>Building solutions for Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Values -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex gap-4">
              <div
                class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Icon name="lucide:eye-off" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-foreground mb-2">
                  Privacy First
                </h3>
                <p class="text-muted-foreground">
                  All reports are anonymous. We never collect personal
                  information that could identify victims.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Icon name="lucide:check-circle" class="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-foreground mb-2">
                  Verified Content
                </h3>
                <p class="text-muted-foreground">
                  Community verification ensures only legitimate scam reports
                  reach our platform.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Icon name="lucide:heart" class="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-foreground mb-2">
                  Family Focus
                </h3>
                <p class="text-muted-foreground">
                  Everything we do is designed to protect Pakistani families
                  from financial fraud.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Icon name="lucide:zap" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-foreground mb-2">
                  Fast Alerts
                </h3>
                <p class="text-muted-foreground">
                  Real-time sharing means the community gets warned about new
                  scams immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="text-center bg-card border rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p class="text-muted-foreground mb-6">
            Have questions, suggestions, or want to contribute to the platform?
          </p>
          <div class="flex justify-center gap-4 flex-wrap">
            <a
              href="mailto:contact@scamalert.pk"
              class="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Icon name="lucide:mail" class="w-5 h-5" />
              Contact Us
            </a>
            <a
              href="https://reddit.com/r/PakStartups"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 border border-border hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Icon name="lucide:message-circle" class="w-5 h-5" />
              Join Community
            </a>
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

// SEO for about page
useHead({
  title: "About ScamAlert.pk - Protecting Pakistani Families from Fraud",
  meta: [
    {
      name: "description",
      content:
        "Learn about ScamAlert.pk, Pakistan's first community-driven scam alert platform. Built by r/PakStartups to protect families from fraud.",
    },
    {
      property: "og:title",
      content: "About ScamAlert.pk - Community-Driven Fraud Protection",
    },
    {
      property: "og:description",
      content:
        "Discover how Pakistani entrepreneurs from r/PakStartups created a platform to protect families from scams through community sharing.",
    },
  ],
});
</script>
