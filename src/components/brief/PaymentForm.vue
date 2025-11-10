<template>
  <div v-if="loading" class="payment-loading">
    <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
    <p>Loading payment form...</p>
  </div>

  <div v-else-if="error" class="payment-error">
    <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem; color: #ef4444"></i>
    <p>{{ error }}</p>
    <Button label="Try again" @click="initializePayment" />
  </div>

  <div v-else-if="paymentSuccess" class="payment-success">
    <i class="pi pi-check-circle" style="font-size: 2rem; color: #10b981"></i>
    <h3>Payment successful!</h3>
    <p>Your payment has been processed successfully.</p>
  </div>

  <template v-else>
    <div class="payment-fields">
      <div class="field">
        <label for="fullName" class="field-label">Full name</label>
        <InputText
          id="fullName"
          v-model="fullName"
          placeholder="John Doe"
          class="field-input"
          :class="{ 'p-invalid': errors.fullName }"
        />
        <small v-if="errors.fullName" class="field-error">{{ errors.fullName }}</small>
      </div>

      <div class="field">
        <label for="company" class="field-label">Company</label>
        <InputText
          id="company"
          v-model="company"
          placeholder="Acme Inc."
          class="field-input"
          :class="{ 'p-invalid': errors.company }"
        />
        <small v-if="errors.company" class="field-error">{{ errors.company }}</small>
      </div>

      <div class="field">
        <label for="vatNumber" class="field-label">
          VAT #
          <span class="field-label-optional">(optional)</span>
        </label>
        <InputText
          id="vatNumber"
          v-model="vatNumber"
          placeholder="VAT123456789"
          class="field-input"
        />
      </div>

      <div class="field">
        <label for="email" class="field-label">Professional email</label>
        <InputText
          id="email"
          v-model="email"
          type="email"
          placeholder="john.doe@company.com"
          class="field-input"
          :class="{ 'p-invalid': errors.email }"
        />
        <small v-if="errors.email" class="field-error">{{ errors.email }}</small>
      </div>
    </div>

    <div ref="paymentElementRef" class="payment-element-container"></div>
    <div class="payment-submit-section">
      <div class="payment-submit-header">
        <h4 class="payment-submit-title">Pay deposit - $185</h4>
        <p class="payment-submit-subtitle">
          You will be able to preview part of the final report before paying the full project fee
        </p>
      </div>
      <Button
        label="Pay deposit - $185"
        :loading="processing"
        :disabled="processing || !isPaymentReady"
        class="payment-button"
        @click="handleSubmit"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { supabase } from '@/lib/supabase'
import { useBriefStore } from '@/stores/brief'

const router = useRouter()
const briefStore = useBriefStore()

const props = defineProps<{
  amount: number
  metadata?: Record<string, string>
}>()

const emit = defineEmits<{
  success: []
  error: [error: string]
}>()

const stripe = ref<Stripe | null>(null)
const elements = ref<StripeElements | null>(null)
const paymentElementRef = ref<HTMLDivElement | null>(null)
const loading = ref(true)
const processing = ref(false)
const error = ref<string | null>(null)
const paymentSuccess = ref(false)
const clientSecret = ref<string | null>(null)
const paymentIntentId = ref<string | null>(null)
const isPaymentElementComplete = ref(false)

// Form fields
const fullName = ref('')
const company = ref('')
const vatNumber = ref('')
const email = ref('')
const errors = ref<{
  fullName?: string
  company?: string
  email?: string
}>({})

const totalPrice = computed(() => props.amount)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validate form
const validateForm = () => {
  errors.value = {}

  if (!fullName.value.trim()) {
    errors.value.fullName = 'Full name is required'
  }

  if (!company.value.trim()) {
    errors.value.company = 'Company is required'
  }

  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
  } else if (!emailRegex.test(email.value)) {
    errors.value.email = 'Please enter a valid email address'
  }

  return Object.keys(errors.value).length === 0
}

// Check if form is valid
const isFormValid = computed(() => {
  return (
    fullName.value.trim() !== '' &&
    company.value.trim() !== '' &&
    email.value.trim() !== '' &&
    emailRegex.test(email.value)
  )
})

// Check if payment is ready (form valid + payment element complete)
const isPaymentReady = computed(() => {
  return isFormValid.value && isPaymentElementComplete.value && stripe.value && elements.value
})

