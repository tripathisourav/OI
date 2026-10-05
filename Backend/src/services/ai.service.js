import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { tool, createAgent } from "langchain"
import * as z from "zod"
import { searchOnInternet } from "./internet.service.js";


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
});


// gemini bda model hai uske title generate jaise chote se kaam mein bhi badi cost aayegi mistral yha better rhega 
const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
});


const searchInternetTool = tool(
    searchOnInternet,
    {
        name: "searchInternet",
        description: "Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })
    }
)

const agent = createAgent({
    model: geminiModel,
    tools: [searchInternetTool],
})


export async function generateResponse(messages) {

    const res = await agent.invoke({
        messages: [ 
            
            //     new SystemMessage(`
            //     You are a helpful, intelligent, precise, and reliable AI assistant.

            //     Your goal is to understand the user's intent and provide the most useful,
            //     accurate, and well-structured response possible.

            //     General behavior:
            //     - Answer the user's request directly and completely.
            //     - Understand the context of the conversation before responding.
            //     - Follow the user's instructions carefully.
            //     - If the request is ambiguous, ask a clarifying question when necessary;
            //       otherwise make a reasonable assumption and proceed.
            //     - Do not refuse a request simply because it requires reasoning, analysis,
            //       coding, writing, creativity, or problem solving.
            //     - Explain your reasoning or approach when it helps the user understand the answer.
            //     - Keep responses clear, concise, and well-organized. Avoid unnecessary repetition.
            //     - Adapt the response style and level of detail to the user's request.
            //     - When the user asks for a specific format, follow that format.
            //     - Never make up facts, sources, results, or information.
            //     - If you genuinely do not know something, say so clearly.

            //     For programming and technical questions:
            //     - Provide correct and practical solutions.
            //     - Write clean, readable, and runnable code when code is requested.
            //     - Debug and improve code when the user provides it.
            //     - Explain important concepts when necessary.

            //     For writing and creative tasks:
            //     - Follow the requested tone, style, format, and purpose.
            //     - Make the output natural and appropriate for the intended audience.

            //     For mathematical, logical, and reasoning problems:
            //     - Work through the problem carefully.
            //     - Give the correct result and explain the important steps when useful.

            //     For questions requiring current, changing, or up-to-date information:
            //     - Use the "searchInternet" tool to obtain the latest information.
            //     - Base the answer on the information returned by the tool.
            //     - Do not rely on potentially outdated knowledge when current information is required.

            //     Always prioritize accuracy, usefulness, clarity, and following the user's
            //     actual intent.
            // `)

            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date icd banformation, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `)
            ,
            ...(messages.map(msg => {
                if (msg.role == 'user') {
                    return new HumanMessage(msg.content)
                } else if (msg.role == 'ai') {
                    return new AIMessage(msg.content)
                }
            }))]
    });

    return res.messages[res.messages.length - 1].text;
}


export async function generateChatTittle(message) {
    const res = await geminiModel.invoke([
        new SystemMessage(` 
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.   
           
           
            User will provide you with the first message of a chat conversation, and you will generate a title that captures 
            the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a 
            quick understanding of the chat's topic. `),

        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `)
    ]);
    return res.text;
}



// read about streaming in langchain { langchain - open source - stemming}