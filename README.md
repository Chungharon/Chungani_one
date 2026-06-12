# Portfolio

Monorepo for the portfolio site, split into two independent apps.

```
.
├── frontend/   # Next.js app (UI, MDX content, blog/projects)
└── backend/    # FastAPI service (contact email, newsletter; DB later)
```

## Frontend (Next.js)

```bash
cd frontend
pnpm install
pnpm dev          # http://localhost:3000
```

Set `BACKEND_API_URL` in `frontend/.env` (defaults to `http://localhost:8000`).

## Backend (FastAPI)

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in Resend keys
uvicorn app.main:app --reload --port 8000
```

See [`backend/README.md`](backend/README.md) for endpoint details.

## How they connect

The contact and newsletter forms call Next.js server actions
(`frontend/lib/actions.ts`), which validate input and proxy the request
server-to-server to the FastAPI backend. The backend handles delivery via
[Resend](https://resend.com).
