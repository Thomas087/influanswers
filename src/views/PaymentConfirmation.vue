<template>
  <div class="payment-confirmation-page">
    <div class="confirmation-container">
      <div class="confirmation-icon">
        <i class="pi pi-check-circle"></i>
      </div>
      <h1 class="confirmation-title">Your deposit payment was successful.</h1>
      <p class="confirmation-message">
        We will contact you within 2 business days to confirm the exact delivery date of your report.
      </p>
      <div class="confirmation-actions">
        <Button label="Return to home" @click="router.push('/')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
</script>

<style scoped>
.payment-confirmation-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 60%);
}

.confirmation-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 48px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #10b981;
  border-radius: 50%;
  margin-bottom: 8px;
}

.confirmation-icon i {
  font-size: 48px;
  color: #ffffff;
}

.confirmation-title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.3;
}

.confirmation-message {
  margin: 0;
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
}

.confirmation-actions {
  margin-top: 8px;
}

.confirmation-actions :deep(.p-button) {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  background: #6348ed;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.confirmation-actions :deep(.p-button:hover) {
  background: #5238d4;
}

@media (max-width: 640px) {
  .confirmation-container {
    padding: 32px 24px;
  }

  .confirmation-title {
    font-size: 24px;
  }

  .confirmation-icon {
    width: 64px;
    height: 64px;
  }

  .confirmation-icon i {
    font-size: 36px;
  }
}
</style>

