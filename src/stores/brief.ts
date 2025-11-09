import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { BriefDetails, InfluencerSelection } from '@/types/brief'

const STORAGE_KEY = 'influanswers-brief-draft'

interface BriefState {
  brief: BriefDetails
  selection: InfluencerSelection
}

const defaultState: BriefState = {
  brief: {
    projectName: '',
    brandBrief: '',
    keyObjectives: '',
    questions: ['', '', ''], // Start with 3 empty slots for UI
    budgetRange: '',
    timeline: '',
  },
  selection: {
    numberOfInfluencers: 10,
    platforms: [],
    categories: [],
    regions: [],
    audienceSize: '',
    gender: [],
    contentFormat: [],
    previousCollaborations: [],
    additionalNotes: '',
  },
}

// Load from localStorage if available
function loadFromStorage(): BriefState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Merge with defaults to handle schema changes
      return {
        brief: { ...defaultState.brief, ...parsed.brief },
        selection: { ...defaultState.selection, ...parsed.selection },
      }
    }
  } catch (error) {
    console.error('Failed to load brief from storage:', error)
  }
  return defaultState
}

// Save to localStorage
function saveToStorage(state: BriefState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save brief to storage:', error)
  }
}

export const useBriefStore = defineStore('brief', () => {
  // Load initial state from storage or use defaults
  const state = ref<BriefState>(loadFromStorage())

  // Brief getters
  const brief = computed(() => state.value.brief)
  const selection = computed(() => state.value.selection)

  // Questions list (for easier access)
  const questions = computed(() => state.value.brief.questions)

  // Validation computed properties
  const isBriefValid = computed(() => brief.value.brandBrief.trim().length > 0)

  const isQuestionsValid = computed(() => {
    if (!questions.value) return false
    const validQuestions = questions.value.filter((q) => q && q.trim().length > 0)
    return validQuestions.length >= 3
  })

  const isSelectionValid = computed(
    () => selection.value.platforms.length > 0 || selection.value.categories.length > 0,
  )

  const canSubmit = computed(
    () => isBriefValid.value && isQuestionsValid.value && isSelectionValid.value,
  )

  // Brief actions
  function updateBriefField<K extends keyof BriefDetails>(field: K, value: BriefDetails[K]) {
    state.value.brief[field] = value
    saveToStorage(state.value)
  }

  function updateBrief(briefData: Partial<BriefDetails>) {
    state.value.brief = { ...state.value.brief, ...briefData }
    saveToStorage(state.value)
  }

  // Selection actions
  function updateSelectionField<K extends keyof InfluencerSelection>(
    field: K,
    value: InfluencerSelection[K],
  ) {
    state.value.selection[field] = value
    saveToStorage(state.value)
  }

  function updateSelection(selectionData: Partial<InfluencerSelection>) {
    state.value.selection = { ...state.value.selection, ...selectionData }
    saveToStorage(state.value)
  }

  // Questions actions
  // Store all questions including empty ones for UI purposes
  function setQuestions(questionsList: string[]) {
    state.value.brief.questions = questionsList
    saveToStorage(state.value)
  }

  function updateQuestion(index: number, value: string) {
    // Ensure questions array exists and is long enough
    if (!state.value.brief.questions) {
      state.value.brief.questions = []
    }
    while (state.value.brief.questions.length <= index) {
      state.value.brief.questions.push('')
    }
    state.value.brief.questions[index] = value
    saveToStorage(state.value)
  }

  function addQuestion() {
    if (!state.value.brief.questions) {
      state.value.brief.questions = []
    }
    state.value.brief.questions.push('')
    saveToStorage(state.value)
  }

  function removeQuestion(index: number) {
    if (state.value.brief.questions && state.value.brief.questions.length > 3) {
      state.value.brief.questions.splice(index, 1)
      saveToStorage(state.value)
    }
  }

  // Get questions list for editing (includes empty strings for UI)
  function getQuestionsList(): string[] {
    const qs = questions.value
    // Always return at least 3 items for the UI
    if (qs.length === 0) {
      return ['', '', '']
    }
    // If we have valid questions but less than 3, ensure we have at least 3 slots
    if (qs.length < 3) {
      const result = [...qs]
      while (result.length < 3) {
        result.push('')
      }
      return result
    }
    // Return questions as-is (they may include empty slots)
    return [...qs]
  }

  // Reset all data
  function reset() {
    state.value = { ...defaultState }
    localStorage.removeItem(STORAGE_KEY)
  }

  // Clear draft (but keep in memory for current session)
  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    // State
    brief,
    selection,
    questions,

    // Computed validators
    isBriefValid,
    isQuestionsValid,
    isSelectionValid,
    canSubmit,

    // Brief actions
    updateBriefField,
    updateBrief,

    // Selection actions
    updateSelectionField,
    updateSelection,

    // Questions actions
    setQuestions,
    updateQuestion,
    addQuestion,
    removeQuestion,
    getQuestionsList,

    // Utility actions
    reset,
    clearDraft,
  }
})

