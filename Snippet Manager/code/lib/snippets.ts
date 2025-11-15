export interface Snippet {
  id: string;
  userId: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  forks: number;
  forkedFrom?: string;
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description: string;
  snippets: string[];
  createdAt: Date;
}

const SNIPPETS_KEY = 'snippets';
const COLLECTIONS_KEY = 'collections';

function getSnippets(): Snippet[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SNIPPETS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSnippets(snippets: Snippet[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets));
}

function getCollections(): Collection[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(COLLECTIONS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCollections(collections: Collection[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
}

export function createSnippet(snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'forks'>): Snippet {
  const snippets = getSnippets();
  const newSnippet: Snippet = {
    ...snippet,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    forks: 0,
  };
  snippets.push(newSnippet);
  saveSnippets(snippets);
  return newSnippet;
}

export function updateSnippet(id: string, updates: Partial<Omit<Snippet, 'id' | 'createdAt' | 'userId'>>): Snippet | null {
  const snippets = getSnippets();
  const index = snippets.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  snippets[index] = {
    ...snippets[index],
    ...updates,
    updatedAt: new Date(),
  };
  saveSnippets(snippets);
  return snippets[index];
}

export function deleteSnippet(id: string): boolean {
  const snippets = getSnippets();
  const filtered = snippets.filter(s => s.id !== id);
  if (filtered.length === snippets.length) return false;
  saveSnippets(filtered);
  return true;
}

export function getSnippetById(id: string): Snippet | null {
  const snippets = getSnippets();
  return snippets.find(s => s.id === id) || null;
}

export function getUserSnippets(userId: string): Snippet[] {
  const snippets = getSnippets();
  return snippets.filter(s => s.userId === userId);
}

export function getPublicSnippets(): Snippet[] {
  const snippets = getSnippets();
  return snippets.filter(s => s.isPublic);
}

export function searchSnippets(query: string, language?: string, tags?: string[]): Snippet[] {
  let results = getPublicSnippets();
  
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q)
    );
  }
  
  if (language) {
    results = results.filter(s => s.language === language);
  }
  
  if (tags && tags.length > 0) {
    results = results.filter(s => tags.some(tag => s.tags.includes(tag)));
  }
  
  return results;
}

export function createCollection(collection: Omit<Collection, 'id' | 'createdAt'>): Collection {
  const collections = getCollections();
  const newCollection: Collection = {
    ...collection,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  };
  collections.push(newCollection);
  saveCollections(collections);
  return newCollection;
}

export function getUserCollections(userId: string): Collection[] {
  const collections = getCollections();
  return collections.filter(c => c.userId === userId);
}

export function deleteCollection(id: string): boolean {
  const collections = getCollections();
  const filtered = collections.filter(c => c.id !== id);
  if (filtered.length === collections.length) return false;
  saveCollections(filtered);
  return true;
}

export function likeSnippet(id: string): Snippet | null {
  const snippets = getSnippets();
  const snippet = snippets.find(s => s.id === id);
  if (!snippet) return null;
  snippet.likes = (snippet.likes || 0) + 1;
  saveSnippets(snippets);
  return snippet;
}

export function forkSnippet(userId: string, originalId: string): Snippet | null {
  const original = getSnippetById(originalId);
  if (!original) return null;
  
  return createSnippet({
    ...original,
    userId,
    forkedFrom: originalId,
    title: `${original.title} (Forked)`,
    likes: 0,
    forks: 0,
  });
}
