export type BlogPostStatus = 'published' | 'draft' | 'archived';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  handle?: string;
  isFollowing?: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  text: string;
  likes: number;
  isLiked?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  content: string[]; // List of paragraphs / HTML text / figure blocks
  category: string;
  date: string;
  readTime: string;
  author: Author;
  coverImage: string;
  figureImage?: {
    url: string;
    caption: string;
  };
  isMustRead?: boolean;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  viewsCount?: number;
  tags: string[];
  status: BlogPostStatus;
}

export interface UserProfile {
  name: string;
  email: string;
  handle: string;
  bio: string;
  avatar: string;
  followersCount: number;
  followingCount: number;
  publishedCount: number;
  isPremium: boolean;
}

export type AppScreen =
  | 'splash'
  | 'auth'
  | 'home'
  | 'article-detail'
  | 'create'
  | 'profile'
  | 'my-blogs';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}
