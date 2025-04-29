
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the OPENAI_API_KEY from environment variables
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || "openai api key here";
    
    // Parse request body
    const { category } = await req.json();
    
    // Validate input
    if (!category) {
      return new Response(
        JSON.stringify({ error: "Category is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating question for category: ${category}`);

    // Call OpenAI API to generate a question
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a language learning assistant that generates practice questions."
          },
          {
            role: "user",
            content: `Generate a ${category} question for language practice. Return ONLY a JSON object with the format: { "question": "your question here", "correct_answer": "the answer", "category": "${category}" }`
          }
        ],
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }

    // Extract and parse the JSON from the text response
    const content = result.choices[0].message.content;
    let questionData;
    
    try {
      // Try to parse the content directly
      questionData = JSON.parse(content);
    } catch (e) {
      // If direct parsing fails, try to extract JSON from the content
      const jsonMatch = content.match(/\{.*\}/s);
      if (jsonMatch) {
        questionData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse question data from OpenAI response");
      }
    }

    return new Response(
      JSON.stringify(questionData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error generating question:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})
