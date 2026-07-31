import React, { useState, useEffect } from "react";
import { AppScreen, BlogPost, User, UserProfile, Comment } from "./types";
import { initialBlogs, initialUserProfile, initialComments } from "./data/mockBlogs";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { SideDrawer } from "./components/SideDrawer";
import { SplashScreen } from "./components/SplashScreen";
import { AuthScreen } from "./components/AuthScreen";
import { HomeFeed } from "./components/HomeFeed";
import { ArticleDetail } from "./components/ArticleDetail";
import { StoryEditor } from "./components/StoryEditor";
import { ProfileView } from "./components/ProfileView";
import { MyBlogsView } from "./components/MyBlogsView";
import {
  initSeedUsers,
  getActiveSession,
  clearSession,
  updateStoredUserProfile,
} from "./lib/authStore";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash");
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "u-1",
    name: initialUserProfile.name,
    email: initialUserProfile.email,
    avatar: initialUserProfile.avatar,
    isLoggedIn: false,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(initialComments);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Restore active session or seed default user on mount
  useEffect(() => {
    async function restoreAuth() {
      await initSeedUsers();
      const session = getActiveSession();
      if (session && session.user && session.user.isLoggedIn) {
        setCurrentUser(session.user);
        setUserProfile(session.userProfile);
      }
    }
    restoreAuth();
  }, []);

  // Sync dark class on body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handler for SplashScreen finish
  const handleSplashComplete = (next: AppScreen) => {
    if (currentUser.isLoggedIn) {
      setCurrentScreen(next);
    } else {
      setCurrentScreen("auth");
    }
  };

  // Login handler
  const handleLoginSuccess = (user: User, customProfile?: UserProfile) => {
    setCurrentUser(user);
    if (customProfile) {
      setUserProfile(customProfile);
    } else {
      setUserProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }));
    }
    setCurrentScreen("home");
  };

  // Logout handler
  const handleLogout = () => {
    clearSession();
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    setCurrentScreen("auth");
  };

  // Like toggle
  const handleToggleLike = (blogId: string) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => {
        if (b.id === blogId) {
          const newLiked = !b.isLiked;
          return {
            ...b,
            isLiked: newLiked,
            likesCount: newLiked ? b.likesCount + 1 : Math.max(0, b.likesCount - 1),
          };
        }
        return b;
      })
    );

    if (selectedBlog && selectedBlog.id === blogId) {
      setSelectedBlog((prev) => {
        if (!prev) return null;
        const newLiked = !prev.isLiked;
        return {
          ...prev,
          isLiked: newLiked,
          likesCount: newLiked ? prev.likesCount + 1 : Math.max(0, prev.likesCount - 1),
        };
      });
    }
  };

  // Save toggle
  const handleToggleSave = (blogId: string) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => {
        if (b.id === blogId) {
          return { ...b, isSaved: !b.isSaved };
        }
        return b;
      })
    );

    if (selectedBlog && selectedBlog.id === blogId) {
      setSelectedBlog((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    }
  };

  // Add Comment
  const handleAddComment = (blogId: string, text: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      authorName: userProfile.name,
      authorAvatar: userProfile.avatar,
      date: "Just now",
      text,
      likes: 0,
    };

    setCommentsMap((prev) => ({
      ...prev,
      [blogId]: [newComment, ...(prev[blogId] || [])],
    }));

    setBlogs((prev) =>
      prev.map((b) => (b.id === blogId ? { ...b, commentsCount: b.commentsCount + 1 } : b))
    );
  };

  // Publish story
  const handlePublishStory = (blogPayload: Partial<BlogPost>) => {
    const completeBlog: BlogPost = {
      id: blogPayload.id || `blog-${Date.now()}`,
      title: blogPayload.title || "Untitled Story",
      subtitle: blogPayload.subtitle || "",
      category: blogPayload.category || "Technology",
      date: blogPayload.date || "Just now",
      readTime: blogPayload.readTime || "3 min read",
      author: blogPayload.author || {
        name: userProfile.name,
        role: "Digital Nomad & Writer",
        avatar: userProfile.avatar,
        handle: userProfile.handle,
      },
      coverImage: blogPayload.coverImage || initialBlogs[0].coverImage,
      content: blogPayload.content || ["Content..."],
      tags: blogPayload.tags || ["WriteSphere"],
      status: "published",
      likesCount: blogPayload.likesCount || 0,
      commentsCount: blogPayload.commentsCount || 0,
      isLiked: false,
      isSaved: false,
      viewsCount: 1,
    };

    setBlogs((prev) => [
      completeBlog,
      ...prev.filter((b) => b.id !== completeBlog.id),
    ]);

    setUserProfile((prev) => ({
      ...prev,
      publishedCount: prev.publishedCount + 1,
    }));

    setEditingBlog(null);
    setCurrentScreen("my-blogs");
  };

  // Save Draft story
  const handleSaveDraftStory = (blogPayload: Partial<BlogPost>) => {
    const draftBlog: BlogPost = {
      id: blogPayload.id || `blog-${Date.now()}`,
      title: blogPayload.title || "Untitled Draft",
      subtitle: blogPayload.subtitle || "Draft content...",
      category: blogPayload.category || "Technology",
      date: "Draft",
      readTime: blogPayload.readTime || "1 min read",
      author: blogPayload.author || {
        name: userProfile.name,
        role: "Writer",
        avatar: userProfile.avatar,
        handle: userProfile.handle,
      },
      coverImage: blogPayload.coverImage || initialBlogs[0].coverImage,
      content: blogPayload.content || ["Draft text..."],
      tags: blogPayload.tags || [],
      status: "draft",
      likesCount: 0,
      commentsCount: 0,
    };

    setBlogs((prev) => [
      draftBlog,
      ...prev.filter((b) => b.id !== draftBlog.id),
    ]);

    setEditingBlog(null);
  };

  // Delete story
  const handleDeleteBlog = (blogId: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== blogId));
  };

  // Edit blog from My Blogs
  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setCurrentScreen("create");
  };

  // Select blog to view
  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setCurrentScreen("article-detail");
  };

  // Saved blogs shortcut
  const handleSelectSavedBlogs = () => {
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-background dark:bg-on-background text-on-surface transition-colors selection:bg-primary-container selection:text-on-primary-container">
      {/* 1. Splash Screen View */}
      {currentScreen === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} targetScreen="home" />
      )}

      {/* 2. Authentication View */}
      {currentScreen === "auth" && (
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
      )}

      {/* Main Layout Container for standard screens */}
      {currentScreen !== "splash" && currentScreen !== "auth" && (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setEditingBlog(null);
              setCurrentScreen(screen);
            }}
            onOpenMenu={() => setIsDrawerOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            userAvatar={userProfile.avatar}
            searchQuery={globalSearchQuery}
            onSearchChange={setGlobalSearchQuery}
          />

          {/* Side Navigation Drawer */}
          <SideDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onNavigate={(screen) => {
              setEditingBlog(null);
              setCurrentScreen(screen);
            }}
            userProfile={userProfile}
            onSelectSavedBlogs={handleSelectSavedBlogs}
            onSelectDrafts={() => setCurrentScreen("my-blogs")}
            onShowSplash={() => setCurrentScreen("splash")}
          />

          {/* Screen Content Router */}
          <div className="flex-1">
            {currentScreen === "home" && (
              <HomeFeed
                blogs={blogs}
                onSelectBlog={handleSelectBlog}
                onNavigate={(s) => {
                  setEditingBlog(null);
                  setCurrentScreen(s);
                }}
                onToggleLike={handleToggleLike}
                searchQuery={globalSearchQuery}
                onSearchChange={setGlobalSearchQuery}
              />
            )}

            {currentScreen === "article-detail" && selectedBlog && (
              <ArticleDetail
                blog={selectedBlog}
                onBack={() => setCurrentScreen("home")}
                onToggleLike={handleToggleLike}
                onToggleSave={handleToggleSave}
                comments={commentsMap[selectedBlog.id] || []}
                onAddComment={handleAddComment}
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              />
            )}

            {currentScreen === "create" && (
              <StoryEditor
                initialBlog={editingBlog}
                onPublish={handlePublishStory}
                onSaveDraft={handleSaveDraftStory}
                userAvatar={userProfile.avatar}
                userName={userProfile.name}
              />
            )}

            {currentScreen === "profile" && (
              <ProfileView
                userProfile={userProfile}
                onUpdateProfile={(updated) => {
                  setUserProfile((prev) => {
                    const nextProfile = { ...prev, ...updated };
                    updateStoredUserProfile(nextProfile.email, updated);
                    return nextProfile;
                  });
                }}
                onNavigate={(s) => {
                  setEditingBlog(null);
                  setCurrentScreen(s);
                }}
                onSelectSavedBlogs={handleSelectSavedBlogs}
                onLogout={handleLogout}
              />
            )}

            {currentScreen === "my-blogs" && (
              <MyBlogsView
                blogs={blogs}
                onEditBlog={handleEditBlog}
                onDeleteBlog={handleDeleteBlog}
                onNavigate={(s) => {
                  setEditingBlog(null);
                  setCurrentScreen(s);
                }}
                onSelectBlog={handleSelectBlog}
              />
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setEditingBlog(null);
              setCurrentScreen(screen);
            }}
          />
        </div>
      )}
    </div>
  );
}
