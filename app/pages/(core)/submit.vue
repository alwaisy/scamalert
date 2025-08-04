<template>
  <div class="py-6">
    <div class="max-w-2xl mx-auto">
      <!-- Enhanced Header -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4"
        >
          <Icon name="lucide:shield-alert" class="w-4 h-4 text-primary" />
          <span class="text-sm font-medium text-primary">Report Center</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Share Your Experience
        </h1>
        <p class="text-lg text-muted-foreground max-w-lg mx-auto">
          Help protect others by sharing your scam encounter. Your story could
          save someone from falling victim.
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-center space-x-4">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium"
            >
              1
            </div>
            <span class="text-sm font-medium">Details</span>
          </div>
          <div class="w-12 h-0.5 bg-border"></div>
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium"
            >
              2
            </div>
            <span class="text-sm text-muted-foreground">Evidence</span>
          </div>
          <div class="w-12 h-0.5 bg-border"></div>
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium"
            >
              3
            </div>
            <span class="text-sm text-muted-foreground">Submit</span>
          </div>
        </div>
      </div>

      <!-- Submit Form -->
      <Card class="overflow-hidden border-0 shadow-sm">
        <div
          class="bg-gradient-to-r from-orange-500/5 to-red-500/5 p-6 border-b"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center"
            >
              <Icon
                name="lucide:alert-triangle"
                class="w-5 h-5 text-orange-600"
              />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-foreground">
                Report Details
              </h2>
              <p class="text-sm text-muted-foreground">Tell us what happened</p>
            </div>
          </div>
        </div>

        <CardContent class="p-6">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Scam Type -->
            <div class="space-y-3">
              <label
                for="scamType"
                class="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Icon name="lucide:tag" class="w-4 h-4" />
                Scam Type *
              </label>
              <Select v-model="form.type" required>
                <SelectTrigger class="h-11">
                  <SelectValue placeholder="Select scam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile-banking"
                    >📱 Mobile Banking</SelectItem
                  >
                  <SelectItem value="job-scams">💼 Job Scams</SelectItem>
                  <SelectItem value="property">🏠 Property</SelectItem>
                  <SelectItem value="online-shopping"
                    >🛒 Online Shopping</SelectItem
                  >
                  <SelectItem value="investment">💰 Investment</SelectItem>
                  <SelectItem value="education">🎓 Education</SelectItem>
                  <SelectItem value="romance">💕 Romance</SelectItem>
                  <SelectItem value="other">🔧 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Title -->
            <div class="space-y-3">
              <label
                for="title"
                class="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Icon name="lucide:edit" class="w-4 h-4" />
                Title *
              </label>
              <Input
                id="title"
                v-model="form.title"
                placeholder="Brief description of the scam"
                class="h-11"
                required
              />
            </div>

            <!-- Description -->
            <div class="space-y-3">
              <label
                for="content"
                class="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Icon name="lucide:message-square" class="w-4 h-4" />
                Your Experience *
              </label>
              <Textarea
                id="content"
                v-model="form.content"
                placeholder="Describe what happened, how you encountered the scam, and any red flags you noticed..."
                class="min-h-[160px] resize-none"
                required
              />
              <p class="text-xs text-muted-foreground">
                Be as detailed as possible to help others recognize similar
                scams
              </p>
            </div>

            <!-- Platforms -->
            <div class="space-y-3">
              <label
                for="platforms"
                class="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Icon name="lucide:smartphone" class="w-4 h-4" />
                Platforms Used *
              </label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label
                  v-for="platform in availablePlatforms"
                  :key="platform"
                  class="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    :model-value="form.platforms.includes(platform)"
                    class="rounded"
                    @update:model-value="
                      (checked) => {
                        if (checked) {
                          if (!form.platforms.includes(platform)) {
                            form.platforms.push(platform);
                          }
                        } else {
                          form.platforms = form.platforms.filter(
                            (p) => p !== platform
                          );
                        }
                      }
                    "
                  />
                  <span class="text-sm font-medium">{{ platform }}</span>
                </label>
              </div>
            </div>

            <!-- Locations -->
            <div class="space-y-3">
              <label
                for="locations"
                class="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Icon name="lucide:map-pin" class="w-4 h-4" />
                Locations *
              </label>
              <div class="space-y-3">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label
                    v-for="location in availableLocations"
                    :key="location"
                    class="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      :model-value="form.locations.includes(location)"
                      class="rounded"
                      @update:model-value="
                        (checked) => {
                          if (checked) {
                            if (!form.locations.includes(location)) {
                              form.locations.push(location);
                            }
                          } else {
                            form.locations = form.locations.filter(
                              (l) => l !== location
                            );
                          }
                        }
                      "
                    />
                    <span class="text-sm font-medium">{{ location }}</span>
                  </label>
                </div>
                <Input
                  v-model="customLocation"
                  placeholder="Add custom location"
                  class="h-11"
                  @keyup.enter="addCustomLocation"
                />
              </div>
            </div>

            <!-- Options Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Anonymous Post -->
              <div class="space-y-3">
                <label
                  class="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <Icon name="lucide:eye-off" class="w-4 h-4" />
                  Privacy Options
                </label>
                <label
                  class="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <Checkbox v-model="form.isAnonymous" class="rounded" />
                  <span class="text-sm font-medium">Post anonymously</span>
                </label>
              </div>

              <!-- Amount Lost -->
              <div class="space-y-3">
                <label
                  for="amountLost"
                  class="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <Icon name="lucide:dollar-sign" class="w-4 h-4" />
                  Financial Impact
                </label>
                <div class="space-y-3">
                  <label
                    class="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox v-model="form.hasFinancialLoss" class="rounded" />
                    <span class="text-sm font-medium"
                      >I experienced financial loss</span
                    >
                  </label>
                  <Input
                    v-if="form.hasFinancialLoss"
                    id="amountLost"
                    v-model="form.amountLost"
                    type="number"
                    placeholder="Amount in PKR"
                    class="h-11"
                    min="0"
                    step="100"
                  />
                </div>
              </div>
            </div>

            <!-- Evidence Images -->
            <div class="space-y-3">
              <label
                class="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Icon name="lucide:image" class="w-4 h-4" />
                Evidence Images (optional)
              </label>
              <div class="space-y-4">
                <!-- Image Upload Area -->
                <div
                  class="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    class="hidden"
                    @change="handleFileSelect"
                  />
                  <div class="space-y-3">
                    <div
                      class="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center"
                    >
                      <Icon
                        name="lucide:upload"
                        class="w-6 h-6 text-muted-foreground"
                      />
                    </div>
                    <div class="text-muted-foreground">
                      <p class="font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p class="text-sm">PNG, JPG, GIF, WebP up to 5MB each</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      class="gap-2"
                      @click="fileInput?.click()"
                    >
                      <Icon name="lucide:plus" class="w-4 h-4" />
                      Select Images
                    </Button>
                  </div>
                </div>

                <!-- Uploaded Images Preview -->
                <div v-if="uploadedImages.length > 0" class="space-y-3">
                  <h4 class="text-sm font-medium flex items-center gap-2">
                    <Icon
                      name="lucide:check-circle"
                      class="w-4 h-4 text-green-600"
                    />
                    Uploaded Images ({{ uploadedImages.length }})
                  </h4>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div
                      v-for="(image, index) in uploadedImages"
                      :key="index"
                      class="relative group"
                    >
                      <img
                        :src="image.url"
                        :alt="image.fileName"
                        class="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        @click="removeImage(index)"
                      >
                        <Icon name="lucide:x" class="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <!-- Upload Progress -->
                <div
                  v-if="isUploading"
                  class="flex items-center justify-center gap-3 py-4"
                >
                  <div
                    class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"
                  ></div>
                  <span class="text-sm text-muted-foreground"
                    >Uploading images...</span
                  >
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-6">
              <Button
                type="submit"
                :disabled="isSubmitting"
                class="w-full h-12 gap-2"
              >
                <Icon
                  v-if="isSubmitting"
                  name="lucide:loader-2"
                  class="w-4 h-4 animate-spin"
                />
                <Icon v-else name="lucide:send" class="w-4 h-4" />
                <span v-if="isSubmitting">Submitting...</span>
                <span v-else>Submit Experience</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <!-- Success Message with Confetti -->
      <div v-if="showSuccess" class="mt-6">
        <!-- Confetti Component -->
        <Confetti
          :options="{
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          }"
          class="fixed inset-0 pointer-events-none z-50"
        />

        <Card class="overflow-hidden border-0 shadow-sm">
          <div class="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6">
            <div class="text-center space-y-4">
              <div
                class="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <Icon name="lucide:check" class="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-foreground mb-2">
                  {{ successMessage }}
                </h3>
                <p class="text-muted-foreground">
                  Your experience has been successfully shared and is now live!
                </p>
              </div>

              <div class="flex flex-col sm:flex-row justify-center gap-3">
                <Button class="gap-2" @click="viewScamDetails">
                  <Icon name="lucide:eye" class="w-4 h-4" />
                  View My Experience
                </Button>
                <Button variant="outline" class="gap-2" @click="submitAnother">
                  <Icon name="lucide:plus" class="w-4 h-4" />
                  Submit Another
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-6">
        <Card class="border-destructive/20 bg-destructive/5">
          <CardContent class="p-4">
            <div class="flex items-center gap-3">
              <Icon
                name="lucide:alert-circle"
                class="w-5 h-5 text-destructive"
              />
              <p class="text-destructive font-medium">{{ error }}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SCAM_MESSAGES } from "~/config/messages";
