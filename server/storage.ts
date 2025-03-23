import { users, quranLastRead, type User, type InsertUser, type LastRead, type InsertLastRead } from "@shared/schema";

// Define a database-specific type for LastRead that includes all DB fields
export interface DBLastRead {
  id?: number;
  userId: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string | null;
  timestamp: number;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLastRead(userId: string): Promise<DBLastRead | null>;
  saveLastRead(userId: string, lastRead: DBLastRead): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lastReadMap: Map<string, DBLastRead>;
  currentId: number;
  private lastReadId: number;

  constructor() {
    this.users = new Map();
    this.lastReadMap = new Map();
    this.currentId = 1;
    this.lastReadId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getLastRead(userId: string): Promise<DBLastRead | null> {
    const lastRead = this.lastReadMap.get(userId);
    return lastRead || null;
  }

  async saveLastRead(userId: string, lastRead: DBLastRead): Promise<void> {
    // If the record doesn't have an ID, assign one
    if (!lastRead.id) {
      lastRead.id = this.lastReadId++;
    }
    this.lastReadMap.set(userId, lastRead);
  }
}

export const storage = new MemStorage();
