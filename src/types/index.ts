export interface User {
  _id: string;
  nickName: string;
}

export interface Tag {
  _id: string;
  name: string;
}

export interface PostImage {
  _id?: string;
  url: string;
}

export interface Post {
  _id: string;
  description: string;
  userId: string | User;
  images: PostImage[];
  tags: string[] | Tag[];
  createdAt?: string;
  updatedAt?: string;
  comments?: any[];
}

export interface Comment {
  _id: string;
  content: string;
  userId: string | User;
  postId: string;
  createdAt?: string;
}