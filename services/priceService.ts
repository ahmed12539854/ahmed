import { GoogleGenAI } from "@google/genai";
import type { GoldPrice, CurrencyRate, BuildingMaterialPrice } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export interface GroundingChunk {
  web: {
    uri: string;
    // Fix: Made title optional as it may not always be present in the API response
    // and the UI already handles this case.
    title?: string;
  };
}

export interface GeneratedData<T> {
  data: T;
  sources: GroundingChunk[];
}

// Helper function to handle API calls with Google Search grounding
async function generateData<T>(prompt: string): Promise<GeneratedData<T>> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Empty response from API");
    }
    
    // Clean potential markdown formatting
    const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    
    const data = JSON.parse(cleanedJsonText) as T;
    
    // Fix: The GroundingChunk type from the SDK has an optional `uri`, but our app requires it.
    // We filter out sources without a URI and map them to our stricter local type to fix the type error.
    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingChunk[] = [];
    for (const source of rawSources) {
      if (source.web?.uri) {
        sources.push({
          web: {
            uri: source.web.uri,
            title: source.web.title,
          },
        });
      }
    }

    return { data, sources };

  } catch (error) {
    console.error("Error fetching or parsing data from Gemini API:", error);
    throw new Error("Failed to generate data from Gemini API.");
  }
}

export const fetchGoldPrices = async (): Promise<GeneratedData<GoldPrice[]>> => {
  const prompt = `ما هي أحدث أسعار الذهب اليوم في مصر بالجنيه المصري؟
  يجب أن تتضمن القائمة عيار 24، 21، 18، والجنيه الذهب.
  قم بإرجاع الإجابة كـ JSON array فقط، بدون أي نص إضافي أو تنسيق markdown.
  يجب أن يتبع كل عنصر هذا الهيكل: {"karat": "string", "price": number}`;
  return await generateData<GoldPrice[]>(prompt);
};

export const fetchCurrencyRates = async (): Promise<GeneratedData<CurrencyRate[]>> => {
  const prompt = `ما هي أحدث أسعار صرف العملات الأجنبية مقابل الجنيه المصري اليوم؟
  يجب أن تتضمن القائمة الدولار الأمريكي، اليورو، الريال السعودي، الدرهم الإماراتي، والدينار الكويتي.
  قم بإرجاع الإجابة كـ JSON array فقط، بدون أي نص إضافي أو تنسيق markdown.
  يجب أن يتبع كل عنصر هذا الهيكل: {"name": "string", "buy": number, "sell": number}`;
   return await generateData<CurrencyRate[]>(prompt);
};

export const fetchBuildingMaterialPrices = async (): Promise<GeneratedData<BuildingMaterialPrice[]>> => {
  const prompt = `ما هو متوسط أحدث أسعار مواد البناء في مصر اليوم؟
  يجب أن تتضمن القائمة سعر طن حديد التسليح (مثل حديد عز)، سعر طن الأسمنت (مثل أسمنت السويدي)، وسعر الألف طوبة من الطوب الأحمر.
  قم بإرجاع الإجابة كـ JSON array فقط، بدون أي نص إضافي أو تنسيق markdown.
  يجب أن يتبع كل عنصر هذا الهيكل: {"name": "string", "price": number, "unit": "string"}`;
  return await generateData<BuildingMaterialPrice[]>(prompt);
};
