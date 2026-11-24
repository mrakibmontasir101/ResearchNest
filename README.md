# ResearchNest

**A web-based application that helps prospective Master's and PhD students find research topics, professors, labs, universities, and open positions, and track their applications.**

Course project for **Master Software Design II**, Dongshin University.
Team: **S M Mahamudul Haque** (frontend) and **Montasir Mahmud Rakib** (backend).

## Folder structure

```text
ResearchNest/
├── plans/                  All project documents
│   ├── srs/                Software Requirements Specification
│   ├── rtm/                Requirements Traceability Matrix and test plan
│   ├── usecase/            Use case descriptions
│   ├── architecture/       Architecture decisions, cloud, capacity, API, database schema
│   ├── img/                All diagrams and UI screenshots
│   ├── pdf/                PDF copies of the documents
│   └── project-management/ Team roles
└── src/                    All code
    ├── frontend/           React + TypeScript + Vite + Tailwind CSS
    └── backend/            Python + Django REST Framework + PostgreSQL
```

See [plans/README.md](plans/README.md) for a guide to every document.

## Architecture

ResearchNest is a **modular monolith** ([why](plans/architecture/ADR-001-modular-monolith.md)): one Django backend divided into modules for accounts, academic data, claims, community editing, applications, social features, notifications, and imports. The React frontend calls the backend's JSON API, data is stored in PostgreSQL, and academic data is imported from the OpenAlex API. The system is designed to run on a cloud platform ([deployment diagram](plans/img/deployment-architecture.png)).

## How to run

| Part | Instructions |
| --- | --- |
| Frontend | [src/frontend/README.md](src/frontend/README.md) |
| Backend | [src/backend/README.md](src/backend/README.md) |

## Status

| Part | Status |
| --- | --- |
| Requirements (SRS, RTM) | Complete |
| Frontend | Prototype of all screens on demo data |
| Backend | Skeleton: modules, PostgreSQL connection, health check, admin |
| Frontend-backend connection | Not started |
