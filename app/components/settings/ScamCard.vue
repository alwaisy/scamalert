<template>
  <Card class="hover:shadow-md transition-shadow">
    <CardContent class="p-6">
      <div class="flex items-start justify-between">
        <div class="flex-1 space-y-3">
          <div class="flex items-center gap-3">
            <h3 class="text-lg font-semibold text-foreground">
              {{ scam.title }}
            </h3>
            <Badge :variant="getStatusVariant(scam.status)" class="text-xs">
              {{ scam.status }}
            </Badge>
          </div>

          <p class="text-muted-foreground line-clamp-2">
            {{ scam.content }}
          </p>

          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <span class="flex items-center gap-1">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              {{ formatDate(scam.createdAt) }}
            </span>
            <!-- Upvotes Count - DISABLED FOR MVP -->
            <!-- <span class="flex items-center gap-1">
              <Icon name="lucide:thumbs-up" class="w-4 h-4" />
              {{ scam.upvotesCount }} upvotes
            </span> -->
            <!-- Comments Count - DISABLED FOR MVP -->
            <!-- <span class="flex items-center gap-1">
              <Icon name="lucide:message-circle" class="w-4 h-4" />
              {{ scam.commentsCount }} comments
            </span> -->
          </div>

          <div class="flex flex-wrap gap-2">
            <Badge variant="outline" class="text-xs">
              {{ scam.type }}
            </Badge>
            <Badge
              v-for="platform in scam.platforms.slice(0, 3)"
              :key="platform"
              variant="secondary"
              class="text-xs"
            >
              {{ platform }}
            </Badge>
            <Badge
              v-if="scam.platforms.length > 3"
              variant="secondary"
              class="text-xs"
            >
              +{{ scam.platforms.length - 3 }} more
            </Badge>
          </div>
        </div>

        <!-- Actions Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm">
              <Icon name="lucide:more-horizontal" class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="viewScam">
              <Icon name="lucide:eye" class="w-4 h-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="text-destructive focus:text-destructive"
              @click="deleteScam"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { ScamListItem } from "~/lib/types";

interface Props {
  scam: ScamListItem;
}

interface Emits {
  (e: "view" | "delete", scamId: string): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

// Methods
const getStatusVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Unknown date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
};

const viewScam = () => {
  emit("view", props.scam.scamId);
};

const deleteScam = () => {
  emit("delete", props.scam.scamId);
};
</script>