import type { ApiError } from "~/lib/types";

// Confetti component is auto-imported from ~/components/ui/confetti

definePageMeta({
  layout: "core",
  middleware: ["auth-logged-in"],
});

// SEO Meta tags
useHead({
  title: "Share Your Experience - ScamAlert Pakistan",
  meta: [
    {
      name: "description",
      content:
        "Share your scam experience to help others stay safe. Report scams, fraud, and deceptive practices in Pakistan.",
    },
    {
      name: "keywords",
      content:
        "scam report, fraud alert, Pakistan scams, online safety, scam prevention, fraud reporting",
    },
    {
      property: "og:title",
      content: "Share Your Experience - ScamAlert Pakistan",
    },
    {
      property: "og:description",
      content:
        "Share your scam experience to help others stay safe. Report scams, fraud, and deceptive practices in Pakistan.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Share Your Experience - ScamAlert Pakistan",
    },
    {
      name: "twitter:description",
      content:
        "Share your scam experience to help others stay safe. Report scams, fraud, and deceptive practices in Pakistan.",
    },
  ],
});

// Image upload composable
const { uploadMultipleFiles } = useImageUpload();

// Form data
const form = ref({
  type: "",
  title: "",
  content: "",
  platforms: [] as string[],
  locations: [] as string[],
  isAnonymous: false,
  hasFinancialLoss: false,
  amountLost: 0,
});

