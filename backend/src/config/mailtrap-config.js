import { MailtrapClient } from "mailtrap";
import { config } from "dotenv";

// Load .env file (default location)
config({ path: '../../.env' }); 


const TOKEN = "c095e4e52c9e9013557c3673b8121f2e";

if (!TOKEN) {
  console.error("MAILTRAP_TOKEN is not defined in .env");
  process.exit(1); // Exit the process if token is missing
}

export const mailtrapClient = new MailtrapClient({ token: TOKEN });

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap",
};


