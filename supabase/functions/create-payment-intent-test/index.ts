import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { handlePaymentIntentRequest } from './payment-intent-handler.ts'

// Test function - uses STRIPE_SECRET_KEY_TEST
Deno.serve(async (req) => {
  return handlePaymentIntentRequest(req, 'STRIPE_SECRET_KEY_TEST')
})