const customLocation = ref("");
const isSubmitting = ref(false);
const showSuccess = ref(false);
const successMessage = ref("");
const error = ref("");
const createdScamId = ref<string | null>(null);
const router = useRouter();

// Image upload state
const fileInput = ref<HTMLInputElement | null>(null);
const uploadedImages = ref<
  { url: string; fileName: string; fileId?: string }[]
>([]);
const isUploading = ref(false);

// Available options
const availablePlatforms = [
  "WhatsApp",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Email",
  "SMS",
  "Phone Call",
  "Website",
  "OLX",
  "Daraz",
  "JazzCash",
  "EasyPaisa",
  "Other",
];

const availableLocations = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  "Online",
  "Other",
];

// Add custom location
const addCustomLocation = () => {
  if (
    customLocation.value.trim() &&
    !form.value.locations.includes(customLocation.value.trim())
  ) {
    form.value.locations.push(customLocation.value.trim());
    customLocation.value = "";
  }
};

// Handle file selection and upload
const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    isUploading.value = true;

    try {
      const files = Array.from(target.files);
      const uploadResults = await uploadMultipleFiles(files);

      // Add uploaded images to the list
      uploadResults.forEach((result) => {
        uploadedImages.value.push({
          url: result.url,
          fileName: result.fileName,
          fileId: result.fileId,
        });
      });
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      const apiError = err as ApiError;
      error.value =
        apiError.data?.message ||
        apiError.statusMessage ||
        apiError.message ||
        SCAM_MESSAGES.UPLOAD_FAILED;
    } finally {
      isUploading.value = false;
      // Clear the file input
      if (target) {
        target.value = "";
      }
    }
  }
};

