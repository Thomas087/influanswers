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
        <InputText
          :id="`question-${index}`"
          :modelValue="question"
          @update:modelValue="updateQuestion(index, $event || '')"
          placeholder="Enter a question..."
          class="question-input"
        />

        <Button
          icon="pi pi-trash"
          rounded
          @click="removeQuestion(index)"
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
      @click="addQuestion"
      class="add-button"
    />
    <p v-if="showValidationError" class="validation-error">
      Please provide at least 3 questions before continuing.
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import type { BriefDetails } from '@/types/brief'

const props = defineProps<{
  modelValue: BriefDetails
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BriefDetails]
}>()

const questionsList = ref<string[]>(
  props.modelValue.questions && props.modelValue.questions.length > 0
    ? [...props.modelValue.questions]
    : ['', '', ''],
)

const showValidationError = ref(false)

// Initialize validation error state
onMounted(() => {
  const validQuestions = questionsList.value.filter((q) => q.trim().length > 0)
  showValidationError.value = validQuestions.length < 3
})

// Watch for external changes to modelValue
watch(
  () => props.modelValue.questions,
  (newQuestions) => {
    if (newQuestions && newQuestions.length > 0) {
      questionsList.value = [...newQuestions]
    }
  },
  { deep: true },
)

// Watch questionsList and emit updates
watch(
  questionsList,
  (newList) => {
    const validQuestions = newList.filter((q) => q.trim().length > 0)
    emit('update:modelValue', {
      ...props.modelValue,
      questions: validQuestions,
    })
    // Show validation error if less than 3 valid questions
    showValidationError.value = validQuestions.length < 3
  },
  { deep: true },
)

const updateQuestion = (index: number, value: string) => {
  questionsList.value[index] = value
}

const addQuestion = () => {
  questionsList.value.push('')
}

const removeQuestion = (index: number) => {
  if (questionsList.value.length > 3) {
    questionsList.value.splice(index, 1)
  }
}

// Expose validation method for parent component
defineExpose({
  validate: () => {
    const validQuestions = questionsList.value.filter((q) => q.trim().length > 0)
    const isValid = validQuestions.length >= 3
    showValidationError.value = !isValid
    return isValid
  },
})
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
  align-items: center;
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
