<template>
  <div>
    <!-- Evidence Images -->
    <div v-if="evidenceUrls && evidenceUrls.length > 0">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Evidence & Screenshots</CardTitle>
          <CardDescription>
            Images and evidence provided by the victim
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(url, index) in evidenceUrls"
              :key="index"
              class="relative group cursor-pointer"
              @click="openImageModal(url)"
            >
              <img
                :src="url"
                :alt="`Evidence ${index + 1}`"
                class="w-full h-48 object-cover rounded-lg border border-border hover:border-primary/50 transition-colors"
              />
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center"
              >
                <Icon
                  name="lucide:zoom-in"
                  class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- No Evidence Message -->
    <div v-else-if="evidenceUrls && evidenceUrls.length === 0">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Evidence & Screenshots</CardTitle>
          <CardDescription>
            No evidence images provided for this scam
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-center py-8 text-muted-foreground">
            <Icon
              name="lucide:image"
              class="w-12 h-12 mx-auto mb-4 opacity-50"
            />
            <p>No evidence images available</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Image Modal -->
    <Dialog v-model:open="imageModalOpen">
      <DialogContent class="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Evidence Image</DialogTitle>
        </DialogHeader>
        <div class="flex justify-center">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            alt="Evidence"
            class="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
interface Props {
  evidenceUrls: string[];
}

defineProps<Props>();

const imageModalOpen = ref(false);
const selectedImage = ref<string | null>(null);

const openImageModal = (imageUrl: string) => {
  selectedImage.value = imageUrl;
  imageModalOpen.value = true;
};
</script>
