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
    apiKey: process.env.MISRAL_API_KEY
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
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
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
    const res = await mistralModel.invoke([
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