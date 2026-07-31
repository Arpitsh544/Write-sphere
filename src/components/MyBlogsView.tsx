import React, { useState } from "react";
import { BlogPost, AppScreen } from "../types";

interface MyBlogsViewProps {
  blogs: BlogPost[];
  onEditBlog: (blog: BlogPost) => void;
  onDeleteBlog: (blogId: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onSelectBlog: (blog: BlogPost) => void;
}

export const MyBlogsView: React.FC<MyBlogsViewProps> = ({
  blogs,
  onEditBlog,
  onDeleteBlog,
  onNavigate,
  onSelectBlog,
}) => {
  const [activeTab, setActiveTab] = useState<"published" | "draft" | "archived">("published");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesTab = (b.status || "published") === activeTab;
    const matchesQuery =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <main className="max-w-screen-md mx-auto px-4 sm:px-6 pb-32 pt-6 min-h-screen">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] bg-[#d9ff00] text-black font-mono-code text-xs uppercase font-black px-6 py-3 border border-black shadow-2xl animate-fadeIn flex items-center gap-2">
          <span className="material-symbols-outlined text-black text-sm">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Screen Title & CTA Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne text-2xl sm:text-3xl font-black uppercase text-white tracking-tighter">
            MY DISPATCHES
          </h1>
          <p className="font-mono-code text-xs uppercase text-white/50 tracking-wider">
            Manage your stories, drafts, and published dispatches
          </p>
        </div>
        <button
          onClick={() => onNavigate("create")}
          className="bg-[#d9ff00] text-black font-syne font-black text-xs uppercase tracking-wider px-5 py-2.5 hover:bg-white transition-all cursor-pointer flex items-center gap-1.5 border border-black"
        >
          <span className="material-symbols-outlined text-sm">edit_note</span>
          <span>NEW DISPATCH</span>
        </button>
      </div>

      {/* Tab Switcher & Search Bar */}
      <div className="space-y-4 mb-6">
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-none">
          <button
            onClick={() => setActiveTab("published")}
            className={`flex-1 py-2 font-syne text-xs uppercase font-bold tracking-wider text-center transition-all cursor-pointer ${
              activeTab === "published"
                ? "bg-[#d9ff00] text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            PUBLISHED
          </button>
          <button
            onClick={() => setActiveTab("draft")}
            className={`flex-1 py-2 font-syne text-xs uppercase font-bold tracking-wider text-center transition-all cursor-pointer ${
              activeTab === "draft"
                ? "bg-[#d9ff00] text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            DRAFTS
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`flex-1 py-2 font-syne text-xs uppercase font-bold tracking-wider text-center transition-all cursor-pointer ${
              activeTab === "archived"
                ? "bg-[#d9ff00] text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            ARCHIVED
          </button>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="FILTER DISPATCHES..."
          className="w-full bg-white/5 border border-white/10 rounded-none py-2.5 px-4 text-xs font-mono-code text-white uppercase focus:outline-none focus:border-[#d9ff00]"
        />
      </div>

      {/* Blog Cards List */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white/5 p-8 rounded-none border border-dashed border-white/20 text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-[#d9ff00]">
            post_add
          </span>
          <p className="font-syne text-lg font-bold uppercase text-white">
            NO {activeTab} DISPATCHES FOUND
          </p>
          <p className="font-mono-code text-xs uppercase text-white/50 max-w-sm mx-auto">
            Ready to express your bold ideas? Create a new story using WriteSphere's editor.
          </p>
          <button
            onClick={() => onNavigate("create")}
            className="px-6 py-2.5 bg-[#d9ff00] text-black font-syne font-black text-xs uppercase tracking-wider hover:bg-white"
          >
            START WRITING NOW
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white/5 p-4 border border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group hover:border-[#d9ff00] transition-all rounded-none"
            >
              <div className="flex gap-4 items-center flex-1 cursor-pointer" onClick={() => onSelectBlog(blog)}>
                <div className="w-20 h-20 overflow-hidden flex-shrink-0 bg-black border border-white/10">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#d9ff00] text-black text-[10px] font-mono-code font-black uppercase tracking-wider">
                      {blog.category}
                    </span>
                    <span className="font-mono-code text-[10px] uppercase text-white/50">
                      {blog.date}
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-sm sm:text-base uppercase text-white group-hover:text-[#d9ff00] transition-colors line-clamp-1">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] font-mono-code text-white/50 pt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">visibility</span>
                      <span>{blog.viewsCount || 0}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">thumb_up</span>
                      <span>{blog.likesCount}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">chat_bubble</span>
                      <span>{blog.commentsCount}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onEditBlog(blog)}
                  className="p-2 border border-white/10 hover:border-[#d9ff00] text-white hover:text-[#d9ff00] cursor-pointer"
                  title="Edit story"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    triggerToast("Dispatch link copied!");
                  }}
                  className="p-2 border border-white/10 hover:border-[#d9ff00] text-white hover:text-[#d9ff00] cursor-pointer"
                  title="Share story"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button
                  onClick={() => {
                    onDeleteBlog(blog.id);
                    triggerToast("Dispatch moved to trash");
                  }}
                  className="p-2 border border-white/10 hover:border-red-500 text-red-400 cursor-pointer"
                  title="Delete story"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Box */}
      <div className="mt-8 p-6 bg-white/5 border border-white/10 flex items-center justify-between rounded-none">
        <div>
          <h4 className="font-syne font-black text-sm uppercase text-white tracking-tight">
            BRING YOUR THOUGHTS TO LIFE
          </h4>
          <p className="font-mono-code text-xs uppercase text-white/50">
            Use WriteSphere's distraction-free editor and Gemini AI writer.
          </p>
        </div>
        <button
          onClick={() => onNavigate("create")}
          className="bg-[#d9ff00] text-black px-5 py-2.5 font-syne font-black text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer"
        >
          START WRITING
        </button>
      </div>
    </main>
  );
};

