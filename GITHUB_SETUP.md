# 📚 GitHub Setup for Deployment

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `woodworking-store` (or any name you prefer)
4. Make it **Public** (required for free hosting)
5. Don't initialize with README (you already have files)
6. Click "Create repository"

## Step 2: Upload Your Code

### Option A: Using GitHub Desktop (Easiest)
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in
3. Click "Clone a repository from the Internet"
4. Select your new repository
5. Choose a local path
6. Copy all your project files to that folder
7. In GitHub Desktop, you'll see all your files
8. Add a commit message like "Initial commit"
9. Click "Commit to main"
10. Click "Push origin"

### Option B: Using Command Line
Open PowerShell in your project folder and run:

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Your Repository

Your GitHub repository should contain:
- ✅ `app.py`
- ✅ `requirements.txt`
- ✅ `Procfile`
- ✅ `runtime.txt`
- ✅ `templates/` folder
- ✅ `static/` folder
- ✅ All other project files

## Step 4: Deploy!

Now you can deploy using any of these platforms:

### 🚀 Render (Recommended)
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `woodworking-store`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
6. Click "Create Web Service"

### 🚂 Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Deploy!

## 🔗 Your Live Site

After deployment, your site will be available at:
- **Render**: `https://woodworking-store.onrender.com`
- **Railway**: `https://woodworking-store.railway.app`

## 📝 Important Notes

- **Public Repository**: Free hosting requires public repositories
- **Environment Variables**: Set these in your hosting platform:
  - `SECRET_KEY`: Generate a strong secret key
  - `DATABASE_URL`: Will be provided by hosting platform
- **Database**: Your local SQLite won't work in production
- **File Uploads**: Local file uploads won't work in production

## 🆘 Need Help?

- Check the hosting platform's documentation
- Look at deployment logs for errors
- Make sure all files are committed to GitHub
- Test locally with `python deploy_test.py` first 