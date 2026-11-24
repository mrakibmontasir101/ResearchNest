# Use case descriptions

These match the [use case diagram](../img/use-case-diagram.png), SRS Table 5.1 and the RTM.

## UC001: Manage account and roles

- **Primary actors:** Visitor, Student, Administrator
- **Description:** A visitor creates an account, verifies the email, signs in and out, resets a password, manages settings, or deletes the account. Administrators grant extra roles.
- **Requirements:** FR-ACC-01 to FR-ACC-08

## UC002: Manage student profile

- **Primary actors:** Student
- **Description:** The student records research interests, education, skills, papers, target countries and degree, which are used for matching.
- **Requirements:** FR-STU-01 to FR-STU-04

## UC003: Search, rank and shortlist

- **Primary actors:** Visitor, Student
- **Description:** The user types a research interest. The system ranks professors, labs, universities, papers and positions, explains each match, applies filters, and lets the student save professors.
- **Requirements:** FR-SEA-01 to FR-SEA-08

## UC004: View professor profile

- **Primary actors:** Visitor, Student
- **Description:** The user opens a professor page showing topics, papers, lab, recruiting status with source and date, and reply statistics when the privacy threshold is met.
- **Requirements:** FR-PRO-01 to FR-PRO-06

## UC005: View lab page

- **Primary actors:** Visitor, Student
- **Description:** The user opens a lab page showing description, members, research areas, recruiting and funding information with sources, and the Q&A section.
- **Requirements:** FR-LAB-01 to FR-LAB-05

## UC006: View university page

- **Primary actors:** Visitor, Student
- **Description:** The user opens a university page showing its details and the professors and labs known to ResearchNest.
- **Requirements:** FR-UNI-01 to FR-UNI-03

## UC007: Import and refresh academic data

- **Primary actors:** Administrator, OpenAlex API
- **Description:** An administrator starts or schedules a scoped import. The worker fetches data from OpenAlex, stores it with source IDs and timestamps, and keeps the last good data if the import fails.
- **Requirements:** FR-DAT-01 to FR-DAT-08

## UC008: Suggest edits and view edit history

- **Primary actors:** Student, Trusted Editor
- **Description:** A user suggests a change to a profile field with a source link. Trusted editors and owners publish directly; other edits wait for approval. Everyone can see the edit history.
- **Requirements:** FR-EDT-01 to FR-EDT-06

## UC009: Approve edits and moderate reports

- **Primary actors:** Verified Professor, Administrator
- **Description:** The reviewer opens the queue, approves or rejects edits, handles reported content, and can roll back changes. Every decision is logged.
- **Requirements:** FR-MOD-01 to FR-MOD-07

## UC010: Claim professor profile or lab membership

- **Primary actors:** Verified Professor, Verified Lab Member
- **Description:** The user requests a claim with a university email, confirms the code, and receives a verified badge. Unclear cases go to manual review.
- **Requirements:** FR-CLM-01 to FR-CLM-05

## UC011: Ask, answer and upvote lab questions

- **Primary actors:** Student, Verified Lab Member
- **Description:** A student asks a question on a lab page. Verified lab members answer with a badge and their answers appear first. Users upvote useful answers once.
- **Requirements:** FR-QA-01 to FR-QA-06

## UC012: Track applications and reply statistics

- **Primary actors:** Student
- **Description:** The student records each professor contacted, the status, private notes, deadlines and tasks, and can export the list. Outcomes contribute anonymously to reply statistics.
- **Requirements:** FR-APP-01 to FR-APP-08

## UC013: Publish posts, follow and message

- **Primary actors:** Student, Verified Professor, Verified Lab Member
- **Description:** Verified users publish position and lab-news posts; students publish seeking posts. Users follow others, read the feed, and send direct messages with block and report.
- **Requirements:** FR-SOC-01 to FR-SOC-13

## UC014: Receive notifications

- **Primary actors:** Student (all registered users)
- **Description:** The system notifies users about matching positions, followed updates, answers, edit decisions, deadlines and messages, according to their preferences.
- **Requirements:** FR-NOT-01 to FR-NOT-06

## UC015: Administer users and operations

- **Primary actors:** Administrator
- **Description:** The administrator manages users and roles, disables abusive accounts, monitors imports, and reviews the audit log.
- **Requirements:** FR-ADM-01 to FR-ADM-05
