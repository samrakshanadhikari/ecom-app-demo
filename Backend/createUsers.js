// createUsers.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/userModel.js"; // <-- make sure this exists

dotenv.config();

// pick up your DB connection string from .env
const URI = process.env.MONGODB_URI || process.env.MONGO_URI;

// helper function to upsert a user
async function upsertUser({ username, email, password, role }) {
  const hashed = await bcrypt.hash(password, 14);
  await User.findOneAndUpdate(
    { email }, // match by email
    { username, email, password: hashed, role },
    { upsert: true, new: true }
  );
  console.log(`✅ Upserted: ${email} (${role})`);
}

async function main() {
  if (!URI) throw new Error("❌ Missing MONGODB_URI / MONGO_URI in .env");

  await mongoose.connect(URI);
  console.log("✅ Connected to MongoDB");

  // === Define the accounts you want ===
  const accounts = [
    // First set
    { username: "admin_user1",   email: "admin@example.com",  password: "adminpassword123", role: "admin" },
    { username: "regular_user1", email: "user@example.com",   password: "userpassword123",  role: "user"  },

    // Second set
    { username: "admin_user2",   email: "admin2@example.com", password: "adminpassword456", role: "admin" },
    { username: "regular_user2", email: "user2@example.com",  password: "userpassword456",  role: "user"  },

    // Third set
    { username: "admin_user3",   email: "admin3@example.com", password: "adminpassword789", role: "admin" },
    { username: "regular_user3", email: "user3@example.com",  password: "userpassword789",  role: "user"  },
  ];

  // loop through all accounts and upsert them
  for (const a of accounts) {
    await upsertUser(a);
  }

  await mongoose.disconnect();
  console.log("🌱 Seeding finished");
}

// run the script
main().catch(async (err) => {
  console.error("❌ Error creating users:", err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
