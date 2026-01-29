import { inngest } from "@/app/inngest/client";
import { sendNodemailerEmail } from "../nodemailer/nodemailer";

export const userCreated = inngest.createFunction(
  { id: "user-created" },
  { event: "user/created" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      console.log("eventfire", event);
      await step.run("send-welcome-email", async () => {
        return await sendNodemailerEmail({
          email,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
);
