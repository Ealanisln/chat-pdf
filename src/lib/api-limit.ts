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
      // Check if the user's usage count has exceeded the limit
      if (existingUserUsage[0]?.usageCount >= MAX_FREE_COUNTS) {
        return false; // Usage limit exceeded
      }
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

    return true; // User can proceed with the API action
  } catch (error) {
    console.error("Error increasing API limit:", error);
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  try {
    // Check if the user exists in the userUsage table
    const existingUserUsage = await db
      .select()
      .from(userUsage)
      .where(eq(userUsage.userId, userId))
      .limit(1)
      .execute();

    if (existingUserUsage[0]) {
      return existingUserUsage[0].usageCount;
    } else {
      return 0; // User doesn't exist, so the count is 0
    }
  } catch (error) {
    console.error("Error retrieving API limit count:", error);
    return 0;
  }
};
