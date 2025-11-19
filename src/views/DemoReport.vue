<template>
  <div class="demo-report-page">
    <Header />
    <div class="report-container">
      <!-- Report Header -->
      <div class="report-header">
        <h1 class="report-title">MICRO-INFLUENCER PERCEPTION REPORT</h1>
        <p class="report-subtitle">Shiseido, Lancôme, and Estée Lauder Analysis</p>
      </div>

      <!-- Brief Section - 2 Column Design -->
      <div class="brief-section">
        <div class="brief-section-content">
          <!-- Left Column -->
          <div class="brief-column">
            <div class="brief-item">
              <p class="brief-label">Report Overview</p>
              <h3 class="brief-title">Context & Objectives</h3>
              <p class="brief-text">
                {{ reportData.report.description }}
              </p>
            </div>

            <div class="brief-item">
              <p class="brief-label">Coverage</p>
              <h3 class="brief-title">Brands & Markets</h3>
              <div class="brief-details">
                <div class="brief-detail-row">
                  <span class="brief-detail-label">Brands:</span>
                  <span class="brief-detail-value">{{ reportData.report.brands.join(', ') }}</span>
                </div>
                <div class="brief-detail-row">
                  <span class="brief-detail-label">Countries:</span>
                  <span class="brief-detail-value">{{ reportData.report.countries.join(', ') }}</span>
                </div>
                <div class="brief-detail-row">
                  <span class="brief-detail-label">Respondents per brand/country:</span>
                  <span class="brief-detail-value">20 influencers</span>
                </div>
                <div class="brief-detail-row">
                  <span class="brief-detail-label">Total respondents:</span>
                  <span class="brief-detail-value">{{ totalRespondents }} influencers</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="brief-column">
            <div class="brief-item">
              <p class="brief-label">Respondent Profile</p>
              <h3 class="brief-title">Demographics</h3>
              <div class="brief-details">
                <div class="brief-detail-group">
                  <p class="brief-detail-label">Age Distribution</p>
                  <ul class="brief-list">
                    <li>18-24 years</li>
                    <li>25-34 years</li>
                    <li>35-44 years</li>
                  </ul>
                </div>
                <div class="brief-detail-group">
                  <p class="brief-detail-label">Follower Count</p>
                  <ul class="brief-list">
                    <li>&lt;1,000 followers</li>
                    <li>1,000-5,000 followers</li>
                    <li>5,000-10,000 followers</li>
                  </ul>
                </div>
                <div class="brief-detail-group">
                  <p class="brief-detail-label">Gender</p>
                  <ul class="brief-list">
                    <li>Female, Male, Other/No answer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Sections Grid - 2 columns on laptop -->
      <div class="report-grid">
        <!-- Demographics: Age Distribution -->
        <Card class="report-card">
          <template #title>Age Distribution</template>
          <template #content>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <Chart
              type="bar"
              :data="ageDistributionChartData"
              :options="ageDistributionOptions"
              class="chart-container"
            />
          </template>
        </Card>

        <!-- Demographics: Gender Distribution -->
        <Card class="report-card">
          <template #title>Gender Distribution</template>
          <template #content>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <Chart
              type="bar"
              :data="genderDistributionChartData"
              :options="genderDistributionOptions"
              class="chart-container"
            />
          </template>
        </Card>

        <!-- Demographics: Follower Count Distribution -->
        <Card class="report-card">
          <template #title>Follower Count Distribution</template>
          <template #content>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <Chart
              type="bar"
              :data="followerCountChartData"
              :options="followerCountOptions"
              class="chart-container"
            />
          </template>
        </Card>

        <!-- Purchase Drivers -->
        <Card class="report-card">
          <template #title>
            Purchase Drivers
            <p class="chart-subtitle">{{ reportData.survey.questions.purchase_drivers.title }}</p>
          </template>
          <template #content>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <Chart
              type="bar"
              :data="purchaseDriversChartData"
              :options="purchaseDriversOptions"
              class="chart-container"
            />
          </template>
        </Card>

        <!-- Other Brands Purchased -->
        <Card class="report-card">
          <template #title>
            Other Brands Purchased
            <p class="chart-subtitle">{{ reportData.survey.questions.other_brands_purchased.title }}</p>
          </template>
          <template #content>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <Chart
              type="bar"
              :data="otherBrandsChartData"
              :options="otherBrandsOptions"
              class="chart-container"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import SelectButton from 'primevue/selectbutton'

