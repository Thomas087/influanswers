# Supabase Setup Guide

## Project Information
- **Project Name**: Influanswers
- **Project ID**: vichgewghqwxvmuxlmfn
- **Project URL**: https://vichgewghqwxvmuxlmfn.supabase.co

## Setup Steps

### 1. Add ChatGPT API Key to Database

To enable ChatGPT functionality, you need to add your OpenAI API key to the Supabase database.

You can do this in one of the following ways:

#### Option A: Using Supabase Dashboard
1. Go to https://supabase.com/dashboard/project/vichgewghqwxvmuxlmfn
2. Navigate to the SQL Editor
3. Run the following SQL:

```sql
INSERT INTO api_keys (key_name, key_value)
VALUES ('chatgpt_api_key', 'your-openai-api-key-here')
ON CONFLICT (key_name) 
DO UPDATE SET key_value = EXCLUDED.key_value, updated_at = NOW();
```

Replace `'your-openai-api-key-here'` with your actual OpenAI API key.

#### Option B: Using Supabase MCP (if available)
You can use the Supabase MCP tools to execute the SQL directly.

### 2. Environment Variables (Optional)

If you want to use environment variables for the Supabase URL and anon key, create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://vichgewghqwxvmuxlmfn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpY2hnZXdnaHF3eHZtdXhsbWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjUyMTAsImV4cCI6MjA3ODIwMTIxMH0.U85CwG6RlGdeNIhPhAz4eOFUG9fZlFdcva_7RuLAvcQ
```

**Note**: The code has fallback values, so this is optional.

## How It Works

1. When a user submits the first step (Write Brief), the frontend calls the `chatgpt-brief` Edge Function
2. The Edge Function retrieves the ChatGPT API key from the `api_keys` table
3. It sends the user's brief content to ChatGPT with a custom prompt
4. The response is returned to the frontend and logged to the console

## Edge Function

- **Name**: `chatgpt-brief`
- **Endpoint**: `https://vichgewghqwxvmuxlmfn.supabase.co/functions/v1/chatgpt-brief`
- **Method**: POST
- **Body**: `{ "brandSummary": "..." }`

## Database Schema

The `api_keys` table stores API keys securely:
- `id`: UUID (primary key)
- `key_name`: TEXT (unique, e.g., 'chatgpt_api_key')
- `key_value`: TEXT (the actual API key)
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

