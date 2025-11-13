<template>
  <div class="home-page">
    <Header />
    <!-- Hero Section -->
    <section id="hero" class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Get real answers from real people.</h1>
            <p class="hero-description">
              Senvio uses artificial intelligence to directly survey real customers and influencers identified through social media, delivering high-quality, actionable insights for your brand.
            </p>
            <router-link to="/brief" class="hero-button-link">
              <Button size="large" label="Get Started" />
            </router-link>
          </div>
          <div class="hero-image">
            <img src="/img/influanswers-hero.png" alt="Market Research" />
          </div>
        </div>
      </div>
    </section>

    <!-- 3 Steps Section -->
    <section id="steps" class="steps-section">
      <div class="steps-container">
        <h2 class="section-title">Get your answers in 3 simple steps</h2>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-icon">
              <img src="/icon/brief.svg" alt="Brief icon" />
            </div>
            <h3 class="step-title">Define your brief</h3>
            <p class="step-description">Tell us exactly which questions you want customers or influencers to answer.</p>
          </div>
          <div class="step-card">
            <div class="step-icon">
              <img src="/icon/target.svg" alt="Target icon" />
            </div>
            <h3 class="step-title">Choose your audience</h3>
            <p class="step-description">
              Select the customers or influencers you want to reach, based on location, purchasing behavior, size, or past collaborations.
            </p>
          </div>
          <div class="step-card">
            <div class="step-icon">
              <img src="/icon/report.svg" alt="Report icon" />
            </div>
            <h3 class="step-title">Receive your report</h3>
            <p class="step-description">
              Get a clear, data-backed report summarizing their answers — delivered within 7 days.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Clients Section -->
    <section id="clients" class="clients-section">
      <div class="clients-container">
        <h2 class="section-title">Our clients</h2>
        <div class="clients-grid">
          <div class="client-logo">
            <img src="/client-logos/armani.png" alt="Armani" />
          </div>
          <div class="client-logo">
            <img src="/client-logos/dior.png" alt="Dior" />
          </div>
          <div class="client-logo">
            <img src="/client-logos/google.png" alt="Google" />
          </div>
          <div class="client-logo">
            <img src="/client-logos/louis-vuitton.png" alt="Louis Vuitton" />
          </div>
          <div class="client-logo">
            <img src="/client-logos/maison-kitsune.svg" alt="Maison Kitsuné" />
          </div>
          <div class="client-logo">
            <img src="/client-logos/polene.png" alt="Polène" />
          </div>
        </div>
      </div>
    </section>

    <!-- Why Brands Love Section -->
    <section id="benefits" class="benefits-section">
      <div class="benefits-container">
        <h2 class="section-title">Why brands love Senvio</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <h3 class="benefit-title">Transparent pricing</h3>
            <p class="benefit-description">Pay only for the number of questions and respondents.</p>
          </div>
          <div class="benefit-card">
            <h3 class="benefit-title">Result guarantee</h3>
            <p class="benefit-description">Preview your report before paying the full amount.</p>
          </div>
          <div class="benefit-card">
            <h3 class="benefit-title">Scalable service</h3>
            <p class="benefit-description">
              From 10 to 1,000+ influencers or customers, tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing-section">
      <div class="pricing-container">
        <h2 class="section-title">Simple, transparent pricing</h2>
        <div class="pricing-content">
          <div class="pricing-left">
            <div class="pricing-amount">$25</div>
            <div class="pricing-description">/ question asked to an influencer</div>
            <div class="pricing-features">
              <div class="pricing-feature">
                <span class="feature-icon">✓</span>
                <span class="feature-text">7 days delivery</span>
              </div>
              <div class="pricing-feature">
                <span class="feature-icon">✓</span>
                <span class="feature-text">Verified influencer profiles</span>
              </div>
              <div class="pricing-feature">
                <span class="feature-icon">✓</span>
                <span class="feature-text">Online expert support</span>
              </div>
              <div class="pricing-feature">
                <span class="feature-icon">✓</span>
                <span class="feature-text">Preview before you pay</span>
              </div>
              <div class="pricing-feature">
                <span class="feature-icon">✓</span>
                <span class="feature-text">PDF report</span>
              </div>
            </div>
          </div>
          <div class="pricing-right">
            <div class="pricing-examples">
              <h3 class="examples-title">Examples</h3>
              <div class="example-item">
                <div class="example-details">3 questions to 10 influencers</div>
                <div class="example-price">$750</div>
              </div>
              <div class="example-item">
                <div class="example-details">5 questions to 50 influencers</div>
                <div class="example-price">$6,250</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="faq-section">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="card">
          <Accordion value="0">
            <AccordionPanel value="0">
              <AccordionHeader>How does Senvio work?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  Senvio uses A.I. to connect your brief with relevant influencers or
                  customers. Our system gathers their opinions, filters low-quality responses, and
                  delivers a clean, data-driven report within a few days. You simply define what you
                  want to know — we handle the rest.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="1">
              <AccordionHeader>Who are the influencers you survey?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  We work with a vetted network of influencers and micro-influencers across multiple
                  niches and regions. Each participant is verified for authenticity (no fake
                  followers or engagement pods) and selected based on your criteria — such as
                  location, audience size, or past collaborations.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="2">
              <AccordionHeader
                >Can I include my own customers or audience in the poll?</AccordionHeader
              >
              <AccordionContent>
                <p class="m-0">
                  Yes! You can invite your own customers or community to participate alongside
                  influencers. We'll integrate their feedback seamlessly into the final report.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="3">
              <AccordionHeader>What kind of questions can I ask?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  You can ask both open-ended and multiple-choice questions — from product feedback
                  and brand perception to content preferences or campaign ideas. Our team can also
                  help refine your brief to ensure you get clear, actionable insights.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="4">
              <AccordionHeader>How long does it take to get results?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  Most reports are delivered within 7 days, depending on the number of respondents
                  and the complexity of your questions. You'll be able to preview preliminary
                  results before the final report is ready.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="5">
              <AccordionHeader>What does the report include?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  You'll receive a detailed, visual report with aggregated insights, quotes from
                  respondents, sentiment analysis, and key takeaways. The report is designed to help
                  you make fast, informed decisions for your brand or campaign.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="6">
              <AccordionHeader>How much does it cost?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  Pricing is fully transparent and flexible — you pay based on the number of
                  questions and respondents. No hidden fees. You can also preview the report before
                  paying for the full version.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="7">
              <AccordionHeader>What if I'm not satisfied with the results?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  If the insights don't meet the quality standards you expect, you can review the
                  report preview and request adjustments or additional clarifications before
                  finalizing your payment. We guarantee meaningful, usable answers — not filler
                  responses.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="8">
              <AccordionHeader>Is the data confidential?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  Yes. All data and responses are handled with strict confidentiality. Influencers
                  only see the questions you choose to share, and your brand information is
                  protected under our privacy policy.
                </p>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="9">
              <AccordionHeader>Can I run recurring or international polls?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  Absolutely. Senvio is designed to scale — you can run ongoing surveys,
                  compare results across markets, and poll influencers in multiple languages or
                  regions.
                </p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-container">
        <h2 class="cta-title">Start your brief today</h2>
        <p class="cta-description">
          Get honest, data-driven answers about your brand — in just a few clicks.
        </p>
        <Button size="large" label="Get Started" @click="router.push('/brief')" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Button from 'primevue/button'

