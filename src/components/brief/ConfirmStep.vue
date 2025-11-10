<template>
  <section class="confirm-step">
    <div class="step-description">
      <h2 class="step-title">Review and confirm</h2>
      <p class="step-subtitle">
        Double-check your brief and targeting preferences. You can go back to adjust anything before
        sending it.
      </p>
    </div>

    <div class="summary-grid">
      <div class="summary-left-column">
        <article class="summary-card">
          <header class="summary-header">
            <h3>Brief overview</h3>
          </header>
          <div class="summary-body">
            <dl>
              <div>
                <dt>Project name</dt>
                <dd>{{ briefStore.brief.projectName || '—' }}</dd>
              </div>
              <div>
                <dt>Brief summary</dt>
                <dd>{{ briefStore.brief.briefSummary || '—' }}</dd>
              </div>
              <div>
                <dt>Key questions</dt>
                <dd>
                  <template v-if="briefStore.questions.length > 0">
                    <div class="questions-container">
                      <div
                        v-for="(question, index) in briefStore.questions"
                        :key="index"
                        class="question-item"
                      >
                        <span class="question-number">{{ index + 1 }}</span>
                        <span class="question-text">{{ question }}</span>
                      </div>
                    </div>
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
            </dl>
          </div>
        </article>

        <article class="summary-card">
          <header class="summary-header">
            <h3>Targeting</h3>
          </header>
          <div class="summary-body">
            <dl>
              <div>
                <dt>Number of influencers</dt>
                <dd>{{ briefStore.selection.numberOfInfluencers || '—' }}</dd>
              </div>
              <div>
                <dt>Platforms</dt>
                <dd>
                  <template v-if="briefStore.selection.platforms.length">
                    <Tag
                      v-for="platform in briefStore.selection.platforms"
                      :key="platform"
                      :value="getPlatformLabel(platform)"
                      class="summary-tag"
                    />
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
              <div>
                <dt>Categories</dt>
                <dd>
                  <template v-if="briefStore.selection.categories.length">
                    <Tag
                      v-for="category in briefStore.selection.categories"
                      :key="category"
                      :value="getCategoryLabel(category)"
                      severity="secondary"
                      class="summary-tag"
                    />
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
              <div>
                <dt>Regions</dt>
                <dd>
                  <template v-if="briefStore.selection.regions.length">
                    <Tag
                      v-for="region in briefStore.selection.regions"
                      :key="region"
                      :value="getCountryName(region)"
                      severity="info"
                      class="summary-tag"
                    />
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
              <div>
                <dt>Audience size</dt>
                <dd>
                  <template v-if="briefStore.selection.audienceSize.length">
                    <Tag
                      v-for="size in briefStore.selection.audienceSize"
                      :key="size"
                      :value="getAudienceSizeLabel(size)"
                      severity="success"
                      class="summary-tag"
                    />
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
              <div>
                <dt>Gender</dt>
                <dd>
                  <template v-if="briefStore.selection.gender.length">
                    <Tag
                      v-for="gender in briefStore.selection.gender"
                      :key="gender"
                      :value="getGenderLabel(gender)"
                      severity="warning"
                      class="summary-tag"
                    />
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
              <div>
                <dt>Content format</dt>
                <dd>
                  <template v-if="briefStore.selection.contentFormat.length">
                    <Tag
                      v-for="format in briefStore.selection.contentFormat"
                      :key="format"
                      :value="getContentFormatLabel(format)"
                      severity="help"
                      class="summary-tag"
                    />
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
              <div>
                <dt>Previous collaborations</dt>
                <dd>
                  <template v-if="briefStore.selection.previousCollaborations.length">
                    <Tag
                      v-for="collab in briefStore.selection.previousCollaborations"
                      :key="collab"
                      :value="collab"
                      severity="success"
                      class="summary-tag"
                    />
                  </template>
                  <span v-else>—</span>
                </dd>
              </div>
              <div>
                <dt>Notes</dt>
                <dd>{{ briefStore.selection.additionalNotes || '—' }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>

      <div class="summary-right-column">
        <article class="summary-card pricing-card">
          <header class="summary-header">
            <h3>Project fees</h3>
          </header>
          <div class="summary-body">
            <div class="pricing-breakdown">
              <div class="pricing-row">
                <span class="pricing-label">Number of influencers</span>
                <span class="pricing-value">{{ numberOfInfluencers }}</span>
              </div>
              <div class="pricing-row">
                <span class="pricing-label">Number of questions</span>
                <span class="pricing-value">{{ numberOfQuestions }}</span>
              </div>
              <div class="pricing-row">
                <span class="pricing-label">Price per question</span>
                <span class="pricing-value">$25</span>
              </div>
              <div class="pricing-row pricing-row--total">
                <span class="pricing-label">Total</span>
                <span class="pricing-value pricing-value--total"
                  >${{ totalPrice.toLocaleString() }}</span
                >
              </div>
              <div class="pricing-row pricing-row--deposit">
                <span class="pricing-label">Deposit</span>
                <span class="pricing-value pricing-value--deposit">${{ depositAmount }}</span>
              </div>
            </div>
          </div>
        </article>

        <article class="summary-card payment-card" v-if="totalPrice > 0">
          <PaymentForm
            ref="paymentFormRef"
            :amount="depositAmount"
            :metadata="paymentMetadata"
            @success="handlePaymentSuccess"
            @error="handlePaymentError"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Tag from 'primevue/tag'
import { useBriefStore } from '@/stores/brief'
import { getCountryName } from '@/lib/countries'
import { getAudienceSizeLabel } from '@/lib/audience-sizes'
import { getGenderLabel } from '@/lib/genders'
import { getPlatformLabel } from '@/lib/platforms'
import { getContentFormatLabel } from '@/lib/content-formats'
import { getCategoryLabel } from '@/lib/categories'
import PaymentForm from './PaymentForm.vue'

const router = useRouter()
const briefStore = useBriefStore()
const paymentFormRef = ref<InstanceType<typeof PaymentForm> | null>(null)

// Expose payment form ref so parent can trigger payment
defineExpose({
  paymentFormRef,
})

const numberOfQuestions = computed(() => {
  return briefStore.questions.filter((q) => q?.trim().length > 0).length
})

const numberOfInfluencers = computed(() => {
  return briefStore.selection.numberOfInfluencers || 0
})

const totalPrice = computed(() => {
  return numberOfInfluencers.value * numberOfQuestions.value * 25
})

const depositAmount = 185

const paymentMetadata = computed(() => {
  return {
    project_name: briefStore.brief.projectName || 'Untitled Project',
    number_of_influencers: numberOfInfluencers.value.toString(),
    number_of_questions: numberOfQuestions.value.toString(),
  }
})

const handlePaymentSuccess = () => {
  // Clear the brief store after successful payment
  briefStore.reset()
  // Navigate to payment confirmation page
  router.push('/payment-confirmation')
}

const handlePaymentError = (error: string) => {
  // Handle payment error
  console.error('Payment error:', error)
  // You can show a toast notification here
}
</script>

<style scoped>
.confirm-step {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.step-description {
  max-width: 100%;
}

.step-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
}

.step-subtitle {
  margin: 0;
  font-size: 16px;
  color: #4a5568;
  line-height: 1.5;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .summary-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

.summary-left-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.summary-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.summary-card--highlight {
  border-color: rgba(99, 72, 237, 0.3);
  background: rgba(99, 72, 237, 0.04);
}

.summary-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

.summary-body dl {
  margin: 0;
  display: grid;
  gap: 16px;
}

.summary-body dt {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  margin-bottom: 4px;
}

.summary-body dd {
  margin: 0;
  font-size: 15px;
  color: #1f2937;
  line-height: 1.45;
}

.summary-tag {
  margin: 0 8px 8px 0;
}

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.question-number {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #6348ed;
  color: #ffffff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.question-text {
  flex: 1;
  font-size: 15px;
  color: #1f2937;
  line-height: 1.45;
}

.pricing-card {
  top: 24px;
}

.payment-card {
  margin-top: 24px;
}

.pricing-breakdown {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pricing-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.pricing-label {
  font-size: 15px;
  color: #64748b;
  line-height: 1.5;
}

.pricing-value {
  font-size: 15px;
  color: #1f2937;
  font-weight: 500;
  text-align: right;
}

.pricing-row--total {
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.pricing-row--total .pricing-label {
  font-size: 17px;
  font-weight: 600;
  color: #1a202c;
  letter-spacing: -0.01em;
}

.pricing-value--total {
  font-size: 28px;
  font-weight: 700;
  color: #6348ed;
  letter-spacing: -0.02em;
}

.pricing-row--deposit {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.pricing-value--deposit {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}
</style>
