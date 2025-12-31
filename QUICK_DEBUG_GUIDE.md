# 🔍 Quick Debug Guide - "Not Working" Checklist

## Step 1: Check Render Logs (MOST IMPORTANT!)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click on your **Backend Web Service**
3. Click the **"Logs"** tab
4. Look for these messages:

### ✅ **Good Signs:**
- `✅ MongoDB connection established successfully`
- `Server is running on the port XXXX`
- No red error messages

### ❌ **Bad Signs - Look for these errors:**

**Error: `❌ MONGODB_URI is not defined in environment variables!`**
- **Fix:** Go to Render → Environment tab → Add `MONGODB_URI` variable

**Error: `❌ MongoDB connection failed: authentication failed`**
- **Fix:** Your MongoDB password in the connection string is wrong
- Re-copy the connection string from MongoDB Atlas and replace the password

**Error: `❌ MongoDB connection failed: timed out`**
- **Fix:** Go to MongoDB Atlas → Network Access → Add `0.0.0.0/0`

**Error: `Server configuration error: JWT_SECRETE missing`**
- **Fix:** Go to Render → Environment tab → Add `JWT_SECRETE` variable (any random string)

**Error: `SecretOrPrivateKey must have a value`**
- **Fix:** Same as above - add `JWT_SECRETE` to Render environment variables

---

## Step 2: Test Backend Directly

Open your browser and go to:
```
https://ecom-app-demo-backend.onrender.com/
```

### ✅ **Should see:**
```json
{
  "message": "E-commerce API is running!",
  "status": "success",
  ...
}
```

### ❌ **If you see:**
- **"502 Bad Gateway"** → Backend crashed, check Render logs
- **"Cannot GET /"** → Backend running but route not found (shouldn't happen)
- **Timeout/Connection refused** → Backend is sleeping (wait 30-60 seconds on free tier)

---

## Step 3: Test Login Endpoint

Open browser console (F12) and run:
```javascript
fetch('https://ecom-app-demo-backend.onrender.com/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'adminpassword123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### ✅ **Should see:**
```json
{
  "message": "User login successfull",
  "token": "...",
  "data": {...}
}
```

### ❌ **If you see:**
- **"User not found"** → Users don't exist in database, run `node createUsers.js` locally
- **"Password not matched"** → Wrong password
- **"Server configuration error: JWT_SECRETE missing"** → Add JWT_SECRETE to Render
- **500 error** → Check Render logs for the actual error

---

## Step 4: Verify Environment Variables on Render

1. Render Dashboard → Your Service → **Environment** tab
2. Verify these TWO variables exist:

   ```
   MONGODB_URI = mongodb+srv://username:password@cluster0.xxxx.mongodb.net/dbname?...
   JWT_SECRETE = any_random_string_here
   ```

3. If missing, add them and click **"Save Changes"**
4. Render will automatically restart your service

---

## Step 5: Verify MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. **SECURITY** → **Database & Network Access**
3. Check if there's an entry with IP: **0.0.0.0/0**
4. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"**

---

## Step 6: Check if Users Exist in Database

If login says "User not found", users need to be created:

**Option A: Run locally (if you have .env file):**
```bash
cd Backend
node createUsers.js
```

**Option B: Use MongoDB Atlas directly:**
1. Go to MongoDB Atlas → **Collections**
2. Check if `users` collection exists
3. If empty, you need to create users (either run the script or manually)

---

## Still Not Working?

**Copy the LAST 20 lines from your Render Logs** and we can diagnose the exact issue.

Common issues:
- ✅ Environment variables not set → Add them in Render
- ✅ MongoDB Network Access blocked → Add 0.0.0.0/0
- ✅ Wrong connection string password → Re-copy from Atlas
- ✅ JWT_SECRETE missing → Add it to Render
- ✅ Users don't exist → Run createUsers.js script


