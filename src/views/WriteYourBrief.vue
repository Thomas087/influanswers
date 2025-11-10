<template>
  <div class="brief-page">
    <Toast />

    <!-- Fixed top header with breadcrumbs and close button -->
    <div class="fixed-top-header">
      <div class="top-header-content">
        <nav class="breadcrumbs">
          <button class="breadcrumb-item" @click="router.push('/')">Home</button>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item breadcrumb-item--current">
            {{ currentStep?.label || 'Write your brief' }}
          </span>
        </nav>
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="secondary"
          class="close-button"
          @click="router.push('/')"
          aria-label="Close and return to home"
        />
      </div>
    </div>

    <div class="page-shell">
      <header>
        <div class="header-content">
          <p class="page-eyebrow">Influencer research brief</p>
          <h1 class="page-title">Write your brief</h1>
          <p class="page-subtitle">
            Follow the guided steps to frame your research, select who you want to hear from, and
            send it to the Influanswers team.
          </p>
        </div>
        <!-- <div class="header-aside">
          <div class="support-card">
            <h2>Need a hand?</h2>
            <p>
              Our strategists can review your brief before it goes out. Send us a message and we’ll
              reply within a few hours.
            </p>
            <Button label="Chat with us" severity="secondary" outlined icon="pi pi-comment" />
          </div>
        </div> -->
      </header>

      <section class="stepper-section">
        <Stepper v-model:value="activeStep" linear>
          <StepList>
            <Step v-for="step in steps" :key="step.value" :value="step.value">
              {{ step.label }}
            </Step>
          </StepList>

          <StepPanels>
            <StepPanel v-for="step in steps" :key="step.value" :value="step.value">
              <WriteBriefStep v-if="step.value === 1" />
              <QuestionsStep v-else-if="step.value === 2" />
              <SelectInfluencersStep v-else-if="step.value === 3" />
              <ConfirmStep v-else-if="step.value === 4">
                <template #actions>
                  <div class="logistics-actions">
                    <p>{{ step.slot }}</p>
                  </div>
                </template>
              </ConfirmStep>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </section>
    </div>

    <!-- Fixed bottom action bar -->
    <div v-if="currentStep" class="fixed-bottom-bar">
      <div class="bottom-bar-content">
        <Button
          v-if="currentStep.showBack"
          label="Back"
          icon="pi pi-arrow-left"
          severity="secondary"
          outlined
          @click="prevStep"
        />
        <div v-else class="bottom-bar-spacer"></div>
        <template v-if="currentStep.value === 1 && currentStep.showNextButton">
          <!-- Show both buttons when other steps have content -->
          <div class="bottom-bar-buttons">
            <Button
              :label="isProcessingChatGPT ? currentLoadingMessage : currentStep.nextLabel"
              :icon="currentStep.nextIcon"
              :icon-pos="currentStep.nextIconPos"
              severity="secondary"
              outlined
              :loading="isProcessingChatGPT"
              :disabled="(currentStep.isDisabled?.() ?? false) || isProcessingChatGPT"
              @click="
                async () => {
                  try {
                    await handleChatGPTRequest()
                    if (activeStep < steps.length) activeStep++
                  } catch (error) {
                    // Error already handled in handleChatGPTRequest
                  }
                }
              "
            />
            <Button
              label="Continue"
              icon="pi pi-arrow-right"
              icon-pos="right"
              :disabled="currentStep.isDisabled?.() ?? false"
              @click="
                () => {
                  if (activeStep < steps.length) activeStep++
                }
              "
            />
          </div>
        </template>
        <Button
          v-else
          :label="
            currentStep.value === 1 && isProcessingChatGPT
              ? currentLoadingMessage
              : currentStep.nextLabel
          "
          :icon="currentStep.nextIcon"
          :icon-pos="currentStep.nextIconPos"
          :severity="currentStep.nextSeverity"
          :loading="
            (currentStep.isSubmit && isSubmitting) ||
            (currentStep.value === 1 && isProcessingChatGPT)
          "
          :disabled="
            (currentStep.isDisabled?.() ?? false) ||
            (currentStep.isSubmit && isSubmitting) ||
            (currentStep.value === 1 && isProcessingChatGPT)
          "
          @click="() => (currentStep?.isSubmit ? submitBrief() : nextStep())"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import ConfirmStep from '@/components/brief/ConfirmStep.vue'
