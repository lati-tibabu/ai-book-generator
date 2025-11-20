
import { GoogleGenAI, Type } from "@google/genai";
import { Book, Category } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The title of the book. Should be catchy and relevant to the prompt.",
    },
    pages: {
      type: Type.ARRAY,
      description: "An array of page objects, each representing a page in the book. There should be between 5 and 7 pages.",
      items: {
        type: Type.OBJECT,
        properties: {
          pageNumber: {
            type: Type.INTEGER,
            description: "The sequential number of the page, starting from 1.",
          },
          content: {
            type: Type.STRING,
            description: "The text content for this page. Each page should contain 1-2 short paragraphs of text so it fits on the page with an illustration.",
          },
          imagePrompt: {
            type: Type.STRING,
            description: "A detailed visual description of the scene to be used for generating an illustration for this page.",
          }
        },
        required: ["pageNumber", "content", "imagePrompt"],
      },
    },
  },
  required: ["title", "pages"],
};

const generateImageForPage = async (prompt: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '4:3',
        outputMimeType: 'image/jpeg',
      },
    });
    
    const base64Bytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (base64Bytes) {
        return `data:image/jpeg;base64,${base64Bytes}`;
    }
    return undefined;
  } catch (error) {
    console.warn("Image generation failed for prompt:", prompt, error);
    return undefined;
  }
};

export const generateBookContent = async (prompt: string, category: Category): Promise<Book> => {
  try {
    const fullPrompt = `Based on the following prompt, generate a short book of 5-7 pages.\n\nPROMPT: "${prompt}"`;
    
    // 1. Generate Text Content and Image Prompts
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Switched to flash for speed as we are adding image latency
      contents: fullPrompt,
      config: {
        systemInstruction: `${category.promptContext}. You must respond ONLY with a JSON object that strictly adheres to the provided schema. Include descriptions for illustrations.`,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text.trim();
    const parsedJson = JSON.parse(text);

    if (!validateBookStructure(parsedJson)) {
       throw new Error("Received invalid book structure from API.");
    }

    // 2. Generate Images for each page
    // We allow this to fail gracefully (image will be undefined) so the book still loads
    const pagesWithImages = await Promise.all(parsedJson.pages.map(async (page: any) => {
        if (page.imagePrompt) {
            const image = await generateImageForPage(page.imagePrompt + ", high quality, illustration style");
            return { ...page, image };
        }
        return page;
    }));

    return {
        title: parsedJson.title,
        pages: pagesWithImages
    };

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse the response from the AI. The AI may have returned an invalid format.");
    }
    throw new Error(`Failed to generate book. ${error instanceof Error ? error.message : ''}`);
  }
};

const validateBookStructure = (data: any): boolean => {
  return (
    data &&
    typeof data.title === 'string' &&
    Array.isArray(data.pages) &&
    data.pages.every(
      (p: any) => typeof p.pageNumber === 'number' && typeof p.content === 'string'
    )
  );
};
