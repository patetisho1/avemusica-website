# 🔄 How to Update Your Live Site

## Quick Update Process

### **Option 1: Use the Update Script (Easiest)**
1. Make your changes to the code
2. Test locally: `python app.py`
3. Run: `update_site.bat`
4. Enter a commit message
5. **Done!** Your site will update automatically

### **Option 2: Manual Git Commands**
```bash
# 1. Make your changes
# 2. Test locally
python app.py

# 3. Add changes to git
git add .

# 4. Commit changes
git commit -m "Added new product feature"

# 5. Push to GitHub
git push origin main
```

## 📋 **What Gets Updated Automatically**

When you push to GitHub, these hosting platforms automatically redeploy:

### ✅ **Automatic Deployment Platforms:**
- **Render** - Auto-deploys on push to main branch
- **Railway** - Auto-deploys on push to main branch  
- **Heroku** - Auto-deploys on push to main branch
- **Vercel** - Auto-deploys on push to main branch

### ⚠️ **Manual Deployment Platforms:**
- **PythonAnywhere** - Requires manual deployment
- **Traditional VPS** - Requires manual deployment

## 🔍 **Monitoring Your Deployment**

### **Render Dashboard:**
1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click on your service
3. Check "Events" tab for deployment status
4. Green checkmark = ✅ Deployed successfully

### **Railway Dashboard:**
1. Go to [railway.app/dashboard](https://railway.app/dashboard)
2. Click on your project
3. Check "Deployments" tab
4. Latest deployment shows status

### **Heroku Dashboard:**
1. Go to [dashboard.heroku.com](https://dashboard.heroku.com)
2. Click on your app
3. Check "Activity" tab
4. See deployment logs

## 🚨 **Common Update Scenarios**

### **1. Adding New Products**
```bash
# Make changes to your code
# Test locally
python app.py

# Deploy
git add .
git commit -m "Added new woodworking products"
git push origin main
```

### **2. Updating Website Design**
```bash
# Edit templates/ files
# Test locally
python app.py

# Deploy
git add .
git commit -m "Updated website design and styling"
git push origin main
```

### **3. Fixing Bugs**
```bash
# Fix the bug in your code
# Test locally
python app.py

# Deploy
git add .
git commit -m "Fixed checkout process bug"
git push origin main
```

### **4. Adding New Features**
```bash
# Add new functionality
# Test locally
python app.py

# Deploy
git add .
git commit -m "Added user reviews feature"
git push origin main
```

## ⏱️ **Deployment Timeline**

### **Typical Deployment Times:**
- **Render**: 2-5 minutes
- **Railway**: 1-3 minutes
- **Heroku**: 2-4 minutes
- **Vercel**: 30 seconds - 2 minutes

### **What Happens During Deployment:**
1. **Build Phase** (1-2 minutes):
   - Install dependencies
   - Build your application
   - Run any build scripts

2. **Deploy Phase** (30 seconds - 1 minute):
   - Deploy to servers
   - Start your application
   - Health checks

3. **Live** (immediate):
   - Your site is updated
   - New visitors see changes

## 🔧 **Troubleshooting Updates**

### **Deployment Fails:**
1. **Check logs** in your hosting platform dashboard
2. **Common issues**:
   - Missing dependencies in `requirements.txt`
   - Syntax errors in your code
   - Environment variable issues

### **Changes Not Appearing:**
1. **Clear browser cache** (Ctrl+F5)
2. **Check deployment status** in dashboard
3. **Wait 2-5 minutes** for deployment to complete
4. **Check if you pushed to the right branch** (should be `main`)

### **Site Goes Down:**
1. **Check deployment logs** immediately
2. **Revert to previous version** if needed:
   ```bash
   git revert HEAD
   git push origin main
   ```

## 💡 **Best Practices**

### **Before Deploying:**
- ✅ **Test locally** first
- ✅ **Check for syntax errors**
- ✅ **Verify all files are saved**
- ✅ **Use descriptive commit messages**

### **After Deploying:**
- ✅ **Check your live site** works
- ✅ **Test key functionality** (login, checkout, etc.)
- ✅ **Monitor for errors** in the first few minutes

### **Commit Message Examples:**
- `"Added new product categories"`
- `"Fixed mobile responsive design"`
- `"Updated admin dashboard layout"`
- `"Added user authentication feature"`
- `"Fixed checkout payment bug"`

## 🎯 **Quick Reference**

### **One-Command Update:**
```bash
# Make changes → Test → Deploy
python app.py && git add . && git commit -m "Update" && git push origin main
```

### **Check Deployment Status:**
- **Render**: Dashboard → Your Service → Events
- **Railway**: Dashboard → Your Project → Deployments  
- **Heroku**: Dashboard → Your App → Activity

### **Emergency Rollback:**
```bash
git revert HEAD
git push origin main
```

## 🆘 **Need Help?**

- **Deployment fails**: Check hosting platform logs
- **Changes not showing**: Clear browser cache, wait 5 minutes
- **Site broken**: Use emergency rollback
- **Git issues**: Follow GitHub setup guide again 