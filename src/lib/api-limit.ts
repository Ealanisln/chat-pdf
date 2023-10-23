import { auth } from "@clerk/nextjs";
import { userUsage } from "./db/schema";
import { MAX_FREE_COUNTS } from "../../constants";
import { db } from "./db";
import { eq } from "drizzle-orm";

export const increaseApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  try {
    // Check if the user already exists in the userUsage table
    const existingUserUsage = await db
      .select()
      .from(userUsage)
      .where(eq(userUsage.userId, userId))
      .limit(1)
      .execute();

    if (existingUserUsage[0]) {
      // User already exists, update the usage count
      const updatedUsageCount = existingUserUsage[0].usageCount + 1;
      await db
        .update(userUsage)
        .set({ usageCount: updatedUsageCount })
        .where(eq(userUsage.userId, userId))
        .execute();
    } else {
      // User doesn't exist, create a new entry
      await db.insert(userUsage).values({ userId, usageCount: 1 }).execute();
    }

    // Check if the user's usage count has exceeded the limit
    if (existingUserUsage[0]?.usageCount >= MAX_FREE_COUNTS) {
      return false; // Usage limit exceeded
    }

    return true; // User can proceed with the API action
  } catch (error) {
    console.error("Error increasing API limit:", error);
    return false;
  }
};