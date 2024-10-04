import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a quiz creator. You take in text that contains 10 word/question and 10 definition or answer seperated by a | sign.
Each question/word and answer pair is seperated by a \\n character
Make sure you do each one as there should be 10 questions total and do each of the word/questions and each answer.
You will then generate a 4 different (Make sure each answer for the multiple is different and not the same as the answer. NO 2 same answers) 
If you have 2 of the same answers, change the answer to something else unless it is the correct answer, then change the incorrect one.
choice multiple choice problem with the answer with it.
You should return in the following JSON format:
{
  "questions":[
    {
      "title": "The word they are trying to guess",
      "first": "first answer",
      "second": "second answer",
      "third": "third answer",
      "fourth": "the correct answer",
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

    console.log(questions)

    // Return the flashcards as a JSON response
    return NextResponse.json(questions)
};
