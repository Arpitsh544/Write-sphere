import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client lazily on request or if API key exists
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // AI Assistant endpoint for blogging tools (Title generator, Draft expander, Summarizer)
  app.post("/api/ai/assist", async (req, res) => {
    try {
      const { type, prompt, text, title, category } = req.body;
      const ai = getAi();

      let systemInstruction = "You are WriteSphere's elite AI editorial writing assistant. Provide concise, modern, and inspiring output tailored for a sleek minimalist blogging platform.";
      let userPrompt = "";

      if (type === "title") {
        systemInstruction += " Generate 5 catchy, elegant blog titles for the topic/draft provided. Return JSON array of strings.";
        userPrompt = `Topic or draft: ${prompt || title || text || "Minimalist living and digital focus"}`;
      } else if (type === "summarize") {
        systemInstruction += " Generate a 2-sentence captivating summary suitable for a blog feed preview snippet.";
        userPrompt = `Article text: ${text || prompt}`;
      } else if (type === "expand") {
        systemInstruction += " Expand on the draft bullet points or intro into a well-structured paragraph with a clean, engaging narrative style.";
        userPrompt = `Draft text: ${text || prompt}`;
      } else if (type === "ideas") {
        systemInstruction += " Provide 4 fresh blog topic ideas with brief titles and descriptions for category: " + (category || "General");
        userPrompt = `Give me creative blog ideas.`;
      } else {
        userPrompt = prompt || text || "Suggest 3 creative writing tips.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ success: true, result: response.text });
    } catch (error: any) {
      console.error("Gemini AI API Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI response.",
      });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "WriteSphere" });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WriteSphere server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
