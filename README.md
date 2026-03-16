# GroqGPT (Full Stack)

A full-stack chat app: a Vite + React UI talks to an Express API that calls Groq LLMs and stores message history in Postgres.

DEMO --> https://groqgpt.pages.dev/

**30-Second Architecture**

1. Browser loads the React app from `frontend/`.
2. On load, the app calls `GET /get-messages` to hydrate the chat history.
3. When you send a prompt, the app calls `POST /text-to-text` with `{ userInput, model }`.
4. The backend calls Groq (`groq-sdk`) and returns the assistant text.
5. The UI renders the reply and then persists both user + system messages via `POST /insert-messages`.
6. The model dropdown is populated from `GET /list-models` (Groq model catalog).

**Key Pieces**

- Frontend: `frontend/src/views/home/Home.tsx` orchestrates UI, API calls, and message rendering.
- Backend: `backend/index.js` hosts the Express app; `backend/controllers/controllers.js` contains route logic.
- Data: Postgres table `messages(id, type, content)` stores chat history.

**Run It (Local)**

1. Backend
   - `cd backend`
   - Set env vars (see `backend/README.md` for a template).
   - `npm install`
   - `npm run dev`
2. Frontend
   - `cd frontend`
   - Set `VITE_API_URL` to your backend (default `http://localhost:80`).
   - `npm install`
   - `npm run dev`

**HTTP API**

- `POST /text-to-text` -> `{ userInput, model }` -> `{ status, data }`
- `GET /get-messages` -> `{ status, data: [{ id, type, content }] }`
- `POST /insert-messages` -> `{ messages: [{ id, type, content }] }`
- `GET /list-models` -> `{ status, data: [model] }`

**Repo Layout**

- `backend/` Express API + Groq + Postgres
- `frontend/` React UI + Tailwind/shadcn

**Notes**

- Secrets in `.env` should never be committed. Rotate keys if needed.
- The backend listens on `PORT` and enables CORS + Helmet by default.
