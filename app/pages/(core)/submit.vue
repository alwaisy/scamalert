<template>
  <div class="py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">
          Share Your Experience
        </h1>
        <p class="text-muted-foreground">
          Help others by sharing your scam encounter. Your story could save
          someone from falling victim.
        </p>
      </div>

      <!-- Submit Form -->
      <Card class="p-6">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Scam Type -->
          <div class="space-y-2">
            <label for="scamType" class="text-sm font-medium text-foreground">
              Scam Type *
            </label>
            <Select v-model="form.scamType" required>
              <SelectTrigger>
                <SelectValue placeholder="Select scam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phishing">Phishing</SelectItem>
                <SelectItem value="investment">Investment Scam</SelectItem>
                <SelectItem value="romance">Romance Scam</SelectItem>
                <SelectItem value="tech-support">Tech Support Scam</SelectItem>
                <SelectItem value="lottery">Lottery/Prize Scam</SelectItem>
                <SelectItem value="job">Job Scam</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Title -->
          <div class="space-y-2">
            <label for="title" class="text-sm font-medium text-foreground">
              Title *
            </label>
            <Input
              id="title"
              v-model="form.title"
              placeholder="Brief description of the scam"
              required
            />
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label
              for="description"
              class="text-sm font-medium text-foreground"
            >
              Your Experience *
            </label>
            <Textarea
              id="description"
              v-model="form.description"
              placeholder="Describe what happened, how you encountered the scam, and any red flags you noticed..."
              rows="6"
              required
            />
          </div>

          <!-- Contact Method -->
          <div class="space-y-2">
            <label
              for="contactMethod"
              class="text-sm font-medium text-foreground"
            >
              How did they contact you? *
            </label>
            <Select v-model="form.contactMethod" required>
              <SelectTrigger>
                <SelectValue placeholder="Select contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="sms">SMS/Text</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="in-person">In Person</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Financial Loss -->
          <div class="space-y-2">
            <label
              for="financialLoss"
              class="text-sm font-medium text-foreground"
            >
              Did you experience financial loss?
            </label>
            <Select v-model="form.financialLoss">
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="attempted"
                  >Attempted but prevented</SelectItem
                >
              </SelectContent>
            </Select>
          </div>

          <!-- Loss Amount (if applicable) -->
          <div v-if="form.financialLoss === 'yes'" class="space-y-2">
            <label for="lossAmount" class="text-sm font-medium text-foreground">
              Approximate loss amount
            </label>
            <Input
              id="lossAmount"
              v-model="form.lossAmount"
              type="number"
              placeholder="Enter amount"
              min="0"
            />
          </div>

          <!-- Date -->
          <div class="space-y-2">
            <label for="date" class="text-sm font-medium text-foreground">
              When did this happen? *
            </label>
            <Input id="date" v-model="form.date" type="date" required />
          </div>

          <!-- Location -->
          <div class="space-y-2">
            <label for="location" class="text-sm font-medium text-foreground">
              Location (City, Country)
            </label>
            <Input
              id="location"
              v-model="form.location"
              placeholder="e.g., New York, USA"
            />
          </div>

          <!-- Additional Tips -->
          <div class="space-y-2">
            <label for="tips" class="text-sm font-medium text-foreground">
              Tips for others (optional)
            </label>
            <Textarea
              id="tips"
              v-model="form.tips"
              placeholder="What advice would you give to others to avoid this scam?"
              rows="3"
            />
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <Button type="submit" :disabled="isSubmitting">
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Experience</span>
            </Button>
          </div>
        </form>
      </Card>

      <!-- Success Message -->
      <div v-if="showSuccess" class="mt-6">
        <Card class="p-4 bg-green-50 border-green-200">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <p class="text-green-800 font-medium">
              Thank you for sharing your experience! Your submission has been
              received and will help protect others.
            </p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "core",
  middleware: ["auth-logged-in"],
});

// Form data
const form = ref({
  scamType: "",
  title: "",
  description: "",
  contactMethod: "",
  financialLoss: "",
  lossAmount: "",
  date: "",
  location: "",
  tips: "",
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    form.value = {
      scamType: "",
      title: "",
      description: "",
      contactMethod: "",
      financialLoss: "",
      lossAmount: "",
      date: "",
      location: "",
      tips: "",
    };

    showSuccess.value = true;

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
