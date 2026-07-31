import React, { useState } from "react";

interface AIHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTitle?: (title: string) => void;
  onApplyContent?: (content: string) => void;
  currentTitle?: string;
  currentContent?: string;
  currentCategory?: string;
}

export const AIHelperModal: React.FC<AIHelperModalProps> = ({
  isOpen,
  onClose,
  onApplyTitle,
  onApplyContent,
  currentTitle,
  currentContent,
  currentCategory,
}) => {
  const [promptInput, setPromptInput] = useState("");
  const [mode, setMode] = useState<"title" | "expand" | "summarize" | "ideas">("title");
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setAiOutput(null);

    try {
      const response = await fetch("/api/ai/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: mode,
          prompt: promptInput || currentTitle || currentContent,
          text: currentContent,
          title: currentTitle,
          category: currentCategory,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAiOutput(data.result);
      } else {
        setErrorMsg(data.error || "Failed to generate text");
      }
    } catch (err: any) {
      setErrorMsg("Error connecting to Gemini AI assistant");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#050505] border border-white/20 w-full max-w-lg p-6 shadow-2xl space-y-4 animate-scaleUp rounded-none">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d9ff00]">auto_awesome</span>
            <h3 className="font-syne text-lg font-black uppercase text-white tracking-wider">
              GEMINI AI ASSISTANT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/50 hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setMode("title")}
            className={`px-3 py-1.5 font-mono-code text-xs uppercase font-bold cursor-pointer transition-colors ${
              mode === "title"
                ? "bg-[#d9ff00] text-black"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            CATCHY TITLES
          </button>
          <button
            onClick={() => setMode("expand")}
            className={`px-3 py-1.5 font-mono-code text-xs uppercase font-bold cursor-pointer transition-colors ${
              mode === "expand"
                ? "bg-[#d9ff00] text-black"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            EXPAND / POLISH
          </button>
          <button
            onClick={() => setMode("summarize")}
            className={`px-3 py-1.5 font-mono-code text-xs uppercase font-bold cursor-pointer transition-colors ${
              mode === "summarize"
                ? "bg-[#d9ff00] text-black"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            SUMMARIZE
          </button>
          <button
            onClick={() => setMode("ideas")}
            className={`px-3 py-1.5 font-mono-code text-xs uppercase font-bold cursor-pointer transition-colors ${
              mode === "ideas"
                ? "bg-[#d9ff00] text-black"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            TOPIC IDEAS
          </button>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="font-mono-code text-xs uppercase text-white/60 tracking-wider">
            {mode === "title"
              ? "Describe your story theme or enter a draft title:"
              : mode === "expand"
              ? "Enter notes or text to enhance:"
              : mode === "summarize"
              ? "Paste article text to summarize:"
              : "Topic category or prompt:"}
          </label>
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder={
              mode === "title"
                ? "e.g., Minimalist digital habits for writers"
                : "e.g., Add key takeaways on cognitive load..."
            }
            rows={3}
            className="w-full bg-white/5 border border-white/20 p-3 font-mono-code text-xs text-white focus:outline-none focus:border-[#d9ff00] rounded-none"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-[#d9ff00] text-black py-3 font-syne font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-sm">sync</span>
              <span>GEMINI IS THINKING...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>GENERATE WITH AI</span>
            </>
          )}
        </button>

        {errorMsg && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-xs font-mono-code">
            {errorMsg}
          </div>
        )}

        {/* AI Output Result */}
        {aiOutput && (
          <div className="space-y-3 pt-2">
            <label className="font-mono-code text-xs uppercase font-bold text-[#d9ff00]">
              AI SUGGESTION:
            </label>
            <div className="p-4 bg-white/5 border border-white/20 text-xs font-grotesk max-h-48 overflow-y-auto whitespace-pre-wrap text-white/90 leading-relaxed">
              {aiOutput}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              {onApplyTitle && mode === "title" && (
                <button
                  onClick={() => {
                    const cleanTitle = aiOutput.replace(/^[0-9.-]+\s*/, "").split("\n")[0];
                    onApplyTitle(cleanTitle);
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#d9ff00] text-black font-syne font-black text-xs uppercase tracking-wider hover:bg-white cursor-pointer"
                >
                  USE AS STORY TITLE
                </button>
              )}
              {onApplyContent && (mode === "expand" || mode === "summarize") && (
                <button
                  onClick={() => {
                    onApplyContent(aiOutput);
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#d9ff00] text-black font-syne font-black text-xs uppercase tracking-wider hover:bg-white cursor-pointer"
                >
                  APPEND TO EDITOR
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

