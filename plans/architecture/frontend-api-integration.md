# ResearchNest API integration notes

This frontend is intended to call the Django REST Framework API described in **SRS §4.2**. API paths are placed under the configured base URL, normally `/api`. The SRS calls these paths an initial interface contract; exact response serializer names and page envelopes must be agreed during backend implementation.

## Endpoint-to-screen map

| Service group | SRS route(s) | Frontend area |
|---|---|---|
| `authService` | `POST /auth/register`, `POST /auth/verify-email`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/password-reset`, `GET /auth/me`, `DELETE /account` | Login/register, account settings |
| `profileService` | `GET/PATCH /student-profile` | Student profile |
| `discoveryService` | `GET /search`, `GET /professors`, `GET /professors/{id}`, `GET /professors/{id}/papers`, `GET /professors/{id}/reply-stats`, `GET /labs/{id}`, `GET /universities/{id}`, `GET /papers/{id}`, `GET/POST/DELETE /shortlist` | Discovery, shortlist, comparison, detail pages |
| `labQaService` | `GET/POST /labs/{id}/questions`, `POST /answers/{id}/upvote` | Lab Q&A |
| `applicationService` | `GET/POST /applications`, `GET/PATCH/DELETE /applications/{id}`, `POST /applications/{id}/tasks` | Private application tracker |
| `communityService` | `POST /edits`, `GET /edits/mine`, `POST /edits/{id}/decision`, `POST /claims`, `POST /claims/verify-email`, `POST /reports` | Community edits, profile claims, reports |
| `socialService` | `GET/POST /posts`, `PATCH /posts/{id}`, `GET /feed`, `POST/DELETE /follows`, `GET/POST /messages`, `POST /users/{id}/block` | Explore feed, follows, messages |
| `notificationService` | `GET /notifications`, `PATCH /notifications/{id}`, `PATCH /settings/notifications` | Notifications and settings |
| `adminService` | `GET /admin/moderation-queue`, `POST /admin/import-jobs`, `GET /admin/import-jobs/{id}`, `GET /admin/users`, `PATCH /admin/users/{id}/roles`, `GET /admin/audit-events` | Moderation, users/roles, imports, audit log |

## SRS contract gaps to resolve

The SRS contains functional behavior that is not completely represented by an explicit endpoint in its initial §4.2 list. Confirm these additions with the backend before switching the corresponding screen to live data:

1. **Answer creation (FR-QA-02):** the SRS defines verified current lab members answering questions, but §4.2 lists question creation and answer upvoting without a create-answer route. `labQaService.answer()` uses a proposed path `POST /labs/{labId}/questions/{questionId}/answers`; confirm or replace it with the backend route.
2. **Moderation decisions for reports/hidden content (FR-MOD-05/07):** the initial inventory lists the moderation queue and reports, but not the decision routes to restore, edit, or remove reported content with an audit reason.
3. **Manual claim decisions (FR-CLM-03/04):** claim submission and email verification are listed; the admin decision/association workflow for ambiguous claims needs an agreed endpoint.
4. **Account disablement and administrative role updates (FR-ADM-01):** role update is listed; a separate disable/enable account operation should be agreed if it is implemented separately.
5. **Rollback and edit history (FR-EDT-05):** the SRS requires auditable rollback. The current API inventory does not specify a dedicated rollback route or a public edit-history read route.
6. **Message reads / conversation controls:** the initial inventory gives `GET/POST /messages` and user blocking. Agree read-state, thread listing, and delivery/pagination details with the backend.
7. **Reply-report submission:** the SRS specifies a five-distinct-student aggregate threshold and duplicate prevention. Define a private reporting endpoint/workflow for student outcome submissions; it must not expose the underlying tracker rows.

## Suggested list response

The SRS requires paginated list endpoints. One compatible example is:

```json
{
  "count": 125,
  "next": null,
  "previous": null,
  "results": []
}
```

This is an example contract, not a response shape mandated by the SRS. Confirm it with the Django serializers.

## Session authentication and CSRF

`src/api.ts` sends cookies with `credentials: 'include'`. For unsafe methods it reads Django's `csrftoken` cookie and sends `X-CSRFToken`. For local cross-origin development, configure CORS and CSRF trusted origins and cookie settings correctly; a same-origin Vite proxy is another option. Production must use HTTPS, secure cookies, and appropriate secure headers.

## Server-side responsibilities

The backend must enforce authentication, roles, object ownership, relationships, private data boundaries, and audit logging on every protected route. In particular:

- Application entries, notes, status history, tasks, saved lists, and direct messages are private to authorized participants.
- Professor reply statistics are available only with at least five distinct student contributors and must not reveal individual identities or details.
- One account cannot create duplicate outcome reports for the same professor to inflate the threshold.
- Three distinct reports hide eligible content pending administrator review; duplicate-report abuse is controlled and hide reversal is logged.
- Trusted-editor status requires at least 10 reviewed edits and at least 90% approval.
- Verified professor/lab-member claims require institutional email control and manual review when domain mapping is ambiguous.
- Verified current lab-member answers sort before other answers; each user can upvote an answer only once.
- Position posts require their fixed data fields, and expired positions transition to Closed.
- OpenAlex import jobs are scoped, paginated, rate-limited, and preserve last-known-good data after partial or failed refreshes.

The frontend role selector is a **demo preview**, not an authorization system.
