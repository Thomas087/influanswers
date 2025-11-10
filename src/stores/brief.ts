import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Brief, BriefDetails, InfluencerSelection } from '@/types/brief'
import { createDefaultBrief } from '@/types/brief'

const STORAGE_KEY = 'influanswers-brief-draft'

// Storage helpers
const loadFromStorage = (): Brief => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const defaults = createDefaultBrief()
      // Merge with defaults to handle schema changes
      return {
        brief: { ...defaults.brief, ...parsed.brief },
        selection: { ...defaults.selection, ...parsed.selection },
      }
    }
  } catch (error) {
    console.error('Failed to load brief from storage:', error)
  }
  return createDefaultBrief()
}

const saveToStorage = (state: Brief) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save brief to storage:', error)
  }
}

export const useBriefStore = defineStore('brief', () => {
  const state = ref<Brief>(loadFromStorage())

  // Getters
  const brief = computed(() => state.value.brief)
  const selection = computed(() => state.value.selection)
  const questions = computed(() => state.value.brief.questions)

  // Validation
  const isBriefValid = computed(() => brief.value.brandBrief.trim().length > 0)

  const isQuestionsValid = computed(() => {
    if (!questions.value) return false
    const validQuestions = questions.value.filter((q) => q?.trim().length > 0)
    return validQuestions.length >= 3 && validQuestions.length <= 20
  })

  const isSelectionValid = computed(
    () => selection.value.platforms.length > 0 || selection.value.categories.length > 0,
  )

  const canSubmit = computed(
    () => isBriefValid.value && isQuestionsValid.value && isSelectionValid.value,
  )

  // Generic update function for brief fields
  function updateField<K extends keyof BriefDetails>(field: K, value: BriefDetails[K]) {
    state.value.brief[field] = value
    saveToStorage(state.value)
  }

  // Generic update function for selection fields
  function updateSelectionField<K extends keyof InfluencerSelection>(
    field: K,
    value: InfluencerSelection[K],
  ) {
    state.value.selection[field] = value
    saveToStorage(state.value)
  }

  // Questions helpers
  const ensureQuestionsArray = () => {
    if (!state.value.brief.questions) {
      state.value.brief.questions = ['', '', '']
    }
  }

  function updateQuestion(index: number, value: string) {
    ensureQuestionsArray()
    while (state.value.brief.questions.length <= index) {
      state.value.brief.questions.push('')
    }
    state.value.brief.questions[index] = value
    saveToStorage(state.value)
  }

  function addQuestion() {
    ensureQuestionsArray()
    // Allow up to 20 questions
    if (state.value.brief.questions.length < 20) {
      state.value.brief.questions.push('')
      saveToStorage(state.value)
    }
  }

  function removeQuestion(index: number) {
    if (state.value.brief.questions?.length > 3) {
      state.value.brief.questions.splice(index, 1)
      saveToStorage(state.value)
    }
  }

  function getQuestionsList(): string[] {
    const qs = questions.value || []
    if (qs.length === 0) return ['', '', '']
    if (qs.length < 3) {
      return [...qs, ...Array(3 - qs.length).fill('')]
    }
    return [...qs]
  }

  // Reset
  function reset() {
    state.value = createDefaultBrief()
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    // State
    brief,
    selection,
    questions,

    // Validation
    isBriefValid,
    isQuestionsValid,
    isSelectionValid,
    canSubmit,

    // Actions
    updateField,
    updateSelectionField,
    updateQuestion,
    addQuestion,
    removeQuestion,
    getQuestionsList,
    reset,
  }
})
