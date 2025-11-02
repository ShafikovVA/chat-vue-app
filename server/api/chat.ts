import { GoogleGenAI } from "@google/genai";

export default defineEventHandler(async (event) => {
    const { message } = await readBody(event);
    console.log('Received message:', message);

    const runtimeConfig = useRuntimeConfig();
    console.log('geminiApiKey:', runtimeConfig.geminiApiKey);
    const ai = new GoogleGenAI({
        apiKey: runtimeConfig.geminiApiKey,
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    });
     
    return response;
});