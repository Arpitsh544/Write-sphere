import { User, UserProfile } from "../types";

const USERS_STORAGE_KEY = "writesphere_users_v2";
const SESSION_STORAGE_KEY = "writesphere_session_v2";

interface StoredUserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
  handle: string;
  bio: string;
  createdAt: string;
}

// SHA-256 password hashing helper using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "writesphere_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Helper to get all registered users
function getStoredUsers(): StoredUserAccount[] {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load users from storage:", err);
    return [];
  }
}

// Helper to save users list
function saveStoredUsers(users: StoredUserAccount[]) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to save users to storage:", err);
  }
}

// Initialize seed user if empty
export async function initSeedUsers() {
  const users = getStoredUsers();
  if (users.length === 0) {
    const defaultHash = await hashPassword("password123");
    const seedUser: StoredUserAccount = {
      id: "u-seed-1",
      name: "Elena Rodriguez",
      email: "name@example.com",
      passwordHash: defaultHash,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      handle: "@elena_writes",
      bio: "Digital Nomad & Full-stack Writer exploring AI, design, and culture.",
      createdAt: new Date().toISOString(),
    };
    saveStoredUsers([seedUser]);
  }
}

// Register a new user
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ user: User; userProfile: UserProfile }> {
  await initSeedUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();

  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error("An account with this email address already exists. Please log in.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const passwordHash = await hashPassword(password);
  const handleStr = "@" + name.toLowerCase().replace(/[^a-z0-9]/g, "_");
  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
    normalizedEmail
  )}`;

  const newUser: StoredUserAccount = {
    id: `u-${Date.now()}`,
    name,
    email: normalizedEmail,
    passwordHash,
    avatar: avatarUrl,
    handle: handleStr,
    bio: "Passionate writer & reader on WriteSphere.",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  const user: User = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
    isLoggedIn: true,
  };

  const userProfile: UserProfile = {
    name: newUser.name,
    email: newUser.email,
    handle: newUser.handle,
    bio: newUser.bio,
    avatar: newUser.avatar,
    followersCount: 1,
    followingCount: 5,
    publishedCount: 0,
    isPremium: true,
  };

  saveSession(user, userProfile);
  return { user, userProfile };
}

// Login user with credentials
export async function loginUser(
  email: string,
  password: string
): Promise<{ user: User; userProfile: UserProfile }> {
  await initSeedUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();

  const foundUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!foundUser) {
    throw new Error("No account found with this email. Please check spelling or sign up.");
  }

  const passwordHash = await hashPassword(password);
  if (foundUser.passwordHash !== passwordHash) {
    throw new Error("Incorrect password. Please try again.");
  }

  const user: User = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
    avatar: foundUser.avatar,
    isLoggedIn: true,
  };

  const userProfile: UserProfile = {
    name: foundUser.name,
    email: foundUser.email,
    handle: foundUser.handle,
    bio: foundUser.bio,
    avatar: foundUser.avatar,
    followersCount: 1240,
    followingCount: 318,
    publishedCount: 14,
    isPremium: true,
  };

  saveSession(user, userProfile);
  return { user, userProfile };
}

// Save active session
export function saveSession(user: User, userProfile: UserProfile) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user, userProfile }));
  } catch (err) {
    console.error("Failed to save session:", err);
  }
}

// Get active session
export function getActiveSession(): { user: User; userProfile: UserProfile } | null {
  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read session:", err);
    return null;
  }
}

// Clear session (Logout)
export function clearSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear session:", err);
  }
}

// Update profile in storage
export function updateStoredUserProfile(email: string, updates: Partial<UserProfile>) {
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx !== -1) {
    if (updates.name) users[idx].name = updates.name;
    if (updates.bio) users[idx].bio = updates.bio;
    if (updates.avatar) users[idx].avatar = updates.avatar;
    saveStoredUsers(users);
  }
}
