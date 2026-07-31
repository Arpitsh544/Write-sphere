import React, { useState } from "react";
import { UserProfile, AppScreen } from "../types";

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigate: (screen: AppScreen) => void;
  onSelectSavedBlogs: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigate,
  onSelectSavedBlogs,
  onLogout,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      bio: editBio,
      avatar: editAvatar,
    });
    setShowEditModal(false);
    triggerToast("Profile updated successfully!");
  };

  return (
    <main className="max-w-xl mx-auto px-4 sm:px-6 pb-32 pt-6 min-h-screen">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] bg-[#d9ff00] text-black font-mono-code text-xs uppercase font-black px-6 py-3 border border-black shadow-2xl animate-fadeIn flex items-center gap-2">
          <span className="material-symbols-outlined text-black text-sm">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Profile Header Section */}
      <section className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          <div className="w-28 h-28 border-2 border-[#d9ff00] p-1 bg-black overflow-hidden rounded-none">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute -bottom-2 -right-2 bg-[#d9ff00] text-black w-8 h-8 rounded-none flex items-center justify-center border border-black active:scale-95 transition-transform cursor-pointer shadow-md"
            title="Change photo"
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
          </button>
        </div>

        <h2 className="font-syne text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
          {userProfile.name}
        </h2>
        <p className="font-mono-code text-xs text-[#d9ff00] uppercase tracking-widest mt-1 mb-2 font-bold">
          {userProfile.handle}
        </p>
        <p className="font-grotesk text-sm text-white/70 max-w-xs mb-4 leading-relaxed">
          {userProfile.bio}
        </p>

        <button
          onClick={() => setShowEditModal(true)}
          className="px-4 py-1.5 border border-white/20 text-white font-mono-code text-xs uppercase font-bold hover:border-[#d9ff00] hover:text-[#d9ff00] transition-all cursor-pointer"
        >
          EDIT BIO & DETAILS
        </button>
      </section>

      {/* Stats Bento Row */}
      <section className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white/5 border border-white/10 p-4 rounded-none flex flex-col items-center transition-all hover:border-[#d9ff00]">
          <span className="font-syne text-xl sm:text-2xl font-black text-[#d9ff00]">
            {userProfile.followersCount >= 1000
              ? `${(userProfile.followersCount / 1000).toFixed(1)}k`
              : userProfile.followersCount}
          </span>
          <span className="font-mono-code text-[10px] uppercase text-white/50 tracking-wider">
            FOLLOWERS
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-none flex flex-col items-center transition-all hover:border-[#d9ff00]">
          <span className="font-syne text-xl sm:text-2xl font-black text-[#d9ff00]">
            {userProfile.followingCount}
          </span>
          <span className="font-mono-code text-[10px] uppercase text-white/50 tracking-wider">
            FOLLOWING
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-none flex flex-col items-center transition-all hover:border-[#d9ff00]">
          <span className="font-syne text-xl sm:text-2xl font-black text-[#d9ff00]">
            {userProfile.publishedCount}
          </span>
          <span className="font-mono-code text-[10px] uppercase text-white/50 tracking-wider">
            PUBLISHED
          </span>
        </div>
      </section>

      {/* Menu List */}
      <section className="bg-white/5 border border-white/10 rounded-none overflow-hidden">
        {/* Edit Profile */}
        <button
          onClick={() => setShowEditModal(true)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#d9ff00]">
              edit
            </span>
            <span className="font-syne font-bold text-sm uppercase text-white tracking-wider">
              EDIT PROFILE
            </span>
          </div>
          <span className="material-symbols-outlined text-white/40 group-hover:text-[#d9ff00]">
            chevron_right
          </span>
        </button>

        <div className="h-[1px] bg-white/10 mx-6" />

        {/* My Blogs */}
        <button
          onClick={() => onNavigate("my-blogs")}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#d9ff00]">
              article
            </span>
            <span className="font-syne font-bold text-sm uppercase text-white tracking-wider">
              MY DISPATCHES
            </span>
          </div>
          <span className="material-symbols-outlined text-white/40 group-hover:text-[#d9ff00]">
            chevron_right
          </span>
        </button>

        <div className="h-[1px] bg-white/10 mx-6" />

        {/* Saved Blogs */}
        <button
          onClick={onSelectSavedBlogs}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#d9ff00]">
              bookmark
            </span>
            <span className="font-syne font-bold text-sm uppercase text-white tracking-wider">
              SAVED READING LIST
            </span>
          </div>
          <span className="material-symbols-outlined text-white/40 group-hover:text-[#d9ff00]">
            chevron_right
          </span>
        </button>

        <div className="h-[1px] bg-white/10 mx-6" />

        {/* Settings */}
        <button
          onClick={() => triggerToast("Settings updated!")}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#d9ff00]">
              settings
            </span>
            <span className="font-syne font-bold text-sm uppercase text-white tracking-wider">
              SYSTEM SETTINGS
            </span>
          </div>
          <span className="material-symbols-outlined text-white/40 group-hover:text-[#d9ff00]">
            chevron_right
          </span>
        </button>

        <div className="h-[1px] bg-white/10 mx-6" />

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-red-500/10 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-red-400">
              logout
            </span>
            <span className="font-syne font-bold text-sm uppercase text-red-400">
              LOGOUT
            </span>
          </div>
        </button>
      </section>

      {/* Upgrade Premium Banner */}
      <div
        onClick={() => setShowPremiumModal(true)}
        className="mt-8 p-6 bg-[#d9ff00] text-black flex items-center justify-between border border-black cursor-pointer hover:bg-white transition-all rounded-none"
      >
        <div className="space-y-1">
          <h3 className="font-syne text-lg font-black uppercase tracking-tight">
            UPGRADE TO PRO PASS
          </h3>
          <p className="font-mono-code text-xs uppercase font-bold opacity-80">
            Unlock unlimited publishing & custom domain dispatches.
          </p>
        </div>
        <span className="material-symbols-outlined text-3xl">
          workspace_premium
        </span>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#050505] border border-white/20 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-syne text-xl font-black uppercase text-white">
              EDIT PROFILE
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono-code text-xs uppercase text-white/60">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 p-3 text-xs font-mono-code text-white focus:outline-none focus:border-[#d9ff00]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono-code text-xs uppercase text-white/60">
                  Bio / Tagline
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/20 p-3 text-xs font-mono-code text-white focus:outline-none focus:border-[#d9ff00]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono-code text-xs uppercase text-white/60">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 p-3 text-xs font-mono-code text-white focus:outline-none focus:border-[#d9ff00]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-xs font-mono-code uppercase text-white/60 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d9ff00] text-black font-syne font-black text-xs uppercase tracking-wider hover:bg-white cursor-pointer"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Premium Upgrade Dialog */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#050505] border border-white/20 p-6 max-w-sm w-full text-center space-y-4">
            <span className="material-symbols-outlined text-4xl text-[#d9ff00]">
              workspace_premium
            </span>
            <h3 className="font-syne text-xl font-black uppercase text-white">
              WRITESPHERE PRO
            </h3>
            <p className="font-grotesk text-xs text-white/80">
              You are currently enjoying <strong>Pro Membership</strong>! Custom domains, unlimited AI drafts, and reader analytics are active.
            </p>
            <button
              onClick={() => setShowPremiumModal(false)}
              className="w-full bg-[#d9ff00] text-black py-3 font-syne font-black text-xs uppercase tracking-wider hover:bg-white"
            >
              UNDERSTOOD
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

