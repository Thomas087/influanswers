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
        <Slider
          v-model="numberOfInfluencersValue"
          :min="10"
          :max="500"
          class="influencer-count-slider"
        />
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
          :modelValue="briefStore.selection.platforms"
          :options="platformOptions"
          optionLabel="label"
          optionValue="value"
          filter
          placeholder="Select platforms"
          @update:modelValue="briefStore.updateSelectionField('platforms', $event ?? [])"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="categories">Categories / Niches</label>
        <MultiSelect
          id="categories"
          v-model="selectedCategories"
          :options="groupedCategories"
          filter
          optionGroupLabel="label"
          optionGroupChildren="items"
          optionLabel="label"
          optionValue="value"
          display="chip"
          placeholder="Select categories"
          class="w-full"
        >
          <template #optiongroup="slotProps">
            <div class="flex items-center">
              <div class="font-semibold">{{ slotProps.option.label }}</div>
            </div>
          </template>
        </MultiSelect>
      </div>

      <div class="form-field">
        <label class="field-label" for="regions">Countries</label>
        <MultiSelect
          id="regions"
          display="chip"
          :modelValue="briefStore.selection.regions"
          :options="countryOptions"
          optionLabel="label"
          optionValue="value"
          filter
          placeholder="Select countries"
          @update:modelValue="briefStore.updateSelectionField('regions', $event ?? [])"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="audience-size">Audience size</label>
        <MultiSelect
          id="audience-size"
          display="chip"
          :modelValue="briefStore.selection.audienceSize"
          :options="audienceSizeOptions"
          optionLabel="label"
          optionValue="value"
          filter
          placeholder="Select audience tiers"
          @update:modelValue="briefStore.updateSelectionField('audienceSize', $event ?? [])"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="gender">Gender</label>
        <MultiSelect
          id="gender"
          display="chip"
          :modelValue="briefStore.selection.gender"
          :options="genderOptions"
          optionLabel="label"
          optionValue="value"
          filter
          placeholder="Select gender"
          @update:modelValue="briefStore.updateSelectionField('gender', $event ?? [])"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="content-format">Content format</label>
        <MultiSelect
          id="content-format"
          display="chip"
          :modelValue="briefStore.selection.contentFormat"
          :options="contentFormatOptions"
          optionLabel="label"
          optionValue="value"
          filter
          placeholder="Select content format"
          @update:modelValue="briefStore.updateSelectionField('contentFormat', $event ?? [])"
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
          :suggestions="[]"
          placeholder="Type and press Enter to add"
        />
      </div>

      <div class="form-field form-field--full">
        <label class="field-label" for="additional-notes">Additional notes</label>
        <Textarea
          id="additional-notes"
          :modelValue="briefStore.selection.additionalNotes"
          @update:modelValue="briefStore.updateSelectionField('additionalNotes', $event ?? '')"
          rows="4"
          auto-resize
          placeholder="Share any extra filters or custom influencer lists."
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import Slider from 'primevue/slider'
import Textarea from 'primevue/textarea'
import { useBriefStore } from '@/stores/brief'
import { countryOptions } from '@/lib/countries'
import { audienceSizeOptions } from '@/lib/audience-sizes'
import { genderOptions } from '@/lib/genders'
import { platformOptions } from '@/lib/platforms'
import { contentFormatOptions } from '@/lib/content-formats'
import { groupedCategories } from '@/lib/categories'

const briefStore = useBriefStore()

const numberOfInfluencersValue = computed({
  get: () => briefStore.selection.numberOfInfluencers,
  set: (value: number) => briefStore.updateSelectionField('numberOfInfluencers', value),
})

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

const previousCollaborationsValue = computed({
  get: () => briefStore.selection.previousCollaborations,
  set: (value: string[]) => briefStore.updateSelectionField('previousCollaborations', value),
})

const selectedCategories = computed({
  get: () => briefStore.selection.categories,
  set: (value: string[]) => briefStore.updateSelectionField('categories', value),
})
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

.influencer-count-slider {
  max-width: 150px;
}
</style>
