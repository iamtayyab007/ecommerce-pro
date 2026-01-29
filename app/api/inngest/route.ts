import { serve } from "inngest/next";
import { inngest } from "@/app/inngest/client";
import { userCreated } from "@/lib/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    userCreated,
  ],
});
