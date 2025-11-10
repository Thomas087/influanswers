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
    <div ref="paymentElementRef" class="payment-element-container"></div>
    <Button
      :label="`Pay $${totalPrice.toLocaleString()}`"
      :loading="processing"
      :disabled="processing || !stripe || !elements"
      class="payment-button"
      @click="handleSubmit"
    />
  </template>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js'
import Button from 'primevue/button'
import { supabase } from '@/lib/supabase'

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

const totalPrice = computed(() => props.amount)

const initializePayment = async () => {
  try {
    loading.value = true
    error.value = null

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
        metadata: props.metadata || {},
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

  try {
    processing.value = true
    error.value = null

    const { error: confirmError } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}${window.location.pathname}?payment=success`,
      },
      redirect: 'if_required',
    })

    if (confirmError) {
      throw confirmError
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

// Check for payment success in URL
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('payment') === 'success') {
    paymentSuccess.value = true
    emit('success')
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

.payment-element-container {
  margin-bottom: 24px;
  min-height: 400px;
}

/* Let Stripe handle its own layout - just ensure container doesn't interfere */
.payment-element-container > * {
  width: 100%;
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

