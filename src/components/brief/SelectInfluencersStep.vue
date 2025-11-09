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
          filter
          placeholder="Select countries"
          @update:modelValue="briefStore.updateSelectionField('regions', $event ?? [])"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="audience-size">Audience size</label>
        <Dropdown
          id="audience-size"
          :modelValue="briefStore.selection.audienceSize"
          :options="audienceSizeOptions"
          placeholder="Select an audience tier"
          @update:modelValue="briefStore.updateSelectionField('audienceSize', $event ?? '')"
        />
      </div>

      <div class="form-field">
        <label class="field-label" for="gender">Gender</label>
        <MultiSelect
          id="gender"
          display="chip"
          :modelValue="briefStore.selection.gender"
          :options="genderOptions"
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
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import Slider from 'primevue/slider'
import Textarea from 'primevue/textarea'
import { useBriefStore } from '@/stores/brief'

const briefStore = useBriefStore()

const platformOptions = [
  'Instagram',
  'TikTok',
  'YouTube',
  'LinkedIn',
  'Twitter',
  'Twitch',
  'Red',
  'Facebook',
  'WeChat',
  'Douyin',
]

const groupedCategories = [
  {
    label: 'Core lifestyle & personal interests',
    items: [
      'Beauty & Cosmetics',
      'Fashion & Luxury',
      'Lifestyle',
      'Health & Wellness',
      'Fitness & Sports',
      'Nutrition & Diet',
      'Mental Health',
      'Parenting & Family',
      'Relationships & Dating',
      'Self-Improvement & Motivation',
    ],
  },
  {
    label: 'Entertainment & culture',
    items: [
      'Gaming',
      'Movies & TV',
      'Music',
      'Art & Design',
      'Photography',
      'Books & Literature',
      'Pop Culture',
      'Celebrities & Influencers',
    ],
  },
  {
    label: 'Travel & experiences',
    items: ['Travel', 'Adventure & Outdoors', 'Hospitality & Tourism', 'Sustainable Travel'],
  },
  {
    label: 'Technology & innovation',
    items: [
      'Tech & Gadgets',
      'AI & Innovation',
      'Science & Education',
      'Automotive',
      'Cryptocurrency & Blockchain',
      'Finance & Investing',
      'Startups & Entrepreneurship',
    ],
  },
  {
    label: 'Food & drink',
    items: [
      'Food & Beverage',
      'Cooking & Recipes',
      'Wine, Beer & Spirits',
      'Restaurants & Dining',
      'Vegan & Plant-Based Living',
    ],
  },
  {
    label: 'Home & lifestyle',
    items: [
      'Home Decor & Interior Design',
      'DIY & Crafts',
      'Gardening',
      'Pets & Animals',
      'Real Estate',
    ],
  },
  {
    label: 'Social & environmental topics',
    items: [
      'Sustainability & Environment',
      'Charity & Social Causes',
      'Politics & Activism',
      'Education & Learning',
    ],
  },
  {
    label: 'Professional & business',
    items: [
      'Career & Productivity',
      'Marketing & Advertising',
      'E-Commerce & Retail',
      'Events & Conferences',
    ],
  },
  {
    label: 'Other niches',
    items: [
      'Luxury Lifestyle',
      'Weddings & Events',
      'Spirituality & Mindfulness',
      "Men's Lifestyle",
      "Women's Lifestyle",
      'Youth & Student Life',
      'Other',
    ],
  },
]

const countryOptions = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]

const audienceSizeOptions = [
  'Nano (1k – 10k)',
  'Micro (10k – 100k)',
  'Mid-tier (100k – 500k)',
  'Macro (500k – 1M)',
  'Mega (1M+)',
]

const genderOptions = ['Male', 'Female', 'Other']

const contentFormatOptions = ['Video', 'Reels', 'Photos', 'Live streams', 'Blog', 'Podcast']

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
