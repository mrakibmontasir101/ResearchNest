# Frontend screen coverage against ResearchNest Features / SRS / RTM

The Features document, SRS, and RTM define 15 use cases. The RTM traces 98 functional requirements and 27 non-functional requirements. This file maps the frontend prototype to those areas. A screen or local demo interaction is not proof that the backend acceptance test has passed.

| UC | Use case | Frontend coverage |
|---|---|---|
| UC001 | Manage account and roles | Login/register/password-reset preview, email-verification state, account menu, settings, delete confirmation, role-preview control. Actual verification, role grants, and deletion are backend work. |
| UC002 | Manage student profile | Interests, education, skills/methods, prior papers, target countries, target degree. Matching must only use fields the student actually supplies. |
| UC003 | Search, rank and shortlist | Plain-language search; professors/labs/universities/papers/positions; match score and “why matched”; country, university, recruiting, degree filters; deterministic demo sorting; pagination; save/remove. Production TF-IDF and cosine similarity belong in backend search. |
| UC004 | View professor profile | Institution, areas, associated lab, recent papers/citations, recruiting state, provenance, last successful update, and reply statistics only when five distinct student reports qualify. |
| UC005 | View lab page | Description, research areas, members, university, recruiting/funding note, provenance/freshness, Q&A, verified-member-first answer ordering and upvotes. |
| UC006 | View university page | Institution name/country/site/source ID and associated professor/lab links. Explicitly distinguishes historical paper affiliation from verified current employment. |
| UC007 | Import and refresh academic data | Scoped OpenAlex job creation/retry preview, job history, processed/error counts, non-secret error summary and last-known-good-data guidance. Actual scheduled imports are backend jobs. |
| UC008 | Suggest edits and view history | Source URL required, field/value, pending/approved/rejected, contributor/reviewer/source history, rollback entry point. |
| UC009 | Approve edits and moderate reports | Pending edit queue, reports, hidden-item state, claims, user/role view and audit history. Admin actions are role-preview controls; server must authorize and audit. |
| UC010 | Claim professor profile or lab membership | Institution email, target profile/lab, verification step, ambiguous-domain manual-review state, verified badge preview. Email/token/domain checks are backend work. |
| UC011 | Ask, answer and upvote lab questions | Authenticated-question demo, answer form only in verified-lab-member preview, verified answers first, per-session duplicate upvote prevention, notification preview. Backend enforces actual current membership and one vote per account. |
| UC012 | Track applications and reply statistics | Private tracker, exact statuses (emailed/replied/interview/accepted/rejected), contact date, notes, deadline/tasks, completion, CSV export, privacy explanation and five-contributor threshold. Data persistence/aggregation is backend work. |
| UC013 | Publish posts, follow and message | Explore feed; position/lab-news/student-seeking composer; role-preview checks; follow controls; private messages, block/report UI and message preferences. Backend enforces role, follow, block and DM settings. |
| UC014 | Receive notifications | In-app notifications, read/unread, event previews, preferences and optional email preference. Actual triggers/delivery are backend work. |
| UC015 | Administer users and operations | Moderation overview, user/role preview, scoped imports, audit log, failed job/retry entry points. Actual admin operations are backend work. |

## Non-functional interface considerations

| SRS NFR group | Frontend treatment / remaining verification |
|---|---|
| Performance and capacity (NFR-PERF-01–04) | Paginated result view and shared API layer are prepared. The 2-second p95 search/API and 3-second page-usable targets require backend and browser load testing. |
| Security (NFR-SEC-01–06) | Shared API client sends session cookies/CSRF. No server secrets are included. Django must hash passwords, validate inputs, enforce permissions, apply rate limits and audit sensitive actions. |
| Usability/accessibility (NFR-USA-01–04) | Responsive navigation, field labels, focus-visible styles, state labels, source/freshness explanations and empty states. Keyboard and WCAG 2.2 AA testing remains required. |
| Reliability (NFR-REL-01–04) | Import UI explains preservation of last-known-good data and controlled failure. Transactions, persistence, backup/restore and API resilience are backend/deployment work. |
| Maintainability/testability (NFR-MNT-01–05) | Reusable page/form/result/status components, shared client, pinned frontend dependencies and setup notes. Automated authorization/workflow tests remain to be implemented with the backend. |
| Privacy (NFR-PRI-01–04) | Tracker and message areas are labelled private; aggregate reply statistics are gated in the display. Actual privacy and anonymization must be enforced by Django/database queries. |

## Demonstration limits

- Demo records and identities are fictional. They must not be presented as verified professors, universities, publications, recruitment announcements, or real application outcomes.
- Most actions update React state in memory and reset on reload. There is no persistent database or live email delivery in this ZIP.
- Role preview is only for viewing role-oriented UI and exercising local states. It is not access control.
- The `src/services.ts` functions define the planned API connection points. The current screens have not been switched over to those live calls.
- The SRS initial API inventory does not specify every required write/read route; see `API_INTEGRATION.md` for the exact contract gaps, especially Q&A answer creation, moderation decisions, rollback/history, claim decisions, and reply-report submission.