// Report data
const reportData = {
  report: {
    description:
      'This report analyzes the perception of Shiseido, Lancôme, and Estée Lauder among micro-influencers (follower count <10,000) across Japan (JP), France (FR), and the United States (US). For each brand in every country, 20 influencers were surveyed. Results include demographic variables (age, gender, follower count) and survey questions on purchase drivers and other beauty brands purchased.',
    countries: ['JP', 'FR', 'US'],
    brands: ['Shiseido', 'Lancôme', 'Estée Lauder'],
    demographics: {
      age_distribution: {
        JP: {
          Shiseido: { '18-24': 6, '25-34': 10, '35-44': 4 },
          Lancôme: { '18-24': 5, '25-34': 9, '35-44': 6 },
          'Estée Lauder': { '18-24': 4, '25-34': 8, '35-44': 8 },
        },
        FR: {
          Shiseido: { '18-24': 7, '25-34': 9, '35-44': 4 },
          Lancôme: { '18-24': 6, '25-34': 10, '35-44': 4 },
          'Estée Lauder': { '18-24': 5, '25-34': 9, '35-44': 6 },
        },
        US: {
          Shiseido: { '18-24': 8, '25-34': 7, '35-44': 5 },
          Lancôme: { '18-24': 6, '25-34': 8, '35-44': 6 },
          'Estée Lauder': { '18-24': 5, '25-34': 8, '35-44': 7 },
        },
      },
      gender_distribution: {
        JP: {
          Shiseido: { female: 15, male: 3, 'other/no_answer': 2 },
          Lancôme: { female: 16, male: 2, 'other/no_answer': 2 },
          'Estée Lauder': { female: 14, male: 4, 'other/no_answer': 2 },
        },
        FR: {
          Shiseido: { female: 14, male: 4, 'other/no_answer': 2 },
          Lancôme: { female: 15, male: 3, 'other/no_answer': 2 },
          'Estée Lauder': { female: 14, male: 5, 'other/no_answer': 1 },
        },
        US: {
          Shiseido: { female: 13, male: 5, 'other/no_answer': 2 },
          Lancôme: { female: 12, male: 6, 'other/no_answer': 2 },
          'Estée Lauder': { female: 14, male: 4, 'other/no_answer': 2 },
        },
      },
      follower_count_distribution: {
        JP: {
          Shiseido: { '<1000': 4, '1000-5000': 11, '5000-10000': 5 },
          Lancôme: { '<1000': 5, '1000-5000': 10, '5000-10000': 5 },
          'Estée Lauder': { '<1000': 3, '1000-5000': 11, '5000-10000': 6 },
        },
        FR: {
          Shiseido: { '<1000': 6, '1000-5000': 9, '5000-10000': 5 },
          Lancôme: { '<1000': 4, '1000-5000': 10, '5000-10000': 6 },
          'Estée Lauder': { '<1000': 5, '1000-5000': 9, '5000-10000': 6 },
        },
        US: {
          Shiseido: { '<1000': 5, '1000-5000': 10, '5000-10000': 5 },
          Lancôme: { '<1000': 4, '1000-5000': 9, '5000-10000': 7 },
          'Estée Lauder': { '<1000': 3, '1000-5000': 10, '5000-10000': 7 },
        },
      },
    },
  },
  survey: {
    questions: {
      purchase_drivers: {
        title:
          'Shiseido and Estée Lauder customers prioritize product ingredients and performance, while Lancôme customers show the strongest bias toward brand reputation and heritage.',
        question_text: 'What are the 3 main drivers to purchase products from this brand?',
        answers: {
          JP: {
            Shiseido: {
              'Scientific proof of efficacy': 10,
              'Influencer recommendations': 5,
              'Friends/family recommendations': 6,
              'Brand reputation and heritage': 9,
              'Price and promotions': 4,
              'Product ingredients': 11,
              'Product performance': 11,
              'Convenience and availability': 4,
            },
            Lancôme: {
              'Scientific proof of efficacy': 9,
              'Influencer recommendations': 8,
              'Friends/family recommendations': 5,
              'Brand reputation and heritage': 11,
              'Price and promotions': 4,
              'Product ingredients': 7,
              'Product performance': 10,
              'Convenience and availability': 6,
            },
            'Estée Lauder': {
              'Scientific proof of efficacy': 8,
              'Influencer recommendations': 7,
              'Friends/family recommendations': 5,
              'Brand reputation and heritage': 10,
              'Price and promotions': 5,
              'Product ingredients': 7,
              'Product performance': 11,
              'Convenience and availability': 7,
            },
          },
          FR: {
            Shiseido: {
              'Scientific proof of efficacy': 8,
              'Influencer recommendations': 6,
              'Friends/family recommendations': 7,
              'Brand reputation and heritage': 8,
              'Price and promotions': 7,
              'Product ingredients': 10,
              'Product performance': 9,
              'Convenience and availability': 5,
            },
            Lancôme: {
              'Scientific proof of efficacy': 9,
              'Influencer recommendations': 7,
              'Friends/family recommendations': 8,
              'Brand reputation and heritage': 13,
              'Price and promotions': 4,
              'Product ingredients': 5,
              'Product performance': 10,
              'Convenience and availability': 4,
            },
            'Estée Lauder': {
              'Scientific proof of efficacy': 8,
              'Influencer recommendations': 6,
              'Friends/family recommendations': 7,
              'Brand reputation and heritage': 12,
              'Price and promotions': 5,
              'Product ingredients': 6,
              'Product performance': 10,
              'Convenience and availability': 6,
            },
          },
          US: {
            Shiseido: {
              'Scientific proof of efficacy': 8,
              'Influencer recommendations': 9,
              'Friends/family recommendations': 6,
              'Brand reputation and heritage': 7,
              'Price and promotions': 6,
              'Product ingredients': 9,
              'Product performance': 10,
              'Convenience and availability': 5,
            },
            Lancôme: {
              'Scientific proof of efficacy': 8,
              'Influencer recommendations': 10,
              'Friends/family recommendations': 6,
              'Brand reputation and heritage': 11,
              'Price and promotions': 5,
              'Product ingredients': 5,
              'Product performance': 10,
              'Convenience and availability': 5,
            },
            'Estée Lauder': {
              'Scientific proof of efficacy': 7,
              'Influencer recommendations': 9,
              'Friends/family recommendations': 6,
              'Brand reputation and heritage': 12,
              'Price and promotions': 5,
              'Product ingredients': 5,
              'Product performance': 11,
              'Convenience and availability': 5,
            },
          },
        },
      },
      other_brands_purchased: {
        title:
          'Across all markets, customers frequently cross-purchase between Shiseido, Lancôme, and Estée Lauder, while Dior, Chanel, and Clinique remain the leading external alternatives.',
        question_text: 'Which other brands do you buy?',
        answers: {
          JP: {
            Shiseido: {
              Shiseido: 0,
              Lancôme: 7,
              'Estée Lauder': 6,
              Dior: 7,
              Chanel: 6,
              Clarins: 3,
              Clinique: 8,
              'SK-II': 12,
              "Kiehl's": 9,
              Guerlain: 4,
              'La Roche-Posay': 6,
            },
            Lancôme: {
              Shiseido: 6,
              Lancôme: 0,
              'Estée Lauder': 8,
              Dior: 9,
              Chanel: 8,
              Clarins: 4,
              Clinique: 7,
              'SK-II': 10,
              "Kiehl's": 8,
              Guerlain: 5,
              'La Roche-Posay': 7,
            },
            'Estée Lauder': {
              Shiseido: 7,
              Lancôme: 9,
              'Estée Lauder': 0,
              Dior: 8,
              Chanel: 7,
              Clarins: 3,
              Clinique: 9,
              'SK-II': 9,
              "Kiehl's": 10,
              Guerlain: 4,
              'La Roche-Posay': 6,
            },
          },
          FR: {
            Shiseido: {
              Shiseido: 0,
              Lancôme: 13,
              'Estée Lauder': 11,
              Dior: 11,
              Chanel: 12,
              Clarins: 9,
              Clinique: 7,
              'SK-II': 2,
              "Kiehl's": 6,
              Guerlain: 10,
              'La Roche-Posay': 11,
            },
            Lancôme: {
              Shiseido: 9,
              Lancôme: 0,
              'Estée Lauder': 12,
              Dior: 13,
              Chanel: 14,
              Clarins: 10,
              Clinique: 8,
              'SK-II': 1,
              "Kiehl's": 7,
              Guerlain: 11,
              'La Roche-Posay': 12,
            },
            'Estée Lauder': {
              Shiseido: 8,
              Lancôme: 12,
              'Estée Lauder': 0,
              Dior: 12,
              Chanel: 13,
              Clarins: 8,
              Clinique: 9,
              'SK-II': 2,
              "Kiehl's": 7,
              Guerlain: 10,
              'La Roche-Posay': 10,
            },
          },
          US: {
            Shiseido: {
              Shiseido: 0,
              Lancôme: 9,
              'Estée Lauder': 10,
              Dior: 9,
              Chanel: 8,
              Clarins: 4,
              Clinique: 11,
              'SK-II': 5,
              "Kiehl's": 12,
              Guerlain: 3,
              'La Roche-Posay': 10,
            },
            Lancôme: {
              Shiseido: 8,
              Lancôme: 0,
              'Estée Lauder': 11,
              Dior: 10,
              Chanel: 9,
              Clarins: 5,
              Clinique: 12,
              'SK-II': 4,
              "Kiehl's": 13,
              Guerlain: 3,
              'La Roche-Posay': 11,
            },
            'Estée Lauder': {
              Shiseido: 7,
              Lancôme: 10,
              'Estée Lauder': 0,
              Dior: 11,
              Chanel: 10,
              Clarins: 6,
              Clinique: 13,
              'SK-II': 4,
              "Kiehl's": 14,
              Guerlain: 4,
              'La Roche-Posay': 12,
            },
          },
        },
      },
    },
  },
}