// Save payment information to Supabase
const savePaymentToSupabase = async (intentId: string, status: string) => {
  try {
    // Ensure brief is saved to Supabase first
    await briefStore.saveToSupabase()

    const briefId = briefStore.briefId

    if (!briefId) {
      console.warn('No brief ID available after saving, cannot save payment information')
      return
    }

    const { error: updateError } = await supabase
      .from('briefs')
      .update({
        payment_intent_id: intentId,
        payment_status: status,
      })
      .eq('id', briefId)

    if (updateError) {
      console.error('Error updating brief with payment information:', updateError)
      throw updateError
    }

    console.log('Payment information saved to Supabase:', { intentId, status, briefId })
  } catch (err) {
    console.error('Failed to save payment information to Supabase:', err)
    throw err
  }
}

const initializePayment = async () => {
  try {
    loading.value = true
    error.value = null
    isPaymentElementComplete.value = false

    // Get Stripe publishable key from environment
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

    if (!publishableKey) {
      throw new Error(
        'Stripe publishable key is not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY in your environment variables.'
      )
    }

    // Initialize Stripe
    const stripeInstance = await loadStripe(publishableKey)
    if (!stripeInstance) {
      throw new Error('Failed to load Stripe')
    }
    stripe.value = stripeInstance

    // Create payment intent via Supabase Edge Function
    const { data, error: createError } = await supabase.functions.invoke('create-payment-intent', {
      body: {
        amount: props.amount,
        currency: 'usd',
        metadata: {
          ...props.metadata,
          customer_name: fullName.value || '',
          customer_company: company.value || '',
          customer_vat: vatNumber.value || '',
          customer_email: email.value || '',
        },
      },
    })

    if (createError) {
      console.error('Payment intent creation error:', createError)
      throw new Error(createError.message || 'Failed to create payment intent')
    }

    if (!data?.clientSecret) {
      console.error('No client secret in response:', data)
      throw new Error('No client secret returned')
    }

    clientSecret.value = data.clientSecret
    paymentIntentId.value = data.paymentIntentId || null

    // Store payment intent ID in localStorage for redirect case
    if (paymentIntentId.value) {
      localStorage.setItem('influanswers-payment-intent-id', paymentIntentId.value)
    }

    // Create Elements instance
    const elementsInstance = stripeInstance.elements({
      clientSecret: data.clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#6348ed',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorDanger: '#ef4444',
          fontFamily: 'system-ui, sans-serif',
          spacingUnit: '8px',
          borderRadius: '8px',
        },
      },
    })

    elements.value = elementsInstance

    // Set loading to false first so the DOM element is rendered
    loading.value = false

    // Wait for next tick to ensure DOM is ready after loading state changes
    await nextTick()

    // Create and mount Payment Element
    if (!paymentElementRef.value) {
      throw new Error('Payment element container not found')
    }

    const paymentElement = elementsInstance.create('payment')
    paymentElement.mount(paymentElementRef.value)

    // Listen to payment element changes to track completeness
    paymentElement.on('change', (event: any) => {
      isPaymentElementComplete.value = event.complete || false
    })
  } catch (err) {
    console.error('Payment initialization error:', err)
    error.value = err instanceof Error ? err.message : 'Failed to initialize payment'
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!stripe.value || !elements.value || !clientSecret.value) {
    return
  }

  // Validate form before submitting
  if (!validateForm()) {
    return
  }

  try {
    processing.value = true
    error.value = null

    const { error: confirmError, paymentIntent } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}${window.location.pathname}?payment=success`,
        payment_method_data: {
          billing_details: {
            name: fullName.value,
            email: email.value,
          },
        },
      },
      redirect: 'if_required',
    })

    if (confirmError) {
      throw confirmError
    }

    // Save payment information to Supabase
    if (paymentIntent && paymentIntent.id) {
      try {
        const paymentStatus = paymentIntent.status
        await savePaymentToSupabase(paymentIntent.id, paymentStatus)
        // Clear stored payment intent ID
        localStorage.removeItem('influanswers-payment-intent-id')
      } catch (err) {
        console.error('Error saving payment information to Supabase:', err)
        // Still proceed with success even if saving fails
      }
    } else if (paymentIntentId.value) {
      // Fallback: use stored payment intent ID and assume succeeded status
      try {
        await savePaymentToSupabase(paymentIntentId.value, 'succeeded')
        // Clear stored payment intent ID
        localStorage.removeItem('influanswers-payment-intent-id')
      } catch (err) {
        console.error('Error saving payment information to Supabase:', err)
        // Still proceed with success even if saving fails
      }
    }

    paymentSuccess.value = true
    emit('success')
  } catch (err) {
    console.error('Payment error:', err)
    error.value = err instanceof Error ? err.message : 'Payment failed'
    emit('error', error.value)
  } finally {
    processing.value = false
  }
}

// Watch form fields and save user info to store (only when user actually types)
let isInitialLoad = true
watch([fullName, company, vatNumber, email], () => {
  if (isInitialLoad) {
    isInitialLoad = false
    return
  }
  briefStore.updateUserInfo({
    fullName: fullName.value,
    company: company.value,
    vatNumber: vatNumber.value,
    email: email.value,
  })
})

  // Load user info from store on mount
onMounted(async () => {
  // Load existing user info from store if available
  if (briefStore.userInfo.fullName) fullName.value = briefStore.userInfo.fullName
  if (briefStore.userInfo.company) company.value = briefStore.userInfo.company
  if (briefStore.userInfo.vatNumber) vatNumber.value = briefStore.userInfo.vatNumber
  if (briefStore.userInfo.email) email.value = briefStore.userInfo.email

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('payment') === 'success') {
    // Handle payment success redirect
    const storedPaymentIntentId = localStorage.getItem('influanswers-payment-intent-id')
    if (storedPaymentIntentId) {
      try {
        // Save payment information with succeeded status
        await savePaymentToSupabase(storedPaymentIntentId, 'succeeded')
        // Clear stored payment intent ID
        localStorage.removeItem('influanswers-payment-intent-id')
      } catch (err) {
        console.error('Error saving payment information after redirect:', err)
        // Continue to confirmation page even if saving fails
      }
    }
    // Clear the brief store after successful payment
    briefStore.reset()
    // Navigate to payment confirmation page
    router.push('/payment-confirmation')
  } else {
    initializePayment()
  }
})

// Cleanup
onUnmounted(() => {
  // Cleanup is handled automatically by Stripe Elements
  // But we can explicitly unmount if needed
  if (paymentElementRef.value && elements.value) {
    try {
      const paymentElement = elements.value.getElement('payment')
      if (paymentElement) {
        paymentElement.unmount()
      }
    } catch (e) {
      // Element might already be unmounted
      console.log('Payment element cleanup:', e)
    }
  }
})

// Watch for amount changes
watch(
  () => props.amount,
  () => {
    if (stripe.value && elements.value) {
      initializePayment()
    }
  }
)

// Expose handleSubmit and isPaymentReady so parent can trigger payment and check validation
defineExpose({
  handleSubmit,
  isPaymentReady,
})
</script>


<style scoped>
.payment-loading,
.payment-error,
.payment-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  text-align: center;
}

.payment-loading p,
.payment-error p,
.payment-success p {
  margin: 0;
  color: #64748b;
  font-size: 15px;
}

.payment-success h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
}

.payment-error {
  color: #ef4444;
}

.payment-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  color: #1a202c;
}

.field-label-optional {
  font-weight: 400;
  color: #64748b;
  font-size: 13px;
}

.field-input {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #1f2937;
  transition: border-color 0.2s ease;
}

.field-input:focus {
  outline: none;
  border-color: #6348ed;
  box-shadow: 0 0 0 3px rgba(99, 72, 237, 0.1);
}

.field-input.p-invalid {
  border-color: #ef4444;
}

.field-error {
  color: #ef4444;
  font-size: 13px;
  margin-top: -4px;
}

.payment-element-container {
  margin-bottom: 24px;
  min-height: 400px;
}

/* Let Stripe handle its own layout - just ensure container doesn't interfere */
.payment-element-container > * {
  width: 100%;
}

.payment-submit-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-submit-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-submit-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

.payment-submit-subtitle {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

.payment-button {
  width: 100%;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  background: #6348ed;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.payment-button:hover:not(:disabled) {
  background: #5238d4;
}

.payment-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

