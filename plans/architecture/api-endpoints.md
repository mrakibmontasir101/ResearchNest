# REST API endpoints

Copied from SRS Section 4.2. Routes the frontend needs that are not yet in this list are tracked in [frontend-api-integration.md](frontend-api-integration.md).

## 4.2 REST API Endpoints

The following API inventory is the initial interface contract. Paths are illustrative but intended to be used consistently during implementation. All endpoints return JSON unless noted; list endpoints are paginated. Authentication and permissions are enforced server-side. The API can use a \`/api\` prefix and versioning may be added before public deployment.

| **Method / path**                                 | **Purpose**                                            | **Access / key rule**                                                |
|---------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------|
| POST /api/auth/register                           | Create user and send verification email.               | Public; email unique and password validated.                         |
| POST /api/auth/verify-email                       | Confirm email token.                                   | Public; token one-time and time-limited.                             |
| POST /api/auth/login                              | Create authenticated session.                          | Public; rate-limited and generic failure message.                    |
| POST /api/auth/logout                             | End authenticated session.                             | Authenticated; CSRF protected when cookie/session auth is used.      |
| POST /api/auth/password-reset                     | Request password reset.                                | Public; response does not confirm whether email exists.              |
| GET /api/auth/me                                  | Return current user and role grants.                   | Authenticated; excludes secret fields.                               |
| DELETE /api/account                               | Request confirmed account deletion.                    | Authenticated; ownership and confirmation required.                  |
| GET/PATCH /api/student-profile                    | Read or update the current student profile.            | Authenticated owner; validates interests, education and preferences. |
| GET /api/search?q=...                             | Search/rank professors, labs, universities and papers. | Public or authenticated; query/filter input validated; paginated.    |
| GET /api/professors                               | List/filter professor profiles.                        | Public; country, university and recruiting filters supported.        |
| GET /api/professors/{id}                          | Read a professor profile.                              | Public; only approved/public fields returned.                        |
| GET /api/professors/{id}/papers                   | List associated recent papers.                         | Public; source IDs and available citation counts included.           |
| GET /api/professors/{id}/reply-stats              | Read aggregate response statistics.                    | Public only if at least five distinct reports qualify.               |
| GET/POST/DELETE /api/shortlist\[/ {professorId}\] | List, add or remove saved professor.                   | Authenticated student; only own shortlist.                           |
| GET /api/labs/{id}                                | Read lab detail and membership.                        | Public; shows source and last-updated date.                          |
| GET /api/universities/{id}                        | Read university detail and associated labs/professors. | Public; source fields retained.                                      |
| GET /api/papers/{id}                              | Read paper/work details.                               | Public; external source links included when available.               |
| GET /api/labs/{id}/questions                      | List questions and answers for lab.                    | Public read; paginated.                                              |
| POST /api/labs/{id}/questions                     | Post a lab question.                                   | Authenticated; rate-limited and moderated.                           |
| POST /api/answers/{id}/upvote                     | Upvote an answer.                                      | Authenticated; one vote per account.                                 |
| POST /api/edits                                   | Suggest a source-backed edit.                          | Authenticated; source URL required.                                  |
| GET /api/edits/mine                               | List own edit suggestions and outcomes.                | Authenticated owner only.                                            |
| POST /api/edits/{id}/decision                     | Approve/reject a pending edit.                         | Profile owner or admin according to claim status; decision audited.  |
| POST /api/claims                                  | Create profile/lab membership claim.                   | Authenticated; university email and target required.                 |
| POST /api/claims/verify-email                     | Confirm claim token.                                   | Authenticated or token-bound; checks expiry and domain mapping.      |
| GET /api/admin/moderation-queue                   | List pending items and reports.                        | Administrator only.                                                  |
| POST /api/reports                                 | Report a permitted content target.                     | Authenticated; duplicate/abusive reports controlled.                 |
| GET/POST /api/applications                        | List own tracker entries / create an entry.            | Authenticated; private to owner.                                     |
| GET/PATCH/DELETE /api/applications/{id}           | Read/update/delete own tracker entry.                  | Authenticated owner; never public.                                   |
| POST /api/applications/{id}/tasks                 | Create deadline/task.                                  | Authenticated owner; valid due date.                                 |
| GET/POST /api/posts                               | Search posts / create a position or seeking post.      | Create requires appropriate role and post-type fields.               |
| PATCH /api/posts/{id}                             | Edit/close an authorized post.                         | Author/authorized lab member or admin; audit changes.                |
| GET /api/feed                                     | Read posts from followed entities.                     | Authenticated; respects blocked accounts and visibility.             |
| POST/DELETE /api/follows                          | Follow/unfollow an allowed professor, lab or student.  | Authenticated; duplicate follows prevented.                          |
| GET/POST /api/messages                            | List threads / send a message.                         | Authenticated; block and professor DM settings checked.              |
| POST /api/users/{id}/block                        | Block another user.                                    | Authenticated; enforcement applies to both participants.             |
| GET /api/notifications                            | List current user notifications.                       | Authenticated; recipient only.                                       |
| PATCH /api/notifications/{id}                     | Mark a notification read.                              | Authenticated recipient only.                                        |
| PATCH /api/settings/notifications                 | Update notification preferences.                       | Authenticated owner only.                                            |
| POST /api/admin/import-jobs                       | Start scoped academic data import.                     | Administrator only; validates scope and logs job.                    |
| GET /api/admin/import-jobs/{id}                   | Check import job status.                               | Administrator only; secrets omitted.                                 |
| GET /api/admin/users                              | Find users and roles.                                  | Administrator only; minimal personal fields.                         |
| PATCH /api/admin/users/{id}/roles                 | Grant/revoke permitted roles.                          | Administrator only; audit logged.                                    |
| GET /api/admin/audit-events                       | Review security/moderation audit events.               | Administrator only; restricted metadata.                             |
