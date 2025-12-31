# 👥 Create Users in Database - Quick Fix

## Problem
Login fails with "User not found" because **no users exist in your database yet**.

## Solution: Create Users

You need to create users. Here's the easiest way:

---

## Option 1: Run Script Locally (Recommended - 2 minutes)

### Step 1: Create .env File in Backend Folder

1. Go to your `Backend` folder
2. Create a new file named `.env` (exactly that name, with the dot)
3. Add this line (use the SAME connection string you used in Render):

```
MONGODB_URI=your_mongodb_connection_string_here
```

**Important:** Use the EXACT same connection string you put in Render's `MONGODB_URI` variable.

**Example:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxx.mongodb.net/ecomapp?retryWrites=true&w=majority
```

### Step 2: Run the Script

Open terminal in your project folder and run:

```bash
cd Backend
node createUsers.js
```

### Step 3: Verify

You should see:
```
✅ Connected to MongoDB
✅ Upserted: admin@example.com (admin)
✅ Upserted: user@example.com (user)
✅ Upserted: admin2@example.com (admin)
...
🌱 Seeding finished
```

### Step 4: Test Login

Now try logging in again:
- Email: `admin@example.com`
- Password: `adminpassword123`

---

## Option 2: Create Users via MongoDB Atlas (More Complex)

If you can't run the script locally:

1. Go to MongoDB Atlas → Browse Collections
2. Find your database → `users` collection
3. Click "Insert Document"
4. Create user (but password needs to be hashed - this is why Option 1 is easier)

---

## Quick Commands

If you're in the project root:

```bash
# Create .env file (you'll need to edit it with your connection string)
cd Backend
echo "MONGODB_URI=your_connection_string_here" > .env

# Then edit .env file and add your actual connection string
# Then run:
node createUsers.js
```

---

## After Creating Users

1. ✅ Users are now in database
2. ✅ Try logging in: https://ecom-app-demo-frontend.onrender.com/
3. ✅ Use: `admin@example.com` / `adminpassword123`

---

**Need help? Tell me if you can create the .env file and I'll guide you through it!**





