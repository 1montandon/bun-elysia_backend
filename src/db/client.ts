// src/db.ts
import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";


const raw = new Database();

export const db = drizzle(raw);
