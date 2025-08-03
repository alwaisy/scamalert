<template>
  <div class="py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-foreground mb-2">Settings</h1>
      <p class="text-muted-foreground">Manage your account and posted scams</p>
    </div>

    <!-- User Info Card -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon name="lucide:user" class="w-5 h-5" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Username</p>
              <p class="text-foreground">{{ user?.username }}</p>
            </div>
            <Badge variant="outline">{{ user?.status }}</Badge>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Email</p>
            <p class="text-foreground">{{ user?.email }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- My Scams Section -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-foreground mb-1">My Scams</h2>
          <p class="text-muted-foreground">
            View and manage your posted scams. Scams are automatically approved
            when posted.
          </p>
        </div>
        <NuxtLink
          to="/submit"
          class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          Post New Scam
        </NuxtLink>
      </div>

      <!-- Statistics -->
      <SettingsUserStats
        :total-scams="pagination?.total || 0"
        :approved-count="approvedCount"
        :total-comments="totalComments"
        :total-upvotes="totalUpvotes"
      />

      <!-- Filters -->
      <SettingsScamFilters
        v-model:status-filter="statusFilter"
        v-model:sort-by="sortBy"
        v-model:sort-order="sortOrder"
      />

      <!-- Loading State -->
      <div v-if="pending" class="space-y-4">
        <Card v-for="i in 3" :key="i">
          <CardContent class="p-6">
            <div class="space-y-3">
              <Skeleton class="h-6 w-3/4" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Empty State -->
      <div v-else-if="!userScams.length" class="text-center py-12">
        <Icon
          name="lucide:file-text"
          class="w-12 h-12 text-muted-foreground mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-foreground mb-2">
          No scams posted yet
        </h3>
        <p class="text-muted-foreground mb-6">
          Start sharing your scam experiences to help others stay safe
        </p>
        <NuxtLink
          to="/submit"
          class="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium transition-colors"
        >
          Post Your First Scam
        </NuxtLink>
      </div>

      <!-- Scams List -->
      <div v-else class="space-y-4">
        <SettingsScamCard
          v-for="scam in userScams"
          :key="scam.id"
          :scam="scam"
          @view="viewScam"
          @delete="deleteScam"
        />
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination && pagination.totalPages > 1"
        class="flex justify-center"
      >
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="!pagination.hasPrev"
            @click="router.push(`/settings?page=${pagination.page - 1}`)"
          >
            Previous
          </Button>

          <span class="text-sm text-muted-foreground">
            Page {{ pagination.page }} of {{ pagination.totalPages }}
          </span>

          <Button
            variant="outline"
            size="sm"
            :disabled="!pagination.hasNext"
            @click="router.push(`/settings?page=${pagination.page + 1}`)"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "core",
  middleware: ["auth-logged-in"],
});

// Auth - user will be populated by useAuth hook
const { user } = useAuthStore();
const router = useRouter();

// Route query for pagination
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);

// Filter states
const statusFilter = ref("");
const sortBy = ref("createdAt");
const sortOrder = ref("desc");

// Fetch user's scams
const {
  data: scamsData,
  pending,
  refresh,
} = await useFetch("/api/scams/user", {
  query: computed(() => ({
    page: page.value,
    limit: 10,
    status: statusFilter.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  })),
});

// Computed properties
const userScams = computed(() => scamsData.value?.data || []);
const pagination = computed(() => scamsData.value?.pagination);

// Statistics
const approvedCount = computed(
  () => userScams.value.filter((scam) => scam.status === "approved").length
);

const totalComments = computed(() =>
  userScams.value.reduce((total, scam) => total + scam.commentsCount, 0)
);

const totalUpvotes = computed(() =>
  userScams.value.reduce((total, scam) => total + scam.upvotesCount, 0)
);

// Methods

const viewScam = (scamId: string) => {
  router.push(`/scams/${scamId}`);
};

const deleteScam = async (scamId: string) => {
  // Show confirmation dialog
  if (
    !confirm(
      "Are you sure you want to delete this scam? This action cannot be undone."
    )
  ) {
    return;
  }

  try {
    const { deleteScam: deleteScamFn } = useUserScams();
    const result = await deleteScamFn(scamId);

    if (result.success) {
      // Refresh the scams list
      await refresh();
      // Show success message
      console.log("Scam deleted successfully");
    } else {
      console.error("Failed to delete scam:", result.error);
    }
  } catch (error) {
    console.error("Error deleting scam:", error);
  }
};

// Watch for page changes
watch(page, () => {
  refresh();
});

// Watch for filter changes
watch([statusFilter, sortBy, sortOrder], () => {
  refresh();
});
</script>