// Country selector
const selectedCountry = ref<string | null>('Global')
const countryOptions = [
  { label: 'Global', value: 'Global' },
  { label: 'Japan', value: 'JP' },
  { label: 'France', value: 'FR' },
  { label: 'United States', value: 'US' },
]

// Computed total respondents
const totalRespondents = computed(() => {
  return reportData.report.countries.length * reportData.report.brands.length * 20
})

// Helper function to aggregate data across countries
function aggregateData<T>(
  dataByCountry: Record<string, Record<string, T>>,
  aggregator: (values: T[]) => T
): Record<string, T> {
  const result: Record<string, T> = {}
  const keys = Object.keys(dataByCountry[Object.keys(dataByCountry)[0]])

  for (const key of keys) {
    const values = Object.values(dataByCountry).map((countryData) => countryData[key])
    result[key] = aggregator(values)
  }

  return result
}

// Helper to sum numbers
function sumNumbers(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0)
}

// Age Distribution Chart
const ageDistributionChartData = computed(() => {
  const ageGroups = ['18-24', '25-34', '35-44']
  const brands = reportData.report.brands

  if (selectedCountry.value === 'Global') {
    // Aggregate across all countries
    const aggregated: Record<string, Record<string, number>> = {}
    for (const brand of brands) {
      aggregated[brand] = {}
      for (const age of ageGroups) {
        aggregated[brand][age] = sumNumbers(
          reportData.report.countries.map((country) => {
            return reportData.report.demographics.age_distribution[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][age as '18-24' | '25-34' | '35-44']
          })
        )
      }
    }

    return {
      labels: ageGroups,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: ageGroups.map((age) => aggregated[brand][age]),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    return {
      labels: ageGroups,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: ageGroups.map(
          (age) =>
            reportData.report.demographics.age_distribution[country][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][age as '18-24' | '25-34' | '35-44']
        ),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  }
})

const ageDistributionOptions = ref({
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Gender Distribution Chart
const genderDistributionChartData = computed(() => {
  const genders = ['female', 'male', 'other/no_answer']
  const genderLabels = ['Female', 'Male', 'Other/No answer']
  const brands = reportData.report.brands

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, Record<string, number>> = {}
    for (const brand of brands) {
      aggregated[brand] = {}
      for (const gender of genders) {
        aggregated[brand][gender] = sumNumbers(
          reportData.report.countries.map((country) => {
            return reportData.report.demographics.gender_distribution[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][gender as 'female' | 'male' | 'other/no_answer']
          })
        )
      }
    }

    return {
      labels: genderLabels,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: genders.map((gender) => aggregated[brand][gender]),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    return {
      labels: genderLabels,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: genders.map(
          (gender) =>
            reportData.report.demographics.gender_distribution[country][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][gender as 'female' | 'male' | 'other/no_answer']
        ),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  }
})

const genderDistributionOptions = ref({
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Follower Count Distribution Chart
const followerCountChartData = computed(() => {
  const ranges = ['<1000', '1000-5000', '5000-10000']
  const rangeLabels = ['<1,000', '1,000-5,000', '5,000-10,000']
  const brands = reportData.report.brands

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, Record<string, number>> = {}
    for (const brand of brands) {
      aggregated[brand] = {}
      for (const range of ranges) {
        aggregated[brand][range] = sumNumbers(
          reportData.report.countries.map((country) => {
            return reportData.report.demographics.follower_count_distribution[
              country as 'JP' | 'FR' | 'US'
            ][brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'][
              range as '<1000' | '1000-5000' | '5000-10000'
            ]
          })
        )
      }
    }

    return {
      labels: rangeLabels,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: ranges.map((range) => aggregated[brand][range]),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    return {
      labels: rangeLabels,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: ranges.map(
          (range) =>
            reportData.report.demographics.follower_count_distribution[country][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][range as '<1000' | '1000-5000' | '5000-10000']
        ),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  }
})

const followerCountOptions = ref({
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Purchase Drivers Chart
const purchaseDriversChartData = computed(() => {
  const brands = reportData.report.brands
  const drivers = [
    'Scientific proof of efficacy',
    'Influencer recommendations',
    'Friends/family recommendations',
    'Brand reputation and heritage',
    'Price and promotions',
    'Product ingredients',
    'Product performance',
    'Convenience and availability',
  ]

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, Record<string, number>> = {}
    for (const brand of brands) {
      aggregated[brand] = {}
      for (const driver of drivers) {
        aggregated[brand][driver] = sumNumbers(
          reportData.report.countries.map((country) => {
            return (
              reportData.survey.questions.purchase_drivers.answers[country as 'JP' | 'FR' | 'US'][
                brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
              ][driver as keyof typeof reportData.survey.questions.purchase_drivers.answers.JP.Shiseido] as number
            )
          })
        )
      }
    }

    return {
      labels: drivers,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: drivers.map((driver) => aggregated[brand][driver]),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    return {
      labels: drivers,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: drivers.map(
          (driver) =>
            reportData.survey.questions.purchase_drivers.answers[country][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][driver as keyof typeof reportData.survey.questions.purchase_drivers.answers.JP.Shiseido] as number
        ),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  }
})

const purchaseDriversOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 2,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Other Brands Purchased Chart
const otherBrandsChartData = computed(() => {
  const brands = reportData.report.brands
  const otherBrands = [
    'Shiseido',
    'Lancôme',
    'Estée Lauder',
    'Dior',
    'Chanel',
    'Clarins',
    'Clinique',
    'SK-II',
    "Kiehl's",
    'Guerlain',
    'La Roche-Posay',
  ]

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, Record<string, number>> = {}
    for (const brand of brands) {
      aggregated[brand] = {}
      for (const otherBrand of otherBrands) {
        aggregated[brand][otherBrand] = sumNumbers(
          reportData.report.countries.map((country) => {
            return (
              reportData.survey.questions.other_brands_purchased.answers[country as 'JP' | 'FR' | 'US'][
                brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
              ][otherBrand as keyof typeof reportData.survey.questions.other_brands_purchased.answers.JP.Shiseido] as number
            )
          })
        )
      }
    }

    return {
      labels: otherBrands,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: otherBrands.map((otherBrand) => aggregated[brand][otherBrand]),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    return {
      labels: otherBrands,
      datasets: brands.map((brand, index) => ({
        label: brand,
        data: otherBrands.map(
          (otherBrand) =>
            reportData.survey.questions.other_brands_purchased.answers[country][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][otherBrand as keyof typeof reportData.survey.questions.other_brands_purchased.answers.JP.Shiseido] as number
        ),
        backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'][index],
      })),
    }
  }
})

const otherBrandsOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})
</script>

<style scoped>
.demo-report-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.report-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
}

.report-header {
  text-align: center;
  margin-bottom: 40px;
}

.report-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.report-subtitle {
  font-size: 20px;
  color: #666;
  font-weight: 500;
}

/* Brief Section - Matching Write Brief Design */
.brief-section {
  border-radius: 24px;
  background: #ffffff;
  padding: 40px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
  margin-bottom: 32px;
}

.brief-section-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

.brief-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brief-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brief-label {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6348ed;
  font-weight: 600;
  margin: 0;
}

.brief-title {
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
}

.brief-text {
  font-size: 15px;
  line-height: 1.6;
  color: #475569;
  margin: 0;
}

.brief-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brief-detail-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brief-detail-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.brief-detail-label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  font-weight: 600;
  margin: 0;
}

.brief-detail-value {
  font-size: 15px;
  color: #1f2937;
  line-height: 1.5;
}

.brief-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.brief-list li {
  position: relative;
  padding-left: 18px;
  font-size: 15px;
  color: #475569;
  line-height: 1.5;
}

.brief-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  font-size: 18px;
  color: #6348ed;
  font-weight: 600;
  line-height: 1;
}

.report-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 32px;
}

.report-card {
  height: 100%;
}

.chart-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.country-selector {
  font-size: 14px;
}

.chart-container {
  height: 400px;
  margin-top: 16px;
}

.chart-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  margin: 8px 0 0 0;
  line-height: 1.5;
}

/* Laptop and larger screens - 2 columns */
@media (min-width: 1024px) {
  .report-grid {
    grid-template-columns: 1fr 1fr;
  }

  .brief-section-content {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .brief-section {
    padding: 48px;
  }

  .report-container {
    padding: 48px 32px;
  }

  .report-title {
    font-size: 40px;
  }

  .report-subtitle {
    font-size: 24px;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .brief-section {
    padding: 32px 24px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .report-container {
    padding: 24px 16px;
  }

  .report-title {
    font-size: 24px;
  }

  .report-subtitle {
    font-size: 18px;
  }

  .brief-section {
    padding: 24px 16px;
    border-radius: 16px;
  }

  .brief-section-content {
    gap: 24px;
  }

  .chart-container {
    height: 300px;
  }

  .country-selector {
    font-size: 12px;
  }
}
</style>
