<template>
  <div class="brief-page">
    <Toast />
    <div class="page-shell">
      <header class="page-header">
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
            <Step :value="steps[0]">
              <div
                class="stepper-header"
                :class="getStepStatus(steps[0])"
                :aria-current="activeStep === steps[0] ? 'step' : undefined"
              >
                <span class="step-index">{{ getStepIndex(steps[0]) }}</span>
                <span class="step-label">Write your brief</span>
              </div>
            </Step>
            <Step :value="steps[1]">
              <div
                class="stepper-header"
                :class="getStepStatus(steps[1])"
                :aria-current="activeStep === steps[1] ? 'step' : undefined"
              >
                <span class="step-index">{{ getStepIndex(steps[1]) }}</span>
                <span class="step-label">Select your influencers</span>
              </div>
            </Step>
            <Step :value="steps[2]">
              <div
                class="stepper-header"
                :class="getStepStatus(steps[2])"
                :aria-current="activeStep === steps[2] ? 'step' : undefined"
              >
                <span class="step-index">{{ getStepIndex(steps[2]) }}</span>
                <span class="step-label">Confirm</span>
              </div>
            </Step>
          </StepList>

          <StepPanels>
            <StepPanel :value="steps[0]" v-slot="{ activateCallback }">
              <WriteBriefStep v-model="brief" />
              <div class="step-footer">
                <div class="step-footer__spacer" />
                <Button
                  label="Continue"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  :disabled="!isBriefValid"
                  @click="activateCallback(steps[1])"
                />
              </div>
            </StepPanel>

            <StepPanel :value="steps[1]" v-slot="{ activateCallback }">
              <SelectInfluencersStep v-model="selection" />
              <div class="step-footer">
                <Button
                  label="Back"
                  icon="pi pi-arrow-left"
                  severity="secondary"
                  outlined
                  @click="activateCallback(steps[0])"
                />
                <Button
                  label="Continue"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  :disabled="!isSelectionValid"
                  @click="activateCallback(steps[2])"
                />
              </div>
            </StepPanel>

            <StepPanel :value="steps[2]" v-slot="{ activateCallback }">
              <ConfirmStep :brief="brief" :selection="selection">
                <template #actions>
                  <div class="logistics-actions">
                    <p>
                      Once you submit, our team will validate the audience, finalize pricing, and
                      share a proposal.
                    </p>
                  </div>
                </template>
              </ConfirmStep>
              <div class="step-footer">
                <Button
                  label="Back"
                  icon="pi pi-arrow-left"
                  severity="secondary"
                  outlined
                  @click="activateCallback(steps[1])"
                />
                <Button
                  label="Submit brief"
                  icon="pi pi-check"
                  severity="success"
                  :loading="isSubmitting"
                  :disabled="!canSubmit || isSubmitting"
                  @click="submitBrief"
                />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import ConfirmStep from '@/components/brief/ConfirmStep.vue'
import SelectInfluencersStep from '@/components/brief/SelectInfluencersStep.vue'
import WriteBriefStep from '@/components/brief/WriteBriefStep.vue'
import type { BriefDetails, InfluencerSelection } from '@/types/brief'

const steps = ['brief', 'influencers', 'confirm'] as const
type StepValue = (typeof steps)[number]

const activeStep = ref<StepValue>('brief')

const brief = reactive<BriefDetails>({
  projectName: '',
  brandSummary: '',
  keyObjectives: '',
  questions: '',
  budgetRange: '',
  timeline: '',
})

const selection = reactive<InfluencerSelection>({
  platforms: [],
  categories: [],
  regions: [],
  audienceSize: '',
  additionalNotes: '',
})

const isBriefValid = computed(
  () =>
    brief.projectName.trim().length > 0 &&
    brief.brandSummary.trim().length > 0 &&
    brief.keyObjectives.trim().length > 0,
)

const isSelectionValid = computed(
  () => selection.platforms.length > 0 || selection.categories.length > 0,
)

const canSubmit = computed(() => isBriefValid.value && isSelectionValid.value)

const getStepStatus = (value: StepValue) => {
  const currentIndex = steps.indexOf(activeStep.value)
  const targetIndex = steps.indexOf(value)

  if (targetIndex < currentIndex) return 'is-completed'
  if (targetIndex === currentIndex) return 'is-active'
  return 'is-upcoming'
}

const getStepIndex = (value: StepValue) => steps.indexOf(value) + 1

const toast = useToast()
const isSubmitting = ref(false)

const submitBrief = async () => {
  if (!canSubmit.value || isSubmitting.value) return

  isSubmitting.value = true

  try {
    // Simulate a call to the backend. Replace with real API integration.
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast.add({
      severity: 'success',
      summary: 'Brief sent',
      detail: 'Our team will reach out shortly to finalize the details.',
      life: 5000,
    })

    activeStep.value = 'brief'
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
  padding: 64px 24px 96px;
}

.page-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.page-header {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-eyebrow {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6366f1;
  font-weight: 600;
}

.page-title {
  margin: 0;
  font-size: 42px;
  line-height: 1.15;
  font-weight: 700;
  color: #0f172a;
}

.page-subtitle {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: #475569;
}

.header-aside {
  display: flex;
  justify-content: flex-end;
}

.support-card {
  border-radius: 16px;
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 15px 40px rgba(79, 70, 229, 0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.support-card h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #312e81;
}

.support-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #4338ca;
}

.stepper-section {
  border-radius: 24px;
  background: #ffffff;
  padding: 40px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
}

.stepper-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-radius: 999px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  color: #64748b;
  font-size: 15px;
  font-weight: 500;
}

.stepper-header:hover {
  background: rgba(99, 102, 241, 0.1);
}

.stepper-header.is-active {
  background: rgba(99, 102, 241, 0.12);
  color: #312e81;
}

.stepper-header.is-completed {
  color: #2563eb;
}

.stepper-header.is-completed .step-index {
  background: #2563eb;
  color: #ffffff;
}

.step-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.2);
  font-size: 14px;
  font-weight: 600;
}

.stepper-header.is-active .step-index {
  background: #6366f1;
  color: #ffffff;
}

.step-label {
  white-space: nowrap;
}

.step-footer {
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.step-footer__spacer {
  flex: 1 1 160px;
}

.logistics-actions {
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(79, 70, 229, 0.08);
  color: #312e81;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .page-header {
    grid-template-columns: 1fr;
  }

  .header-aside {
    justify-content: flex-start;
  }

  .stepper-section {
    padding: 32px 24px;
  }
}

@media (max-width: 640px) {
  .brief-page {
    padding: 48px 16px 72px;
  }

  .page-title {
    font-size: 32px;
  }

  .stepper-section {
    padding: 24px 16px;
  }

  .stepper-header {
    width: 100%;
  }

  .step-label {
    white-space: normal;
  }

  .step-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .step-footer__spacer {
    display: none;
  }
}
</style>
