# ResearchNest frontend

React + TypeScript + Vite + Tailwind CSS.

## Run
```
cd src/frontend
npm install
npm run dev
```
Open http://localhost:5173. Do not open `index.html` directly; it only works through Vite.

The app runs in **demo mode** with fictional data until the backend is connected. To connect it, copy `.env.example` to `.env` and set:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_DEMO_MODE=false
```

API notes: [plans/architecture/frontend-api-integration.md](../../plans/architecture/frontend-api-integration.md)
