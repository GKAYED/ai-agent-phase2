# AI News & Learning Resource Aggregator (Phase 2)

A single-user, local-first app that aggregates AI news, courses, and reading resources; tracks progress with checkboxes; supports voting; and visualizes your learning journey — per the formal specifications in ai-agent-spec.

- Backend: Node.js 20, Express, SQLite (better-sqlite3)
- Frontend: Single `public/index.html` (vanilla JS + CSS)
- Deployment: Docker (alpine), volume-mounted SQLite DB

## Features

- ✅ Fetch from 20+ RSS sources (plus manual resources)
- ✅ Deduplicate by URL
- ✅ Tabs: All | News | Courses | Reading | Journey
- ✅ Persistent checkboxes
- ✅ Upvote/downvote
- ✅ Journey: progress, milestones (5,10,20,50,100), top sources
- ✅ Dockerized

## Quick Start (Docker)

```powershell
# Build and run
docker-compose up --build
# Open http://localhost:3000
```

## Local Dev

```powershell
npm install
npm run fetch   # optional: CLI fetch
npm start       # starts server on :3000
```

## API
- POST /api/fetch
- GET /api/items?category=news&checked=0
- POST /api/items/:id/toggle
- POST /api/items/:id/vote { type: "up" | "down" }
- GET /api/stats
- GET /api/sources/top
- GET /api/journey

See `SETUP.md` and `QUICKSTART.md` for details.
