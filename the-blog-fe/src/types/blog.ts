import { Document } from "@contentful/rich-text-types";

export interface IUser {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  category: string;
  opener: string;
  content: Document;
  thumbnail: string;
  createdAt: string;
  User: IUser;
}

export interface BlogInput {
  title: string;
  slug: string;
  category: string;
  opener: string;
  content: string;
  thumbnail?: File | string | null;
}
