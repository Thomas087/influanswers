export interface BriefDetails {
  projectName: string
  brandBrief: string
  keyObjectives: string
  questions: string[]
  budgetRange: string
  timeline: string
}

export interface InfluencerSelection {
  numberOfInfluencers: number
  platforms: string[]
  categories: string[]
  regions: string[]
  audienceSize: string
  gender: string[]
  contentFormat: string[]
  previousCollaborations: string[]
  additionalNotes: string
}

export interface Brief {
  brief: BriefDetails
  selection: InfluencerSelection
}

// Default values for creating new briefs
export const createDefaultBrief = (): Brief => ({
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
})
