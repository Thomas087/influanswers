<template>
  <div class="demo-transcripts-page">
    <Header />
    <div class="transcripts-container">
      <!-- Return Button -->
      <div class="return-button-container">
        <router-link to="/demo-report" class="return-link">
          <Button label="Return to the report" icon="pi pi-arrow-left" severity="secondary" text />
        </router-link>
      </div>

      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Demo Transcripts</h1>
        <p class="page-subtitle">
          Explore authentic conversations with micro-influencers about their experiences with Shiseido, Lancôme, and Estée Lauder across different markets.
        </p>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <Card class="filters-card">
          <template #content>
            <div class="filters-content">
              <div class="filter-group">
                <label class="filter-label">Brand</label>
                <SelectButton
                  v-model="selectedBrand"
                  :options="brandOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="filter-select"
                />
              </div>
              <div class="filter-group">
                <label class="filter-label">Country</label>
                <SelectButton
                  v-model="selectedCountry"
                  :options="countryOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="filter-select"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Transcripts List -->
      <div class="transcripts-list">
        <Card
          v-for="(interview, index) in filteredInterviews"
          :key="index"
          class="transcript-card"
        >
          <template #content>
            <div class="transcript-header">
              <div class="transcript-meta">
                <Tag :value="interview.brand" severity="primary" class="brand-tag" />
                <Tag :value="getCountryName(interview.country)" severity="info" class="country-tag" />
              </div>
            </div>
            <div class="conversation">
              <div
                v-for="(message, msgIndex) in interview.conversation"
                :key="msgIndex"
                :class="['message', `message--${message.speaker.toLowerCase()}`]"
              >
                <div class="message-speaker">{{ getSpeakerLabel(message.speaker) }}</div>
                <div class="message-text">{{ message.text }}</div>
              </div>
            </div>
          </template>
        </Card>

        <div v-if="filteredInterviews.length === 0" class="no-results">
          <p>No transcripts found for the selected filters.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import demoTranscripts from '../data/demo-transcripts.json'

const selectedBrand = ref<string | null>(null)
const selectedCountry = ref<string | null>(null)

const brandOptions = [
  { label: 'All Brands', value: null },
  { label: 'Shiseido', value: 'Shiseido' },
  { label: 'Lancôme', value: 'Lancôme' },
  { label: 'Estée Lauder', value: 'Estée Lauder' },
]

const countryOptions = [
  { label: 'All Countries', value: null },
  { label: 'Japan', value: 'JP' },
  { label: 'France', value: 'FR' },
  { label: 'United States', value: 'US' },
]

const getCountryName = (code: string) => {
  const countryMap: Record<string, string> = {
    JP: 'Japan',
    FR: 'France',
    US: 'United States',
  }
  return countryMap[code] || code
}

const getSpeakerLabel = (speaker: string) => {
  if (speaker === 'Influencer') {
    return 'Customer / Influencer'
  }
  return speaker
}

const filteredInterviews = computed(() => {
  let interviews = demoTranscripts.interviews

  if (selectedBrand.value) {
    interviews = interviews.filter((interview) => interview.brand === selectedBrand.value)
  }

  if (selectedCountry.value) {
    interviews = interviews.filter((interview) => interview.country === selectedCountry.value)
  }

  return interviews
})
</script>

<style scoped>
.demo-transcripts-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.transcripts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.return-button-container {
  margin-bottom: 24px;
}

.return-link {
  text-decoration: none;
  display: inline-block;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 18px;
  color: #666;
  font-weight: 400;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.filters-section {
  margin-bottom: 32px;
}

.filters-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.filters-card :deep(.p-card-body) {
  padding: 24px;
}

.filters-card :deep(.p-card-content) {
  padding: 0;
}

.filters-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  font-weight: 600;
}

.filter-select {
  font-size: 14px;
}

.transcripts-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.transcript-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.transcript-card :deep(.p-card-body) {
  padding: 32px;
}

.transcript-card :deep(.p-card-content) {
  padding: 0;
}

.transcript-header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.transcript-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.brand-tag,
.country-tag {
  font-size: 13px;
  font-weight: 600;
}

.conversation {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message--interviewer {
  align-items: flex-start;
}

.message--influencer {
  align-items: flex-end;
}

.message-speaker {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: #64748b;
}

.message--interviewer .message-speaker {
  color: #6348ed;
}

.message--influencer .message-speaker {
  color: #8b5cf6;
}

.message-text {
  font-size: 15px;
  line-height: 1.7;
  color: #1f2937;
  padding: 16px 20px;
  border-radius: 12px;
  max-width: 85%;
}

.message--interviewer .message-text {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #6348ed;
}

.message--influencer .message-text {
  background: #f5f3ff;
  border: 1px solid #e2e8f0;
  border-right: 3px solid #8b5cf6;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-size: 16px;
}

/* Laptop and larger screens */
@media (min-width: 1024px) {
  .transcripts-container {
    padding: 48px 32px;
  }

  .page-title {
    font-size: 40px;
  }

  .page-subtitle {
    font-size: 20px;
  }

  .filters-content {
    flex-direction: row;
    gap: 32px;
  }

  .filter-group {
    flex: 1;
  }

  .message-text {
    max-width: 75%;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .transcripts-container {
    padding: 40px 24px;
  }

  .transcript-card :deep(.p-card-body) {
    padding: 28px 24px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .transcripts-container {
    padding: 24px 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .filters-card :deep(.p-card-body) {
    padding: 20px 16px;
  }

  .transcript-card :deep(.p-card-body) {
    padding: 24px 16px;
  }

  .message-text {
    max-width: 90%;
    padding: 14px 16px;
    font-size: 14px;
  }

  .conversation {
    gap: 16px;
  }
}
</style>

