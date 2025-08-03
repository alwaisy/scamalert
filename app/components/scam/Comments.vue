<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-lg">Comments ({{ comments.length }})</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div
        v-if="comments.length === 0"
        class="text-center py-8 text-muted-foreground"
      >
        <Icon
          name="lucide:message-circle"
          class="w-8 h-8 mx-auto mb-2 opacity-50"
        />
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="border-b border-border pb-4 last:border-b-0"
        >
          <div class="flex items-start gap-3">
            <Avatar class="w-8 h-8">
              <AvatarFallback class="text-xs">
                {{ comment.author.username.charAt(0).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-medium text-sm">{{
                  comment.author.username
                }}</span>
                <span class="text-xs text-muted-foreground">• recently</span>
              </div>
              <p class="text-sm text-foreground">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Comment } from "~/lib/types";

interface Props {
  comments: Comment[];
}

defineProps<Props>();
</script>
