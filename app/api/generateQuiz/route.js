import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a quiz creator. You take in text that contains an word/question and a definition or answer seperated by a | sign.
You will then generate a 4 choice multiple choice problem with the answer with it. Make sure to create exactly 10 questions for each of the responses you get.
You should return in the following JSON format:
{
  "questions":[
    {
      "title": "The word they are trying to guess",
      "first": "first answer",
      "second": "second answer",
      "third": "third answer",
      "correct": "the correct answer",
    }
  ]
}
`;

export async function POST(req){

    const openAI = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY})
    const data = await req.text();

     /* 
        Completion does a couple of things:
        1. It creates a chat completion request to the OpenAI API.
        2. The `messages` array includes two elements:
        — A ‘system’ message with our predefined `systemPrompt`, which instructs the AI on how to create flashcards.
        — A ‘user’ message containing the input text from the request body.
        3. We specify ‘gpt-3.5’ as the model to use.
        4. We set the `response_format` to ‘json_object’ to ensure we receive a JSON response.
    */

    const completion = await openAI.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data}
        ],
        model: 'gpt-3.5-turbo', // Specify the model to use
        response_format: {type: 'json_object'},
        //stream: true, // Enable streaming responses
    })

    // Parse the JSON response from the OpenAI API
    const questions = JSON.parse(completion.choices[0].message.content)

    console.log(questions.questions)

    // Return the flashcards as a JSON response
    return NextResponse.json(questions.quesitons)
};
