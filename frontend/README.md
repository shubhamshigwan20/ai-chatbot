# Frontend (React + Vite + Tailwind/shadcn)

The UI is a single-page chat interface that lets users pick a Groq model, send messages, and view history.

**How It Works**
- `Home.tsx` fetches history on load (`GET /get-messages`).
- On submit, it posts to `POST /text-to-text`, renders the reply, then persists both messages via `POST /insert-messages`.
- The model dropdown loads from `GET /list-models`.

**Key Files**
- `frontend/src/views/home/Home.tsx` main UI and API flow
- `frontend/src/components/custom/dropdown/Dropdown.tsx` model picker
- `frontend/src/api/api.ts` Axios client
- `frontend/src/constants/endpoints.ts` API paths

**Environment**
Create `frontend/.env`:
```bash
VITE_API_URL=http://localhost:80
```

**Run**
1. `cd frontend`
2. `npm install`
3. `npm run dev`

**Notes**
- UI uses Tailwind + shadcn primitives.
- Messages are rendered as chat bubbles with user/system alignment.
