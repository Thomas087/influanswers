<template>
  <section class="questions-step">
    <div class="step-description">
      <h2 class="step-title">Specify your questions</h2>
      <p class="step-subtitle">
        Share the questions or themes you want influencers to explore in their responses.
      </p>
    </div>
    <div class="form-grid">
      <div class="form-field form-field--full">
        <label class="field-label" for="questions">What do you need to ask?</label>
        <Textarea
          id="questions"
          :modelValue="modelValue.questions"
          @update:modelValue="updateField('questions', $event)"
          rows="6"
          auto-resize
          placeholder="Share the questions or themes you want influencers to explore."
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'

import type { BriefDetails } from '@/types/brief'

const props = defineProps<{
  modelValue: BriefDetails
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BriefDetails]
}>()

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
.questions-step {
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
