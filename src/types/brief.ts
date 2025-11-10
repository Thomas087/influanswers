export interface BriefDetails {
  projectName: string
  brandBrief: string
  briefSummary: string
  questions: string[]
}

export interface InfluencerSelection {
  numberOfInfluencers: number
  platforms: string[]
  categories: string[]
  regions: string[]
  audienceSize: string[]
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
    briefSummary: '',
    questions: ['', '', ''], // Start with 3 empty slots for UI
  },
  selection: {
    numberOfInfluencers: 10,
    platforms: [],
    categories: [],
    regions: [],
    audienceSize: [],
    gender: [],
    contentFormat: [],
    previousCollaborations: [],
    additionalNotes: '',
  },
})
