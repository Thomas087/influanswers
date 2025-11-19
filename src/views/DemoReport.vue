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
              <p class="brief-text">
                {{ reportData.report.description }}
              </p>
            </div>

            <div class="brief-item">
              <p class="brief-label">Coverage</p>
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

            <div class="brief-item">
              <p class="brief-label">Survey Questions</p>
              <div class="questions-container">
                <div
                  v-for="(question, index) in surveyQuestions"
                  :key="index"
                  class="question-item"
                >
                  <span class="question-number">{{ index + 1 }}</span>
                  <span class="question-text">{{ question }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="brief-column">
            <div class="brief-item">
              <p class="brief-label">Respondent Profile</p>
              <div class="brief-details">
                <div class="brief-detail-group">
                  <div class="chart-controls-small">
                    <SelectButton
                      v-model="selectedCountry"
                      :options="countryOptions"
                      optionLabel="label"
                      optionValue="value"
                      class="country-selector-small"
                    />
                  </div>
                </div>
                <div class="brief-detail-group">
                  <p class="brief-detail-label">Age Distribution</p>
                  <Chart
                    type="pie"
                    :data="ageDistributionPieData"
                    :options="ageDistributionPieOptions"
                    class="brief-chart"
                  />
                </div>
                <div class="brief-detail-group">
                  <p class="brief-detail-label">Gender Distribution</p>
                  <Chart
                    type="pie"
                    :data="genderDistributionPieData"
                    :options="genderDistributionPieOptions"
                    class="brief-chart"
                  />
                </div>
                <div class="brief-detail-group">
                  <p class="brief-detail-label">Follower Count</p>
                  <Chart
                    type="pie"
                    :data="followerCountPieData"
                    :options="followerCountPieOptions"
                    class="brief-chart"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Purchase Drivers Section -->
      <div class="report-section">
        <Card class="question-section-card">
          <template #content>
            <div class="section-header">
              <p class="section-insight">{{ reportData.survey.questions.purchase_drivers.title }}</p>
            </div>
            <div class="question-text">{{ reportData.survey.questions.purchase_drivers.question_text }}</div>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <div class="brands-grid">
              <Card
                v-for="brand in reportData.report.brands"
                :key="`purchase-${brand}`"
                class="brand-card"
              >
                <template #title>{{ brand }}</template>
                <template #content>
                  <Chart
                    type="bar"
                    :data="getPurchaseDriversDataForBrand(brand)"
                    :options="purchaseDriversOptions"
                    class="chart-container"
                  />
                </template>
              </Card>
            </div>
          </template>
        </Card>
      </div>

      <!-- Product Launch Awareness Section -->
      <div class="report-section">
        <Card class="question-section-card">
          <template #content>
            <div class="section-header">
              <p class="section-insight">{{ reportData.survey.questions.product_launch_awareness.title }}</p>
            </div>
            <div class="question-text">{{ reportData.survey.questions.product_launch_awareness.question_text }}</div>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <div class="brands-grid">
              <Card
                v-for="brand in reportData.report.brands"
                :key="`launch-awareness-${brand}`"
                class="brand-card"
              >
                <template #title>{{ brand }}</template>
                <template #content>
                  <Chart
                    type="bar"
                    :data="getProductLaunchAwarenessDataForBrand(brand)"
                    :options="productLaunchAwarenessOptions"
                    class="chart-container"
                  />
                </template>
              </Card>
            </div>
          </template>
        </Card>
      </div>

      <!-- Other Brands Purchased Section -->
      <div class="report-section">
        <Card class="question-section-card">
          <template #content>
            <div class="section-header">
              <p class="section-insight">{{ reportData.survey.questions.other_brands_purchased.title }}</p>
            </div>
            <div class="question-text">{{ reportData.survey.questions.other_brands_purchased.question_text }}</div>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <div class="brands-grid">
              <Card
                v-for="brand in reportData.report.brands"
                :key="`brands-${brand}`"
                class="brand-card"
              >
                <template #title>{{ brand }}</template>
                <template #content>
                  <Chart
                    type="bar"
                    :data="getOtherBrandsDataForBrand(brand)"
                    :options="otherBrandsOptions"
                    class="chart-container"
                  />
                </template>
              </Card>
            </div>
          </template>
        </Card>
      </div>

      <!-- Product Obtainment Section -->
      <div class="report-section">
        <Card class="question-section-card">
          <template #content>
            <div class="section-header">
              <p class="section-insight">{{ reportData.survey.questions.product_obtainment.title }}</p>
            </div>
            <div class="question-text">{{ reportData.survey.questions.product_obtainment.question_text }}</div>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <div class="brands-grid">
              <Card
                v-for="brand in reportData.report.brands"
                :key="`obtainment-${brand}`"
                class="brand-card"
              >
                <template #title>{{ brand }}</template>
                <template #content>
                  <Chart
                    type="bar"
                    :data="getProductObtainmentDataForBrand(brand)"
                    :options="productObtainmentOptions"
                    class="chart-container"
                  />
                </template>
              </Card>
            </div>
          </template>
        </Card>
      </div>

      <!-- Product Categories Section -->
      <div class="report-section">
        <Card class="question-section-card">
          <template #content>
            <div class="section-header">
              <p class="section-insight">{{ reportData.survey.questions.product_categories.title }}</p>
            </div>
            <div class="question-text">{{ reportData.survey.questions.product_categories.question_text }}</div>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <div class="brands-grid">
              <Card
                v-for="brand in reportData.report.brands"
                :key="`categories-${brand}`"
                class="brand-card"
              >
                <template #title>{{ brand }}</template>
                <template #content>
                  <Chart
                    type="bar"
                    :data="getProductCategoriesDataForBrand(brand)"
                    :options="productCategoriesOptions"
                    class="chart-container"
                  />
                </template>
              </Card>
            </div>
          </template>
        </Card>
      </div>

      <!-- Collaboration Interest Section -->
      <div class="report-section">
        <Card class="question-section-card">
          <template #content>
            <div class="section-header">
              <p class="section-insight">{{ reportData.survey.questions.collaboration_interest.title }}</p>
            </div>
            <div class="question-text">{{ reportData.survey.questions.collaboration_interest.question_text }}</div>
            <div class="chart-controls">
              <SelectButton
                v-model="selectedCountry"
                :options="countryOptions"
                optionLabel="label"
                optionValue="value"
                class="country-selector"
              />
            </div>
            <div class="brands-grid">
              <Card
                v-for="brand in reportData.report.brands"
                :key="`collaboration-${brand}`"
                class="brand-card"
              >
                <template #title>{{ brand }}</template>
                <template #content>
                  <Chart
                    type="bar"
                    :data="getCollaborationInterestDataForBrand(brand)"
                    :options="collaborationInterestOptions"
                    class="chart-container"
                  />
                </template>
              </Card>
            </div>
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
      product_obtainment: {
        title:
          'Online shopping dominates across all markets, with brand-owned stores showing stronger presence in home markets. Brand gifting and seeding programs remain minimal across all brands.',
        question_text: 'How do you usually obtain products from this brand?',
        answers: {
          JP: {
            Shiseido: {
              'Purchase online': 8,
              'Purchase in a brand-owned store': 9,
              'Purchase from a third-party retailer': 3,
              'Receive products through brand gifting or seeding': 0,
            },
            Lancôme: {
              'Purchase online': 9,
              'Purchase in a brand-owned store': 6,
              'Purchase from a third-party retailer': 5,
              'Receive products through brand gifting or seeding': 0,
            },
            'Estée Lauder': {
              'Purchase online': 10,
              'Purchase in a brand-owned store': 4,
              'Purchase from a third-party retailer': 5,
              'Receive products through brand gifting or seeding': 1,
            },
          },
          FR: {
            Shiseido: {
              'Purchase online': 9,
              'Purchase in a brand-owned store': 5,
              'Purchase from a third-party retailer': 6,
              'Receive products through brand gifting or seeding': 0,
            },
            Lancôme: {
              'Purchase online': 7,
              'Purchase in a brand-owned store': 10,
              'Purchase from a third-party retailer': 3,
              'Receive products through brand gifting or seeding': 0,
            },
            'Estée Lauder': {
              'Purchase online': 9,
              'Purchase in a brand-owned store': 5,
              'Purchase from a third-party retailer': 5,
              'Receive products through brand gifting or seeding': 1,
            },
          },
          US: {
            Shiseido: {
              'Purchase online': 11,
              'Purchase in a brand-owned store': 3,
              'Purchase from a third-party retailer': 6,
              'Receive products through brand gifting or seeding': 0,
            },
            Lancôme: {
              'Purchase online': 10,
              'Purchase in a brand-owned store': 4,
              'Purchase from a third-party retailer': 5,
              'Receive products through brand gifting or seeding': 1,
            },
            'Estée Lauder': {
              'Purchase online': 10,
              'Purchase in a brand-owned store': 5,
              'Purchase from a third-party retailer': 4,
              'Receive products through brand gifting or seeding': 1,
            },
          },
        },
      },
      product_categories: {
        title:
          'Skincare dominates usage across all three brands, with Shiseido showing the strongest sun care adoption. Lancôme and Estée Lauder customers show higher engagement with makeup and fragrance categories.',
        question_text: 'Which product categories from this brand do you use most frequently?',
        answers: {
          JP: {
            Shiseido: {
              skincare: 14,
              makeup: 6,
              fragrance: 2,
              'sun care': 10,
              'body care': 1,
            },
            Lancôme: {
              skincare: 12,
              makeup: 9,
              fragrance: 8,
            },
            'Estée Lauder': {
              skincare: 13,
              makeup: 8,
              fragrance: 7,
            },
          },
          FR: {
            Shiseido: {
              skincare: 13,
              makeup: 5,
              fragrance: 3,
              'sun care': 9,
              'body care': 1,
            },
            Lancôme: {
              skincare: 11,
              makeup: 10,
              fragrance: 9,
            },
            'Estée Lauder': {
              skincare: 12,
              makeup: 9,
              fragrance: 8,
            },
          },
          US: {
            Shiseido: {
              skincare: 12,
              makeup: 6,
              fragrance: 2,
              'sun care': 11,
              'body care': 1,
            },
            Lancôme: {
              skincare: 10,
              makeup: 11,
              fragrance: 9,
            },
            'Estée Lauder': {
              skincare: 11,
              makeup: 10,
              fragrance: 9,
            },
          },
        },
      },
      product_launch_awareness: {
        title:
          'Social media ads and influencers are the primary channels for product launch awareness across all brands. In-store consultants show stronger influence in Japan and France, while brand official channels are consistently important across markets.',
        question_text: 'How do you first hear about new product launches from this brand?',
        answers: {
          JP: {
            Shiseido: {
              influencers: 5,
              'social media ads': 6,
              'friends/family': 2,
              "brand's official channels": 3,
              'in-store consultants': 3,
              'beauty magazines/blogs': 1,
            },
            Lancôme: {
              influencers: 4,
              'social media ads': 6,
              'friends/family': 2,
              "brand's official channels": 3,
              'in-store consultants': 3,
              'beauty magazines/blogs': 2,
            },
            'Estée Lauder': {
              influencers: 5,
              'social media ads': 5,
              'friends/family': 2,
              "brand's official channels": 4,
              'in-store consultants': 2,
              'beauty magazines/blogs': 2,
            },
          },
          FR: {
            Shiseido: {
              influencers: 4,
              'social media ads': 5,
              'friends/family': 2,
              "brand's official channels": 3,
              'in-store consultants': 4,
              'beauty magazines/blogs': 2,
            },
            Lancôme: {
              influencers: 3,
              'social media ads': 5,
              'friends/family': 2,
              "brand's official channels": 4,
              'in-store consultants': 4,
              'beauty magazines/blogs': 2,
            },
            'Estée Lauder': {
              influencers: 4,
              'social media ads': 4,
              'friends/family': 2,
              "brand's official channels": 4,
              'in-store consultants': 3,
              'beauty magazines/blogs': 3,
            },
          },
          US: {
            Shiseido: {
              influencers: 5,
              'social media ads': 6,
              'friends/family': 3,
              "brand's official channels": 3,
              'in-store consultants': 1,
              'beauty magazines/blogs': 2,
            },
            Lancôme: {
              influencers: 4,
              'social media ads': 7,
              'friends/family': 2,
              "brand's official channels": 3,
              'in-store consultants': 2,
              'beauty magazines/blogs': 2,
            },
            'Estée Lauder': {
              influencers: 6,
              'social media ads': 5,
              'friends/family': 2,
              "brand's official channels": 3,
              'in-store consultants': 1,
              'beauty magazines/blogs': 3,
            },
          },
        },
      },
      collaboration_interest: {
        title:
          'Long-term ambassadorship and paid posts are the most sought-after collaboration types across all brands. Early access to new launches and co-creation opportunities show strong interest, particularly for Estée Lauder. Product gifting remains popular as an entry-level collaboration option.',
        question_text: 'What type of collaboration with this brand would interest you the most?',
        answers: {
          JP: {
            Shiseido: {
              'product gifting': 4,
              'paid posts': 5,
              'long-term ambassadorship': 6,
              'event invitations': 2,
              'co-creation opportunities': 2,
              'early access to new launches': 1,
            },
            Lancôme: {
              'product gifting': 3,
              'paid posts': 6,
              'long-term ambassadorship': 5,
              'event invitations': 2,
              'co-creation opportunities': 2,
              'early access to new launches': 2,
            },
            'Estée Lauder': {
              'product gifting': 3,
              'paid posts': 5,
              'long-term ambassadorship': 4,
              'event invitations': 2,
              'co-creation opportunities': 3,
              'early access to new launches': 3,
            },
          },
          FR: {
            Shiseido: {
              'product gifting': 4,
              'paid posts': 5,
              'long-term ambassadorship': 5,
              'event invitations': 3,
              'co-creation opportunities': 2,
              'early access to new launches': 1,
            },
            Lancôme: {
              'product gifting': 3,
              'paid posts': 6,
              'long-term ambassadorship': 6,
              'event invitations': 2,
              'co-creation opportunities': 2,
              'early access to new launches': 1,
            },
            'Estée Lauder': {
              'product gifting': 3,
              'paid posts': 5,
              'long-term ambassadorship': 4,
              'event invitations': 2,
              'co-creation opportunities': 3,
              'early access to new launches': 3,
            },
          },
          US: {
            Shiseido: {
              'product gifting': 3,
              'paid posts': 6,
              'long-term ambassadorship': 5,
              'event invitations': 2,
              'co-creation opportunities': 2,
              'early access to new launches': 2,
            },
            Lancôme: {
              'product gifting': 2,
              'paid posts': 7,
              'long-term ambassadorship': 5,
              'event invitations': 2,
              'co-creation opportunities': 2,
              'early access to new launches': 2,
            },
            'Estée Lauder': {
              'product gifting': 2,
              'paid posts': 5,
              'long-term ambassadorship': 4,
              'event invitations': 2,
              'co-creation opportunities': 4,
              'early access to new launches': 3,
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

// Computed list of all questions in the correct order
const surveyQuestions = computed(() => {
  const questionOrder = [
    'purchase_drivers',
    'product_launch_awareness',
    'other_brands_purchased',
    'product_obtainment',
    'product_categories',
    'collaboration_interest',
  ]
  return questionOrder.map((key) => reportData.survey.questions[key as keyof typeof reportData.survey.questions].question_text)
})

// Helper to sum numbers
function sumNumbers(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0)
}

// Age Distribution Pie Chart - aggregated across all brands
const ageDistributionPieData = computed(() => {
  const ageGroups = ['18-24', '25-34', '35-44']
  const ageLabels = ['18-24', '25-34', '35-44']
  const brands = reportData.report.brands

  if (selectedCountry.value === 'Global') {
    // Aggregate across all countries and all brands
    const aggregated: Record<string, number> = {}
    for (const age of ageGroups) {
      aggregated[age] = 0
      for (const brand of brands) {
        aggregated[age] += sumNumbers(
          reportData.report.countries.map((country) => {
            return reportData.report.demographics.age_distribution[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][age as '18-24' | '25-34' | '35-44']
          })
        )
      }
    }

    return {
      labels: ageLabels,
      datasets: [
        {
          data: ageGroups.map((age) => aggregated[age]),
          backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'],
          borderWidth: 0,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const aggregated: Record<string, number> = {}
    for (const age of ageGroups) {
      aggregated[age] = 0
      for (const brand of brands) {
        aggregated[age] +=
          reportData.report.demographics.age_distribution[country][
            brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
          ][age as '18-24' | '25-34' | '35-44']
      }
    }

    return {
      labels: ageLabels,
      datasets: [
        {
          data: ageGroups.map((age) => aggregated[age]),
          backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'],
          borderWidth: 0,
        },
      ],
    }
  }
})

const ageDistributionPieOptions = ref({
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 10,
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: { label: string; parsed: number; dataset: { data: number[] } }) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return context.label + ': ' + context.parsed + ' (' + percentage + '%)'
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Gender Distribution Pie Chart - aggregated across all brands
const genderDistributionPieData = computed(() => {
  const genders = ['female', 'male', 'other/no_answer']
  const genderLabels = ['Female', 'Male', 'Other/No answer']
  const brands = reportData.report.brands

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, number> = {}
    for (const gender of genders) {
      aggregated[gender] = 0
      for (const brand of brands) {
        aggregated[gender] += sumNumbers(
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
      datasets: [
        {
          data: genders.map((gender) => aggregated[gender]),
          backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'],
          borderWidth: 0,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const aggregated: Record<string, number> = {}
    for (const gender of genders) {
      aggregated[gender] = 0
      for (const brand of brands) {
        aggregated[gender] +=
          reportData.report.demographics.gender_distribution[country][
            brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
          ][gender as 'female' | 'male' | 'other/no_answer']
      }
    }

    return {
      labels: genderLabels,
      datasets: [
        {
          data: genders.map((gender) => aggregated[gender]),
          backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'],
          borderWidth: 0,
        },
      ],
    }
  }
})

const genderDistributionPieOptions = ref({
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 10,
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: { label: string; parsed: number; dataset: { data: number[] } }) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return context.label + ': ' + context.parsed + ' (' + percentage + '%)'
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Follower Count Distribution Pie Chart - aggregated across all brands
const followerCountPieData = computed(() => {
  const ranges = ['<1000', '1000-5000', '5000-10000']
  const rangeLabels = ['<1,000', '1,000-5,000', '5,000-10,000']
  const brands = reportData.report.brands

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, number> = {}
    for (const range of ranges) {
      aggregated[range] = 0
      for (const brand of brands) {
        aggregated[range] += sumNumbers(
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
      datasets: [
        {
          data: ranges.map((range) => aggregated[range]),
          backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'],
          borderWidth: 0,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const aggregated: Record<string, number> = {}
    for (const range of ranges) {
      aggregated[range] = 0
      for (const brand of brands) {
        aggregated[range] +=
          reportData.report.demographics.follower_count_distribution[country][
            brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
          ][range as '<1000' | '1000-5000' | '5000-10000']
      }
    }

    return {
      labels: rangeLabels,
      datasets: [
        {
          data: ranges.map((range) => aggregated[range]),
          backgroundColor: ['#6348ed', '#8b5cf6', '#c4b5fd'],
          borderWidth: 0,
        },
      ],
    }
  }
})

const followerCountPieOptions = ref({
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 10,
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: { label: string; parsed: number; dataset: { data: number[] } }) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return context.label + ': ' + context.parsed + ' (' + percentage + '%)'
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Purchase Drivers Chart - returns data for a specific brand
function getPurchaseDriversDataForBrand(brand: string) {
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

  const brandIndex = reportData.report.brands.indexOf(brand)
  const brandColor = ['#6348ed', '#8b5cf6', '#c4b5fd'][brandIndex]

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, number> = {}
    for (const driver of drivers) {
      aggregated[driver] = sumNumbers(
        reportData.report.countries.map((country) => {
          return (
            reportData.survey.questions.purchase_drivers.answers[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][driver as keyof typeof reportData.survey.questions.purchase_drivers.answers.JP.Shiseido] as number
          )
        })
      )
    }

    // Sort by value in descending order
    const sorted = drivers
      .map((driver) => [driver, aggregated[driver]] as [string, number])
      .sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const data = drivers.map((driver) => [
      driver,
      reportData.survey.questions.purchase_drivers.answers[country][
        brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
      ][driver as keyof typeof reportData.survey.questions.purchase_drivers.answers.JP.Shiseido] as number,
    ] as [string, number])

    // Sort by value in descending order
    const sorted = data.sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  }
}

const purchaseDriversOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
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

// Other Brands Purchased Chart - returns data for a specific brand
function getOtherBrandsDataForBrand(brand: string) {
  const allBrands = [
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

  // Filter out the current brand from the list
  const otherBrands = allBrands.filter((b) => b !== brand)

  const brandIndex = reportData.report.brands.indexOf(brand)
  const brandColor = ['#6348ed', '#8b5cf6', '#c4b5fd'][brandIndex]

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, number> = {}
    for (const otherBrand of otherBrands) {
      aggregated[otherBrand] = sumNumbers(
        reportData.report.countries.map((country) => {
          return (
            reportData.survey.questions.other_brands_purchased.answers[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][otherBrand as keyof typeof reportData.survey.questions.other_brands_purchased.answers.JP.Shiseido] as number
          )
        })
      )
    }

    // Sort by value in descending order
    const sorted = otherBrands
      .map((otherBrand) => [otherBrand, aggregated[otherBrand]] as [string, number])
      .sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const data = otherBrands.map((otherBrand) => [
      otherBrand,
      reportData.survey.questions.other_brands_purchased.answers[country][
        brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
      ][otherBrand as keyof typeof reportData.survey.questions.other_brands_purchased.answers.JP.Shiseido] as number,
    ] as [string, number])

    // Sort by value in descending order
    const sorted = data.sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  }
}

const otherBrandsOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
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

// Product Obtainment Chart - returns data for a specific brand
function getProductObtainmentDataForBrand(brand: string) {
  const options = [
    'Purchase online',
    'Purchase in a brand-owned store',
    'Purchase from a third-party retailer',
    'Receive products through brand gifting or seeding',
  ]

  const brandIndex = reportData.report.brands.indexOf(brand)
  const brandColor = ['#6348ed', '#8b5cf6', '#c4b5fd'][brandIndex]

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, number> = {}
    for (const option of options) {
      aggregated[option] = sumNumbers(
        reportData.report.countries.map((country) => {
          return (
            reportData.survey.questions.product_obtainment.answers[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][option as keyof typeof reportData.survey.questions.product_obtainment.answers.JP.Shiseido] as number
          )
        })
      )
    }

    // Sort by value in descending order
    const sorted = options
      .map((option) => [option, aggregated[option]] as [string, number])
      .sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const data = options.map((option) => [
      option,
      reportData.survey.questions.product_obtainment.answers[country][
        brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
      ][option as keyof typeof reportData.survey.questions.product_obtainment.answers.JP.Shiseido] as number,
    ] as [string, number])

    // Sort by value in descending order
    const sorted = data.sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  }
}

const productObtainmentOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
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

// Product Categories Chart - returns data for a specific brand
function getProductCategoriesDataForBrand(brand: string) {
  const allCategories = ['skincare', 'makeup', 'fragrance', 'sun care', 'body care']

  const brandIndex = reportData.report.brands.indexOf(brand)
  const brandColor = ['#6348ed', '#8b5cf6', '#c4b5fd'][brandIndex]

  if (selectedCountry.value === 'Global') {
    // First, determine which categories exist for this brand by checking any country
    const sampleCountry = 'JP' as 'JP' | 'FR' | 'US'
    const brandData = reportData.survey.questions.product_categories.answers[sampleCountry][
      brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
    ]
    const availableCategories = allCategories.filter((cat) => brandData[cat as keyof typeof brandData] !== undefined)

    const aggregated: Record<string, number> = {}
    for (const category of availableCategories) {
      aggregated[category] = sumNumbers(
        reportData.report.countries.map((country) => {
          const countryData = reportData.survey.questions.product_categories.answers[country as 'JP' | 'FR' | 'US'][
            brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
          ]
          return (countryData[category as keyof typeof countryData] as number) || 0
        })
      )
    }

    // Sort by value in descending order
    const sorted = availableCategories
      .map((category) => [category, aggregated[category]] as [string, number])
      .filter((item) => item[1] > 0) // Only include categories with data
      .sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const brandData = reportData.survey.questions.product_categories.answers[country][
      brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
    ]

    // Get available categories for this brand
    const availableCategories = allCategories.filter((cat) => brandData[cat as keyof typeof brandData] !== undefined)

    const data = availableCategories
      .map((category) => [
        category,
        (brandData[category as keyof typeof brandData] as number) || 0,
      ] as [string, number])
      .filter((item) => item[1] > 0) // Only include categories with data

    // Sort by value in descending order
    const sorted = data.sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  }
}

const productCategoriesOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
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

// Product Launch Awareness Chart - returns data for a specific brand
function getProductLaunchAwarenessDataForBrand(brand: string) {
  const options = [
    'influencers',
    'social media ads',
    'friends/family',
    "brand's official channels",
    'in-store consultants',
    'beauty magazines/blogs',
  ]

  const brandIndex = reportData.report.brands.indexOf(brand)
  const brandColor = ['#6348ed', '#8b5cf6', '#c4b5fd'][brandIndex]

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, number> = {}
    for (const option of options) {
      aggregated[option] = sumNumbers(
        reportData.report.countries.map((country) => {
          return (
            reportData.survey.questions.product_launch_awareness.answers[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][option as keyof typeof reportData.survey.questions.product_launch_awareness.answers.JP.Shiseido] as number
          )
        })
      )
    }

    // Sort by value in descending order
    const sorted = options
      .map((option) => [option, aggregated[option]] as [string, number])
      .sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const data = options.map((option) => [
      option,
      reportData.survey.questions.product_launch_awareness.answers[country][
        brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
      ][option as keyof typeof reportData.survey.questions.product_launch_awareness.answers.JP.Shiseido] as number,
    ] as [string, number])

    // Sort by value in descending order
    const sorted = data.sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  }
}

const productLaunchAwarenessOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
})

// Collaboration Interest Chart - returns data for a specific brand
function getCollaborationInterestDataForBrand(brand: string) {
  const options = [
    'product gifting',
    'paid posts',
    'long-term ambassadorship',
    'event invitations',
    'co-creation opportunities',
    'early access to new launches',
  ]

  const brandIndex = reportData.report.brands.indexOf(brand)
  const brandColor = ['#6348ed', '#8b5cf6', '#c4b5fd'][brandIndex]

  if (selectedCountry.value === 'Global') {
    const aggregated: Record<string, number> = {}
    for (const option of options) {
      aggregated[option] = sumNumbers(
        reportData.report.countries.map((country) => {
          return (
            reportData.survey.questions.collaboration_interest.answers[country as 'JP' | 'FR' | 'US'][
              brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
            ][option as keyof typeof reportData.survey.questions.collaboration_interest.answers.JP.Shiseido] as number
          )
        })
      )
    }

    // Sort by value in descending order
    const sorted = options
      .map((option) => [option, aggregated[option]] as [string, number])
      .sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  } else {
    const country = selectedCountry.value as 'JP' | 'FR' | 'US'
    const data = options.map((option) => [
      option,
      reportData.survey.questions.collaboration_interest.answers[country][
        brand as 'Shiseido' | 'Lancôme' | 'Estée Lauder'
      ][option as keyof typeof reportData.survey.questions.collaboration_interest.answers.JP.Shiseido] as number,
    ] as [string, number])

    // Sort by value in descending order
    const sorted = data.sort((a, b) => b[1] - a[1])

    return {
      labels: sorted.map((item) => item[0]),
      datasets: [
        {
          label: brand,
          data: sorted.map((item) => item[1]),
          backgroundColor: brandColor,
        },
      ],
    }
  }
}

const collaborationInterestOptions = ref({
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
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

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.question-number {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #6348ed;
  color: #ffffff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.question-item .question-text {
  flex: 1;
  font-size: 15px;
  color: #1f2937;
  line-height: 1.45;
  margin: 0;
  text-align: left;
}

/* Report Sections */
.report-section {
  margin-top: 48px;
}

.question-section-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.question-section-card :deep(.p-card-body) {
  padding: 32px;
}

.question-section-card :deep(.p-card-content) {
  padding: 0;
}

.section-header {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.section-insight {
  font-size: 20px;
  font-weight: 500;
  color: #475569;
  margin: 0;
  line-height: 1.6;
}

.question-text {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.brands-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;
}

.brand-card {
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

/* Small charts in brief section */
.brief-chart {
  height: 180px;
  margin-top: 8px;
}

.chart-controls-small {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
}

.country-selector-small {
  font-size: 12px;
}

.country-selector-small :deep(.p-button) {
  padding: 0.4rem 0.6rem;
  font-size: 12px;
}

/* Laptop and larger screens - 3 columns */
@media (min-width: 1024px) {
  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
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

  .question-text {
    font-size: 20px;
  }

  .section-insight {
    font-size: 22px;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .brief-section {
    padding: 32px 24px;
  }

  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .question-section-card :deep(.p-card-body) {
    padding: 28px 24px;
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

  .brief-chart {
    height: 160px;
  }

  .country-selector-small :deep(.p-button) {
    padding: 0.3rem 0.5rem;
    font-size: 11px;
  }

  .question-section-card :deep(.p-card-body) {
    padding: 24px 16px;
  }

  .question-text {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .section-header {
    padding-bottom: 20px;
  }

  .section-insight {
    font-size: 18px;
  }
}
</style>
