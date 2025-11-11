import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Brief, BriefDetails, InfluencerSelection } from '@/types/brief'
import { createDefaultBrief } from '@/types/brief'
import { supabase } from '@/lib/supabase'

const STORAGE_KEY = 'influanswers-brief-draft'
const SESSION_ID_KEY = 'influanswers-session-id'
const BRIEF_ID_KEY = 'influanswers-brief-id'

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

// Session ID management
const getOrCreateSessionId = (): string => {
  try {
    let sessionId = localStorage.getItem(SESSION_ID_KEY)
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem(SESSION_ID_KEY, sessionId)
    }
    return sessionId
  } catch (error) {
    console.error('Failed to get/create session ID:', error)
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

// Get or create brief ID
const getBriefId = (): string | null => {
  try {
    return localStorage.getItem(BRIEF_ID_KEY)
  } catch (error) {
    console.error('Failed to get brief ID:', error)
    return null
  }
}

const setBriefId = (id: string | null) => {
  try {
    if (id) {
      localStorage.setItem(BRIEF_ID_KEY, id)
    } else {
      localStorage.removeItem(BRIEF_ID_KEY)
    }
  } catch (error) {
    console.error('Failed to set brief ID:', error)
  }
}

export const useBriefStore = defineStore('brief', () => {
  const state = ref<Brief>(loadFromStorage())
  const sessionId = ref<string>(getOrCreateSessionId())
  const briefId = ref<string | null>(getBriefId())
  const userInfo = ref<{
    fullName?: string
    company?: string
    vatNumber?: string
    email?: string
  }>({})
  const isSaving = ref(false)

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

  // Save/update brief in Supabase
  const saveToSupabase = async (): Promise<void> => {
    if (isSaving.value) return

    try {
      isSaving.value = true

      const briefData = {
        session_id: sessionId.value,
        project_name: state.value.brief.projectName || null,
        brand_brief: state.value.brief.brandBrief || null,
        brief_summary: state.value.brief.briefSummary || null,
        questions: state.value.brief.questions || [],
        number_of_influencers: state.value.selection.numberOfInfluencers || 10,
        platforms: state.value.selection.platforms || [],
        categories: state.value.selection.categories || [],
        regions: state.value.selection.regions || [],
        audience_size: state.value.selection.audienceSize || [],
        gender: state.value.selection.gender || [],
        content_format: state.value.selection.contentFormat || [],
        previous_collaborations: state.value.selection.previousCollaborations || [],
        additional_notes: state.value.selection.additionalNotes || null,
        user_full_name: userInfo.value.fullName || null,
        user_company: userInfo.value.company || null,
        user_vat_number: userInfo.value.vatNumber || null,
        user_email: userInfo.value.email || null,
      }

      if (briefId.value) {
        // Update existing brief
        const { data, error } = await supabase
          .from('briefs')
          .update(briefData)
          .eq('id', briefId.value)
          .select()
          .single()

        if (error) throw error
      } else {
        // Create new brief
        const { data, error } = await supabase
          .from('briefs')
          .insert(briefData)
          .select()
          .single()

        if (error) throw error
        if (data?.id) {
          briefId.value = data.id
          setBriefId(data.id)
        }
      }
    } catch (error) {
      console.error('Failed to save brief to Supabase:', error)
      // Don't throw - we still want to save to localStorage
    } finally {
      isSaving.value = false
    }
  }

  // Load brief from Supabase
  const loadFromSupabase = async (): Promise<void> => {
    try {
      const currentSessionId = getOrCreateSessionId()
      const currentBriefId = getBriefId()

      let data = null

      // Try to load by brief ID first, then by session ID
      if (currentBriefId) {
        const { data: briefData, error } = await supabase
          .from('briefs')
          .select('*')
          .eq('id', currentBriefId)
          .single()

        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "not found" - that's okay
          throw error
        }
        data = briefData
      } else {
        const { data: briefData, error } = await supabase
          .from('briefs')
          .select('*')
          .eq('session_id', currentSessionId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (error && error.code !== 'PGRST116') {
          throw error
        }
        data = briefData
      }

      if (data) {
        // Don't load briefs that have payment status (completed payments)
        // These should not be reloaded into the store
        if (data.payment_status) {
          console.log('Brief has payment status, skipping load to allow fresh start')
          return
        }

        // Update brief ID
        briefId.value = data.id
        setBriefId(data.id)

        // Update state with loaded data
        if (data.project_name) state.value.brief.projectName = data.project_name
        if (data.brand_brief) state.value.brief.brandBrief = data.brand_brief
        if (data.brief_summary) state.value.brief.briefSummary = data.brief_summary
        if (data.questions) state.value.brief.questions = data.questions

        if (data.number_of_influencers) state.value.selection.numberOfInfluencers = data.number_of_influencers
        if (data.platforms) state.value.selection.platforms = data.platforms
        if (data.categories) state.value.selection.categories = data.categories
        if (data.regions) state.value.selection.regions = data.regions
        if (data.audience_size) state.value.selection.audienceSize = data.audience_size
        if (data.gender) state.value.selection.gender = data.gender
        if (data.content_format) state.value.selection.contentFormat = data.content_format
        if (data.previous_collaborations) state.value.selection.previousCollaborations = data.previous_collaborations
        if (data.additional_notes) state.value.selection.additionalNotes = data.additional_notes

        if (data.user_full_name) userInfo.value.fullName = data.user_full_name
        if (data.user_company) userInfo.value.company = data.user_company
        if (data.user_vat_number) userInfo.value.vatNumber = data.user_vat_number
        if (data.user_email) userInfo.value.email = data.user_email

        // Save to localStorage as well
        saveToStorage(state.value)
      }
    } catch (error) {
      console.error('Failed to load brief from Supabase:', error)
      // Continue with localStorage data if Supabase load fails
    }
  }

  // Update user information
  function updateUserInfo(info: {
    fullName?: string
    company?: string
    vatNumber?: string
    email?: string
  }) {
    userInfo.value = { ...userInfo.value, ...info }
    saveToSupabase()
  }

  // Generic update function for brief fields
  function updateField<K extends keyof BriefDetails>(field: K, value: BriefDetails[K]) {
    state.value.brief[field] = value
    saveToStorage(state.value)
    saveToSupabase()
  }

  // Generic update function for selection fields
  function updateSelectionField<K extends keyof InfluencerSelection>(
    field: K,
    value: InfluencerSelection[K],
  ) {
    state.value.selection[field] = value
    saveToStorage(state.value)
    saveToSupabase()
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
    saveToSupabase()
  }

  function addQuestion() {
    ensureQuestionsArray()
    // Allow up to 20 questions
    if (state.value.brief.questions.length < 20) {
      state.value.brief.questions.push('')
      saveToStorage(state.value)
      saveToSupabase()
    }
  }

  function removeQuestion(index: number) {
    if (state.value.brief.questions?.length > 3) {
      state.value.brief.questions.splice(index, 1)
      saveToStorage(state.value)
      saveToSupabase()
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

  // Set brandBrief without triggering a save (used when resetting for new brief)
  function setBrandBriefWithoutSave(value: string) {
    state.value.brief.brandBrief = value
    saveToStorage(state.value)
    // Don't call saveToSupabase() - let the batch update handle it
  }

  // Batch update from ChatGPT response - updates all fields at once and saves once
  async function batchUpdateFromChatGPT(briefData: Brief) {
    // Update brief fields
    if (briefData.brief) {
      if (briefData.brief.projectName) {
        state.value.brief.projectName = briefData.brief.projectName
      }
      if (briefData.brief.brandBrief) {
        state.value.brief.brandBrief = briefData.brief.brandBrief
      }
      if (briefData.brief.briefSummary) {
        state.value.brief.briefSummary = briefData.brief.briefSummary
      }
      if (Array.isArray(briefData.brief.questions) && briefData.brief.questions.length > 0) {
        // Ensure we have at least 3 question slots
        const questions = [...briefData.brief.questions]
        while (questions.length < 3) {
          questions.push('')
        }
        state.value.brief.questions = questions
      }
    }

    // Update selection fields
    if (briefData.selection) {
      if (typeof briefData.selection.numberOfInfluencers === 'number') {
        state.value.selection.numberOfInfluencers = briefData.selection.numberOfInfluencers
      }
      if (Array.isArray(briefData.selection.platforms)) {
        state.value.selection.platforms = briefData.selection.platforms
      }
      if (Array.isArray(briefData.selection.categories)) {
        state.value.selection.categories = briefData.selection.categories
      }
      if (Array.isArray(briefData.selection.regions)) {
        state.value.selection.regions = briefData.selection.regions
      }
      if (Array.isArray(briefData.selection.audienceSize)) {
        state.value.selection.audienceSize = briefData.selection.audienceSize
      }
      if (Array.isArray(briefData.selection.gender)) {
        state.value.selection.gender = briefData.selection.gender
      }
      if (Array.isArray(briefData.selection.contentFormat)) {
        state.value.selection.contentFormat = briefData.selection.contentFormat
      }
      if (Array.isArray(briefData.selection.previousCollaborations)) {
        state.value.selection.previousCollaborations = briefData.selection.previousCollaborations
      }
      if (briefData.selection.additionalNotes !== undefined && briefData.selection.additionalNotes !== null) {
        state.value.selection.additionalNotes = briefData.selection.additionalNotes
      }
    }

    // Save to localStorage and Supabase once after all updates
    saveToStorage(state.value)
    await saveToSupabase()
  }

  // Reset
  function reset() {
    state.value = createDefaultBrief()
    userInfo.value = {}
    localStorage.removeItem(STORAGE_KEY)
    briefId.value = null
    setBriefId(null)
    // Clear old session ID and create a new one for the next brief
    localStorage.removeItem(SESSION_ID_KEY)
    sessionId.value = getOrCreateSessionId()
  }

  return {
    // State
    brief,
    selection,
    questions,
    userInfo,
    briefId,
    sessionId,
    isSaving,

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
    updateUserInfo,
    saveToSupabase,
    loadFromSupabase,
    batchUpdateFromChatGPT,
    setBrandBriefWithoutSave,
    reset,
  }
})