const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1);
};

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;
  error.value = "";
  showSuccess.value = false;

  try {
    // Validate required fields
    if (!form.value.type) {
      throw new Error(SCAM_MESSAGES.VALIDATION_ERRORS.TYPE_REQUIRED);
    }
    if (!form.value.title.trim()) {
      throw new Error(SCAM_MESSAGES.VALIDATION_ERRORS.TITLE_REQUIRED);
    }
    if (!form.value.content.trim()) {
      throw new Error(SCAM_MESSAGES.VALIDATION_ERRORS.CONTENT_REQUIRED);
    }

    console.log("Platforms array:", form.value.platforms);
    console.log("Platforms length:", form.value.platforms.length);

    if (form.value.platforms.length === 0) {
      throw new Error(SCAM_MESSAGES.VALIDATION_ERRORS.PLATFORMS_REQUIRED);
    }
    if (form.value.locations.length === 0) {
      throw new Error(SCAM_MESSAGES.VALIDATION_ERRORS.LOCATIONS_REQUIRED);
    }

    // Prepare evidence URLs from uploaded images
    const evidenceUrls = uploadedImages.value.map((image) => image.url);

    // Submit to API
    const response = await $fetch("/api/scams", {
      method: "POST",
      body: {
        title: form.value.title.trim(),
        content: form.value.content.trim(),
        type: form.value.type,
        platforms: form.value.platforms,
        locations: form.value.locations,
        isAnonymous: form.value.isAnonymous,
        evidenceUrls: evidenceUrls,
        hasFinancialLoss: form.value.hasFinancialLoss,
        amountLost: form.value.amountLost,
      },
    });

    if (response.success) {
      // Store the created scam ID for navigation
      createdScamId.value = response.data.scamId;

      // Reset form
      form.value = {
        type: "",
        title: "",
        content: "",
        platforms: [],
        locations: [],
        isAnonymous: false,
        hasFinancialLoss: false,
        amountLost: 0,
      };
      uploadedImages.value = []; // Clear uploaded images on success

      showSuccess.value = true;
      successMessage.value = SCAM_MESSAGES.SUBMISSION_SUCCESS;

      // Auto-redirect to scam details after 3 seconds
      setTimeout(() => {
        if (createdScamId.value) {
          router.push(`/scams/${createdScamId.value}`);
        }
      }, 3000);
    }
  } catch (err: unknown) {
    console.error("Error submitting form:", err);
    const apiError = err as ApiError;
    error.value =
      apiError.data?.message ||
      apiError.statusMessage ||
      apiError.message ||
      SCAM_MESSAGES.SUBMISSION_FAILED;
  } finally {
    isSubmitting.value = false;
  }
};

// Navigation methods
const viewScamDetails = () => {
  if (createdScamId.value) {
    router.push(`/scams/${createdScamId.value}`);
  }
};

const submitAnother = () => {
  showSuccess.value = false;
  createdScamId.value = null;
  // Form is already reset, so user can submit another
};
</script>
