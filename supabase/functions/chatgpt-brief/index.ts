import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

// JSON Schema derived from Pydantic models for OpenAI structured outputs
const BRIEF_RESPONSE_SCHEMA = {
  type: 'object',
  required: ['brief', 'selection'],
  additionalProperties: false,
  properties: {
    brief: {
      type: 'object',
      required: ['projectName', 'brandBrief', 'briefSummary', 'questions'],
      additionalProperties: false,
      properties: {
        projectName: {
          type: 'string',
          description: 'A concise, descriptive project name',
        },
        brandBrief: {
          type: 'string',
          description: 'The full brand brief content',
        },
        briefSummary: {
          type: 'string',
          description: 'A brief summary of the project',
        },
        questions: {
          type: 'array',
          items: { type: 'string' },
          minItems: 5,
          maxItems: 5,
          description: 'List of exactly 5 key questions to be asked to influencers',
        },
      },
    },
    selection: {
      type: 'object',
      required: [
        'numberOfInfluencers',
        'platforms',
        'categories',
        'regions',
        'audienceSize',
        'gender',
        'contentFormat',
        'previousCollaborations',
        'additionalNotes',
      ],
      additionalProperties: false,
      properties: {
        numberOfInfluencers: {
          type: 'integer',
          minimum: 10,
          maximum: 500,
          description: 'Number of influencers to target (10-500)',
        },
        platforms: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'instagram',
              'tiktok',
              'youtube',
              'linkedin',
              'twitter',
              'twitch',
              'red',
              'facebook',
              'wechat',
              'douyin',
            ],
          },
          description: 'List of preferred platforms',
        },
        categories: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'beauty-cosmetics',
              'fashion-luxury',
              'lifestyle',
              'health-wellness',
              'fitness-sports',
              'nutrition-diet',
              'mental-health',
              'parenting-family',
              'relationships-dating',
              'self-improvement-motivation',
              'gaming',
              'movies-tv',
              'music',
              'art-design',
              'photography',
              'books-literature',
              'pop-culture',
              'celebrities-influencers',
              'travel',
              'adventure-outdoors',
              'hospitality-tourism',
              'sustainable-travel',
              'tech-gadgets',
              'ai-innovation',
              'science-education',
              'automotive',
              'cryptocurrency-blockchain',
              'finance-investing',
              'startups-entrepreneurship',
              'food-beverage',
              'cooking-recipes',
              'wine-beer-spirits',
              'restaurants-dining',
              'vegan-plant-based-living',
              'home-decor-interior-design',
              'diy-crafts',
              'gardening',
              'pets-animals',
              'real-estate',
              'sustainability-environment',
              'charity-social-causes',
              'politics-activism',
              'education-learning',
              'career-productivity',
              'marketing-advertising',
              'ecommerce-retail',
              'events-conferences',
              'luxury-lifestyle',
              'weddings-events',
              'spirituality-mindfulness',
              'mens-lifestyle',
              'womens-lifestyle',
              'youth-student-life',
              'other',
            ],
          },
          description: 'List of relevant categories/niches',
        },
        regions: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'AF',
              'AL',
              'DZ',
              'AD',
              'AO',
              'AG',
              'AR',
              'AM',
              'AU',
              'AT',
              'AZ',
              'BS',
              'BH',
              'BD',
              'BB',
              'BY',
              'BE',
              'BZ',
              'BJ',
              'BT',
              'BO',
              'BA',
              'BW',
              'BR',
              'BN',
              'BG',
              'BF',
              'BI',
              'CV',
              'KH',
              'CM',
              'CA',
              'CF',
              'TD',
              'CL',
              'CN',
              'CO',
              'KM',
              'CG',
              'CR',
              'HR',
              'CU',
              'CY',
              'CZ',
              'DK',
              'DJ',
              'DM',
              'DO',
              'EC',
              'EG',
              'SV',
              'GQ',
              'ER',
              'EE',
              'SZ',
              'ET',
              'FJ',
              'FI',
              'FR',
              'GA',
              'GM',
              'GE',
              'DE',
              'GH',
              'GR',
              'GD',
              'GT',
              'GN',
              'GW',
              'GY',
              'HT',
              'HN',
              'HU',
              'IS',
              'IN',
              'ID',
              'IR',
              'IQ',
              'IE',
              'IL',
              'IT',
              'JM',
              'JP',
              'JO',
              'KZ',
              'KE',
              'KI',
              'XK',
              'KW',
              'KG',
              'LA',
              'LV',
              'LB',
              'LS',
              'LR',
              'LY',
              'LI',
              'LT',
              'LU',
              'MG',
              'MW',
              'MY',
              'MV',
              'ML',
              'MT',
              'MH',
              'MR',
              'MU',
              'MX',
              'FM',
              'MD',
              'MC',
              'MN',
              'ME',
              'MA',
              'MZ',
              'MM',
              'NA',
              'NR',
              'NP',
              'NL',
              'NZ',
              'NI',
              'NE',
              'NG',
              'KP',
              'MK',
              'NO',
              'OM',
              'PK',
              'PW',
              'PS',
              'PA',
              'PG',
              'PY',
              'PE',
              'PH',
              'PL',
              'PT',
              'QA',
              'RO',
              'RU',
              'RW',
              'KN',
              'LC',
              'VC',
              'WS',
              'SM',
              'ST',
              'SA',
              'SN',
              'RS',
              'SC',
              'SL',
              'SG',
              'SK',
              'SI',
              'SB',
              'SO',
              'ZA',
              'KR',
              'SS',
              'ES',
              'LK',
              'SD',
              'SR',
              'SE',
              'CH',
              'SY',
              'TW',
              'TJ',
              'TZ',
              'TH',
              'TL',
              'TG',
              'TO',
              'TT',
              'TN',
              'TR',
              'TM',
              'TV',
              'UG',
              'UA',
              'AE',
              'GB',
              'US',
              'UY',
              'UZ',
              'VU',
              'VA',
              'VE',
              'VN',
              'YE',
              'ZM',
              'ZW',
            ],
          },
          description: 'List of target countries (ISO 3166-1 alpha-2 codes)',
        },
        audienceSize: {
          type: 'string',
          enum: ['koc', 'nano', 'micro', 'mid-tier', ''],
          description: 'Target audience size tier (empty string if not specified)',
        },
        gender: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['male', 'female', 'other'],
          },
          description: 'Target gender demographics',
        },
        contentFormat: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['video', 'reels', 'photos', 'live-streams', 'blog', 'podcast'],
          },
          description: 'Preferred content formats',
        },
        previousCollaborations: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of previous collaborations or mentioned products',
        },
        additionalNotes: {
          type: 'string',
          description: 'Additional notes or custom requirements (empty string if none)',
        },
      },
    },
  },
} as const

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { brandSummary } = await req.json()

    if (!brandSummary || typeof brandSummary !== 'string') {
      return new Response(JSON.stringify({ success: false, error: 'brandSummary is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // Get OpenAI API key from environment
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'OPENAI_API_KEY not configured',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Create the prompt
    const prompt = `You are an expert market research specialist helping to create:
    - A set of questions that will be asked to influencers in order to answer a brand brief
    - A set of selection criteria to find relevant influencers to answer these questions

Based on the following brand summary, generate a comprehensive brief with:
1. A concise project name
2. An expanded and detailed brand brief
3. A brief summary (2-3 sentences)
4. Exactly 5 key questions to be asked to the influencers in order to answer the brief requests
5. Recommended influencer selection criteria including:
   - Number of influencers (between 10-500)
   - Relevant platforms (select from the valid enum values)
   - Relevant categories/niches (select from the valid enum values)
   - Target regions/countries (use ISO 3166-1 alpha-2 country codes)
   - Audience size tier if applicable
   - Gender demographics if relevant
   - Content formats that would work best
   - Any previous collaborations or products to mention
   - Additional notes

IMPORTANT: 
- You MUST only use values from the provided enums for platforms, categories, regions, audienceSize, gender, and contentFormat
- For regions, use ISO 3166-1 alpha-2 country codes (e.g., "US", "FR", "GB")
- For optional fields: use empty string "" for audienceSize if not applicable, and empty string "" for additionalNotes if there are no notes
- Select categories that are most relevant to the brand
- Be strategic in your recommendations based on the brand summary

Brand Summary:
${brandSummary}`

    // Build the full input with system instructions
    const fullInput = `You are an expert marketing strategist. Always respond with valid JSON matching the provided schema.

${prompt}

IMPORTANT: You must respond with valid JSON that matches this exact schema structure:
- brief: { projectName, brandBrief, briefSummary, questions }
- selection: { numberOfInfluencers, platforms, categories, regions, audienceSize, gender, contentFormat, previousCollaborations, additionalNotes }`

    // Call OpenAI Responses API with structured outputs
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5',
        input: fullInput,
        reasoning: {
          effort: 'low',
        },
        text: {
          verbosity: 'low',
          format: {
            name: 'brief_response',
            type: 'json_schema',
            schema: BRIEF_RESPONSE_SCHEMA,
            strict: true,
          },
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to generate brief',
          details: errorData,
        }),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    const data = await response.json()

    // Log the full OpenAI response for debugging
    console.log('=== FULL OPENAI RESPONSE ===')
    console.log(JSON.stringify(data, null, 2))
    console.log('=== END OPENAI RESPONSE ===')

    // Check if the response has an error
    if (data.error) {
      console.error('OpenAI API error in response:', data.error)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'OpenAI API returned an error',
          details: data.error,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Check if the response status is completed
    if (data.status && data.status !== 'completed') {
      console.error('OpenAI API response not completed:', data.status, data.incomplete_details)
      return new Response(
        JSON.stringify({
          success: false,
          error: `OpenAI API response status: ${data.status}`,
          details: data.incomplete_details,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Responses API returns content in data.output array
    // Structure: { output: [{ type: "reasoning", ... }, { type: "message", content: [{ type: "output_text", text: "..." }] }] }
    let content = null

    if (data.output && Array.isArray(data.output) && data.output.length > 0) {
      // Find the message element (not reasoning)
      const messageOutput = data.output.find((item) => item.type === 'message')
      if (messageOutput && messageOutput.content && Array.isArray(messageOutput.content)) {
        // Find the output_text content
        const textContent = messageOutput.content.find((item) => item.type === 'output_text')
        if (textContent && textContent.text) {
          content = textContent.text
        }
      }

      // Fallback: try first element if it has content
      if (!content) {
        const firstOutput = data.output[0]
        if (
          firstOutput.content &&
          Array.isArray(firstOutput.content) &&
          firstOutput.content.length > 0
        ) {
          const firstContent = firstOutput.content[0]
          if (firstContent.type === 'output_text' && firstContent.text) {
            content = firstContent.text
          }
        }
      }
    }

    // Fallback to other possible structures
    if (!content) {
      content =
        data.text?.output ||
        data.text?.content ||
        data.content ||
        data.choices?.[0]?.message?.content ||
        data.text
    }

    // Log extracted content
    console.log('=== EXTRACTED CONTENT ===')
    console.log('Content type:', typeof content)
    console.log('Content length:', content?.length || 0)
    console.log('Content preview:', content?.substring?.(0, 1000) || content)
    console.log('=== END EXTRACTED CONTENT ===')

    if (!content) {
      console.error('Unexpected response structure:', JSON.stringify(data, null, 2))
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No content in OpenAI response',
          details: 'Unexpected response structure',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Parse the JSON response
    let briefData
    try {
      console.log('=== PARSING JSON ===')
      console.log('Raw content type:', typeof content)
      console.log('Raw content (first 2000 chars):', content?.substring?.(0, 2000) || content)
      briefData = typeof content === 'string' ? JSON.parse(content) : content
      console.log('=== PARSED RESULT ===')
      console.log('Parsed briefData type:', Array.isArray(briefData) ? 'array' : typeof briefData)
      console.log('Full parsed briefData:', JSON.stringify(briefData, null, 2))
      console.log('=== END PARSED RESULT ===')

      // Handle case where response is an array - take the first element
      if (Array.isArray(briefData)) {
        console.log('Response is an array, taking first element')
        if (briefData.length > 0) {
          briefData = briefData[0]
        } else {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Invalid response structure from OpenAI',
              details: 'Response is an empty array',
            }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            },
          )
        }
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      console.error('Response content:', content)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON in OpenAI response',
          details: parseError.message,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Validate response structure
    if (!briefData || typeof briefData !== 'object' || Array.isArray(briefData)) {
      console.error('Invalid response structure:', briefData)
      console.error(
        'Type of briefData:',
        typeof briefData,
        Array.isArray(briefData) ? '(array)' : '',
      )
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid response structure from OpenAI',
          details: 'Response is not a valid object',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    if (!briefData.brief || typeof briefData.brief !== 'object') {
      console.error('Missing or invalid brief in response')
      console.error('briefData keys:', Object.keys(briefData))
      console.error('briefData structure:', JSON.stringify(briefData, null, 2).substring(0, 2000))
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing or invalid brief in response',
          details: `The response must include a valid brief object. Received keys: ${Object.keys(briefData).join(', ')}`,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    if (!briefData.selection || typeof briefData.selection !== 'object') {
      console.error('Missing or invalid selection in response:', briefData)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing or invalid selection in response',
          details: 'The response must include a valid selection object',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Validate that at least one selection criteria is provided
    const { selection } = briefData
    if (
      (!selection.platforms || selection.platforms.length === 0) &&
      (!selection.categories || selection.categories.length === 0) &&
      (!selection.regions || selection.regions.length === 0) &&
      (!selection.audienceSize || selection.audienceSize === '') &&
      (!selection.gender || selection.gender.length === 0) &&
      (!selection.contentFormat || selection.contentFormat.length === 0)
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'At least one selection criteria (platforms, categories, regions, audienceSize, gender, or contentFormat) must be provided',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Ensure arrays are initialized and normalize optional fields
    if (!Array.isArray(briefData.selection.platforms)) {
      briefData.selection.platforms = []
    }
    if (!Array.isArray(briefData.selection.categories)) {
      briefData.selection.categories = []
    }
    if (!Array.isArray(briefData.selection.regions)) {
      briefData.selection.regions = []
    }
    if (!Array.isArray(briefData.selection.gender)) {
      briefData.selection.gender = []
    }
    if (!Array.isArray(briefData.selection.contentFormat)) {
      briefData.selection.contentFormat = []
    }
    if (!Array.isArray(briefData.selection.previousCollaborations)) {
      briefData.selection.previousCollaborations = []
    }
    // Normalize empty strings to null/undefined for optional fields
    if (briefData.selection.audienceSize === '') {
      briefData.selection.audienceSize = null
    }
    if (briefData.selection.additionalNotes === '') {
      briefData.selection.additionalNotes = null
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: briefData,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  } catch (error) {
    console.error('Error in chatgpt-brief function:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
})
