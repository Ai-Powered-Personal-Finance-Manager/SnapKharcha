# 📸 SnapKharcha — AI-Powered Finance Manager

> A final year team project | AI-powered personal & business expense tracking with bill scanning, smart insights, and budget alerts.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

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

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v3 |
| **Fonts** | [Syne](https://fonts.google.com/specimen/Syne) (headings) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (body) via Google Fonts |
| **Icons** | Inline SVG (no icon library dependency) |
| **Images** | [Unsplash](https://unsplash.com/) (placeholder — replace with real screenshots) |
| **Linting** | ESLint (Next.js default config) |

---

## 📁 Project Structure

```
snapkharcha/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts, metadata
│   ├── page.tsx                  # Landing page (assembles all sections)
│   ├── globals.css               # Tailwind base + custom animations
│   ├── not-found.tsx             # 404 page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│   │   └── page.tsx              # Signup page (2-step: type select → form)
│   └── forgot-password/
│       └── page.tsx              # Forgot password (email → OTP → reset → success)
│
├── components/                   # Reusable section components
│   ├── Navbar.tsx                # Sticky nav with scroll effect + mobile menu
│   ├── HeroSection.tsx           # Animated canvas + headline + dashboard preview
│   ├── FeaturesSection.tsx       # 6-feature hover card grid
│   ├── HowItWorksSection.tsx     # 4-step alternating image/text layout
│   ├── BusinessSection.tsx       # Business user section (dark green bg)
│   ├── SocialProofSection.tsx    # Stats + testimonials
│   ├── PricingSection.tsx        # 3-tier pricing with monthly/yearly toggle
│   ├── CTASection.tsx            # Final CTA (green bg)
│   └── Footer.tsx                # Multi-column footer + newsletter
│
├── public/                       # Static assets
├── tailwind.config.js            # Tailwind config with custom colors
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18.0.0` or higher
- [npm](https://www.npmjs.com/) `v9+` or [yarn](https://yarnpkg.com/) `v1.22+`

Check your versions:

```bash
node -v
npm -v
```

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/snapkharcha.git
cd snapkharcha
```

**2. Install dependencies**

```bash
npm install
# or
yarn install
```

**3. Run the development server**

```bash
npm run dev
# or
yarn dev
```

**4. Open in browser**

```
http://localhost:3000
```

The app hot-reloads automatically when you save changes.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root of the project:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SnapKharcha

# Database (add when backend is connected)
DATABASE_URL=

# AI / OCR API (add when bill-snap feature is integrated)
OPENAI_API_KEY=
# or
GOOGLE_VISION_API_KEY=

# Auth (add when authentication is implemented)
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Email (for OTP sending)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

> ⚠️ Never commit `.env.local` to GitHub. It is already listed in `.gitignore`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server (after build) |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🗺 Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Landing page |
| `/login` | `app/login/page.tsx` | User login |
| `/register` | `app/register/page.tsx` | User signup (Personal / Business) |
| `/forgot-password` | `app/forgot-password/page.tsx` | Password reset flow |
| `*` (any unknown) | `app/not-found.tsx` | 404 error page |

---

## 🎨 Color System & Design Tokens

The project uses a consistent design token system defined across all components:

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

Both fonts are loaded via Google Fonts in `app/layout.tsx` — no npm package needed.

---

## 👥 Team

| Name | Role |
|---|---|
| [Your Name] | Project Lead / Frontend |
| [Team Member 2] | Backend / API |
| [Team Member 3] | AI / ML Integration |
| [Team Member 4] | UI/UX Design |

> Update this table with your actual team members.

---

## 🔮 Future Roadmap

Features planned for future development (mentioned in project documentation as add-ons):

- [ ] **Backend API** — Node.js / Django REST API with database integration
- [ ] **AI Bill OCR** — Google Vision API or OpenAI GPT-4 Vision for receipt scanning
- [ ] **Authentication** — NextAuth.js with JWT + Google OAuth
- [ ] **Push Notifications** — Firebase Cloud Messaging for budget alerts
- [ ] **Mobile App** — React Native version for iOS & Android
- [ ] **Bank Integration** — Plaid/Setu API for auto-import of bank transactions
- [ ] **Multi-language** — Hindi + regional language support
- [ ] **Dark Mode** — System-preference-aware dark/light toggle
- [ ] **AI Chatbot** — In-app financial advisor chatbot
- [ ] **Export Reports** — PDF/Excel monthly expense reports
- [ ] **Tax Helper** — Auto-categorize tax-deductible expenses

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

> Final Year Team Project — 2025