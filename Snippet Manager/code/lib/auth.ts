"use client"

import * as storage from "@/lib/client-storage"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  username: string
  bio?: string
}

export interface AuthToken {
  token: string
  user: User
}

export async function signup(
  email: string,
  password: string,
  username: string
): Promise<AuthToken> {
  // Check if user already exists
  if (storage.getUserByEmail(email)) {
    throw new Error("Email already exists")
  }

  // Check if username exists
  const allUsers = storage.getAllUsers()
  if (allUsers.some((u) => u.username === username)) {
    throw new Error("Username already taken")
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  // Create user
  const user: storage.User = {
    id: `user-${Date.now()}`,
    username,
    email,
    password_hash: passwordHash,
    created_at: new Date().toISOString(),
  }

  storage.createUser(user)

  // Store in localStorage
  const token = btoa(
    JSON.stringify({
      userId: user.id,
      email,
      exp: Date.now() + 24 * 60 * 60 * 1000,
    })
  )
  localStorage.setItem("authToken", token)
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
    })
  )

  document.cookie = `authToken=${token}; path=/; max-age=${24 * 60 * 60}`

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
    },
  }
}

export async function login(email: string, password: string): Promise<AuthToken> {
  const user = storage.getUserByEmail(email)

  if (!user) {
    throw new Error("Invalid email or password")
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash)

  if (!isPasswordValid) {
    throw new Error("Invalid email or password")
  }

  // Store in localStorage
  const token = btoa(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      exp: Date.now() + 24 * 60 * 60 * 1000,
    })
  )
  localStorage.setItem("authToken", token)
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
    })
  )

  document.cookie = `authToken=${token}; path=/; max-age=${24 * 60 * 60}`

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
    },
  }
}

export function logout(): void {
  localStorage.removeItem("authToken")
  localStorage.removeItem("currentUser")
  // Clear cookie
  document.cookie = "authToken=; path=/; max-age=0"
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}
