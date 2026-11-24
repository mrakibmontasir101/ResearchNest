# Database schema

Copied from SRS Section 4.1. The ER diagram is [er-diagram.png](../img/er-diagram.png).

## 4.1 Database Schema

- PostgreSQL is the authoritative store for ResearchNest accounts, profiles, imported academic records, community changes, applications, posts, messages, notifications and moderation decisions.

- Every imported academic entity should retain its external OpenAlex identifier, source URL where available, last-imported timestamp and provenance status.

- User-generated content is separated from imported data. Community edits are proposed changes until accepted; edit history stores the actor, old/new values, source URL and decision metadata.

- Many-to-many relationships are represented using join tables (for example student interests, professor papers, and lab membership). User-facing identifiers are stable internal primary keys; external identifiers are retained as separate unique fields.

- Sensitive fields such as password hashes, verification tokens, private notes and message bodies shall never be exposed in general public serializers.

### 4.1.1 Core Tables

The table below specifies the core logical schema. Django field types may be adapted to the exact selected package versions, but primary/foreign key relationships, uniqueness constraints, ownership boundaries and workflow state shall be preserved.

| **Table / entity**               | **Principal columns (logical types omitted for readability)**                                                                                           | **Purpose and key rules**                                                                            |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| User                             | id PK; email UNIQUE; password_hash; email_verified; is_active; date_joined                                                                              | One account can have multiple role grants and profile links.                                         |
| UserRole                         | id PK; user_id FK; role; granted_by FK nullable; granted_at; active                                                                                     | Roles: student, professor, lab_member, trusted_editor, admin. Admin is explicitly granted.           |
| StudentProfile                   | id PK; user_id FK UNIQUE; education; skills; target_degree; target_countries                                                                            | One-to-one with User; private/editable by owner.                                                     |
| ResearchInterest                 | id PK; name UNIQUE; category nullable                                                                                                                   | Controlled/reusable research-interest vocabulary.                                                    |
| StudentInterest                  | student_profile_id FK; interest_id FK; weight nullable; composite UNIQUE                                                                                | Many-to-many bridge for student interests.                                                           |
| University                       | id PK; openalex_id UNIQUE nullable; name; country; website; source; updated_at                                                                          | OpenAlex import where supported; URL and provenance stored.                                          |
| ProfessorProfile                 | id PK; openalex_author_id UNIQUE nullable; university_id FK nullable; claimed_by_user_id FK nullable; topics; recruiting_state                          | Public academic profile plus claim/verification metadata; recruiting state has source and freshness. |
| ProfessorPaper                   | professor_id FK; paper_id FK; role/order nullable; composite UNIQUE                                                                                     | Many-to-many professor/author-to-paper relation.                                                     |
| Paper                            | id PK; openalex_work_id UNIQUE; title; doi nullable; publication_date; citation_count nullable; landing_url; abstract nullable; imported_at             | Works/papers imported from OpenAlex when available.                                                  |
| Lab                              | id PK; university_id FK nullable; name; description; research_areas; recruiting_state; funding_note; source_url; last_verified_at                       | Lab details may be curated when no standard OpenAlex lab entity exists.                              |
| LabMembership                    | id PK; lab_id FK; user_id FK; membership_role; verified_at; active                                                                                      | Stores verified current lab membership and badge eligibility.                                        |
| SavedProfessor                   | id PK; student_user_id FK; professor_id FK; created_at; composite UNIQUE                                                                                | Student-owned shortlist entry.                                                                       |
| ApplicationEntry                 | id PK; student_user_id FK; professor_id FK; contacted_at; status; private_notes; updated_at                                                             | Private status tracker; status enum: emailed, replied, interview, accepted, rejected.                |
| ApplicationTask                  | id PK; application_id FK; title; due_at; completed_at; status                                                                                           | Deadlines, reminders and tasks for a student application.                                            |
| ReplyReport / aggregation source | id PK; student_user_id FK; professor_id FK; status; submitted_at; unique student/professor/eligible report rule                                         | Used only for thresholded aggregate reply statistics; no private notes are included.                 |
| EditSuggestion                   | id PK; author_user_id FK; entity_type; entity_id; field_name; proposed_value; source_url; status; reviewer_id FK nullable                               | Status lifecycle: pending, approved, rejected, withdrawn.                                            |
| EditHistory                      | id PK; actor_user_id FK nullable; entity_type; entity_id; field_name; old_value; new_value; source_url; action; created_at                              | Append-only audit history with rollback implemented as a new reverse action.                         |
| ProfileClaim                     | id PK; claimant_user_id FK; entity_type; entity_id; university_email; token_hash; expires_at; status; reviewed_by FK nullable                           | Email verification and optional manual-review decision.                                              |
| Question                         | id PK; lab_id FK; author_user_id FK; body; status; created_at                                                                                           | Lab Q&A question; status supports moderation.                                                        |
| Answer                           | id PK; question_id FK; author_user_id FK; body; status; created_at                                                                                      | Deletion/hide rules are moderated and audited.                                                       |
| AnswerVote                       | id PK; answer_id FK; user_id FK; created_at; composite UNIQUE                                                                                           | One upvote per account per answer.                                                                   |
| Post                             | id PK; author_user_id FK; lab_id FK nullable; post_type; title; research_area; degree; funding; requirements; deadline; how_to_apply; status; posted_at | Position, lab-news, or student-seeking post; type controls required fields.                          |
| Follow                           | id PK; follower_user_id FK; target_type; target_id; created_at; composite UNIQUE                                                                        | Target may be professor, lab or student; enforce valid target type.                                  |
| DirectMessage                    | id PK; sender_user_id FK; recipient_user_id FK; body; sent_at; read_at nullable                                                                         | Accessible only to message participants and authorized moderation workflow.                          |
| UserBlock                        | id PK; blocker_user_id FK; blocked_user_id FK; created_at; composite UNIQUE                                                                             | Blocks messaging in both directions according to the defined policy.                                 |
| ContentReport                    | id PK; reporter_user_id FK; target_type; target_id; reason; status; created_at                                                                          | Distinct reporters are counted toward auto-hide threshold.                                           |
| Notification                     | id PK; recipient_user_id FK; event_type; target_type; target_id; read_at; created_at                                                                    | In-app notification state and notification preference checks.                                        |
| ImportJob                        | id PK; started_by_user_id FK nullable; entity_scope; status; started_at; finished_at; counts; error_summary                                             | Admin-visible job history; secrets are excluded from logs.                                           |
| AuditEvent                       | id PK; actor_user_id FK nullable; event_type; target_type; target_id; metadata JSON; created_at                                                         | Security-sensitive and administrative action log.                                                    |

