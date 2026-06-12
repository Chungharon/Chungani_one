# Portfolio API (FastAPI)

Backend for the portfolio site. Handles contact-form email and newsletter
signups via [Resend](https://resend.com). A database layer will be added later.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then fill in your Resend keys
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

- Interactive docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Endpoints

| Method | Path             | Body                          | Purpose                       |
| ------ | ---------------- | ----------------------------- | ----------------------------- |
| POST   | `/api/contact`   | `{ name, email, message }`    | Email a submission to the owner |
| POST   | `/api/newsletter`| `{ email }`                   | Add subscriber to Resend audience |
| GET    | `/health`        | —                             | Liveness check                |

## Structure

```
app/
  main.py            # FastAPI app + CORS + router registration
  config.py          # env-backed settings
  schemas.py         # Pydantic request/response models
  routers/           # HTTP endpoints
  services/email.py  # Resend integration
```

The Next.js frontend calls these endpoints server-side from `lib/actions.ts`
(set `BACKEND_API_URL` in the frontend env).
