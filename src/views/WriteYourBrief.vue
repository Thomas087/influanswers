<template>
  <div class="brief-page">
    <Toast />
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
            <Step :value="1">Write your brief</Step>
            <Step :value="2">Select your influencers</Step>
            <Step :value="3">Confirm</Step>
          </StepList>

          <StepPanels>
            <StepPanel :value="1">
              <WriteBriefStep v-model="brief" />
              <div class="step-footer">
                <div></div>
                <Button
                  label="Continue"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  :disabled="!isBriefValid"
                  @click="activeStep = 2"
                />
              </div>
            </StepPanel>

            <StepPanel :value="2">
              <SelectInfluencersStep v-model="selection" />
              <div class="step-footer">
                <Button
                  label="Back"
                  icon="pi pi-arrow-left"
                  severity="secondary"
                  outlined
                  @click="activeStep = 1"
                />
                <Button
                  label="Continue"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  :disabled="!isSelectionValid"
                  @click="activeStep = 3"
                />
              </div>
            </StepPanel>

            <StepPanel :value="3">
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
                  @click="activeStep = 2"
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

const activeStep = ref(1)
const isSubmitting = ref(false)
const toast = useToast()

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
  () => brief.projectName.trim() && brief.brandSummary.trim() && brief.keyObjectives.trim(),
)

const isSelectionValid = computed(
  () => selection.platforms.length > 0 || selection.categories.length > 0,
)

const canSubmit = computed(() => isBriefValid.value && isSelectionValid.value)

const submitBrief = async () => {
  if (!canSubmit.value || isSubmitting.value) return

  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast.add({
      severity: 'success',
      summary: 'Brief sent',
      detail: 'Our team will reach out shortly to finalize the details.',
      life: 5000,
    })

    Object.assign(brief, {
      projectName: '',
      brandSummary: '',
      keyObjectives: '',
      questions: '',
      budgetRange: '',
      timeline: '',
    })
    Object.assign(selection, {
      platforms: [],
      categories: [],
      regions: [],
      audienceSize: '',
      additionalNotes: '',
    })
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
  padding: 64px 24px 96px;
}

.page-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  font-size: 42px;
  line-height: 1.15;
  font-weight: 700;
  color: #0f172a;
}

.page-subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: #475569;
}

.stepper-section {
  border-radius: 24px;
  background: #ffffff;
  padding: 40px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
}

.step-footer {
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
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
    padding: 48px 16px 72px;
  }

  .page-title {
    font-size: 32px;
  }

  .stepper-section {
    padding: 24px 16px;
  }

  .step-footer {
    flex-direction: column;
  }
}
</style>
