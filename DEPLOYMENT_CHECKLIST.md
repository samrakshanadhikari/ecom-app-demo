# 🚀 Deployment Checklist - Vercel & Render

## Why Your App Is Not Working

Your deployed apps are failing because of **missing environment variables** and **MongoDB connection issues**. Follow this checklist to fix it.

---

## ✅ Step 1: MongoDB Atlas Configuration

### A. Get Your Connection String
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click **"Connect"** button next to your cluster (Cluster0)
3. Select **"Drivers"**
4. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>`** with your actual database user password
6. **Add your database name** before the `?`, for example:
   ```
   mongodb+srv://username:password@cluster0.xxxx.mongodb.net/ecomapp?retryWrites=true&w=majority
   ```

### B. Network Access (CRITICAL!)
1. In MongoDB Atlas, go to **SECURITY** → **Database & Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (This adds `0.0.0.0/0`)
4. Click **"Confirm"**

**⚠️ Without this step, Render cannot connect to your database!**

---

## ✅ Step 2: Render (Backend) Configuration

### A. Environment Variables
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click on your **Web Service** (backend)
3. Go to **"Environment"** tab
4. Add these **TWO** environment variables:

   **Variable 1:**
   - **Key:** `MONGODB_URI`
   - **Value:** (Paste the connection string from Step 1A)

   **Variable 2:**
   - **Key:** `JWT_SECRETE`
   - **Value:** (Any random string, e.g., `my_super_secret_jwt_key_12345`)

5. Click **"Save Changes"**
6. Render will automatically restart your service

### B. Verify Backend is Running
1. Go to your Render service **"Logs"** tab
2. Look for: `✅ MongoDB connection established successfully`
3. Look for: `Server is running on the port XXXX`
4. Visit your backend URL: `https://ecom-app-demo-backend.onrender.com/`
   - Should show: `{"message": "E-commerce API is running!", "status": "success"}`

---

## ✅ Step 3: Seed Users (Optional - For Testing)

If you want to use the pre-defined admin/user accounts, you need to seed them:

1. **Locally:**
   ```bash
   cd Backend
   # Make sure you have .env file with MONGODB_URI
   node createUsers.js
   ```

2. **Or connect to MongoDB Atlas directly** and manually create users with these credentials:
   - Admin: `admin@example.com` / `adminpassword123`
   - User: `user@example.com` / `userpassword123`

---

## ✅ Step 4: Vercel (Frontend) Configuration

Your frontend is already configured to use the Render backend URL. **No changes needed** unless you're testing locally.

**If testing locally**, update `frontend/src/http/index.js`:
- Change `baseURL: 'https://ecom-app-demo-backend.onrender.com'` 
- To: `baseURL: 'http://localhost:3000'`

---

## 🐛 Troubleshooting

### Problem: "Failed to request" or 502 error
**Solution:** Check Render logs. Most likely:
- `MONGODB_URI` is missing → Add it in Render Environment tab
- `JWT_SECRETE` is missing → Add it in Render Environment tab
- MongoDB Network Access not configured → Add `0.0.0.0/0` in Atlas

### Problem: "Login failed" even with correct credentials
**Solution:** 
- Users don't exist in database → Run `node createUsers.js` locally
- Backend can't connect to MongoDB → Check Render logs for connection errors

### Problem: "Connections: 0" in MongoDB Atlas
**Solution:** 
- Backend isn't connecting → Check Render logs
- Network Access not configured → Add `0.0.0.0/0` in Atlas

### Problem: Backend crashes immediately after starting
**Solution:** 
- Check Render logs for exact error
- Most common: Missing `MONGODB_URI` or `JWT_SECRETE`
- Connection string has wrong password → Double-check credentials

---

## ✅ Final Verification Checklist

- [ ] MongoDB Atlas has `0.0.0.0/0` in Network Access
- [ ] Render has `MONGODB_URI` environment variable set
- [ ] Render has `JWT_SECRETE` environment variable set
- [ ] Render logs show: `✅ MongoDB connection established successfully`
- [ ] Backend URL returns JSON response (not error)
- [ ] Frontend can successfully call backend API
- [ ] Users exist in database (if testing login)

---

## 📝 Notes

- **Render Free Tier:** Apps "sleep" after 15 minutes of inactivity. First request takes 30-60 seconds to wake up.
- **MongoDB Free Tier:** Limited connections and storage, but sufficient for development.
- **Security:** Never commit `.env` files to GitHub (already in `.gitignore`).


