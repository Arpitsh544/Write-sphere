import React, { useState } from "react";
import { BlogPost, BlogPostStatus } from "../types";
import { AIHelperModal } from "./AIHelperModal";

interface StoryEditorProps {
  onPublish: (blog: Partial<BlogPost>) => void;
  onSaveDraft: (blog: Partial<BlogPost>) => void;
  initialBlog?: Partial<BlogPost> | null;
  userAvatar: string;
  userName: string;
}

const PRESET_COVERS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQNuXs1oP5iOArqmW4oonWOHlXpvjJGEaAxFqzl3F8nHKNLrJiSfHT1wGZzFDQB5-cqrzcKtDCYZHO2T_qPczW0wgwXaHKs91BEfpw8I4eB-FTeNYGTKCZI3fKtOGEW5U0-9QZu7zBfBRQu6iX5n5SG-WFbs6_LboUcCizvIMCqo1CsALbQOZvY_dAMcEAKfLns3h8zWlfLwoLh3hhvCUYo6zfZ9TfyzLCpXRE5gC5_eLSGqCK0HoZ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXsG4faqJK6zNoY9bYe3J-cc6ii9voL79Q0qoQXlNeQ94EKL8aSJBuy55RVa5OiWrpSxv5e5rTI80pEOyPuljkA7CJE9PVLORVUTukkvmP-db4aahhhLaqfExCfNP9cB_DAlQOP-sPkJU3Tp2uxA43CARCc0rr35BL7PZMYlKIW_-KihfzpKAE5K0navicORbcF4DbLMzOR1V8pFT8K1Se2ejrzF7tsjDX8D8_MNBG6cyRuNthHkzs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXra_zlccfEmU4AbSQznEALOZ0z6bp1GxeKNbaTaGiDvgKAB4Te2WRPpwJbpU1XI-wjD3XBL7IDKaz24tMGQnWvt7aJ2aLDrW2IeIn1j1Aq8gVnGwg7UYCt06XqB3Z99wVkLm25rD0Xwj9G3sNLAXa_kmB1UXJVDT4VubcdAGBASNE7RIAW5SKA8ugLmCF1dHIhxY2iR3giNN8k0OmE0pYX8mIh3QM7mhYChG33MbvuyJ_CesrEJ2",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3FuQdtfXuYY2bdaIlhIG4NoM-U9wbalGCOyPPGIpKaCsOZeJ0jh45OtHyDcU74LGIMCWZXYGpvpk_WwStV-KG2evDUX8NSmbia9ic40nLvTfe2_xRaGsQuIoByUJMxsoCK45OlbJYES8nRpMq0xXMdhl8GcqCXCMRJI20zqWtfojucZGaselGf9ObY2AP55IFD8n0rgT9jxOwePLaeOkcBRP0i2RTgfqMHOtWi30vGB2lNkSVQTyd",
];

const CATEGORIES = [
  "Technology",
  "Creative Writing",
  "Digital Nomad",
  "Design",
  "AI",
  "Health",
  "Programming",
];

