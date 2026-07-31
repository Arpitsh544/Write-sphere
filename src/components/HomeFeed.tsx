import React, { useState } from "react";
import { BlogPost, AppScreen } from "../types";
import { Search, X, ThumbsUp, MessageSquare, ArrowRight, Edit3, SearchX, Flame, Radio, TrendingUp } from "lucide-react";

interface HomeFeedProps {
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  onNavigate: (screen: AppScreen) => void;
  onToggleLike: (blogId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const CATEGORIES = [
  "All",
  "Technology",
  "Travel",
  "AI",
  "Health",
  "Programming",
  "Design",
  "Creative Writing",
  "Digital Nomad",
];

const POPULAR_KEYWORDS = ["#AI", "#React", "#Design", "#Nomad", "#Future", "#Writing", "#Tech"];

export const HomeFeed: React.FC<HomeFeedProps> = ({
  blogs,
  onSelectBlog,
  onNavigate,
  onToggleLike,
  searchQuery: externalSearchQuery,
  onSearchChange,
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;

  const handleQueryChange = (val: string) => {
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearchQuery(val);
    }
  };

  // Find featured story (or default to first blog)
  const featuredBlog = blogs.find((b) => b.isMustRead) || blogs[0];

  // Filter blogs using multi-keyword matching
  const filteredBlogs = blogs.filter((b) => {
    if (!searchQuery.trim()) {
      const matchesCategory =
        selectedCategory === "All" ||
        b.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesCategory;
    }

    const q = searchQuery.toLowerCase().trim();
    // Split query by spaces to allow multi-keyword matching
    const keywords = q.split(/\s+/).filter(Boolean);

    const matchesAllKeywords = keywords.every((term) => {
      const titleMatch = b.title.toLowerCase().includes(term);
      const subtitleMatch = b.subtitle?.toLowerCase().includes(term) ?? false;
      const authorMatch =
        b.author.name.toLowerCase().includes(term) ||
        (b.author.handle && b.author.handle.toLowerCase().includes(term));
      const categoryMatch = b.category.toLowerCase().includes(term);
      const tagMatch = b.tags.some((t) => t.toLowerCase().includes(term));
      const contentMatch = b.content.some((p) => p.toLowerCase().includes(term));

      return titleMatch || subtitleMatch || authorMatch || categoryMatch || tagMatch || contentMatch;
    });

    const matchesCategory =
      selectedCategory === "All" ||
      b.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesAllKeywords && matchesCategory;
  });

  return (
    <main className="pb-28 max-w-screen-md mx-auto min-h-screen px-4 sm:px-6">
      {/* Live Breaking Ticker */}
      <section className="mt-4 bg-white/5 border border-white/10 p-2.5 flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 bg-[#d9ff00] text-black font-syne font-black text-[10px] uppercase px-2 py-0.5 tracking-wider flex-shrink-0">
          <Radio className="w-3 h-3 animate-pulse text-red-600" />
          <span>TRENDING DISPATCH</span>
        </div>
        <div className="overflow-hidden flex-1 relative whitespace-nowrap text-xs font-mono-code text-white/80">
          <div className="inline-flex gap-8 animate-marquee">
            {blogs.slice(0, 4).map((b) => (
              <span
                key={b.id}
                onClick={() => onSelectBlog(b)}
                className="cursor-pointer hover:text-[#d9ff00] transition-colors inline-flex items-center gap-2"
              >
                <Flame className="w-3 h-3 text-[#d9ff00]" />
                <span className="font-bold">{b.title}</span>
                <span className="text-white/40">[{b.likesCount} Claps]</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="mt-6 space-y-3">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#d9ff00] transition-colors w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="FILTER BY KEYWORD, AUTHOR, TAG, OR TITLE..."
            className="w-full bg-white/5 border border-white/10 rounded-none py-3.5 pl-11 pr-20 focus:outline-none focus:border-[#d9ff00] transition-colors font-mono-code text-xs text-[#F2F2F2] placeholder:text-white/30 uppercase tracking-wider"
          />
          {searchQuery && (
            <button
              onClick={() => handleQueryChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#d9ff00] text-[10px] font-mono-code uppercase cursor-pointer flex items-center gap-1 bg-white/10 px-2 py-1 border border-white/10"
            >
              <X className="w-3 h-3" />
              <span>CLEAR</span>
            </button>
          )}
        </div>

        {/* Quick Keyword Suggestion Badges */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar text-[10px] font-mono-code text-white/50">
          <span className="uppercase tracking-widest text-[#d9ff00]">POPULAR:</span>
          {POPULAR_KEYWORDS.map((kw) => {
            const cleanKw = kw.replace("#", "");
            const isActive = searchQuery.toLowerCase().includes(cleanKw.toLowerCase());
            return (
              <button
                key={kw}
                onClick={() => handleQueryChange(cleanKw)}
                className={`px-2 py-0.5 border cursor-pointer transition-colors ${
                  isActive
                    ? "bg-[#d9ff00] text-black border-[#d9ff00] font-bold"
                    : "bg-black/40 text-white/70 border-white/15 hover:border-white/40 hover:text-white"
                }`}
              >
                {kw}
              </button>
            );
          })}
        </div>
      </section>

      {/* Categories Horizontal Chips */}
      <section className="mt-5">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 py-1">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-none font-mono-code text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#d9ff00] text-black border-[#d9ff00] font-black"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Story Section */}
      {featuredBlog && selectedCategory === "All" && !searchQuery && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono-code font-bold uppercase tracking-[0.3em] text-[#d9ff00]">
              FEATURED DISPATCH
            </span>
            <div className="h-[1px] bg-white/10 flex-grow" />
          </div>

          <div
            onClick={() => onSelectBlog(featuredBlog)}
            className="bg-white/5 border border-white/10 p-4 sm:p-6 group cursor-pointer transition-all duration-300 hover:border-[#d9ff00] rounded-none"
          >
            <div className="h-64 sm:h-80 relative overflow-hidden mb-6 border border-white/10">
              <img
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#d9ff00] text-black px-3 py-1 font-mono-code text-[10px] font-black uppercase tracking-[0.2em]">
                  MUST READ // ISSUE 01
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-none border border-[#d9ff00] overflow-hidden p-0.5 bg-black">
                  <img
                    src={featuredBlog.author.avatar}
                    alt={featuredBlog.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-mono-code text-xs text-white/60 uppercase tracking-wider">
                  BY {featuredBlog.author.name} • {featuredBlog.readTime}
                </span>
              </div>

              <h3 className="font-syne text-2xl sm:text-4xl font-black uppercase tracking-tighter text-white mb-3 group-hover:text-[#d9ff00] transition-colors leading-none">
                {featuredBlog.title}
              </h3>

              <p className="text-white/70 font-grotesk text-sm sm:text-base line-clamp-2 mb-6 leading-relaxed">
                {featuredBlog.subtitle}
              </p>

              <button className="inline-flex items-center gap-2 bg-white text-black font-syne font-black text-xs uppercase tracking-[0.2em] px-5 py-2.5 group-hover:bg-[#d9ff00] transition-colors cursor-pointer">
                <span>READ ARTICLE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blogs Section */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <h2 className="font-syne text-xl sm:text-2xl font-black uppercase tracking-tighter text-white">
            {searchQuery
              ? `RESULTS FOR: "${searchQuery}"`
              : selectedCategory !== "All"
              ? `CATEGORY: ${selectedCategory}`
              : "LATEST ARCHIVES"}
          </h2>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={() => {
                handleQueryChange("");
                setSelectedCategory("All");
              }}
              className="text-[#d9ff00] font-mono-code text-[10px] font-bold uppercase tracking-wider hover:underline cursor-pointer"
            >
              [ RESET FILTERS ]
            </button>
          )}
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 bg-white/5 border border-dashed border-white/20 p-8 flex flex-col items-center">
            <SearchX className="w-10 h-10 text-white/30 mb-3" />
            <p className="font-syne text-lg font-bold uppercase text-white">
              NO DISPATCHES FOUND
            </p>
            <p className="font-mono-code text-xs text-white/50 mt-1">
              Try modifying search keywords or resetting category filters.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => onSelectBlog(blog)}
                className="flex flex-col sm:flex-row gap-4 bg-white/5 p-4 border border-white/10 hover:border-[#d9ff00] transition-all cursor-pointer group rounded-none"
              >
                <div className="w-full sm:w-36 h-36 border border-white/10 overflow-hidden flex-shrink-0">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-mono-code text-[#d9ff00] uppercase font-bold tracking-widest">
                        {blog.category}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-[9px] font-mono-code text-white/50 uppercase">
                        {blog.date}
                      </span>
                    </div>
                    <h3 className="font-syne text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#d9ff00] transition-colors leading-tight mb-2">
                      {blog.title}
                    </h3>
                    <p className="font-grotesk text-xs sm:text-sm text-white/70 line-clamp-2 mb-3">
                      {blog.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-mono-code text-[10px] text-white/60 uppercase font-bold">
                      {blog.author.name}
                    </span>
                    <div className="flex items-center gap-4 text-white/60 text-xs font-mono-code">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLike(blog.id);
                        }}
                        className={`flex items-center gap-1 hover:text-[#d9ff00] transition-colors ${
                          blog.isLiked ? "text-[#d9ff00]" : ""
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{blog.likesCount}</span>
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{blog.commentsCount}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        {blog.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <button
        onClick={() => onNavigate("create")}
        className="fixed right-6 bottom-20 w-12 h-12 bg-[#d9ff00] text-black border border-black flex items-center justify-center shadow-2xl active:scale-95 transition-all z-40 cursor-pointer hover:bg-white"
        title="Create New Story"
      >
        <Edit3 className="w-6 h-6 text-black" />
      </button>
    </main>
  );
};

