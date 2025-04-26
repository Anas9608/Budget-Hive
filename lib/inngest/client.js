import { Inngest } from "inngest";

// Create a client to send and receive events

const retryFunction=  async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  });
export const inngest = new Inngest({ id: "budget-hive" , name: "Budget Hive", retryFunction});
