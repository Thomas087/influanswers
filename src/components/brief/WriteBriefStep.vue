<template>
  <section class="write-brief-step">
    <div class="step-description">
      <h2 class="step-question-intro">Describe your project in as many details as possible:</h2>
      <ul class="step-question-list">
        <li>What is your brand?</li>
        <li>What does it do?</li>
        <li>What kind of influencers do you want to interview?</li>
        <li>Which platforms and geographies do you want to target?</li>
        <li>What kind of questions do you want to ask?</li>
      </ul>
    </div>
    <div class="form-field">
      <Textarea
        v-model="localBrandBrief"
        rows="12"
        auto-resize
        placeholder="Enter your project details here..."
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue'
import Textarea from 'primevue/textarea'
import { useBriefStore } from '@/stores/brief'

const briefStore = useBriefStore()

// Local state for the textarea - only saved when user clicks Continue or submits
const localBrandBrief = ref(briefStore.brief.brandBrief)

// Sync local state when store changes (e.g., after reset or load)
watch(() => briefStore.brief.brandBrief, (newValue) => {
  localBrandBrief.value = newValue
  console.log(localBrandBrief.value)
})

// Save current value to store (called by parent on Continue/submit)
const save = () => {
  console.log(localBrandBrief.value)
  briefStore.updateField('brandBrief', localBrandBrief.value)
}

// Get current value (for getting unsaved changes)
const getCurrentValue = () => localBrandBrief.value

// Expose methods to parent component
defineExpose({
  save,
  getCurrentValue,
})
</script>

<style scoped>
.write-brief-step {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-description {
  max-width: 100%;
  margin-bottom: 0;
}

.step-question-intro {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.step-question-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-question-list li {
  position: relative;
  padding-left: 18px;
  font-size: 15px;
  font-weight: 500;
  color: #334155;
  line-height: 1.3;
}

.step-question-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  font-size: 18px;
  color: #6348ed;
  font-weight: 600;
  line-height: 1;
}

.form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-field :deep(.p-textarea) {
  width: 100%;
  min-height: 300px;
}

.form-field :deep(.p-inputtextarea) {
  width: 100%;
  font-size: 16px;
  line-height: 1.6;
  padding: 16px;
}
</style>
