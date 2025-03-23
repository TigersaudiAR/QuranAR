import { users, quranLastRead, type User, type InsertUser, type LastRead, type InsertLastRead } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLastRead(userId: string): Promise<LastRead | null>;
  saveLastRead(userId: string, lastRead: LastRead): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lastReadMap: Map<string, LastRead>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.lastReadMap = new Map();
    this.currentId = 1;
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
  
  async getLastRead(userId: string): Promise<LastRead | null> {
    const lastRead = this.lastReadMap.get(userId);
    return lastRead || null;
  }

  async saveLastRead(userId: string, lastRead: LastRead): Promise<void> {
    this.lastReadMap.set(userId, lastRead);
  }
}

export const storage = new MemStorage();
