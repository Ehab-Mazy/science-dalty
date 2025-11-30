import { GoogleGenAI } from "@google/genai";
import { MessageRole } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the chat including history
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `
          أنت معلم أحياء خبير وودود تتحدث اللغة العربية.
          مهمتك هي شرح:
          1. عملية البناء الضوئي (Photosynthesis).
          2. تدفق الطاقة في السلاسل الغذائية (Food Chains) وكيف تبدأ الطاقة من الشمس وتنتقل عبر المنتجات (النباتات) إلى المستهلكات.
          3. تجربة فان هيلمونت (Van Helmont): اشرح كيف زرع شتلة صفصاف وزنها 2.2 كجم في 90 كجم من التربة، وبعد 5 سنوات من الري بالماء فقط، أصبح وزن الشجرة 75 كجم بينما نقص وزن التربة 55 جرام فقط. استنتج أن النبات ينمو من الماء (وهو استنتاج جزئي، حيث نعرف اليوم دور ثاني أكسيد الكربون).
          
          أسلوبك:
          - استخدم التشبيهات والأمثلة السهلة من البيئة.
          - اشرح مبدأ فقدان الطاقة (10% فقط ينتقل للمستوى التالي).
          - إذا سأل المستخدم عن شيء خارج موضوع الأحياء أو الطبيعة، وجهه بلطف للعودة إلى الموضوع.
          - اجعل إجاباتك موجزة ومفيدة.
        `,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "عذراً، لم أتمكن من توليد إجابة.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ أثناء الاتصال بالخادم. يرجى التحقق من مفتاح API والمحاولة مرة أخرى.";
  }
};