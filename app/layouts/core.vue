<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="border-b border-border bg-card">
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
              to="/about"
              class="text-foreground hover:text-primary transition-colors"
            >
              About
            </NuxtLink>
            <div class="flex items-center space-x-2">
              <!-- Logged out state -->
              <template v-if="!$auth.loggedIn">
                <NuxtLink
                  to="/api/login"
                  external
                  class="text-foreground hover:text-primary transition-colors text-sm"
                >
                  Sign in
                </NuxtLink>
                <NuxtLink
                  to="/api/register"
                  external
                  class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </NuxtLink>
              </template>

              <!-- Logged in state -->
              <template v-else>
                <NuxtLink
                  to="/submit"
                  class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Share Experience
                </NuxtLink>

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
                      {{ $auth.user?.email }}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon name="lucide:log-out" class="w-4 h-4 mr-2" />
                      <NuxtLink to="/api/logout" external class="w-full">
                        Sign out
                      </NuxtLink>
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
    <main class="mx-auto max-w-screen-lg px-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="mt-16 border-t border-border bg-card">
      <div class="mx-auto max-w-screen-lg px-4 py-6">
        <div class="text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ScamAlert. Stay safe, stay informed.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