import QuestionsStep from '@/components/brief/QuestionsStep.vue'
import SelectInfluencersStep from '@/components/brief/SelectInfluencersStep.vue'
import WriteBriefStep from '@/components/brief/WriteBriefStep.vue'
import { useBriefStore } from '@/stores/brief'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const activeStep = ref(1)
const isSubmitting = ref(false)
const isProcessingChatGPT = ref(false)
const toast = useToast()
const briefStore = useBriefStore()

// Rotating loading messages
const loadingMessages = [
  'Analyzing instructions',
  'Generating questions',
  'Defining influencer selection',
  'Finalizing brief',
]
const currentLoadingMessageIndex = ref(0)
const loadingMessageInterval = ref<number | null>(null)

const currentLoadingMessage = computed(() => loadingMessages[currentLoadingMessageIndex.value])

// Get current step based on activeStep
const currentStep = computed(
  () => steps.value.find((step) => step.value === activeStep.value) || steps.value[0],
)

// Watch for loading state changes to start/stop message rotation
watch(isProcessingChatGPT, (isLoading) => {
  if (isLoading) {
    // Start rotating messages every 10 seconds (don't loop, stop at last message)
    currentLoadingMessageIndex.value = 0
    loadingMessageInterval.value = window.setInterval(() => {
      if (currentLoadingMessageIndex.value < loadingMessages.length - 1) {
        currentLoadingMessageIndex.value++
      } else {
        // Stop at the last message
        if (loadingMessageInterval.value !== null) {
          clearInterval(loadingMessageInterval.value)
          loadingMessageInterval.value = null
        }
      }
    }, 7000)
  } else {
    // Stop rotating messages
    if (loadingMessageInterval.value !== null) {
      clearInterval(loadingMessageInterval.value)
      loadingMessageInterval.value = null
    }
    currentLoadingMessageIndex.value = 0
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (loadingMessageInterval.value !== null) {
    clearInterval(loadingMessageInterval.value)
  }
})

// Check if other steps have content
const hasOtherStepsContent = computed(() => {
  // Check if questions step has content (any non-empty questions)
  const hasQuestions = briefStore.questions?.some((q) => q?.trim().length > 0) ?? false

  // Check if influencer step has content (additionalNotes or any selection data)
  const hasInfluencerDescription =
    briefStore.selection.additionalNotes?.trim().length > 0 ||
    briefStore.selection.platforms.length > 0 ||
    briefStore.selection.categories.length > 0 ||
    briefStore.selection.regions.length > 0 ||
    briefStore.selection.audienceSize.length > 0 ||
    briefStore.selection.gender.length > 0 ||
    briefStore.selection.contentFormat.length > 0 ||
    briefStore.selection.previousCollaborations.length > 0

  return hasQuestions || hasInfluencerDescription
})

const steps = computed(() => [
  {
    value: 1,
    label: 'Write your brief',
    showBack: false,
    nextLabel: hasOtherStepsContent.value ? 'Generate a new brief' : 'Generate a brief',
    nextIcon: 'pi pi-arrow-right',
    nextIconPos: 'right',
    nextSeverity: undefined,
    isSubmit: false,
    isDisabled: () => !briefStore.isBriefValid,
    showNextButton: hasOtherStepsContent.value, // Show secondary "Next" button if other steps have content
  },
  {
    value: 2,
    label: 'Specify your questions',
    showBack: true,
    nextLabel: 'Continue',
    nextIcon: 'pi pi-arrow-right',
    nextIconPos: 'right',
    nextSeverity: undefined,
    isSubmit: false,
    isDisabled: () => !briefStore.isQuestionsValid,
  },
  {
    value: 3,
    label: 'Select your influencers',
    showBack: true,
    nextLabel: 'Continue',
    nextIcon: 'pi pi-arrow-right',
    nextIconPos: 'right',
    nextSeverity: undefined,
    isSubmit: false,
    isDisabled: () => !briefStore.isSelectionValid,
  },
  {
    value: 4,
    label: 'Confirm',
    slot: 'Once you submit, our team will validate the audience, finalize pricing, and share a proposal.',
    showBack: true,
    nextLabel: 'Submit brief',
    nextIcon: 'pi pi-check',
    nextIconPos: undefined,
    nextSeverity: 'success',
    isSubmit: true,
    isDisabled: () => !briefStore.canSubmit,
  },
])

const nextStep = async () => {
  console.log('nextStep called, current step:', activeStep.value)

  // If moving from step 1 to step 2, call ChatGPT API first
  if (activeStep.value === 1 && briefStore.brief.brandBrief.trim()) {
    try {
      console.log('Calling ChatGPT API...')
      await handleChatGPTRequest()
      // Only advance if ChatGPT call succeeds
      if (activeStep.value < steps.value.length) {
        console.log('Advancing to step:', activeStep.value + 1)
        activeStep.value++
      }
    } catch (error) {
      console.error('Error in nextStep:', error)
      // Don't advance if ChatGPT call fails - error is already shown in handleChatGPTRequest
      return
    }
  } else {
    // For other steps, advance normally
    if (activeStep.value < steps.value.length) {
      console.log('Advancing to step:', activeStep.value + 1)
      activeStep.value++
    }
  }
}

const handleChatGPTRequest = async () => {
  if (isProcessingChatGPT.value) {
    throw new Error('ChatGPT request already in progress')
  }

  isProcessingChatGPT.value = true

  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('chatgpt-brief', {
      body: {
        brandSummary: briefStore.brief.brandBrief,
      },
    })

    if (error) {
      throw error
    }

    if (data?.success && data?.data) {
      const briefData = data.data

      // Populate brief details
      if (briefData.brief) {
        if (briefData.brief.projectName) {
          briefStore.updateField('projectName', briefData.brief.projectName)
        }
        if (briefData.brief.brandBrief) {
          briefStore.updateField('brandBrief', briefData.brief.brandBrief)
        }
        if (briefData.brief.briefSummary) {
          briefStore.updateField('briefSummary', briefData.brief.briefSummary)
        }
        if (Array.isArray(briefData.brief.questions) && briefData.brief.questions.length > 0) {
          // Ensure we have at least 3 question slots
          const questions = [...briefData.brief.questions]
          while (questions.length < 3) {
            questions.push('')
          }
          // Update each question
          questions.forEach((question, index) => {
            briefStore.updateQuestion(index, question)
          })
        }
      }

      // Populate influencer selection
      if (briefData.selection) {
        if (typeof briefData.selection.numberOfInfluencers === 'number') {
          briefStore.updateSelectionField(
            'numberOfInfluencers',
            briefData.selection.numberOfInfluencers,
          )
        }
        if (Array.isArray(briefData.selection.platforms)) {
          briefStore.updateSelectionField('platforms', briefData.selection.platforms)
        }
        if (Array.isArray(briefData.selection.categories)) {
          briefStore.updateSelectionField('categories', briefData.selection.categories)
        }
        if (Array.isArray(briefData.selection.regions)) {
          briefStore.updateSelectionField('regions', briefData.selection.regions)
        }
        if (Array.isArray(briefData.selection.audienceSize)) {
          briefStore.updateSelectionField('audienceSize', briefData.selection.audienceSize)
        }
        if (Array.isArray(briefData.selection.gender)) {
          briefStore.updateSelectionField('gender', briefData.selection.gender)
        }
        if (Array.isArray(briefData.selection.contentFormat)) {
          briefStore.updateSelectionField('contentFormat', briefData.selection.contentFormat)
        }
        if (Array.isArray(briefData.selection.previousCollaborations)) {
          briefStore.updateSelectionField(
            'previousCollaborations',
            briefData.selection.previousCollaborations,
          )
        }
        if (briefData.selection.additionalNotes) {
          briefStore.updateSelectionField('additionalNotes', briefData.selection.additionalNotes)
        }
      }

      // Show success message
      toast.add({
        severity: 'success',
        summary: 'Brief analyzed',
        detail: 'ChatGPT has analyzed your brief and filled in the relevant fields.',
        life: 5000,
      })

      console.log('ChatGPT Analysis completed. Brief store updated:', briefData)
    } else {
      throw new Error(data?.error || 'Failed to get response from ChatGPT')
    }
  } catch (error) {
    console.error('ChatGPT API error:', error)
    toast.add({
      severity: 'error',
      summary: 'Analysis failed',
      detail:
        error instanceof Error
          ? error.message
          : 'Could not analyze brief with ChatGPT. Please try again.',
      life: 5000,
    })
    // Re-throw the error so nextStep knows it failed
    throw error
  } finally {
    isProcessingChatGPT.value = false
  }
}

