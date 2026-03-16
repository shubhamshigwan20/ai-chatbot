# Backend (Express + Groq + Postgres)

This service exposes a small HTTP API for chat, relays prompts to Groq LLMs, and persists messages in Postgres.

**How It Works**
- `POST /text-to-text` takes `{ userInput, model }`, calls Groq, and returns the assistant text.
- `GET /list-models` fetches the Groq model catalog for the UI dropdown.
- `POST /insert-messages` bulk-inserts user/system messages into Postgres.
- `GET /get-messages` returns stored chat history.

**Key Files**
- `backend/index.js` app bootstrap (Express + middleware + routes)
- `backend/routes/routes.js` HTTP routes
- `backend/controllers/controllers.js` request handlers
- `backend/groq/groq.js` Groq SDK wrapper
- `backend/db/db.js` Postgres pool
- `backend/middelware/errorHandlingMiddleware.js` 500 handler

**Environment Variables**
Create `backend/.env`:
```bash
PORT=80
GROQ_API_KEY=your_groq_key
PGHOST=your_pg_host
PGDATABASE=your_db
PGUSER=your_user
PGPASSWORD=your_password
PGSSLMODE=require
PGCHANNELBINDING=require
```

**Database Schema**
Expected table (Postgres):
```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- "user" or "system"
  content TEXT NOT NULL
);
```

**Run**
1. `cd backend`
2. `npm install`
3. `npm run dev`

**Responses**
All endpoints respond with `{ status: boolean, ... }`. Errors fall back to a 500 JSON payload.
