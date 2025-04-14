import { chatInput, responsetype } from "../dto/dto";
import Groq from "groq-sdk";

export const chat = async (input: chatInput): Promise<responsetype<{reply: String}>| responsetype<null>> => {
    try {
        const prompt = input.message;

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY || (() => { throw new Error("GROQ_API_KEY environment variable is required") })()
        })

        const name = process.env.NAME || (() => { throw new Error("NAME environment variable is required") })();

        const systemInstruction = process.env.SYSTEM_INSTRUCTION || (() => { throw new Error("SYSTEM_INSTRUCTION environment variable is required") })();
        
        const model = process.env.MODEL || (() => { throw new Error("MODEL environment variable is required") })();

        const completion = await groq.chat.completions.create({
            messages: [
              {
                  role: "system",
                  content: systemInstruction,
              },
              {
                role: "user",
                content: prompt as any,
              },
            ],
            model,
          });
        
        const response: responsetype<{
            reply: String
        }> = {
            success: true,
            message: `reply from ${name}`,
            data: {
                reply: completion.choices[0]?.message?.content || ""
            },
            error: null
        }

        return response;
    }
    catch(error) {
        const reponse: responsetype<null> = {
            success: false,
            message: `error reaching chat service...`,
            data: null,
            error: (error instanceof Error) ? error.message : String(error)
        }

        return reponse;
    }
}
