import { eq } from "drizzle-orm";
import type { Models } from "node-appwrite";
import { db, users } from "../db";
import { generateUniqueUsername } from "./username-generator";

export interface LocalUser {
  id: number;
  appwriteId: string | null;
  email: string;
  username: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Find user by Appwrite ID
export async function findUserByAppwriteId(
  appwriteId: string
): Promise<LocalUser | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.appwriteId, appwriteId));

  return user || null;
}

// Find user by email
export async function findUserByEmail(
  email: string
): Promise<LocalUser | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user || null;
}

// Create local user from Appwrite user
export async function createLocalUser(
  appwriteUser: Models.User<Models.Preferences>
): Promise<LocalUser> {
  // Generate unique username using our generator
  const username = await generateUniqueUsername();

  const [localUser] = await db
    .insert(users)
    .values({
      appwriteId: appwriteUser.$id,
      email: appwriteUser.email,
      username: username,
      status: "active",
    })
    .returning();

  if (!localUser) {
    throw new Error("Failed to create local user");
  }

  return localUser;
}

// Sync Appwrite user with local database (create if doesn't exist)
export async function syncAppwriteUser(
  appwriteUser: Models.User<Models.Preferences>
): Promise<LocalUser> {
  // First try to find by Appwrite ID
  let localUser = await findUserByAppwriteId(appwriteUser.$id);

  if (localUser) {
    return localUser;
  }

  // If not found by Appwrite ID, try by email (for migration)
  localUser = await findUserByEmail(appwriteUser.email);

  if (localUser) {
    // Update existing user with Appwrite ID
    const [updatedUser] = await db
      .update(users)
      .set({
        appwriteId: appwriteUser.$id,
        updatedAt: new Date(),
      })
      .where(eq(users.id, localUser.id))
      .returning();

    return updatedUser!;
  }

  // Create new local user
  return await createLocalUser(appwriteUser);
}

// Check if username exists (for username generator)
export async function findUserByUsername(
  username: string
): Promise<LocalUser | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  return user || null;
}
