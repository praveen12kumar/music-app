import { MailtrapClient } from "mailtrap";
import { config } from "dotenv";

// Load .env file (default location)
config({ path: '../../.env' }); 


const TOKEN = "c095e4e52c9e9013557c3673b8121f2e";

if (!TOKEN) {
  console.error("MAILTRAP_TOKEN is not defined in .env");
  process.exit(1); // Exit the process if token is missing
}

const client = new MailtrapClient({ token: TOKEN });

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap",
};
const recipients = [{ email: "praveenshakya441@gmail.com" }];

client
  .send({
    from: sender,
    to: recipients,
    subject: "Verify your Account",
    html: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log)
  .catch(console.error);
