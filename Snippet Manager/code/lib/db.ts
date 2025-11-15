import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!sql) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error(
        "DATABASE_URL environment variable is not set. Please configure your Neon database connection."
      );
    }
    sql = neon(dbUrl);
  }
  return sql;
}

export { getDb as sql };

export type User = {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
};

export type Snippet = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  code: string;
  language: string;
  tags: string[];
  isPublic: boolean;
  forkedFrom?: string;
  forkCount: number;
  views: number;
  collectionId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Collection = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  snippetCount: number;
  createdAt: Date;
};

export type Like = {
  id: string;
  userId: string;
  snippetId: string;
  createdAt: Date;
};
