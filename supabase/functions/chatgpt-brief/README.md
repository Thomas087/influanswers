# ChatGPT Brief Generation Edge Function

This edge function generates structured influencer marketing briefs using OpenAI's GPT-4 with structured outputs.

## Structure

- `index.ts` - Supabase Edge Function (TypeScript/Deno) that calls OpenAI with structured outputs
- `models.py` - Pydantic models for validation and type safety (can be used in Python services)
- `requirements.txt` - Python dependencies for the Pydantic models

## Features

- **Structured Output**: Uses OpenAI's JSON schema mode to ensure valid responses
- **Enum Validation**: Enforces valid values for all multiselect options:
  - Platforms (instagram, tiktok, youtube, etc.)
  - Categories (beauty-cosmetics, fashion-luxury, etc.)
  - Countries (ISO 3166-1 alpha-2 codes: US, FR, GB, etc.)
  - Audience sizes (koc, nano, micro, mid-tier)
  - Genders (male, female, other)
  - Content formats (video, reels, photos, etc.)

## Usage

### Edge Function (TypeScript/Deno)

The edge function is automatically deployed to Supabase. It accepts:

**Request:**
```json
{
  "brandSummary": "Your brand description here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "brief": {
      "projectName": "...",
      "brandBrief": "...",
      "briefSummary": "...",
      "questions": ["...", "...", "..."]
    },
    "selection": {
      "numberOfInfluencers": 50,
      "platforms": ["instagram", "tiktok"],
      "categories": ["fashion-luxury", "beauty-cosmetics"],
      "regions": ["US", "FR", "GB"],
      "audienceSize": "micro",
      "gender": ["female"],
      "contentFormat": ["video", "reels"],
      "previousCollaborations": [],
      "additionalNotes": "..."
    }
  }
}
```

### Pydantic Models (Python)

If you want to use the Pydantic models in a Python service:

```python
from models import BriefResponse, Platform, Category, CountryCode

# Validate response from OpenAI
response_data = {...}  # JSON from OpenAI
brief = BriefResponse.model_validate(response_data)

# Access validated data
print(brief.brief.projectName)
print(brief.selection.platforms)  # List[Platform] enum
print(brief.selection.regions)    # List[CountryCode] enum
```

## Deployment

### Deploy Edge Function

```bash
# From the project root
supabase functions deploy chatgpt-brief
```

### Set Environment Variables

```bash
supabase secrets set OPENAI_API_KEY=your-openai-api-key-here
```

## Validation

The edge function validates:
1. All enum values match the allowed options
2. Number of influencers is between 10-500
3. At least 3 questions are provided
4. At least one selection criteria is provided (platforms, categories, regions, etc.)

## Schema Synchronization

The JSON schema in `index.ts` is manually synchronized with the Pydantic models in `models.py`. When updating:

1. Update the Pydantic models in `models.py`
2. Update the corresponding JSON schema in `index.ts`
3. Ensure enum values match exactly

## Testing

You can test the edge function locally:

```bash
# Start Supabase locally
supabase start

# Test the function
curl -X POST http://localhost:54321/functions/v1/chatgpt-brief \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"brandSummary": "A luxury fashion brand targeting millennials"}'
```

