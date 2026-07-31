import React from "react";
import { AppScreen, UserProfile } from "../types";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: AppScreen) => void;
  userProfile: UserProfile;
  onSelectSavedBlogs: () => void;
  onSelectDrafts: () => void;
  onShowSplash: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  userProfile,
  onSelectSavedBlogs,
  onSelectDrafts,
  onShowSplash,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Drawer Panel */}
      <aside className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-[#050505] border-r border-white/10 z-50 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col py-6 overflow-y-auto">
        {/* Header Metadata */}
        <div className="px-6 pb-4 border-b border-white/10 flex justify-between items-center">
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#d9ff00]">
            System Menu // Alpha-9
          </span>
          <button
            onClick={onClose}
            className="p-1 text-white/60 hover:text-[#d9ff00] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* User Card Section */}
        <div className="px-6 py-6 border-b border-white/10 flex flex-col items-start bg-white/5">
          <div className="w-14 h-14 rounded-sm border-2 border-[#d9ff00] overflow-hidden mb-3 p-0.5 bg-black">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover rounded-none"
            />
          </div>
          <h4 className="font-syne text-xl font-black uppercase text-[#F2F2F2]">
            {userProfile.name}
          </h4>
          <p className="font-mono-code text-xs text-white/50">
            {userProfile.email}
          </p>
          <span className="mt-3 inline-block px-2 py-0.5 bg-[#d9ff00] text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-none">
            PRO SUBSCRIBER
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <button
            onClick={() => {
              onNavigate("home");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d9ff00] text-[#F2F2F2] hover:text-[#d9ff00] transition-colors text-left font-syne font-bold uppercase text-sm tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Home Feed</span>
          </button>

          <button
            onClick={() => {
              onNavigate("my-blogs");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d9ff00] text-[#F2F2F2] hover:text-[#d9ff00] transition-colors text-left font-syne font-bold uppercase text-sm tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">folder_open</span>
            <span>My Archives</span>
          </button>

          <button
            onClick={() => {
              onNavigate("create");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#d9ff00] text-black font-syne font-black uppercase text-sm tracking-wider hover:bg-white transition-all text-left cursor-pointer my-2"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>+ Write New Story</span>
          </button>

          <button
            onClick={() => {
              onSelectDrafts();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d9ff00] text-[#F2F2F2] hover:text-[#d9ff00] transition-colors text-left font-syne font-bold uppercase text-sm tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">draft</span>
            <span>Drafts</span>
          </button>

          <button
            onClick={() => {
              onSelectSavedBlogs();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d9ff00] text-[#F2F2F2] hover:text-[#d9ff00] transition-colors text-left font-syne font-bold uppercase text-sm tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark</span>
            <span>Bookmarks</span>
          </button>

          <div className="h-[1px] bg-white/10 my-4" />

          <button
            onClick={() => {
              onNavigate("profile");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-[#F2F2F2] transition-colors text-left font-syne font-bold uppercase text-xs tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span>User Settings</span>
          </button>

          <button
            onClick={() => {
              onShowSplash();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-[#F2F2F2] transition-colors text-left font-syne font-bold uppercase text-xs tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Intro Screen</span>
          </button>
        </nav>

        {/* Footer info */}
        <div className="px-6 pt-4 border-t border-white/10 mt-auto">
          <p className="font-mono-code text-[10px] text-white/40 uppercase tracking-widest text-center">
            VRTX.STUDIO • WriteSphere v4.0
          </p>
        </div>
      </aside>
    </>
  );
};

