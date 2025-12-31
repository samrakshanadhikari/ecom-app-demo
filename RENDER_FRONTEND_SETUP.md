# 🚀 Deploy Frontend to Render - Step by Step

## Prerequisites
- ✅ GitHub repository with your code
- ✅ Render account (sign up at render.com if needed)

---

## Step-by-Step Guide

### Step 1: Go to Render Dashboard
1. Visit: https://dashboard.render.com/
2. Log in (use GitHub if possible)

### Step 2: Create New Static Site
1. Click **"New +"** button (top right)
2. Select **"Static Site"**

### Step 3: Connect GitHub Repository
1. If first time: Click **"Connect GitHub"** and authorize
2. Search for your repository: `ecom-app-demo` (or your repo name)
3. Click **"Connect"**

### Step 4: Configure the Static Site

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `ecom-app-demo-frontend` |
| **Branch** | `main` (or your default branch) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `frontend/dist` |

### Step 5: Advanced Settings (Optional)

**Environment Variables:**
- Usually not needed for static sites
- But if you want to make backend URL configurable:
  - Key: `VITE_API_URL`
  - Value: `https://ecom-app-demo-backend.onrender.com`
  - Then update your `frontend/src/http/index.js` to use `import.meta.env.VITE_API_URL`

### Step 6: Create Static Site
1. Click **"Create Static Site"** button
2. Render will start building

### Step 7: Wait for Deployment
- Build usually takes 2-5 minutes
- Watch the logs for progress
- You'll see: `Build successful` when done

### Step 8: Get Your URL
- Render will give you a URL like: `https://ecom-app-demo-frontend.onrender.com`
- Your frontend is now live!

---

## ⚠️ Important: Update Backend URL

If your backend is also on Render, make sure your frontend points to the correct backend URL:

**Current code** (`frontend/src/http/index.js`):
```javascript
baseURL: 'https://ecom-app-demo-backend.onrender.com'
```

This should work if your backend is on Render! ✅

If your backend URL changes, update this file and push to GitHub (Render will auto-deploy).

---

## 🎉 You're Done!

Your frontend is now on Render. You can:
- View it at the URL Render provides
- Update code → Push to GitHub → Auto-deploys
- Manage it from the same Render dashboard as your backend

---

## 🔄 Auto-Deployments

Render automatically deploys when you:
- Push to the connected branch (usually `main`)
- Manually trigger a deploy from the dashboard

No manual steps needed after initial setup!


