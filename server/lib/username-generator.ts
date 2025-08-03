import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { findUserByUsername } from "./auth";

// Custom dictionaries for ScamAlert context
const scamTypes = [
  "phishing",
  "spam",
  "fraud",
  "scam",
  "fake",
  "bogus",
  "shady",
  "suspicious",
  "malicious",
  "deceptive",
  "fraudulent",
  "counterfeit",
  "hoax",
  "swindle",
  "con",
  "rip-off",
  "racket",
  "scheme",
  "plot",
  "trick",
];

const alertWords = [
  "alert",
  "watch",
  "guard",
  "shield",
  "protect",
  "defend",
  "secure",
  "safe",
  "vigilant",
  "aware",
  "cautious",
  "careful",
  "wary",
  "mindful",
  "attentive",
  "observant",
  "sharp",
  "keen",
  "smart",
  "wise",
];

// Generate a unique username for ScamAlert context
export async function generateUniqueUsername(): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    // Generate username with different patterns
    const patterns = [
      // Pattern 1: adjective + color + animal (classic)
      () =>
        uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          separator: "",
          style: "capital",
        }),

      // Pattern 2: alert word + adjective
      () =>
        uniqueNamesGenerator({
          dictionaries: [alertWords, adjectives],
          separator: "",
          style: "capital",
        }),

      // Pattern 3: scam type + color
      () =>
        uniqueNamesGenerator({
          dictionaries: [scamTypes, colors],
          separator: "",
          style: "capital",
        }),

      // Pattern 4: adjective + alert word
      () =>
        uniqueNamesGenerator({
          dictionaries: [adjectives, alertWords],
          separator: "",
          style: "capital",
        }),

      // Pattern 5: color + scam type
      () =>
        uniqueNamesGenerator({
          dictionaries: [colors, scamTypes],
          separator: "",
          style: "capital",
        }),
    ];

    // Randomly select a pattern
    const patternIndex = Math.floor(Math.random() * patterns.length);
    const pattern = patterns[patternIndex];
    if (!pattern) {
      throw new Error("Failed to generate username pattern");
    }
    const username = pattern();

    // Check if username is already taken
    const existingUser = await findUserByUsername(username);
    if (!existingUser) {
      return username;
    }

    attempts++;
  }

  // Fallback: use timestamp-based username
  const timestamp = Date.now().toString(36);
  const fallbackUsername = `ScamAlert${timestamp}`;

  return fallbackUsername;
}

// Generate a display name (more readable version)
export function generateDisplayName(username: string): string {
  // Convert camelCase to readable format
  return username
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Validate if a username is available (for future use)
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const existingUser = await findUserByUsername(username);
  return !existingUser;
}
