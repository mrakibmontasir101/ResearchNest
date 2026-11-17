# ResearchNest

**A platform for discovering research opportunities and connecting students with professors and research labs.**

## About the Project

ResearchNest is a web-based platform designed to make it easier for students to explore academic research opportunities and find professors whose research interests match their own.

Finding a suitable professor or research lab can be difficult, especially when information is spread across different university websites, research profiles, and academic platforms. ResearchNest aims to bring this information together in one place.

The platform allows students to discover professors, explore research labs and universities, browse academic papers, and keep track of their research applications.

This project is being developed as part of a Master's course project.

## Main Features

The platform is designed around the following features:

- **Professor Discovery:** Search and explore professors based on research interests and academic information.
- **Research Labs:** Browse research laboratories and learn about their research activities.
- **University Discovery:** Explore universities and their academic research information.
- **Academic Papers:** Discover research publications and explore academic work.
- **Research Positions:** Browse available research and academic opportunities.
- **Student Profiles:** Create profiles containing academic backgrounds, skills, and research interests.
- **Saved Professors:** Save professors and revisit interesting research profiles.
- **Application Tracker:** Keep track of research applications, statuses, notes, and tasks.
- **Community:** Share information and interact with other users.
- **Messaging and Notifications:** Support communication and updates within the platform.
- **Profile Management:** Manage user information and account preferences.

## Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Planned Backend
- Python
- Django REST Framework
- PostgreSQL

### Academic Data
- OpenAlex API

## Project Structure

```text
ResearchNest/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*The exact folder structure may change as development continues.*

## Getting Started

Follow these steps to run the frontend locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (included with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Installation

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
```

**2. Open the project folder**

```bash
cd ResearchNest
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal. By default, Vite usually uses:

```text
http://localhost:5173
```

## Environment Configuration

The project includes an `.env.example` file.

Create a copy named `.env` in the project root and configure the environment variables when needed.

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_DEMO_MODE=true
```

The current frontend supports a demo mode. Backend integration will be configured as the Django REST API becomes available.

Do not commit private credentials, API keys, or secret environment variables to GitHub.

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build |

## Development Status

The frontend interface and main application screens have been developed. The project currently includes demonstration data and frontend interactions to illustrate the planned functionality.

The backend and database integration are planned as part of the ongoing development process.

Some features currently use demonstration data or local frontend state and are not yet connected to a fully implemented backend.

## Future Development

The next development stages include:

- Implementing the Django REST Framework backend.
- Setting up the PostgreSQL database.
- Connecting frontend features to backend APIs.
- Integrating academic information from OpenAlex.
- Implementing authentication and user authorization.
- Developing the search and professor-matching functionality.
- Testing the application and improving performance and security.

## Project Goal

The main goal of ResearchNest is to make academic research discovery more accessible and organized by helping students find relevant professors, research groups, and opportunities through a single platform.

---

**ResearchNest — Connecting Students with Research Opportunities.**