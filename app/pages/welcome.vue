<template>
  <div class="mx-auto py-8">
    <div class="space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="flex items-center justify-center gap-2 mb-4">
          <div
            class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md"
          >
            <Shield class="size-5" />
          </div>
          <h1 class="text-3xl font-bold">Welcome to ScamAlert!</h1>
        </div>
        <p class="text-muted-foreground text-lg">
          Your account has been created successfully. Let's get you started!
        </p>
      </div>

      <!-- What is ScamAlert -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Shield class="size-5" />
            What is ScamAlert?
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>
            ScamAlert is a community-driven platform dedicated to protecting
            people from scams and fraud. Our mission is to create a safer online
            environment by sharing real experiences and building awareness.
          </p>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h3 class="font-semibold">🤝 Community First</h3>
              <p class="text-sm text-muted-foreground">
                Share your experiences to help others avoid similar scams. Every
                report makes the community stronger.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">🔍 Stay Informed</h3>
              <p class="text-sm text-muted-foreground">
                Discover new scam patterns and learn how to protect yourself
                from emerging threats.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">🛡️ Real Protection</h3>
              <p class="text-sm text-muted-foreground">
                Get alerts about scams in your area and stay ahead of
                fraudsters.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold">📊 Data-Driven</h3>
              <p class="text-sm text-muted-foreground">
                Our platform analyzes patterns to identify and prevent new types
                of scams.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- What You Can Do -->
      <Card>
        <CardHeader>
          <CardTitle>What You Can Do</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="bg-primary/10 text-primary p-2 rounded-md">
                  <Search class="size-4" />
                </div>
                <div>
                  <h3 class="font-semibold">Browse Scams</h3>
                  <p class="text-sm text-muted-foreground">
                    Explore reported scams to learn about different types of
                    fraud and how to avoid them.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="bg-primary/10 text-primary p-2 rounded-md">
                  <MessageSquare class="size-4" />
                </div>
                <div>
                  <h3 class="font-semibold">Share Experiences</h3>
                  <p class="text-sm text-muted-foreground">
                    Report scams you've encountered to help others stay informed
                    and protected.
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="bg-primary/10 text-primary p-2 rounded-md">
                  <Bell class="size-4" />
                </div>
                <div>
                  <h3 class="font-semibold">Get Alerts</h3>
                  <p class="text-sm text-muted-foreground">
                    Receive notifications about new scams and stay ahead of
                    emerging threats.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="bg-primary/10 text-primary p-2 rounded-md">
                  <Users class="size-4" />
                </div>
                <div>
                  <h3 class="font-semibold">Connect</h3>
                  <p class="text-sm text-muted-foreground">
                    Connect with others who have faced similar situations and
                    share advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Community Guidelines -->
      <Card>
        <CardHeader>
          <CardTitle>Community Guidelines & Rules</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-muted-foreground">
            To maintain a safe and helpful community, please follow these
            guidelines when posting:
          </p>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-3">
              <h3 class="font-semibold text-green-600">✅ What to Post</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <CheckCircle
                    class="size-4 text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Real scam experiences you've encountered</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckCircle
                    class="size-4 text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Detailed descriptions of scam methods</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckCircle
                    class="size-4 text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Warning signs and red flags to watch for</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckCircle
                    class="size-4 text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Tips on how to protect yourself</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckCircle
                    class="size-4 text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Questions about suspicious activities</span>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <h3 class="font-semibold text-red-600">❌ What Not to Post</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <XCircle class="size-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Personal information of scammers</span>
                </li>
                <li class="flex items-start gap-2">
                  <XCircle class="size-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Revenge or harassment content</span>
                </li>
                <li class="flex items-start gap-2">
                  <XCircle class="size-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Spam or promotional content</span>
                </li>
                <li class="flex items-start gap-2">
                  <XCircle class="size-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>False or misleading information</span>
                </li>
                <li class="flex items-start gap-2">
                  <XCircle class="size-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Content that promotes scams</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <h4 class="font-semibold mb-2">🚨 Important Reminders</h4>
            <ul class="space-y-1 text-sm text-muted-foreground">
              <li>• Never share personal financial information</li>
              <li>• Report scams to authorities when appropriate</li>
              <li>• Be respectful and supportive of other community members</li>
              <li>• Help verify information before sharing</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <!-- Next Steps -->
      <Card>
        <CardHeader>
          <CardTitle>Ready to Get Started?</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-muted-foreground">
            Now that you're part of our community, here are your next steps:
          </p>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="text-center space-y-2">
              <div
                class="bg-primary/10 text-primary p-3 rounded-full w-fit mx-auto"
              >
                <Search class="size-6" />
              </div>
              <h3 class="font-semibold">1. Explore Scams</h3>
              <p class="text-sm text-muted-foreground">
                Browse existing reports to understand different scam types
              </p>
            </div>
            <div class="text-center space-y-2">
              <div
                class="bg-primary/10 text-primary p-3 rounded-full w-fit mx-auto"
              >
                <MessageSquare class="size-6" />
              </div>
              <h3 class="font-semibold">2. Share Experience</h3>
              <p class="text-sm text-muted-foreground">
                Report any scams you've encountered to help others
              </p>
            </div>
            <div class="text-center space-y-2">
              <div
                class="bg-primary/10 text-primary p-3 rounded-full w-fit mx-auto"
              >
                <Settings class="size-6" />
              </div>
              <h3 class="font-semibold">3. Set Preferences</h3>
              <p class="text-sm text-muted-foreground">
                Configure your account and notification settings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="text-center space-y-4">
        <div class="flex justify-center gap-4">
          <NuxtLink
            to="/scams"
            class="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Browse Scams
          </NuxtLink>
          <NuxtLink
            to="/submit"
            class="border border-border hover:bg-accent px-6 py-3 rounded-md font-medium transition-colors"
          >
            Share Experience
          </NuxtLink>
        </div>
        <p class="text-sm text-muted-foreground">
          Need help? Check out our
          <NuxtLink to="/guide" class="text-primary hover:underline"
            >guide</NuxtLink
          >
          for more information.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Bell,
  CheckCircle,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Users,
  XCircle,
} from "lucide-vue-next";

definePageMeta({
  layout: "core",
  // Remove auth middleware - allow access to welcome page
});

useHead({
  title: "Welcome - ScamAlert",
  meta: [
    {
      name: "description",
      content:
        "Welcome to ScamAlert! Learn about our platform, community guidelines, and how to get started.",
    },
  ],
});
</script>
