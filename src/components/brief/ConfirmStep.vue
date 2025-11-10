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
              <dd>{{ briefStore.brief.projectName || '—' }}</dd>
            </div>
            <div>
              <dt>Summary</dt>
              <dd>{{ briefStore.brief.brandBrief || '—' }}</dd>
            </div>
            <div>
              <dt>Brief summary</dt>
              <dd>{{ briefStore.brief.briefSummary || '—' }}</dd>
            </div>
            <div>
              <dt>Key questions</dt>
              <dd>
                <template v-if="briefStore.questions.length > 0">
                  <ul class="questions-list">
                    <li v-for="(question, index) in briefStore.questions" :key="index">
                      {{ question }}
                    </li>
                  </ul>
                </template>
                <span v-else>—</span>
              </dd>
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
              <dt>Number of influencers</dt>
              <dd>{{ briefStore.selection.numberOfInfluencers || '—' }}</dd>
            </div>
            <div>
              <dt>Platforms</dt>
              <dd>
                <template v-if="briefStore.selection.platforms.length">
                  <Tag
                    v-for="platform in briefStore.selection.platforms"
                    :key="platform"
                    :value="getPlatformLabel(platform)"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>
                <template v-if="briefStore.selection.categories.length">
                  <Tag
                    v-for="category in briefStore.selection.categories"
                    :key="category"
                    :value="getCategoryLabel(category)"
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
                <template v-if="briefStore.selection.regions.length">
                  <Tag
                    v-for="region in briefStore.selection.regions"
                    :key="region"
                    :value="getCountryName(region)"
                    severity="info"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Audience size</dt>
              <dd>
                <template v-if="briefStore.selection.audienceSize.length">
                  <Tag
                    v-for="size in briefStore.selection.audienceSize"
                    :key="size"
                    :value="getAudienceSizeLabel(size)"
                    severity="success"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Gender</dt>
              <dd>
                <template v-if="briefStore.selection.gender.length">
                  <Tag
                    v-for="gender in briefStore.selection.gender"
                    :key="gender"
                    :value="getGenderLabel(gender)"
                    severity="warning"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Content format</dt>
              <dd>
                <template v-if="briefStore.selection.contentFormat.length">
                  <Tag
                    v-for="format in briefStore.selection.contentFormat"
                    :key="format"
                    :value="getContentFormatLabel(format)"
                    severity="help"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Previous collaborations</dt>
              <dd>
                <template v-if="briefStore.selection.previousCollaborations.length">
                  <Tag
                    v-for="collab in briefStore.selection.previousCollaborations"
                    :key="collab"
                    :value="collab"
                    severity="success"
                    class="summary-tag"
                  />
                </template>
                <span v-else>—</span>
              </dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{{ briefStore.selection.additionalNotes || '—' }}</dd>
            </div>
          </dl>
        </div>
      </article>

      <article class="summary-card summary-card--highlight">
        <header class="summary-header">
          <h3>Actions</h3>
        </header>
        <div class="summary-body">
          <slot name="actions" />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag'
import { useBriefStore } from '@/stores/brief'
import { getCountryName } from '@/lib/countries'
import { getAudienceSizeLabel } from '@/lib/audience-sizes'
import { getGenderLabel } from '@/lib/genders'
import { getPlatformLabel } from '@/lib/platforms'
import { getContentFormatLabel } from '@/lib/content-formats'
import { getCategoryLabel } from '@/lib/categories'

const briefStore = useBriefStore()
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
  border-color: rgba(99, 72, 237, 0.3);
  background: rgba(99, 72, 237, 0.04);
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

.questions-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.questions-list li {
  position: relative;
  padding-left: 20px;
}

.questions-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #6348ed;
  font-weight: 600;
}
</style>
