# ResearchNest backend

Python + Django REST Framework + PostgreSQL, organized as a modular monolith.

| Module | Responsibility |
| --- | --- |
| `accounts` | Users, login, email verification, roles |
| `academics` | Professors, labs, universities, papers, search |
| `claims` | Profile claiming and verification |
| `community` | Community edits, moderation, reports, Q&A |
| `applications` | Application tracker and reply statistics |
| `social` | Posts, follows, direct messages |
| `notifications` | In-app and email notifications |
| `imports` | OpenAlex import jobs |

## Run (Windows)
```
cd src/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```
Edit `.env` (database password and a new `SECRET_KEY`), then:
```
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Check http://127.0.0.1:8000/api/health and http://127.0.0.1:8000/admin.
