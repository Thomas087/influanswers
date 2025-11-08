<template>
  <section class="confirm-step">
    <div class="step-description">
      <h2 class="step-title">Review and confirm</h2>
      <p class="step-subtitle">
        Double-check your brief and targeting preferences. You can go back to adjust anything before
        sending it.
      </p>
    </div>

    <div class="summary-grid">
      <article class="summary-card">
        <header class="summary-header">
          <h3>Brief overview</h3>
        </header>
        <div class="summary-body">
          <dl>
            <div>
              <dt>Project name</dt>
              <dd>{{ brief.projectName || '—' }}</dd>
            </div>
            <div>
              <dt>Summary</dt>
              <dd>{{ brief.brandSummary || '—' }}</dd>
            </div>
            <div>
              <dt>Objectives</dt>
              <dd>{{ brief.keyObjectives || '—' }}</dd>
            </div>
            <div>
              <dt>Key questions</dt>
              <dd>{{ brief.questions || '—' }}</dd>
            </div>
          </dl>
        </div>
      </article>

      <article class="summary-card">
        <header class="summary-header">
          <h3>Targeting</h3>
        </header>
        <div class="summary-body">
          <dl>
            <div>
              <dt>Platforms</dt>
              <dd>
                <template v-if="selection.platforms.length">
                  <Tag
                    v-for="platform in selection.platforms"
                    :key="platform"
                    :value="platform"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>
                <template v-if="selection.categories.length">
                  <Tag
                    v-for="category in selection.categories"
                    :key="category"
                    :value="category"
                    severity="secondary"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Regions</dt>
              <dd>
                <template v-if="selection.regions.length">
                  <Tag
                    v-for="region in selection.regions"
                    :key="region"
                    :value="region"
                    severity="info"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Audience size</dt>
              <dd>{{ selection.audienceSize || '—' }}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{{ selection.additionalNotes || '—' }}</dd>
            </div>
          </dl>
        </div>
      </article>

      <article class="summary-card summary-card--highlight">
        <header class="summary-header">
          <h3>Logistics</h3>
        </header>
        <div class="summary-body">
          <dl>
            <div>
              <dt>Budget range</dt>
              <dd>{{ brief.budgetRange || '—' }}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{{ brief.timeline || '—' }}</dd>
            </div>
          </dl>
          <slot name="actions" />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag'

import type { BriefDetails, InfluencerSelection } from '@/types/brief'

defineProps<{
  brief: BriefDetails
  selection: InfluencerSelection
}>()
</script>

<style scoped>
.confirm-step {
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

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.summary-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.summary-card--highlight {
  border-color: #c3dafe;
  background: #f8fbff;
}

.summary-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

.summary-body dl {
  margin: 0;
  display: grid;
  gap: 16px;
}

.summary-body dt {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  margin-bottom: 4px;
}

.summary-body dd {
  margin: 0;
  font-size: 15px;
  color: #1f2937;
  line-height: 1.45;
}

.summary-tag {
  margin: 0 8px 8px 0;
}
</style>

