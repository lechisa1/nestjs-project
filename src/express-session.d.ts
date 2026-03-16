// src/types/express-session.d.ts
import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number; // Add any properties you store in session
  }
}