### 4.1.2 Data Provenance and Status Values

| **Label / status** | **Meaning**                                                           | **Display / processing rule**                                                              |
|--------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Imported           | Value obtained from OpenAlex or another explicit external source.     | Store the source identifier/URL and import timestamp; safely render imported text.         |
| Community edit     | Value accepted through a source-backed community change.              | Retain the edit author, source link, reviewer and history.                                 |
| Verified owner     | Value edited by a verified professor or relevant verified lab member. | Show a verified badge and edit timestamp; preserve prior values in history.                |
| Unknown            | No sufficiently reliable value is available.                          | Do not infer a value; allow filters to treat it as unknown.                                |
| Needs verification | Value exists but is stale, disputed, or lacks current evidence.       | Display freshness state and source date; do not present as confirmed current fact.         |
| Recruiting state   | Open / not recruiting / unknown / needs verification.                 | Only current, source-backed updates may set a confirmed recruiting state.                  |
| Post state         | Open / Closed / Hidden / Removed.                                     | Expired positions are automatically Closed; reported content may be Hidden pending review. |
| Edit status        | Pending / Approved / Rejected / Withdrawn.                            | Each transition is permission-checked and recorded in history.                             |

### 4.1.3 Data Retention and Deletion

Account deletion shall begin with explicit confirmation. The system shall remove or anonymize personal profile data, private application notes/tasks, saved lists and user preferences, and shall prevent future authentication. Direct messages shall follow a documented deletion policy that avoids unnecessarily exposing other participants’ data; where records must be retained for abuse investigation or system integrity, access must remain restricted and retention must be minimized. Audit entries may retain non-content action metadata when needed to preserve the integrity of moderation decisions.
