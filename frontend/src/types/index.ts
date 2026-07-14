export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  reactionType?: string;
  user?: User;
}

export interface CommentLike {
  id: string;
  userId: string;
  commentId: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  postId: string;
  parentId?: string;
  replies?: Comment[];
  likes?: CommentLike[];
}

export interface Post {
  id: string;
  content: string;
  images: string[];
  createdAt: string;
  author: User;
  likesCount: number;
  commentsCount: number;
  userReaction?: string | null;
  recentLikes: Like[];
  recentComments: Comment[];
  
  
  likes?: Like[];
  comments?: Comment[];
  visibility?: 'PUBLIC' | 'PRIVATE';
}
