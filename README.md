# ProU Fullstack Assessment

This repository contains a fullstack assessment project with two main folders:

- `backend/` — Node.js backend API
- `frontend/` — Vite + React frontend

Quick start (local):

1. Backend

```powershell
cd backend
npm install
npm run dev
```

2. Frontend

```powershell
cd frontend
npm install
npm run dev
```

How to add this project to GitHub (local -> remote):

1. Initialize git and commit locally:

```powershell
cd C:\path\to\proU-fullstack-assessment
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

2. Create a remote repo on GitHub (use the website or `gh` CLI) and push:

Using GitHub CLI (if authenticated):

```powershell
gh repo create <your-username>/<repo-name> --public --source=. --remote=origin --push
```

Or manually on GitHub: create repo, then:

```powershell
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If you want, I can initialize the local git repo and create the remote for you (I will need your confirmation and either the `gh` CLI installed and authenticated or the remote URL).
