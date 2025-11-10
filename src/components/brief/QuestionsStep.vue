<template>
  <section class="questions-step">
    <div class="step-description">
      <h2 class="step-title">Specify your questions</h2>
      <p class="step-subtitle">
        Share the questions or themes you want influencers to explore in their responses.
      </p>
    </div>
    <div class="questions-list">
      <div v-for="(question, index) in questionsList" :key="index" class="question-item">
        <Textarea
          :id="`question-${index}`"
          :modelValue="question"
          @update:modelValue="briefStore.updateQuestion(index, $event || '')"
          placeholder="Enter a question..."
          class="question-input"
          auto-resize
          rows="1"
        />

        <Button
          icon="pi pi-trash"
          rounded
          @click="briefStore.removeQuestion(index)"
          :disabled="questionsList.length <= 3"
          class="delete-button"
        />
      </div>
    </div>
    <Button
      label="Add question"
      icon="pi pi-plus"
      severity="secondary"
      outlined
      @click="briefStore.addQuestion"
      :disabled="questionsList.length >= 20"
      class="add-button"
    />
    <p v-if="showValidationError" class="validation-error">
      Please provide between 3 and 20 questions before continuing.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { useBriefStore } from '@/stores/brief'

const briefStore = useBriefStore()

// Get questions list from store (includes empty slots for UI)
const questionsList = computed(() => briefStore.getQuestionsList())

const showValidationError = computed(() => !briefStore.isQuestionsValid)
</script>

<style scoped>
.questions-step {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.question-input {
  flex: 1;
}

.delete-button {
  width: 2.5rem;
  height: 2.5rem;
  color: #6348ed;
  background-color: #fff;
  flex-shrink: 0;
  margin-top: 0.5rem;
}

.delete-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.add-button {
  align-self: flex-start;
}

.validation-error {
  margin: 0;
  font-size: 14px;
  color: #dc2626;
  padding: 8px 12px;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
}
</style>
