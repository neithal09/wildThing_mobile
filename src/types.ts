export interface Expert {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  verified: boolean;
  followers: number;
  videos: number;
}

export interface VideoCard {
  id: string;
  title: string;
  creator: Expert;
  likes: number;
  comments: number;
  saves: number;
  thumbnail: string;
  duration: string;
  tags: string[];
  products?: Product[];
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
}

export interface Show {
  id: string;
  title: string;
  description: string;
  banner: string;
  episodes: Episode[];
  rating: number;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  expert: Expert;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  lessons: number;
  enrolled: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  anonymous: boolean;
  content: string;
  likes: number;
  replies: number;
  timeAgo: string;
  tags: string[];
  expert?: boolean;
}

export type TabKey = 'home' | 'explore' | 'create' | 'community' | 'store' | 'profile';
export type ExploreTab = 'shows' | 'learn' | 'experts' | 'topics';
export type CommunityTab = 'discussions' | 'questions' | 'stories' | 'top10';
