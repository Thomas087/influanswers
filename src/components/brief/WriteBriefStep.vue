<template>
  <section class="write-brief-step">
    <div class="step-description">
      <h2 class="step-title">Project details</h2>
      <p class="step-subtitle">
        Tell us what you want to learn so we can match you with the right community and craft the
        perfect questionnaire.
      </p>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label class="field-label" for="project-name">Project name</label>
        <InputText
          id="project-name"
          :modelValue="modelValue.projectName"
          @update:modelValue="updateField('projectName', $event)"
          placeholder="e.g. Summer collection feedback"
        />
      </div>

      <div class="form-field form-field--full">
        <label class="field-label" for="brand-summary">Brief summary</label>
        <Textarea
          id="brand-summary"
          :modelValue="modelValue.brandSummary"
          @update:modelValue="updateField('brandSummary', $event)"
          rows="4"
          auto-resize
          placeholder="Describe your brand and the context for this research."
        />
      </div>

      <div class="form-field form-field--full">
        <label class="field-label" for="key-objectives">Key objectives</label>
        <Textarea
          id="key-objectives"
          :modelValue="modelValue.keyObjectives"
          @update:modelValue="updateField('keyObjectives', $event)"
          rows="4"
          auto-resize
          placeholder="List the outcomes you expect from this study."
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="budget-range">Budget range</label>
        <Dropdown
          id="budget-range"
          :modelValue="modelValue.budgetRange"
          :options="budgetOptions"
          placeholder="Select a range"
          @update:modelValue="updateField('budgetRange', $event)"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="timeline">Timeline</label>
        <Dropdown
          id="timeline"
          :modelValue="modelValue.timeline"
          :options="timelineOptions"
          placeholder="When do you need answers?"
          @update:modelValue="updateField('timeline', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

import type { BriefDetails } from '@/types/brief'

const props = defineProps<{
  modelValue: BriefDetails
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BriefDetails]
}>()

const budgetOptions = [
  'Under $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  'Above $50,000',
]

const timelineOptions = ['Within 1 week', '2 weeks', '3-4 weeks', '1-2 months', 'Flexible']

const updateField = <K extends keyof BriefDetails>(
  field: K,
  value: BriefDetails[K] | undefined,
) => {
  if (value !== undefined) {
    emit('update:modelValue', {
      ...props.modelValue,
      [field]: value,
    })
  }
}
</script>

<style scoped>
.write-brief-step {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.step-description {
  max-width: 720px;
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-field--full {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
}
</style>
