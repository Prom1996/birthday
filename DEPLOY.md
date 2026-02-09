# Deploy Birthday Page to GitHub (and GitHub Pages)

## 1. Commit and push your code

In the project folder, run:

```bash
# Ignore macOS junk (optional)
echo ".DS_Store" >> .gitignore

# Stage everything (HTML, CSS, JS, images)
git add index.html script.js style.css images/
git add .gitignore

# Commit
git commit -m "Birthday page: blur background, revolving text, flowers & poppers"

# Push to GitHub
git push -u origin master
```

If you use `main` instead of `master`:

```bash
git push -u origin main
```

## 2. Turn on GitHub Pages (so the site is live)

1. Open: **https://github.com/Prom1996/birthday**
2. Click **Settings** (repo menu).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Source**, choose **Deploy from a branch**.
5. Under **Branch**:
   - Branch: **master** (or **main** if that’s your default).
   - Folder: **/ (root)**.
6. Click **Save**.

After a minute or two, your site will be at:

- **https://prom1996.github.io/birthday/**

Share that link to open the birthday page in the browser.

## 3. Updating the site later

After you change files locally:

```bash
git add .
git commit -m "Update birthday page"
git push
```

GitHub Pages will redeploy automatically; the same URL will show the new version in a short while.
