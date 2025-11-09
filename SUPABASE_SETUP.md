# Supabase Setup Guide

## Project Information
- **Project Name**: Influanswers
- **Project ID**: vichgewghqwxvmuxlmfn
- **Project URL**: https://vichgewghqwxvmuxlmfn.supabase.co

## Setup Steps

### 1. Add ChatGPT API Key (Recommended: Edge Function Secrets)

**⚠️ Security Best Practice**: API keys should NOT be stored in plain database tables. Use one of the secure methods below.

#### Option A: Edge Function Secrets (Recommended for Edge Functions)

This is the **recommended approach** for Edge Functions. Secrets are stored securely and accessed via environment variables.

**Using the Dashboard:**
1. Go to https://supabase.com/dashboard/project/vichgewghqwxvmuxlmfn
2. Navigate to **Settings** → **Edge Functions** → **Secrets**
3. Add a new secret:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
4. Click **Save**

**Using the CLI:**
```bash
supabase secrets set OPENAI_API_KEY=your-openai-api-key-here
```

The Edge Function can then access it via:
```typescript
const apiKey = Deno.env.get('OPENAI_API_KEY')
```

#### Option B: Supabase Vault (For Database-Accessible Secrets)

If you need to access the secret from SQL (Postgres functions, triggers, webhooks), use Vault which stores secrets encrypted on disk.

**Using the Dashboard:**
1. Go to https://supabase.com/dashboard/project/vichgewghqwxvmuxlmfn
2. Navigate to **Database** → **Vault**
3. Click **Create Secret**
4. Enter:
   - **Name**: `chatgpt_api_key`
   - **Secret**: Your OpenAI API key
   - **Description**: OpenAI API key for ChatGPT integration
5. Click **Save**

**Using SQL:**
```sql
SELECT vault.create_secret(
  'your-openai-api-key-here',
  'chatgpt_api_key',
  'OpenAI API key for ChatGPT integration'
);
```

Access the secret in SQL:
```sql
SELECT decrypted_secret 
FROM vault.decrypted_secrets 
WHERE name = 'chatgpt_api_key';
```

**⚠️ Note**: If using Vault, update your Edge Function to query the `vault.decrypted_secrets` view instead of the `api_keys` table.

#### Option C: Database Table (Not Recommended)

**⚠️ This method is NOT secure** and should only be used for development/testing. For production, use Option A or B above.

If you must use this method temporarily:
1. Go to https://supabase.com/dashboard/project/vichgewghqwxvmuxlmfn
2. Navigate to the SQL Editor
3. Run the following SQL:

```sql
INSERT INTO api_keys (key_name, key_value)
VALUES ('chatgpt_api_key', 'your-openai-api-key-here')
ON CONFLICT (key_name) 
DO UPDATE SET key_value = EXCLUDED.key_value, updated_at = NOW();
```

### 2. Environment Variables (Optional)

If you want to use environment variables for the Supabase URL and anon key, create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://vichgewghqwxvmuxlmfn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpY2hnZXdnaHF3eHZtdXhsbWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjUyMTAsImV4cCI6MjA3ODIwMTIxMH0.U85CwG6RlGdeNIhPhAz4eOFUG9fZlFdcva_7RuLAvcQ
```

**Note**: The code has fallback values, so this is optional.

## How It Works

1. When a user submits the first step (Write Brief), the frontend calls the `chatgpt-brief` Edge Function
2. The Edge Function retrieves the ChatGPT API key from:
   - **Option A**: Environment variable (`Deno.env.get('OPENAI_API_KEY')`)
   - **Option B**: Vault (`vault.decrypted_secrets` view via SQL query)
   - **Option C**: Database table (`api_keys` table - not recommended)
3. It sends the user's brief content to ChatGPT with a custom prompt
4. The response is returned to the frontend and logged to the console

## Edge Function

- **Name**: `chatgpt-brief`
- **Endpoint**: `https://vichgewghqwxvmuxlmfn.supabase.co/functions/v1/chatgpt-brief`
- **Method**: POST
- **Body**: `{ "brandSummary": "..." }`

## Database Schema (If Using Option C)

**⚠️ Note**: This table should only be used for development/testing. For production, use Edge Function Secrets (Option A) or Vault (Option B).

The `api_keys` table structure (if needed):
- `id`: UUID (primary key)
- `key_name`: TEXT (unique, e.g., 'chatgpt_api_key')
- `key_value`: TEXT (the actual API key - stored in plain text)
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

## Security Recommendations

1. **For Edge Functions**: Use **Edge Function Secrets** (Option A) - this is the most secure and recommended approach
2. **For SQL/Postgres functions**: Use **Supabase Vault** (Option B) - secrets are encrypted at rest
3. **Never** store API keys in plain database tables in production
4. **Never** commit API keys to version control
5. Use different keys for development, staging, and production environments

