import React from "react";
import { AppScreen } from "../types";
import { Search, Menu, Sun, Moon, X } from "lucide-react";

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenMenu: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  userAvatar: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenMenu,
  isDarkMode,
  onToggleDarkMode,
  userAvatar,
  searchQuery = "",
  onSearchChange,
}) => {
  const [showSearchInput, setShowSearchInput] = React.useState(false);

  return (
    <header className="w-full sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 py-3 transition-colors border-b border-white/10">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="p-2 border border-white/10 rounded-sm text-[#F2F2F2] hover:bg-white/10 hover:border-[#d9ff00] hover:text-[#d9ff00] transition-all cursor-pointer flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col cursor-pointer select-none" onClick={() => onNavigate("home")}>
          <span className="text-[9px] tracking-[0.3em] font-bold uppercase text-[#d9ff00] font-mono-code leading-none mb-0.5">
            Vol. 04 / Issue 01
          </span>
          <button
            className="font-syne text-xl sm:text-2xl font-black tracking-tighter uppercase text-[#F2F2F2] hover:text-[#d9ff00] transition-colors text-left"
          >
            WRITESPHERE
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Header Search Bar toggle/input */}
        <div className="relative flex items-center">
          {showSearchInput ? (
            <div className="flex items-center bg-white/10 border border-[#d9ff00] px-2.5 py-1">
              <Search className="w-3.5 h-3.5 text-[#d9ff00] mr-1.5 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  if (onSearchChange) onSearchChange(e.target.value);
                  onNavigate("home");
                }}
                placeholder="Search..."
                autoFocus
                className="bg-transparent border-none text-xs font-mono-code text-white focus:outline-none w-28 sm:w-44 placeholder:text-white/40"
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  if (onSearchChange) onSearchChange("");
                }}
                className="text-white/60 hover:text-white p-0.5 ml-1 flex items-center justify-center cursor-pointer"
                title="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowSearchInput(true);
                onNavigate("home");
              }}
              className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-sm text-[#F2F2F2] hover:border-[#d9ff00] hover:text-[#d9ff00] transition-colors cursor-pointer"
              title="Search stories"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="hidden md:flex gap-6 text-xs font-medium tracking-widest uppercase opacity-60 mr-2">
          <button onClick={() => onNavigate("home")} className="hover:opacity-100 hover:text-[#d9ff00] transition-colors cursor-pointer">Feed</button>
          <button onClick={() => onNavigate("my-blogs")} className="hover:opacity-100 hover:text-[#d9ff00] transition-colors cursor-pointer">Archive</button>
          <button onClick={() => onNavigate("create")} className="hover:opacity-100 hover:text-[#d9ff00] transition-colors cursor-pointer">+ Write</button>
        </nav>

        <button
          onClick={onToggleDarkMode}
          aria-label="Toggle mode"
          className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-sm text-[#F2F2F2] hover:border-[#d9ff00] hover:text-[#d9ff00] transition-colors cursor-pointer"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={() => onNavigate("profile")}
          className="w-9 h-9 rounded-sm border border-[#d9ff00] overflow-hidden cursor-pointer hover:scale-105 transition-transform p-0.5 bg-black"
          title="User Profile"
        >
          <img
            src={userAvatar}
            alt="User avatar"
            className="w-full h-full object-cover rounded-none"
          />
        </button>
      </div>
    </header>
  );
};


