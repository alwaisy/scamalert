<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Platforms -->
    <Card>
      <CardHeader>
        <CardTitle class="text-lg">Platforms Used</CardTitle>
        <CardDescription> Where this scam was encountered </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="platform in platforms"
            :key="platform"
            variant="outline"
            class="text-sm"
          >
            {{ platform }}
          </Badge>
        </div>
      </CardContent>
    </Card>

    <!-- Locations -->
    <Card>
      <CardHeader>
        <CardTitle class="text-lg">Locations</CardTitle>
        <CardDescription> Where this scam occurred </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="location in locations"
            :key="location"
            variant="outline"
            class="text-sm"
          >
            📍 {{ location }}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
interface Props {
  platforms: string[];
  locations: string[];
}

defineProps<Props>();
</script>
