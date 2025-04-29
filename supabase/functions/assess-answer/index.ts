
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
    const { userAnswer, correctAnswer, question } = await req.json();
    
    // Validate input
    if (!userAnswer || !correctAnswer || !question) {
      return new Response(
        JSON.stringify({ error: "User answer, correct answer, and question are all required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Assessing answer for question: ${question}`);
    console.log(`User answer: ${userAnswer}, Correct answer: ${correctAnswer}`);

    // Call OpenAI API to assess the answer
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
            content: "You are a language learning assistant that evaluates student answers."
          },
          {
            role: "user",
            content: `
              Question: ${question}
              Correct answer: ${correctAnswer}
              Student's answer: ${userAnswer}
              
              Evaluate the student's answer against the correct answer. Consider both exact matches and semantic similarity.
              Return ONLY a JSON object with the format: {
                "score": a number between 0 and 1 representing how correct the answer is,
                "feedback": constructive feedback explaining the evaluation and what the correct answer is
              }
            `
          }
        ],
        temperature: 0.3,
      }),
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }

    // Extract and parse the JSON from the text response
    const content = result.choices[0].message.content;
    let assessmentData;
    
    try {
      // Try to parse the content directly
      assessmentData = JSON.parse(content);
    } catch (e) {
      // If direct parsing fails, try to extract JSON from the content
      const jsonMatch = content.match(/\{.*\}/s);
      if (jsonMatch) {
        assessmentData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse assessment data from OpenAI response");
      }
    }

    return new Response(
      JSON.stringify(assessmentData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error assessing answer:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})
