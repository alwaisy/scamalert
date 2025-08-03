<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold">Help & Guide</h1>
        <p class="text-muted-foreground mt-2">
          Everything you need to know about ScamAlert
        </p>
      </div>

      <!-- What is ScamAlert -->
      <Card>
        <CardHeader>
          <CardTitle>What is ScamAlert?</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>
            ScamAlert is a community-driven platform that helps people identify
            and avoid scams. Users can share their experiences with scams,
            helping others stay informed and protected.
          </p>
          <p>
            Our mission is to create a safer online environment by building
            awareness and providing real-time information about various types of
            scams.
          </p>
        </CardContent>
      </Card>

      <!-- How to Use -->
      <Card>
        <CardHeader>
          <CardTitle>How to Use ScamAlert</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h3 class="font-semibold">Browse Scams</h3>
              <p class="text-sm text-muted-foreground">
                Explore reported scams to learn about different types of fraud
                and how to avoid them.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">Share Experience</h3>
              <p class="text-sm text-muted-foreground">
                Report scams you've encountered to help others stay informed and
                protected.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">Stay Updated</h3>
              <p class="text-sm text-muted-foreground">
                Get notified about new scams and stay ahead of emerging threats.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">Community Support</h3>
              <p class="text-sm text-muted-foreground">
                Connect with others who have faced similar situations and share
                advice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Account Registration -->
      <Card>
        <CardHeader>
          <CardTitle>Account Registration</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>
            To create an account and start sharing your experiences, you'll need
            to provide:
          </p>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Email Address:</strong> Must be from a supported email
              provider
            </li>
            <li><strong>Password:</strong> At least 6 characters long</li>
          </ul>

          <div class="bg-muted p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Supported Email Providers</h4>
            <p class="text-sm text-muted-foreground mb-3">
              For security reasons, we only accept emails from these trusted
              providers:
            </p>
            <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">Gmail (gmail.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">Outlook (outlook.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">Hotmail (hotmail.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">Yahoo (yahoo.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">ProtonMail (protonmail.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">Tutanota (tutanota.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">iCloud (icloud.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">AOL (aol.com)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm">Zoho (zoho.com)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Safety Tips -->
      <Card>
        <CardHeader>
          <CardTitle>Safety Tips</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h3 class="font-semibold">Never Share Personal Info</h3>
              <p class="text-sm text-muted-foreground">
                Be cautious about sharing personal information online,
                especially financial details.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">Verify Sources</h3>
              <p class="text-sm text-muted-foreground">
                Always verify the authenticity of emails, websites, and requests
                before responding.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">Use Strong Passwords</h3>
              <p class="text-sm text-muted-foreground">
                Create unique, strong passwords for each of your online
                accounts.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">Enable 2FA</h3>
              <p class="text-sm text-muted-foreground">
                Enable two-factor authentication wherever possible for added
                security.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Contact & Support -->
      <Card>
        <CardHeader>
          <CardTitle>Contact & Support</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>Need help or have questions? We're here to support you.</p>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h3 class="font-semibold">Report Issues</h3>
              <p class="text-sm text-muted-foreground">
                Found a bug or have a technical issue? Let us know so we can fix
                it.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">Feature Requests</h3>
              <p class="text-sm text-muted-foreground">
                Have ideas for new features? We'd love to hear your suggestions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Back to Action -->
      <div class="text-center space-y-4">
        <p class="text-muted-foreground">
          Ready to join our community and help others stay safe?
        </p>
        <div class="flex justify-center space-x-4">
          <NuxtLink
            to="/login"
            class="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Create Account
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="border border-border hover:bg-accent px-6 py-2 rounded-md font-medium transition-colors"
          >
            Sign In
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useHead({
  title: "Help & Guide - ScamAlert",
  meta: [
    {
      name: "description",
      content:
        "Learn about ScamAlert, supported email providers, and how to stay safe online.",
    },
  ],
});
</script>
