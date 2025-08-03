import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { mockScams } from "../../app/lib/mock/scam-mock";
import { db } from "./index";
import { comments, scams, upvotes } from "./scam-schema";
import { users } from "./user-schema";

// Mock users data
const mockUsers = [
  {
    email: "admin@scamealert.com",
    username: "AdminUser",
    password: "admin123",
    status: "active" as const,
  },
  {
    email: "ahmed.khan@example.com",
    username: "AhmedKhan",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "sara.ahmed@example.com",
    username: "SaraAhmed",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "ali.hassan@example.com",
    username: "AliHassan",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "fatima.rizvi@example.com",
    username: "FatimaRizvi",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "umar.farooq@example.com",
    username: "UmarFarooq",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "ayesha.malik@example.com",
    username: "AyeshaMalik",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "bilal.ahmed@example.com",
    username: "BilalAhmed",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "nadia.khan@example.com",
    username: "NadiaKhan",
    password: "password123",
    status: "active" as const,
  },
  {
    email: "zain.ali@example.com",
    username: "ZainAli",
    password: "password123",
    status: "active" as const,
  },
];

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Helper function to generate random scam ID
function generateScamId(): string {
  return `scam-${nanoid(6)}`;
}

// Helper function to get random user ID from array
function getRandomUserId(userIds: number[]): number {
  return userIds[Math.floor(Math.random() * userIds.length)];
}

// Helper function to get random number of upvotes
function getRandomUpvotes(): number {
  return Math.floor(Math.random() * 300) + 10; // 10-310 upvotes
}

// Helper function to get random number of comments
function getRandomComments(): number {
  return Math.floor(Math.random() * 20) + 1; // 1-21 comments
}

// Helper function to get random amount lost
function getRandomAmountLost(): number {
  const amounts = [
    0, 5000, 10000, 15000, 25000, 50000, 75000, 100000, 150000, 200000, 250000,
    300000, 350000,
  ];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

// Helper function to determine if user had financial loss
function hasFinancialLoss(amount: number): boolean {
  return amount > 0;
}

// Main seeding function
export async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  try {
    // 1. Create users
    console.log("👥 Creating users...");
    const createdUsers = [];

    for (const userData of mockUsers) {
      const hashedPassword = await hashPassword(userData.password);

      const user = await db
        .insert(users)
        .values({
          email: userData.email,
          username: userData.username,
          password: hashedPassword,
          status: userData.status,
        })
        .returning();

      createdUsers.push(user[0]);
      console.log(`✅ Created user: ${userData.username}`);
    }

    const userIds = createdUsers.map((user) => user.id);
    console.log(`✅ Created ${createdUsers.length} users`);

    // 2. Create scams from mock data
    console.log("🚨 Creating scams...");
    const createdScams = [];

    for (const mockScam of mockScams) {
      // Generate new scam ID
      const scamId = generateScamId();

      // Get random user as author
      const authorId = getRandomUserId(userIds);

      // Get random upvotes and comments count
      const upvotesCount = getRandomUpvotes();
      const commentsCount = getRandomComments();

      // Get random amount lost
      const amountLost = getRandomAmountLost();
      const hasFinancialLossValue = hasFinancialLoss(amountLost);

      // Determine status (mostly approved, some pending)
      const status = Math.random() > 0.2 ? "approved" : "pending";

      // Convert mock data to database format
      const scam = await db
        .insert(scams)
        .values({
          id: createId(),
          scamId: scamId,
          title: mockScam.title,
          content: mockScam.content,
          type: mockScam.type as
            | "mobile-banking"
            | "job-scams"
            | "property"
            | "online-shopping"
            | "investment"
            | "education"
            | "romance"
            | "other",
          platforms: JSON.stringify(mockScam.platform),
          locations: JSON.stringify(mockScam.location),
          evidenceUrls:
            mockScam.evidence_urls.length > 0
              ? JSON.stringify(mockScam.evidence_urls)
              : null,
          isAnonymous: mockScam.victim.anonymous || false,
          hasFinancialLoss: hasFinancialLossValue,
          amountLost: amountLost,
          status: status as "pending" | "approved" | "rejected",
          upvotesCount: upvotesCount,
          commentsCount: commentsCount,
          authorId: authorId,
        })
        .returning();

      createdScams.push(scam[0]);
      console.log(`✅ Created scam: ${mockScam.title}`);
    }

    console.log(`✅ Created ${createdScams.length} scams`);

    // 3. Create comments for scams
    console.log("💬 Creating comments...");
    let totalComments = 0;

    for (const scam of createdScams) {
      // Get original mock scam data by index
      const scamIndex = createdScams.indexOf(scam);
      const originalScam = mockScams[scamIndex];

      if (originalScam && originalScam.comments.length > 0) {
        for (const comment of originalScam.comments) {
          // Get random user as comment author
          const commentAuthorId = getRandomUserId(userIds);

          await db.insert(comments).values({
            content: comment.content,
            scamId: scam.id,
            authorId: commentAuthorId,
          });

          totalComments++;
        }
      }
    }

    console.log(`✅ Created ${totalComments} comments`);

    // 4. Create upvotes for scams
    console.log("👍 Creating upvotes...");
    let totalUpvotes = 0;

    for (const scam of createdScams) {
      const upvotesCount = scam.upvotesCount;

      // Create upvotes from random users
      const usersToUpvote = new Set<number>();
      while (usersToUpvote.size < Math.min(upvotesCount, userIds.length)) {
        usersToUpvote.add(getRandomUserId(userIds));
      }

      for (const userId of usersToUpvote) {
        await db.insert(upvotes).values({
          scamId: scam.id,
          userId: userId,
        });

        totalUpvotes++;
      }
    }

    console.log(`✅ Created ${totalUpvotes} upvotes`);

    console.log("🎉 Database seeding completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Scams: ${createdScams.length}`);
    console.log(`   - Comments: ${totalComments}`);
    console.log(`   - Upvotes: ${totalUpvotes}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Function to clear database (for testing)
export async function clearDatabase() {
  console.log("🧹 Clearing database...");

  try {
    await db.delete(upvotes);
    await db.delete(comments);
    await db.delete(scams);
    await db.delete(users);

    console.log("✅ Database cleared successfully!");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}