const prevStep = () => {
  if (activeStep.value > 1) activeStep.value--
}

const submitBrief = async () => {
  if (!briefStore.canSubmit || isSubmitting.value) return

  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast.add({
      severity: 'success',
      summary: 'Brief sent',
      detail: 'Our team will reach out shortly to finalize the details.',
      life: 5000,
    })

    briefStore.reset()
    activeStep.value = 1
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Submission failed',
      detail: 'There was a problem sending your brief. Please try again.',
      life: 5000,
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.brief-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 60%);
  padding: 64px 24px 120px;
  padding-top: calc(32px + 48px); /* Reduced padding for fixed top header */
  padding-bottom: calc(96px + 80px); /* Extra padding for fixed bottom bar */
}

/* Fixed top header with breadcrumbs and close button */
.fixed-top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.8) 60%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 8px 0;
}

.top-header-content {
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.breadcrumb-item {
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
  font-family: inherit;
}

.breadcrumb-item:hover {
  color: #6348ed;
}

.breadcrumb-item--current {
  color: #0f172a;
  font-weight: 500;
  cursor: default;
}

.breadcrumb-separator {
  color: #cbd5e1;
  font-size: 14px;
}

.close-button {
  width: 2rem;
  height: 2rem;
  color: #64748b;
}

.close-button:hover {
  color: #0f172a;
  background-color: #f1f5f9;
}

.page-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-eyebrow,
.page-title,
.page-subtitle {
  margin: 0;
}

.page-eyebrow {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6348ed;
  font-weight: 600;
}

.page-title {
  font-size: 36px;
  line-height: 1.2;
  font-weight: 700;
  color: #0f172a;
}

.page-subtitle {
  font-size: 16px;
  line-height: 1.5;
  color: #475569;
}

.stepper-section {
  border-radius: 24px;
  background: #ffffff;
  padding: 40px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
}

/* Fixed bottom action bar */
.fixed-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.08);
  z-index: 1000;
  padding: 16px 24px;
}

