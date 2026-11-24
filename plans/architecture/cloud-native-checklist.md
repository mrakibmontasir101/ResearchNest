# Is ResearchNest cloud native?

Cloud native means software built to run in the cloud from the start. A monolith can be cloud native if it follows these practices. Status is updated as the project progresses.

| Practice | How ResearchNest does it | Status |
| --- | --- | --- |
| Runs in containers | Dockerfiles for frontend and backend in `deploy/` | To do |
| Configuration in environment variables | `.env` locally, platform variables in the cloud (NFR-SEC-05) | Done (backend skeleton) |
| Stateless backend | No user data kept in the server process; sessions in the database | Planned |
| Managed cloud services | Managed PostgreSQL; static hosting with CDN for the frontend | Planned |
| Health check | `GET /api/health` reports app and database status | Done |
| Automatic build and test (CI/CD) | GitHub Actions in `.github/workflows/` | Done (checks); deploy step to do |
| Logging and monitoring | Platform logs; safe error logs (NFR-REL-04) | Planned |
| Horizontal scaling | Run more backend copies behind the load balancer | Possible once the items above are done |

Reference: [CNCF cloud native definition](https://github.com/cncf/toc/blob/main/DEFINITION.md)
