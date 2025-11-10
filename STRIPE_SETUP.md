# Stripe Payment Integration Setup

This guide explains how to set up Stripe payments for the Influanswers project.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Access to your Supabase project dashboard

## Setup Steps

### 1. Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
4. Copy your **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

### 2. Configure Supabase Edge Function Secret

The Edge Function needs your Stripe secret key to create payment intents securely.

**Using the Supabase Dashboard:**
1. Go to https://supabase.com/dashboard/project/vichgewghqwxvmuxlmfn
2. Navigate to **Settings** → **Edge Functions** → **Secrets**
3. Add a new secret:
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: Your Stripe secret key (from step 1)
4. Click **Save**

**Using the Supabase CLI:**
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### 3. Configure Frontend Environment Variable

Add your Stripe publishable key to your frontend environment:

1. Create or update `.env` file in the project root:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

2. Restart your development server if it's running:
```bash
npm run dev
```

### 4. Test the Integration

1. Navigate to the "Review and confirm" step in your brief creation flow
2. You should see the payment form in the right column
3. Use Stripe test card numbers to test:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Use any future expiry date, any 3-digit CVC, and any ZIP code

## Edge Function

- **Name**: `create-payment-intent`
- **Endpoint**: `https://vichgewghqwxvmuxlmfn.supabase.co/functions/v1/create-payment-intent`
- **Method**: POST
- **Body**: 
  ```json
  {
    "amount": 1000,
    "currency": "usd",
    "metadata": {
      "project_name": "My Project",
      "number_of_influencers": "10",
      "number_of_questions": "5"
    }
  }
  ```

## Payment Flow

1. User fills out the brief and reaches the confirmation step
2. Payment form loads and creates a PaymentIntent via the Edge Function
3. User enters payment details using Stripe Elements
4. Payment is confirmed on the client side
5. On success, the `success` event is emitted

## Security Notes

- **Never** commit your Stripe secret key to version control
- **Never** expose your Stripe secret key in client-side code
- Always use environment variables for sensitive keys
- The secret key is only used in the Edge Function (server-side)
- The publishable key is safe to use in client-side code

## Troubleshooting

### Payment form not loading
- Check that `VITE_STRIPE_PUBLISHABLE_KEY` is set in your `.env` file
- Verify the key starts with `pk_test_` or `pk_live_`
- Check browser console for errors

### Payment intent creation fails
- Verify `STRIPE_SECRET_KEY` is set in Supabase Edge Function secrets
- Check Edge Function logs in Supabase Dashboard
- Ensure the secret key starts with `sk_test_` or `sk_live_`

### CORS errors
- The Edge Function includes CORS headers
- If issues persist, check that the function is deployed correctly

## Going Live

When you're ready to accept real payments:

1. Switch to live mode in your Stripe Dashboard
2. Get your live API keys
3. Update the `STRIPE_SECRET_KEY` secret in Supabase with your live secret key
4. Update `VITE_STRIPE_PUBLISHABLE_KEY` in your production environment with your live publishable key
5. Test thoroughly with small amounts first