import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

const router = useRouter()
</script>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
}

/* Hero Section */
.hero {
  width: 100%;
  background-color: #f5f3ff;
}

.hero-container {
  max-width: 1380px;
  margin: 0 auto;
  padding: 110px 24px;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #1a1a1a;
  margin: 0;
}

.hero-description {
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.hero-button-link {
  display: inline-block;
  margin-top: 8px;
  text-decoration: none;
}

.hero-image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

@media (min-width: 1024px) and (max-width: 1440px) {
  .hero-container {
    padding-left: 96px;
    padding-right: 96px;
  }
}

/* Steps Section */
.steps-section {
  width: 100%;
  background-color: white;
}

.steps-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #1a1a1a;
  margin: 0 0 60px 0;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.step-card {
  background: white;
  padding: 40px 32px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.step-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.step-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.step-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}

.step-description {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

/* Benefits Section */
.benefits-section {
  width: 100%;
  background-color: white;
}

.benefits-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px;
}

.benefits-container .section-title {
  margin-bottom: 40px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.benefit-card {
  text-align: center;
  padding: 24px 20px;
}

.benefit-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.benefit-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.benefit-description {
  font-size: 15px;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

/* Our Clients Section */
.clients-section {
  width: 100%;
  background-color: #f8f9fa;
}

.clients-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.clients-container .section-title {
  margin-bottom: 40px;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px;
  align-items: center;
  justify-items: center;
}

.client-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.client-logo:hover {
  opacity: 1;
}

.client-logo img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.client-logo:hover img {
  filter: grayscale(0%);
}

/* Pricing Section */
.pricing-section {
  width: 100%;
  background-color: #f8f9fa;
}

.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.pricing-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-left {
  background: white;
  padding: 40px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.pricing-right {
  background: white;
  padding: 40px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pricing-amount {
  font-size: 56px;
  font-weight: 700;
  color: #6348ed;
  margin: 0 0 8px 0;
  line-height: 1;
}

.pricing-description {
  font-size: 18px;
  line-height: 1.5;
  color: #666;
  margin: 0 0 24px 0;
}

.pricing-features {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.pricing-feature {
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #6348ed;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.feature-text {
  font-size: 15px;
  line-height: 1.4;
  color: #1a1a1a;
}

.pricing-examples {
  margin-top: 0;
  padding-top: 0;
}

.examples-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  text-align: center;
}

.example-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.example-item:last-child {
  border-bottom: none;
}

.example-details {
  font-size: 15px;
  color: #666;
  line-height: 1.4;
}

.example-price {
  font-size: 18px;
  font-weight: 700;
  color: #6348ed;
}

/* FAQ Section */
.faq-section {
  padding: 80px 24px;
  background-color: white;
}

.faq-section .section-title {
  margin-bottom: 48px;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
}

.faq-list .card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* CTA Section */
.cta-section {
  width: 100%;
  background-color: #f8f9fa;
  padding: 100px 24px;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: 42px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.cta-description {
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 40px 0;
}

/* Responsive Design */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-title {
    font-size: 36px;
  }

  .steps-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .clients-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .section-title {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .hero-container {
    padding: 60px 20px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-description {
    font-size: 18px;
  }

  .steps-container,
  .benefits-container {
    padding: 40px 20px;
  }

  .benefits-container .section-title,
  .clients-container .section-title {
    margin-bottom: 30px;
  }

  .benefits-grid {
    gap: 24px;
  }

  .clients-container {
    padding: 40px 20px;
  }

  .clients-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .client-logo {
    height: 60px;
  }

  .benefit-card {
    padding: 20px 16px;
  }

  .benefit-title {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .benefit-description {
    font-size: 14px;
  }

  .pricing-container,
  .faq-section {
    padding: 50px 20px;
  }

  .pricing-amount {
    font-size: 48px;
  }

  .pricing-description {
    font-size: 18px;
  }

  .pricing-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .pricing-left,
  .pricing-right {
    padding: 32px 20px;
  }

  .pricing-amount {
    font-size: 42px;
  }

  .pricing-description {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .pricing-features {
    margin-top: 20px;
    padding-top: 20px;
    gap: 10px;
  }

  .feature-text {
    font-size: 14px;
  }

  .pricing-examples {
    margin-top: 20px;
    padding-top: 20px;
  }

  .examples-title {
    font-size: 16px;
    margin-bottom: 14px;
  }

  .example-item {
    padding: 10px 0;
  }

  .example-details {
    font-size: 14px;
  }

  .example-price {
    font-size: 16px;
  }

  .cta-section {
    padding: 80px 20px;
  }

  .cta-title {
    font-size: 32px;
  }

  .cta-description {
    font-size: 18px;
  }
}
</style>

<style>
html {
  scroll-behavior: smooth;
}
</style>
