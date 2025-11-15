export interface User {
  id: string
  username: string
  email: string
  password_hash: string
  bio?: string
  created_at: string
}

export interface Snippet {
  id: string
  user_id: string
  title: string
  description?: string
  code: string
  language: string
  tags: string[]
  is_public: boolean
  created_at: string
  views: number
  fork_count: number
}

const STORAGE_KEYS = {
  USERS: "codevault_users",
  SNIPPETS: "codevault_snippets",
  LIKES: "codevault_likes",
}

// Users storage
export function createUser(user: User): void {
  const users = getAllUsers()
  users.push(user)
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export function getAllUsers(): User[] {
  const users = localStorage.getItem(STORAGE_KEYS.USERS)
  return users ? JSON.parse(users) : []
}

export function getUserByEmail(email: string): User | undefined {
  return getAllUsers().find((u) => u.email === email)
}

export function getUserById(id: string): User | undefined {
  return getAllUsers().find((u) => u.id === id)
}

// Snippets storage
export function createSnippet(snippet: Snippet): void {
  const snippets = getAllSnippets()
  snippets.push(snippet)
  localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets))
}

export function getAllSnippets(): Snippet[] {
  const snippets = localStorage.getItem(STORAGE_KEYS.SNIPPETS)
  return snippets ? JSON.parse(snippets) : []
}

export function getUserSnippets(userId: string): Snippet[] {
  return getAllSnippets().filter((s) => s.user_id === userId)
}

export function getSnippetById(id: string): Snippet | undefined {
  return getAllSnippets().find((s) => s.id === id)
}

export function updateSnippet(id: string, updates: Partial<Snippet>): boolean {
  const snippets = getAllSnippets()
  const index = snippets.findIndex((s) => s.id === id)
  if (index === -1) return false
  
  snippets[index] = { ...snippets[index], ...updates }
  localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets))
  return true
}

export function deleteSnippet(id: string): boolean {
  const snippets = getAllSnippets()
  const filtered = snippets.filter((s) => s.id !== id)
  localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(filtered))
  return filtered.length < snippets.length
}

export function incrementSnippetViews(id: string): void {
  const snippet = getSnippetById(id)
  if (snippet) {
    updateSnippet(id, { views: snippet.views + 1 })
  }
}

// Likes storage
export function getSnippetLikes(snippetId: string): number {
  const likes = localStorage.getItem(STORAGE_KEYS.LIKES)
  const likesData = likes ? JSON.parse(likes) : {}
  return likesData[snippetId] || 0
}

export function toggleSnippetLike(snippetId: string, userId: string): void {
  const likes = localStorage.getItem(STORAGE_KEYS.LIKES)
  const likesData = likes ? JSON.parse(likes) : {}
  const likeKey = `${snippetId}_${userId}`
  const allLikes = likesData[snippetId] || []
  
  if (allLikes.includes(likeKey)) {
    allLikes.splice(allLikes.indexOf(likeKey), 1)
  } else {
    allLikes.push(likeKey)
  }
  
  likesData[snippetId] = allLikes
  localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likesData))
}
