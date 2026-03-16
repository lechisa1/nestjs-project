import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number; // store logged-in user ID
    role?: string; // store user role
  }
}
