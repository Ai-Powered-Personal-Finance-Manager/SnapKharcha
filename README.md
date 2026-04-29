# 📸 SnapKharcha — AI-Powered Finance Manager

> A final year team project | AI-powered personal & business expense tracking with bill scanning, smart insights, and budget alerts.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10.28.2-f69220?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)](LICENSE)

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)
- [API Overview](#api-overview)
- [Color System & Design Tokens](#color-system--design-tokens)
- [Team](#team)
- [Future Roadmap](#future-roadmap)

---

## 📖 About the Project

**SnapKharcha** is an AI-powered personal and business finance manager built as a final year team project. It allows users to:

- Log expenses **manually** with categories
- **Snap a photo** of any bill and let the AI auto-read and categorize it
- Get **AI-generated insights** on spending patterns
- Set **budget limits** and receive alerts before overspending
- Track **savings goals** with progress visualization
- *(Business Mode)* Generate customer invoices, track sales, and view profit & loss summaries

The system supports two user types — **Personal Users** and **Business Users** (restaurants, grocery shops, marts) — each with their own dashboard and features.

**Repository:** [https://github.com/Ai-Powered-Personal-Finance-Manager/SnapKharcha](https://github.com/Ai-Powered-Personal-Finance-Manager/SnapKharcha)

---

## ✨ Features

### 👤 Personal Users
| Feature | Description |
|---|---|
| 📸 Bill Snap | Snap a receipt — AI reads & auto-categorizes it |
| 📊 Spending Dashboard | Charts, pie graphs, trend lines |
| 🔔 Budget Alerts | Real-time notifications when limits are approached |
| 🎯 Savings Goals | Set goals, track progress, get milestone alerts |
| 📁 Manual Entry & Import | Log manually or import CSV/Excel bank statements |
| 🤖 AI Insights | Personalized weekly spending analysis |

### 🏪 Business Users
| Feature | Description |
|---|---|
| 🧾 Invoice Generation | Create branded customer bills in seconds |
| 📈 Sales Analytics | Daily, weekly, monthly revenue tracking |
| 👥 Customer Records | Purchase history per customer |
| 📦 Inventory Alerts | Stock-linked sales data with low-stock warnings |
| 💹 P&L Summaries | Auto-generated Profit & Loss overview |
| 🔔 Business Alerts | Sales drops, high-expense days, tax reminders |

---

## 🛠 Tech Stack

### Monorepo
| Tool | Version | Purpose |
|---|---|---|
| [pnpm](https://pnpm.io/) | `10.28.2` | Package manager & monorepo workspace runner |

### Frontend (`/client`)
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | `16.1.6` | React framework (App Router) |
| [React](https://react.dev/) | `19.2.3` | UI library |
| [TypeScript](https://www.typescriptlang.org/) | `^5` | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | `^4` | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | `^3.8.5` | Pre-built accessible UI components |
| [Radix UI](https://www.radix-ui.com/) | `^1.4.3` | Headless UI primitives |
| [React Hook Form](https://react-hook-form.com/) | `^7.71.2` | Form state management |
| [Zod](https://zod.dev/) | `^4.3.6` | Schema validation (shared with server) |
| [TanStack Query](https://tanstack.com/query) | `^5.90.21` | Server state, caching, API calls |
| [Axios](https://axios-http.com/) | `^1.13.6` | HTTP client |
| [Sonner](https://sonner.emilkowal.ski/) | `^2.0.7` | Toast notifications |
| [Lucide React](https://lucide.dev/) | `^0.576.0` | Icon library |
| [Syne + DM Sans](https://fonts.google.com/) | — | Google Fonts (headings + body) |

### Backend (`/server`)
| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | `>=18` | Runtime |
| [Express](https://expressjs.com/) | `^5.2.1` | HTTP server & routing |
| [PostgreSQL](https://www.postgresql.org/) (`pg`) | `^8.20.0` | Primary database |
| [JWT](https://jwt.io/) (`jsonwebtoken`) | `^9.0.3` | Authentication tokens |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | `^6.0.0` | Password hashing |
| [Zod](https://zod.dev/) | `^4.3.6` | Request validation |
| [Multer](https://github.com/expressjs/multer) | `^2.1.1` | File/image uploads (bill snaps) |
| [XLSX](https://sheetjs.com/) | `^0.18.5` | Excel import/export |
| [Helmet](https://helmetjs.github.io/) | `^8.1.0` | HTTP security headers |
| [CORS](https://github.com/expressjs/cors) | `^2.8.6` | Cross-origin requests |
| [Morgan](https://github.com/expressjs/morgan) | `^1.10.1` | HTTP request logging |
| [dotenv](https://github.com/motdotla/dotenv) | `^17.3.1` | Environment variables |
| [Nodemon](https://nodemon.io/) | `^3.1.14` | Dev auto-restart |

---

## 📁 Project Structure

```
SnapKharcha/                          # Monorepo root
├── package.json                      # Root workspace config (pnpm)
├── pnpm-workspace.yaml               # Declares client & server as workspaces
├── README.md
│
├── client/                           # Next.js frontend
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   │
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout — fonts, metadata
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Tailwind base + animations
│   │   ├── not-found.tsx             # 404 page
│   │   ├── login/page.tsx            # Login page
│   │   ├── register/page.tsx         # Signup (2-step: type → form)
│   │   └── forgot-password/page.tsx  # Password reset flow
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── BusinessSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   │
│   └── public/                       # Static assets
│
└── server/                           # Express backend
    ├── package.json
    ├── .env                          # Environment variables (never commit)
    │
    └── src/
        ├── server.js                 # App entry point
        ├── routes/                   # API route handlers
        ├── controllers/              # Business logic
        ├── middleware/               # Auth, error handling, validation
        ├── models/                   # DB query functions
        └── utils/                    # Helpers (JWT, hashing, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Check |
|---|---|---|
| [Node.js](https://nodejs.org/) | `v18+` | `node -v` |
| [pnpm](https://pnpm.io/installation) | `v10+` | `pnpm -v` |
| [PostgreSQL](https://www.postgresql.org/download/) | `v14+` | `psql --version` |

> **Install pnpm** if you don't have it:
> ```bash
> npm install -g pnpm
> ```

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Ai-Powered-Personal-Finance-Manager/SnapKharcha.git
cd SnapKharcha
```

**2. Install all dependencies** (installs both client & server in one command)

```bash
pnpm install
```

**3. Set up environment variables**

```bash
# Copy the example env file for the server
cp server/.env.example server/.env
```

Then open `server/.env` and fill in your values (see [Environment Variables](#environment-variables)).

**4. Set up the database**

```bash
# Create the PostgreSQL database
psql -U postgres -c "CREATE DATABASE snapkharcha;"

# Run migrations (once migration scripts are added)
# pnpm --filter server db:migrate
```

**5. Run the full stack in development**

```bash
# Runs both client (Next.js) and server (Express) in parallel
pnpm dev
```

Or run them separately:

```bash
# Frontend only — http://localhost:3000
pnpm dev:client

# Backend only — http://localhost:5000
pnpm dev:server
```

---

## 🔑 Environment Variables

Create a `server/.env` file (never commit this to GitHub):

```env
# ── Server ──────────────────────────────────
NODE_ENV=development
PORT=5000

# ── Database (PostgreSQL) ───────────────────
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/snapkharcha
# Or individual fields:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=snapkharcha
DB_USER=postgres
DB_PASSWORD=yourpassword

# ── Authentication ──────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ── CORS ────────────────────────────────────
CLIENT_URL=http://localhost:3000

# ── File Upload ─────────────────────────────
MAX_FILE_SIZE_MB=5
UPLOAD_DIR=uploads/

# ── AI / OCR (for bill snap feature) ────────
OPENAI_API_KEY=
# or
GOOGLE_VISION_API_KEY=

# ── Email / OTP ─────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
```

Create a `client/.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=SnapKharcha
```

> ⚠️ Both `.env` and `.env.local` are already in `.gitignore` — never commit them.

---

## 📜 Available Scripts

### Root (run from `SnapKharcha/`)

| Command | Description |
|---|---|
| `pnpm install` | Install all dependencies for both client & server |
| `pnpm dev` | Run **both** client and server in parallel (development) |
| `pnpm dev:client` | Run frontend only (`localhost:3000`) |
| `pnpm dev:server` | Run backend only (`localhost:5000`) |
| `pnpm build` | Build both client and server for production |
| `pnpm start` | Start both in production mode |

### Client only (run from `client/`)

| Command | Description |
|---|---|
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

### Server only (run from `server/`)

| Command | Description |
|---|---|
| `pnpm dev` | Start with Nodemon (auto-restart on save) |
| `pnpm start` | Start with Node (production) |

---

## 🗺 Pages & Routes

### Frontend Routes (`/client`)

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Landing page |
| `/login` | `app/login/page.tsx` | User login |
| `/register` | `app/register/page.tsx` | Signup — Personal or Business |
| `/forgot-password` | `app/forgot-password/page.tsx` | Password reset (OTP flow) |
| `*` | `app/not-found.tsx` | 404 error page |

### Backend API Endpoints (`/server`) — Planned

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login & get JWT token |
| `POST` | `/api/auth/forgot-password` | Send OTP to email |
| `POST` | `/api/auth/verify-otp` | Verify OTP code |
| `POST` | `/api/auth/reset-password` | Set new password |
| `GET` | `/api/expenses` | Get user's expenses |
| `POST` | `/api/expenses` | Add new expense |
| `POST` | `/api/expenses/snap` | Upload bill image for AI scan |
| `GET` | `/api/insights` | Get AI-generated spending insights |
| `GET` | `/api/budgets` | Get budget limits |
| `POST` | `/api/budgets` | Set/update budget |
| `GET` | `/api/goals` | Get savings goals |
| `POST` | `/api/goals` | Create savings goal |
| `GET` | `/api/business/invoices` | Get business invoices |
| `POST` | `/api/business/invoices` | Generate new invoice |

---

## 🎨 Color System & Design Tokens

| Token | Value | Usage |
|---|---|---|
| **Primary Green** | `#00C950` | CTAs, active states, brand accent |
| **Dark Green** | `#01271E` | Left panels, BusinessSection bg |
| **Hover Green** | `#00b347` | Button hover state |
| **Light Green Tint** | `#f0fdf4` | Card backgrounds, input focus |
| **Green Border** | `#bbf7d0` | Card borders, badge borders |
| **White** | `#ffffff` | Main page background |
| **Gray 50** | `#f9fafb` | Input backgrounds |
| **Gray 900** | `#111827` | Primary text |
| **Gray 500** | `#6b7280` | Secondary / muted text |

### Fonts

```css
/* Headings — Bold, display */
font-family: 'Syne', sans-serif;

/* Body, UI labels, buttons */
font-family: 'DM Sans', sans-serif;
```

Loaded via Google Fonts in `client/app/layout.tsx` — no npm package needed.

---

## 👥 Team

| Name | Role |
|---|---|
| [Your Name] | Project Lead / Frontend |
| [Team Member 2] | Backend / API |
| [Team Member 3] | AI / ML Integration |
| [Team Member 4] | UI/UX Design |

> Update this table with your actual team members and GitHub profiles.

---

## 🔮 Future Roadmap

Features planned as add-ons (documented for project submission):

- [ ] AI Bill OCR — Google Vision API / OpenAI GPT-4 Vision for receipt scanning
- [ ] Push Notifications — Firebase Cloud Messaging for budget alerts
- [ ] Mobile App — React Native version for iOS & Android
- [ ] Bank Integration — Plaid / Setu API for auto-import of transactions
- [ ] Multi-language — Hindi + regional language support
- [ ] Dark Mode — System-preference-aware toggle
- [ ] AI Chatbot — In-app financial advisor
- [ ] PDF/Excel Export — Monthly expense reports
- [ ] Tax Helper — Auto-categorize tax-deductible expenses
- [ ] Two-Factor Authentication — SMS/email 2FA

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

> Built with ❤️ as a Final Year Team Project — 2025  
> [github.com/Ai-Powered-Personal-Finance-Manager/SnapKharcha](https://github.com/Ai-Powered-Personal-Finance-Manager/SnapKharcha)
