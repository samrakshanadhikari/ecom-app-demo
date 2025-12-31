# 🗑️ DATABASE CLEANUP INSTRUCTIONS

## ✅ DEPLOYED! 

I've created an **admin-only API endpoint** to clean your database.

---

## 🚀 HOW TO CLEAN DATABASE:

### **Option 1: Using Browser Console (Easiest)**

**Do this:**

1. **Login as ADMIN** on your Vercel site

2. **Open Browser Console** (F12)

3. **Copy and paste this code:**

```javascript
fetch('https://ecom-app-demo-backend.onrender.com/api/admin/cleanup-database', {
  method: 'POST',
  headers: {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => {
  console.log('✅ Cleanup Result:', data);
  alert('Database cleaned! Deleted:\n' + 
        '- Products: ' + data.deleted.products + '\n' +
        '- Categories: ' + data.deleted.categories + '\n' +
        '- Cart Items: ' + data.deleted.cartItems);
})
.catch(err => {
  console.error('❌ Error:', err);
  alert('Error cleaning database. Check console.');
});
```

4. **Press Enter**

5. **Should see alert:** "Database cleaned! Deleted: ..."

6. **Done!** ✅

---

### **Option 2: Using Postman/Thunder Client**

```
Method: POST
URL: https://ecom-app-demo-backend.onrender.com/api/admin/cleanup-database
Headers:
  Authorization: [YOUR_ADMIN_TOKEN]
  Content-Type: application/json
```

---

### **Option 3: Using Terminal (curl)**

**First, get your admin token:**
1. Login as admin on your site
2. Open console (F12)
3. Type: `localStorage.getItem('token')`
4. Copy the token

**Then run:**
```bash
curl -X POST https://ecom-app-demo-backend.onrender.com/api/admin/cleanup-database \
  -H "Authorization: YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

---

## ⏱️ WAIT FOR RENDER TO DEPLOY

**Before cleaning, make sure:**
1. Go to: https://dashboard.render.com/
2. Check your backend service
3. Should show "Live" status
4. Latest deploy should be commit: `16d8937`

**Wait ~2-3 minutes after pushing for deployment to complete!**

---

## 🔒 SECURITY:

- ✅ Only **ADMIN** users can use this endpoint
- ✅ Requires valid authentication token
- ✅ Regular users will get **403 Forbidden**

---

## 📊 WHAT GETS DELETED:

✅ All Products  
✅ All Categories  
✅ All Cart Items  

**NOT DELETED:**
- ❌ Users (your accounts stay)
- ❌ Orders (order history preserved)
- ❌ Reviews (reviews preserved)

---

## ✅ AFTER CLEANUP:

Once database is clean, you can:

1. **Create fresh categories** with images
2. **Add new products** with images
3. **Test complete user flow:**
   - Register new user
   - Login
   - Browse products
   - Add to cart
   - Checkout
   - Everything should work perfectly! ✅

---

## 🎯 TESTING CHECKLIST:

After cleanup and adding fresh data:

### **As Admin:**
- [ ] Create category with image
- [ ] Create product with image
- [ ] Images show correctly
- [ ] Edit product
- [ ] Delete product

### **As Customer:**
- [ ] Register new account
- [ ] Login successfully
- [ ] See products with images
- [ ] Search for products
- [ ] Filter by category
- [ ] Add to cart from product page
- [ ] Add to cart from category page
- [ ] View cart (items show correctly)
- [ ] Update quantity in cart
- [ ] Remove from cart
- [ ] Proceed to checkout
- [ ] Complete order

---

## 🆘 IF IT DOESN'T WORK:

**Check these:**

1. **Are you logged in as admin?**
   - Role must be "admin"
   - Check: `localStorage.getItem('role')`

2. **Is token valid?**
   - Check: `localStorage.getItem('token')`
   - Should be a long string

3. **Is backend deployed?**
   - Check Render dashboard
   - Should show "Live"

4. **Check Render logs:**
   - Should see: "🗑️  DATABASE CLEANUP STARTED"
   - Then: "✅ DATABASE CLEANUP COMPLETE!"

---

## 📞 AFTER CLEANUP:

Once cleaned, **let me know** and I'll help you:
1. Verify it worked
2. Test the complete flow
3. Fix any issues that come up

---

**Ready to clean? Wait for Render to deploy, then use Option 1 (Browser Console) - it's the easiest!** 🚀

