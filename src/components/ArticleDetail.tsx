import React, { useState, useEffect, useRef } from "react";
import { BlogPost, Comment } from "../types";
import {
  ArrowLeft,
  Sun,
  Moon,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  AArrowUp,
  AArrowDown,
  CheckCircle2,
  Send,
  X,
  UserCheck,
  UserPlus
} from "lucide-react";

interface ArticleDetailProps {
  blog: BlogPost;
  onBack: () => void;
  onToggleLike: (blogId: string) => void;
  onToggleSave: (blogId: string) => void;
  comments: Comment[];
  onAddComment: (blogId: string, text: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  blog,
  onBack,
  onToggleLike,
  onToggleSave,
  comments,
  onAddComment,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState(16); // base body font size in px
  const [isFollowing, setIsFollowing] = useState(blog.author.isFollowing || false);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Reading State (Web Speech API)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [speechSupported, setSpeechSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleAudio = () => {
    if (!speechSupported) {
      triggerToast("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.pause();
      setIsPlayingAudio(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlayingAudio(true);
      } else {
        window.speechSynthesis.cancel();
        const textToRead = `${blog.title}. Written by ${blog.author.name}. ${blog.content.join(". ")}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = audioSpeed;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
        triggerToast("Audio playback started");
      }
    }
  };

  const handleStopAudio = () => {
    if (speechSupported) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(audioSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setAudioSpeed(newSpeed);

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      const textToRead = `${blog.title}. ${blog.content.join(". ")}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = newSpeed;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      triggerToast(`Playback speed set to ${newSpeed}x`);
    }
  };

  // Calculate reading progress bar width
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const trackLength = documentHeight - windowHeight;
      if (trackLength > 0) {
        const percentage = Math.min(100, Math.floor((scrollTop / trackLength) * 100));
        setScrollProgress(percentage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Link copied to clipboard!");
    } else {
      triggerToast("Article ready to share!");
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(blog.id, commentInput.trim());
    setCommentInput("");
    triggerToast("Comment published!");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2F2] transition-colors duration-300 relative pb-28 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] bg-[#d9ff00] text-black font-mono-code text-xs uppercase font-black px-6 py-3 border border-black shadow-2xl animate-fadeIn flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/10">
        <div
          className="h-full bg-[#d9ff00] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header */}
      <header className="bg-[#050505]/90 backdrop-blur-md text-[#F2F2F2] w-full top-0 sticky z-50 flex items-center justify-between px-4 sm:px-8 h-16 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center p-2 border border-white/10 text-white hover:border-[#d9ff00] hover:text-[#d9ff00] transition-all cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-syne text-xl font-black uppercase tracking-tighter">
            WRITESPHERE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-none text-white hover:border-[#d9ff00] hover:text-[#d9ff00] transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="w-9 h-9 border border-[#d9ff00] overflow-hidden p-0.5 bg-black">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Hero Cover Image */}
      <section className="w-full h-[320px] md:h-[420px] relative overflow-hidden border-b border-white/10">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </section>

      {/* Main Article Content Container */}
      <article className="max-w-screen-md mx-auto px-4 sm:px-8 -mt-20 relative z-20">
        <div className="bg-white/5 border border-white/10 p-6 md:p-12 transition-colors rounded-none">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono-code text-xs">
            <span className="bg-[#d9ff00] text-black px-3 py-1 font-black uppercase tracking-[0.2em]">
              {blog.category}
            </span>
            <div className="flex items-center gap-1.5 text-white/60">
              <Calendar className="w-3.5 h-3.5" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <Clock className="w-3.5 h-3.5" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-syne text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight text-white">
            {blog.title}
          </h1>

          {/* Author Info Card */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-12 h-12 border-2 border-[#d9ff00] overflow-hidden p-0.5 bg-black">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-syne font-bold uppercase text-white">
                {blog.author.name}
              </p>
              <p className="font-mono-code text-xs text-white/50">
                {blog.author.role}
              </p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  triggerToast(
                    isFollowing
                      ? `Unfollowed ${blog.author.name}`
                      : `You are now following ${blog.author.name}!`
                  );
                }}
                className={`px-4 py-2 font-syne font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                  isFollowing
                    ? "bg-white/10 text-white border border-white/20"
                    : "bg-[#d9ff00] text-black hover:bg-white"
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>FOLLOWING</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>FOLLOW</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Text-to-Speech Audio Widget */}
          <div className="mb-8 p-4 bg-black/60 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 border ${isPlayingAudio ? "bg-[#d9ff00] text-black border-[#d9ff00]" : "bg-white/5 text-white/80 border-white/10"}`}>
                {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div>
                <p className="font-syne text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                  <span>AUDIO SYNTHESIS READER</span>
                  {isPlayingAudio && (
                    <span className="flex items-center gap-0.5 h-3">
                      <span className="w-0.5 h-full bg-[#d9ff00] animate-bounce" />
                      <span className="w-0.5 h-2/3 bg-[#d9ff00] animate-bounce delay-75" />
                      <span className="w-0.5 h-full bg-[#d9ff00] animate-bounce delay-150" />
                    </span>
                  )}
                </p>
                <p className="font-mono-code text-[10px] text-white/50">
                  {isPlayingAudio ? "LISTEN LIVE • READING DISPATCH..." : "AI TEXT-TO-SPEECH PLAYBACK"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className="px-3 py-1.5 bg-[#d9ff00] text-black hover:bg-white font-syne font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>PLAY ARTICLE</span>
                  </>
                )}
              </button>

              {isPlayingAudio && (
                <button
                  onClick={handleStopAudio}
                  className="p-1.5 border border-white/20 text-white/80 hover:text-white hover:border-white cursor-pointer"
                  title="Stop playback"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleSpeedChange}
                className="px-2 py-1.5 border border-white/20 text-white font-mono-code text-[10px] font-bold hover:border-[#d9ff00] hover:text-[#d9ff00] cursor-pointer"
                title="Change speed"
              >
                {audioSpeed}X
              </button>
            </div>
          </div>

          {/* Article Body Content */}
          <div
            className="article-content font-grotesk text-[#F2F2F2] leading-relaxed space-y-6"
            style={{ fontSize: `${fontSize}px` }}
          >
            {blog.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="font-syne text-xl md:text-3xl font-black uppercase tracking-tight text-[#d9ff00] pt-6 pb-2"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={index} className="opacity-90 leading-relaxed font-light">
                  {paragraph}
                </p>
              );
            })}

            {/* Embedded Figure Image if present */}
            {blog.figureImage && (
              <div className="my-8 overflow-hidden border border-white/10">
                <img
                  src={blog.figureImage.url}
                  alt={blog.figureImage.caption}
                  className="w-full aspect-video object-cover"
                />
                <p className="p-3 bg-white/5 font-mono-code text-xs italic text-center text-white/60 uppercase tracking-wider">
                  {blog.figureImage.caption}
                </p>
              </div>
            )}
          </div>

          {/* Tags Footer */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/5 border border-white/10 text-[#d9ff00] font-mono-code text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 hover:bg-white/10 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Floating Font Resizing Controls */}
      <div className="fixed right-6 bottom-24 flex flex-col gap-2 z-40">
        <button
          onClick={() => {
            if (fontSize < 24) setFontSize(fontSize + 2);
          }}
          className="w-10 h-10 bg-[#050505] border border-white/20 hover:border-[#d9ff00] flex items-center justify-center text-white hover:text-[#d9ff00] transition-all cursor-pointer"
          title="Increase text size"
        >
          <AArrowUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (fontSize > 13) setFontSize(fontSize - 2);
          }}
          className="w-10 h-10 bg-[#050505] border border-white/20 hover:border-[#d9ff00] flex items-center justify-center text-white hover:text-[#d9ff00] transition-all cursor-pointer"
          title="Decrease text size"
        >
          <AArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Fixed Bottom Interaction Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center h-16 px-4 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-2">
          {/* Like button */}
          <button
            onClick={() => onToggleLike(blog.id)}
            className={`flex items-center gap-2 transition-all cursor-pointer ${
              blog.isLiked ? "text-[#d9ff00]" : "text-white/70 hover:text-white"
            }`}
          >
            <Heart className={`w-5 h-5 ${blog.isLiked ? "fill-[#d9ff00]" : ""}`} />
            <span className="font-mono-code text-xs font-bold">
              {blog.likesCount >= 1000
                ? `${(blog.likesCount / 1000).toFixed(1)}k`
                : blog.likesCount}
            </span>
          </button>

          {/* Comments button */}
          <button
            onClick={() => setShowCommentsDrawer(true)}
            className="flex items-center gap-2 text-white/70 hover:text-[#d9ff00] transition-all cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-mono-code text-xs font-bold">
              {blog.commentsCount + comments.length}
            </span>
          </button>

          {/* Save/Bookmark button */}
          <button
            onClick={() => {
              onToggleSave(blog.id);
              triggerToast(
                blog.isSaved
                  ? "Removed from Saved Blogs"
                  : "Saved to your reading list!"
              );
            }}
            className={`flex items-center gap-2 transition-all cursor-pointer ${
              blog.isSaved ? "text-[#d9ff00]" : "text-white/70 hover:text-white"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${blog.isSaved ? "fill-[#d9ff00]" : ""}`} />
            <span className="font-mono-code text-xs font-bold uppercase">
              {blog.isSaved ? "SAVED" : "SAVE"}
            </span>
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" />

          {/* Share button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-white/70 hover:text-[#d9ff00] transition-all cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-mono-code text-xs font-bold uppercase">SHARE</span>
          </button>
        </div>
      </nav>

      {/* Comments Drawer / Modal */}
      {showCommentsDrawer && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#050505] border border-white/20 w-full max-w-lg max-h-[80vh] flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#d9ff00]" />
                <h3 className="font-syne text-xl font-black uppercase text-white">
                  COMMENTS ({blog.commentsCount + comments.length})
                </h3>
              </div>
              <button
                onClick={() => setShowCommentsDrawer(false)}
                className="p-1 text-white/50 hover:text-[#d9ff00] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comment List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
              {comments.length === 0 ? (
                <p className="text-center py-6 text-white/40 font-mono-code text-xs uppercase">
                  NO COMMENTS RECORDED YET.
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white/5 p-4 border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-7 h-7 rounded-none border border-[#d9ff00] object-cover"
                        />
                        <span className="font-syne font-bold text-xs uppercase text-white">
                          {comment.authorName}
                        </span>
                      </div>
                      <span className="font-mono-code text-[10px] text-white/40 uppercase">
                        {comment.date}
                      </span>
                    </div>
                    <p className="font-grotesk text-xs text-white/80">
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Post Comment Form */}
            <form onSubmit={handlePostComment} className="flex gap-2 pt-3 border-t border-white/10">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="WRITE A COMMENT..."
                className="flex-1 bg-white/5 border border-white/15 px-4 py-2.5 text-xs font-mono-code text-white focus:outline-none focus:border-[#d9ff00]"
              />
              <button
                type="submit"
                className="bg-[#d9ff00] text-black px-5 py-2.5 font-syne font-black text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

