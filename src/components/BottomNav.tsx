import React from "react";
import { AppScreen } from "../types";

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // Hide bottom nav during splash or auth screens
  if (currentScreen === "splash" || currentScreen === "auth") {
    return null;
  }

  const isHome = currentScreen === "home";
  const isCreate = currentScreen === "create";
  const isMyBlogs = currentScreen === "my-blogs";
  const isProfile = currentScreen === "profile";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 px-4 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 max-w-screen-md mx-auto">
      {/* Home Button */}
      <button
        onClick={() => onNavigate("home")}
        className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all cursor-pointer ${
          isHome
            ? "bg-[#d9ff00] text-black border-[#d9ff00] font-black"
            : "bg-white/5 border-white/10 text-[#F2F2F2] hover:border-white/30"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">home</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">FEED</span>
      </button>

      {/* Create Button */}
      <button
        onClick={() => onNavigate("create")}
        className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all cursor-pointer ${
          isCreate
            ? "bg-[#d9ff00] text-black border-[#d9ff00] font-black"
            : "bg-white/5 border-white/10 text-[#F2F2F2] hover:border-white/30"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">edit_note</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">WRITE</span>
      </button>

      {/* My Blogs / Archives */}
      <button
        onClick={() => onNavigate("my-blogs")}
        className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all cursor-pointer ${
          isMyBlogs
            ? "bg-[#d9ff00] text-black border-[#d9ff00] font-black"
            : "bg-white/5 border-white/10 text-[#F2F2F2] hover:border-white/30"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">folder_open</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">ARCHIVE</span>
      </button>

      {/* Profile Button */}
      <button
        onClick={() => onNavigate("profile")}
        className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all cursor-pointer ${
          isProfile
            ? "bg-[#d9ff00] text-black border-[#d9ff00] font-black"
            : "bg-white/5 border-white/10 text-[#F2F2F2] hover:border-white/30"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">person</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">USER</span>
      </button>
    </nav>
  );
};

