<template>
  <div class="login-page">
    <Header />
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Login</h1>
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="form-input"
              :class="{ 'p-invalid': showError }"
            />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <Password
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="form-input"
              :class="{ 'p-invalid': showError }"
              :feedback="false"
              toggleMask
            />
          </div>
          <div v-if="showError" class="error-message">
            Incorrect login credentials
          </div>
          <Button
            type="submit"
            label="Login"
            class="login-button"
            :loading="isSubmitting"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')
const showError = ref(false)
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  showError.value = false

  // Simulate a brief delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Always show error message
  showError.value = true
  isSubmitting.value = false
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.login-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.login-card {
  background: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1a1a1a;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
}

.form-input {
  width: 100%;
}

.form-input :deep(.p-inputtext),
.form-input :deep(.p-password-input) {
  width: 100%;
}

.form-input :deep(.p-password) {
  width: 100%;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  padding: 0.75rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  text-align: center;
}

.login-button {
  width: 100%;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .login-container {
    padding: 1.5rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-title {
    font-size: 1.75rem;
  }
}
</style>

