<template>
  <section class="select-influencers-step">
    <div class="step-description">
      <h2 class="step-title">Audience targeting</h2>
      <p class="step-subtitle">
        Choose the influencer profiles that best match your brief so we can reach the right voices.
      </p>
    </div>

    <div class="form-field form-field--full">
      <label class="field-label" for="number-of-influencers">Number of influencers</label>
      <div class="influencer-count-controls">
        <InputText
          id="number-of-influencers"
          v-model.number="numberOfInfluencersValue as any"
          type="number"
          :min="10"
          :max="500"
          class="influencer-count-input"
        />
        <Slider v-model="numberOfInfluencersValue" :min="10" :max="500" class="w-24" />
        <Message v-if="isInfluencerCountInvalid" severity="error" size="small" variant="simple">
          {{ influencerCountErrorMessage }}
        </Message>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-field">
        <label class="field-label" for="platforms">Preferred platforms</label>
        <MultiSelect
          id="platforms"
          display="chip"
          :modelValue="modelValue.platforms"
          :options="platformOptions"
          placeholder="Select platforms"
          @update:modelValue="updateField('platforms', $event)"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="categories">Categories / Niches</label>
        <MultiSelect
          id="categories"
          display="chip"
          :modelValue="modelValue.categories"
          :options="categoryOptions"
          placeholder="Select categories"
          @update:modelValue="updateField('categories', $event)"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="regions">Regions</label>
        <MultiSelect
          id="regions"
          display="chip"
          :modelValue="modelValue.regions"
          :options="regionOptions"
          placeholder="Select regions"
          @update:modelValue="updateField('regions', $event)"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="audience-size">Audience size</label>
        <Dropdown
          id="audience-size"
          :modelValue="modelValue.audienceSize"
          :options="audienceSizeOptions"
          placeholder="Select an audience tier"
          @update:modelValue="updateField('audienceSize', $event)"
        />
      </div>

      <div class="form-field form-field--full">
        <label class="field-label" for="previous-collaborations"
          >Previous collaborations or mentioned products</label
        >
        <AutoComplete
          id="previous-collaborations"
          v-model="previousCollaborationsValue"
          inputId="previous-collaborations"
          multiple
          fluid
          :typeahead="false"
          :suggestions="suggestions"
          @complete="search"
          placeholder="Type and press Enter to add"
        />
      </div>

      <div class="form-field form-field--full">
        <label class="field-label" for="additional-notes">Additional notes</label>
        <Textarea
          id="additional-notes"
          :modelValue="modelValue.additionalNotes"
          @update:modelValue="updateField('additionalNotes', $event)"
          rows="4"
          auto-resize
          placeholder="Share any extra filters or custom influencer lists."
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import Slider from 'primevue/slider'
import Textarea from 'primevue/textarea'

import type { InfluencerSelection } from '@/types/brief'

const props = defineProps<{
  modelValue: InfluencerSelection
}>()

const emit = defineEmits<{
  'update:modelValue': [value: InfluencerSelection]
}>()

const platformOptions = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Pinterest', 'Twitch']

const categoryOptions = [
  'Beauty & Cosmetics',
  'Fashion & Luxury',
  'Lifestyle',
  'Gaming',
  'Travel',
  'Health & Wellness',
  'Tech & Gadgets',
  'Food & Beverage',
]

const regionOptions = ['North America', 'Europe', 'Middle East', 'Asia Pacific', 'Latin America']

const audienceSizeOptions = [
  'Nano (1k – 10k)',
  'Micro (10k – 100k)',
  'Mid-tier (100k – 500k)',
  'Macro (500k – 1M)',
  'Mega (1M+)',
]

const suggestions = ref<string[]>([])

const numberOfInfluencersValue = ref(props.modelValue.numberOfInfluencers || 10)

// Validation for influencer count
const isInfluencerCountInvalid = computed(() => {
  const value = numberOfInfluencersValue.value
  return value < 10 || value > 500 || isNaN(value)
})

const influencerCountErrorMessage = computed(() => {
  const value = numberOfInfluencersValue.value
  if (isNaN(value)) {
    return 'Please enter a valid number'
  }
  if (value < 10) {
    return 'Number of influencers must be at least 10'
  }
  if (value > 500) {
    return 'Number of influencers must be at most 500'
  }
  return ''
})

// Sync ref with prop changes (from parent)
watch(
  () => props.modelValue.numberOfInfluencers,
  (newValue) => {
    const clampedValue = Math.max(10, Math.min(500, newValue || 10))
    if (clampedValue !== numberOfInfluencersValue.value) {
      numberOfInfluencersValue.value = clampedValue
    }
  },
)

// Watch ref changes and update parent (from user input)
watch(numberOfInfluencersValue, (newValue) => {
  // Only update if value is valid
  if (!isNaN(newValue) && newValue >= 10 && newValue <= 500) {
    updateField('numberOfInfluencers', newValue)
  }
})

const previousCollaborationsValue = computed({
  get: () => props.modelValue.previousCollaborations || [],
  set: (value: string[]) => {
    updateField('previousCollaborations', value)
  },
})

const search = () => {
  // For autocomplete without typehead, we can provide suggestions based on the query
  // For now, we'll return an empty array since typehead is disabled
  // Users can type and press Enter to add items
  suggestions.value = []
}

const updateField = <K extends keyof InfluencerSelection>(
  field: K,
  value: InfluencerSelection[K],
) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  })
}
</script>

<style scoped>
.select-influencers-step {
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

.influencer-count-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.influencer-count-input {
  width: 120px;
}
</style>
