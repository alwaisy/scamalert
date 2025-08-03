import { db } from "./index";
import { comments, scams, upvotes } from "./scam-schema";
import { users } from "./user-schema";

// Function to clear database
async function clearDatabase() {
  console.log("🧹 Clearing database...");

  try {
    // Clear in correct order due to foreign key constraints
    await db.delete(upvotes);
    console.log("✅ Cleared upvotes");

    await db.delete(comments);
    console.log("✅ Cleared comments");

    await db.delete(scams);
    console.log("✅ Cleared scams");

    await db.delete(users);
    console.log("✅ Cleared users");

    console.log("✅ Database cleared successfully!");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
}

// Run clearing if this file is executed directly
if (require.main === module) {
  clearDatabase()
    .then(() => {
      console.log("✅ Database clearing completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Database clearing failed:", error);
      process.exit(1);
    });
}
