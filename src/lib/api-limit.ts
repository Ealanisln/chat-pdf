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

    return true; // Successfully increased the API limit
  } catch (error) {
    console.error("Error increasing API limit:", error);
    return false;
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false; // Return false if there's no user ID
  }

  try {
    const userUsageRecord = await db
      .select()
      .from(userUsage)
      .where(eq(userUsage.userId, userId))
      .limit(1)
      .execute();

    if (userUsageRecord[0]) {
      // User exists, check if the usage count has exceeded the limit
      if (userUsageRecord[0].usageCount >= MAX_FREE_COUNTS) {
        return false; // Usage limit exceeded
      } else {
        return true; // User can proceed with the API action
      }
    } else {
      return false; // User doesn't exist, so they can't proceed
    }
  } catch (error) {
    console.error("Error checking API limit:", error);
    return false; // Return false in case of an error
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0; // Return 0 if there's no user ID
  }

  try {
    const userUsageRecord = await db
      .select()
      .from(userUsage)
      .where(eq(userUsage.userId, userId))
      .limit(1)
      .execute();

    if (userUsageRecord[0]) {
      // User exists, return the usageCount
      return userUsageRecord[0].usageCount;
    } else {
      return 0; // User doesn't exist, return 0
    }
  } catch (error) {
    console.error("Error fetching API limit count:", error);
    return 0; // Return 0 in case of an error
  }
};