export const StoryEditor: React.FC<StoryEditorProps> = ({
  onPublish,
  onSaveDraft,
  initialBlog,
  userAvatar,
  userName,
}) => {
  const [title, setTitle] = useState(initialBlog?.title || "");
  const [category, setCategory] = useState(initialBlog?.category || "Technology");
  const [content, setContent] = useState(
    initialBlog?.content ? initialBlog.content.join("\n\n") : ""
  );
  const [coverImage, setCoverImage] = useState(
    initialBlog?.coverImage || PRESET_COVERS[0]
  );
  const [tags, setTags] = useState<string[]>(
    initialBlog?.tags || ["AI", "Python", "Android", "Development"]
  );
  const [customTagInput, setCustomTagInput] = useState("");
  const [showAddTag, setShowAddTag] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estimate read time
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const estimatedMins = Math.max(1, Math.ceil(wordCount / 180));

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddTag = () => {
    if (customTagInput.trim() && !tags.includes(customTagInput.trim())) {
      setTags([...tags, customTagInput.trim()]);
      setCustomTagInput("");
      setShowAddTag(false);
    }
  };

  const handleToggleTag = (tagToToggle: string) => {
    if (tags.includes(tagToToggle)) {
      setTags(tags.filter((t) => t !== tagToToggle));
    } else {
      setTags([...tags, tagToToggle]);
    }
  };

  const handleFormatText = (prefix: string, suffix: string = "") => {
    setContent((prev) => prev + `\n${prefix}Text${suffix}`);
  };

  const buildBlogPayload = (status: BlogPostStatus): Partial<BlogPost> => {
    const paragraphs = content
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    return {
      id: initialBlog?.id || `blog-${Date.now()}`,
      title: title.trim() || "Untitled Story",
      subtitle: paragraphs[0]?.substring(0, 140) + "..." || "A new story on WriteSphere.",
      category,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      readTime: `${estimatedMins} min read`,
      author: {
        name: userName,
        role: "Digital Nomad & Writer",
        avatar: userAvatar,
        handle: "@elena_writes",
      },
      coverImage,
      content: paragraphs.length > 0 ? paragraphs : ["Story content goes here..."],
      tags,
      status,
      likesCount: initialBlog?.likesCount || 0,
      commentsCount: initialBlog?.commentsCount || 0,
    };
  };

  const handlePublishClick = () => {
    if (!title.trim()) {
      triggerToast("Please enter a story title before publishing!");
      return;
    }
    const blog = buildBlogPayload("published");
    onPublish(blog);
  };

  const handleSaveDraftClick = () => {
    const blog = buildBlogPayload("draft");
    onSaveDraft(blog);
    triggerToast("Draft saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2F2] font-grotesk pb-32">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] bg-[#d9ff00] text-black font-mono-code text-xs uppercase font-black px-6 py-3 border border-black shadow-2xl animate-fadeIn flex items-center gap-2">
          <span className="material-symbols-outlined text-black text-sm">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Canvas Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        {/* Cover Image Selection Banner */}
        <section className="space-y-3 mb-8">
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-white/5 border border-white/10 group cursor-pointer hover:border-[#d9ff00] transition-all rounded-none overflow-hidden">
            <img
              src={coverImage}
              alt="Cover Image"
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 text-[#d9ff00] transition-opacity">
              <span className="material-symbols-outlined text-3xl">add_a_photo</span>
              <p className="font-mono-code text-xs uppercase tracking-widest font-bold">CHANGE COVER IMAGE</p>
            </div>
          </div>

          {/* Preset Covers Carousel */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="text-[10px] font-mono-code uppercase text-white/50 whitespace-nowrap">
              PRESET COVERS:
            </span>
            {PRESET_COVERS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setCoverImage(preset)}
                className={`w-16 h-10 border flex-shrink-0 cursor-pointer transition-all ${
                  coverImage === preset
                    ? "border-[#d9ff00]"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Metadata Inputs */}
        <section className="space-y-6 mb-8">
          {/* Title Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="font-mono-code text-xs uppercase text-white/60 tracking-wider">
                STORY TITLE
              </label>
              <button
                onClick={() => setShowAIModal(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#d9ff00] font-mono-code font-bold uppercase tracking-wider hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>AI TITLE ASSIST</span>
              </button>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ENTER A BOLD TITLE..."
              className="w-full bg-white/5 border border-white/10 px-5 py-4 font-syne text-xl sm:text-3xl font-black uppercase text-white focus:outline-none focus:border-[#d9ff00] transition-all placeholder:text-white/20 rounded-none tracking-tight"
            />
          </div>

          {/* Category and Reading Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-mono-code text-xs uppercase text-white/60 tracking-wider px-1">
                CATEGORY
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 px-5 py-3 font-mono-code text-xs text-white uppercase focus:outline-none focus:border-[#d9ff00] transition-all cursor-pointer rounded-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-black text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  expand_more
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono-code text-xs uppercase text-white/60 tracking-wider px-1">
                READ TIME (ESTIMATE)
              </label>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 text-xs font-mono-code text-white/80 rounded-none">
                <span className="material-symbols-outlined text-white/50 text-sm">schedule</span>
                <span>
                  {estimatedMins} MIN READ ({wordCount} WORDS)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Editor Container or Live Preview Mode */}
        {isPreview ? (
          <section className="bg-white/5 border border-white/10 p-8 space-y-6 rounded-none">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono-code font-bold text-[#d9ff00] uppercase tracking-widest">
                LIVE PREVIEW MODE
              </span>
              <button
                onClick={() => setIsPreview(false)}
                className="text-xs text-white/60 hover:text-[#d9ff00] font-mono-code uppercase"
              >
                [ EDIT MODE ]
              </button>
            </div>
            <h1 className="font-syne text-3xl font-black uppercase text-white tracking-tighter">
              {title || "Untitled Story"}
            </h1>
            <div className="space-y-4 font-grotesk text-white/80 leading-relaxed whitespace-pre-wrap">
              {content || "No content written yet."}
            </div>
          </section>
        ) : (
          <section className="bg-white/5 border border-white/10 overflow-hidden transition-all rounded-none">
            {/* Editor Formatting Toolbar */}
            <div className="flex items-center flex-wrap gap-1 p-3 border-b border-white/10 bg-black/40">
              <button
                onClick={() => handleFormatText("**", "**")}
                className="p-2 border border-transparent hover:border-white/20 text-white cursor-pointer"
                title="Bold"
              >
                <span className="material-symbols-outlined text-[18px]">format_bold</span>
              </button>
              <button
                onClick={() => handleFormatText("*", "*")}
                className="p-2 border border-transparent hover:border-white/20 text-white cursor-pointer"
                title="Italic"
              >
                <span className="material-symbols-outlined text-[18px]">format_italic</span>
              </button>

              <div className="w-[1px] h-6 bg-white/20 mx-1" />

              <button
                onClick={() => handleFormatText("## ")}
                className="p-2 border border-transparent hover:border-white/20 text-white cursor-pointer"
                title="Heading"
              >
                <span className="material-symbols-outlined text-[18px]">format_size</span>
              </button>
              <button
                onClick={() => handleFormatText("> ")}
                className="p-2 border border-transparent hover:border-white/20 text-white cursor-pointer"
                title="Quote"
              >
                <span className="material-symbols-outlined text-[18px]">format_quote</span>
              </button>
              <button
                onClick={() => handleFormatText("- ")}
                className="p-2 border border-transparent hover:border-white/20 text-white cursor-pointer"
                title="Bullet List"
              >
                <span className="material-symbols-outlined text-[18px]">
                  format_list_bulleted
                </span>
              </button>
              <button
                onClick={() => handleFormatText("```\n", "\n```")}
                className="p-2 border border-transparent hover:border-white/20 text-white cursor-pointer"
                title="Code block"
              >
                <span className="material-symbols-outlined text-[18px]">code</span>
              </button>

              {/* Gemini AI Writer Button */}
              <button
                onClick={() => setShowAIModal(true)}
                className="ml-2 px-3 py-1.5 bg-[#d9ff00] text-black hover:bg-white text-xs font-syne font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Polish & Expand with Gemini"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>AI WRITER</span>
              </button>

              <div className="ml-auto flex items-center gap-2 px-2">
                <span className="w-2 h-2 rounded-full bg-[#d9ff00] animate-pulse" />
                <span className="font-mono-code text-[10px] uppercase text-white/50">
                  AUTO-SAVED
                </span>
              </div>
            </div>

            {/* Editable Content Canvas */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story... (Supports markdown, paragraphs, and headings)"
              rows={14}
              className="w-full p-6 font-grotesk text-white/90 focus:outline-none bg-transparent resize-none leading-relaxed placeholder:text-white/20"
            />
          </section>
        )}

        {/* Trending Tags Section */}
        <section className="mt-8 space-y-3">
          <h3 className="font-mono-code text-xs uppercase text-white/60 tracking-wider px-1">
            TRENDING & CUSTOM TAGS
          </h3>
          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleToggleTag(tag)}
                className="px-3 py-1 bg-[#d9ff00] text-black font-mono-code text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1"
              >
                <span>#{tag}</span>
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
            ))}

            <button
              onClick={() => setShowAddTag(!showAddTag)}
              className="px-3 py-1 bg-white/5 border border-dashed border-white/20 hover:border-[#d9ff00] text-white/70 font-mono-code text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>ADD TAG</span>
            </button>
          </div>

          {/* Add Tag Modal/Input Inline */}
          {showAddTag && (
            <div className="flex items-center gap-2 pt-2 animate-fadeIn max-w-xs">
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="New tag..."
                className="bg-white/5 border border-white/20 px-3 py-1.5 text-xs font-mono-code text-white focus:outline-none focus:border-[#d9ff00]"
              />
              <button
                onClick={handleAddTag}
                className="bg-[#d9ff00] text-black px-3 py-1.5 font-syne font-black text-xs uppercase"
              >
                ADD
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Fixed Bottom Action Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraftClick}
              className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-white text-white font-mono-code text-xs uppercase font-bold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span className="hidden sm:inline">SAVE DRAFT</span>
            </button>

            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-white text-white font-mono-code text-xs uppercase font-bold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPreview ? "edit" : "visibility"}
              </span>
              <span className="hidden sm:inline">
                {isPreview ? "EDIT" : "PREVIEW"}
              </span>
            </button>
          </div>

          <button
            onClick={handlePublishClick}
            className="bg-[#d9ff00] text-black font-syne font-black text-xs uppercase tracking-widest px-8 py-3 hover:bg-white transition-all cursor-pointer flex items-center gap-2"
          >
            <span>PUBLISH DISPATCH</span>
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </nav>

      {/* Gemini AI Helper Modal */}
      <AIHelperModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        currentTitle={title}
        currentContent={content}
        currentCategory={category}
        onApplyTitle={(newTitle) => {
          setTitle(newTitle);
          triggerToast("Applied AI title!");
        }}
        onApplyContent={(newContent) => {
          setContent((prev) => prev + "\n\n" + newContent);
          triggerToast("Appended AI generated section!");
        }}
      />
    </div>
  );
};

