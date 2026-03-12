import { inngest } from "./client";
import { useUser } from "@clerk/nextjs";
import { db } from "../config/db";
import { USER_TABLE } from "../config/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    console.log("Email:", event.data.email);
  },
);

export const CreateNewUser = inngest.createFunction(
  { id: "user.create" },
  { event: "user.create" },
  async ({ event, step }) => {
    const {user}=await event.data;
    //  get eventy data
    const result = await step.run("Checker shity", async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      const email = user.primaryEmailAddress.emailAddress;

      const result = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, email));

      console.log("result", result);

      if (result.length === 0) {
        const res = await db
          .insert(USER_TABLE)
          .values({
            name: user?.fullName,
            email: email,
          })
          .returning({ id: USER_TABLE.id });
            return res;
        console.log("res", res);
      }
      return result;
    })
    return 'Success';
  }

  // send welcome email to user

);
