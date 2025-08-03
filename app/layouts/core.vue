<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header class="border-b border-border bg-card flex-shrink-0">
      <div class="mx-auto max-w-screen-lg px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <NuxtLink to="/" class="text-2xl font-bold text-primary">
              ScamAlert
            </NuxtLink>
          </div>
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink
              to="/scams"
              class="text-foreground hover:text-primary transition-colors"
            >
              Scams
            </NuxtLink>
            <NuxtLink
              to="/guide"
              class="text-foreground hover:text-primary transition-colors"
            >
              Guide
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-foreground hover:text-primary transition-colors"
            >
              About
            </NuxtLink>
            <div class="flex items-center space-x-2">
              <!-- Logged out state -->
              <NuxtLink
                to="/submit"
                class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Share Experience
              </NuxtLink>
              <!-- Logged in state -->
              <template v-if="isAuthenticated">
                <!-- User Menu Dropdown -->
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <button
                      class="p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Icon name="lucide:more-vertical" class="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Icon name="lucide:user" class="w-4 h-4 mr-2" />
                      {{ user?.username }}
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                      <NuxtLink to="/settings">
                        <Icon name="lucide:settings" class="w-4 h-4 mr-2" />
                        Settings
                      </NuxtLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="handleLogout">
                      <Icon name="lucide:log-out" class="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </template>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 mx-auto max-w-screen-lg px-4 w-full">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-card flex-shrink-0">
      <div class="mx-auto max-w-screen-lg px-4 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="text-center md:text-left">
            <p class="text-sm text-muted-foreground">
              &copy; 2024 ScamAlert. Stay safe, stay informed.
            </p>
          </div>

          <!-- Auth Links (only show when not authenticated) -->
          <div v-if="!isAuthenticated" class="flex items-center gap-4">
            <NuxtLink
              to="/login"
              class="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Sign in
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, logout } = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  await router.push("/");
};
</script>