.bottom-bar-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.bottom-bar-spacer {
  flex: 0 0 auto;
}

.bottom-bar-buttons {
  display: flex;
  gap: 12px;
  margin-left: auto;
}

.logistics-actions {
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(99, 72, 237, 0.08);
  color: #5238d4;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .stepper-section {
    padding: 32px 24px;
  }
}

@media (max-width: 640px) {
  .brief-page {
    padding: 32px 16px 72px;
    padding-top: calc(24px + 40px); /* Reduced padding for fixed top header on mobile */
    padding-bottom: calc(72px + 80px); /* Extra padding for fixed bottom bar on mobile */
  }

  .page-title {
    font-size: 28px;
  }

  .stepper-section {
    padding: 24px 16px;
  }

  .fixed-top-header {
    padding: 6px 0;
  }

  .top-header-content {
    padding: 0 16px;
  }

  .breadcrumbs {
    font-size: 13px;
  }

  .close-button {
    width: 1.75rem;
    height: 1.75rem;
  }

  .fixed-bottom-bar {
    padding: 12px 16px;
  }

  .bottom-bar-content {
    flex-direction: column;
    gap: 12px;
  }

  .bottom-bar-buttons {
    width: 100%;
    flex-direction: column;
    margin-left: 0;
  }

  .bottom-bar-buttons :deep(.p-button) {
    width: 100%;
  }

  .bottom-bar-content > .p-button {
    width: 100%;
  }
}
</style>
