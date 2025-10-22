# 🏪 ProtiMart Seller Portal

A modern **AI-assisted Seller Portal** for the **ProtiMart Marketplace**, enabling sellers to manage KYC, product listings, inventory, orders, payouts, and analytics — all in one place.

🌐 **Project URL:** [ProtiMart on Lovable](https://lovable.dev/projects/15676691-8142-4a63-b0aa-bb17541e3611)  
📦 **Version:** 1.0  
🗓 **Last Updated:** October 22, 2025  
🎨 **Theme:** Light (Default)

---

## 📘 Table of Contents
- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Setup & Running](#setup--running)
- [Environment Variables](#environment-variables)
- [Coding Standards](#coding-standards)
- [Color Standards](#color-standards)
- [Component Guidelines](#component-guidelines)
- [API & Backend](#api--backend)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact / Support](#contact--support)

---

## 🚀 Project Overview

**ProtiMart Seller Portal** is designed to empower sellers with smart, AI-driven tools for managing their marketplace presence.  

### ✨ Key Features
- **AI-powered KYC Verification** (OCR + document parsing)
- **AI Product Autofill** for instant product data entry
- **Inventory Management** with real-time low-stock alerts
- **Order & Return Management** with tracking
- **Earnings Dashboard** with payouts and summaries
- **Chatbot & Voice Assistant** for instant seller help
- **Analytics Dashboard** with sales graphs and P&L insights

---

## 📂 Folder Structure

/seller-app
├── .next/
├── node_modules/
├── public/
│ ├── images/
│ ├── audio/ # Chatbot voice/sound effects
│ └── favicon.ico
├── src/
│ ├── app/
│ │ ├── (auth)/
│ │ │ ├── login/
│ │ │ ├── signup/
│ │ │ ├── kyc/
│ │ │ │ ├── page.tsx
│ │ │ │ └── _components/KycFormSteps.tsx
│ │ │ └── reset/
│ │ ├── (dashboard)/
│ │ │ ├── overview/page.tsx
│ │ │ ├── listings/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── add/page.tsx
│ │ │ │ ├── [productId]/page.tsx
│ │ │ │ ├── drafts/page.tsx
│ │ │ │ └── bulk-upload/page.tsx
│ │ │ ├── inventory/page.tsx
│ │ │ ├── orders/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── [id]/page.tsx
│ │ │ │ └── returns/page.tsx
│ │ │ ├── earnings/page.tsx
│ │ │ └── account/settings/page.tsx
│ │ └── global-error.tsx
│ ├── components/
│ ├── common/
│ │ └── ChatWidget.tsx
│ ├── modules/
│ │ ├── auth/
│ │ ├── listings/
│ │ ├── inventory/
│ │ ├── orders/
│ │ ├── earnings/
│ │ ├── analytics/
│ │ └── notifications/
│ ├── ui/
│ ├── lib/
│ │ ├── prismaClient.ts
│ │ ├── supabaseClient.ts
│ │ ├── redisClient.ts
│ │ ├── kycApi.ts
│ │ ├── payoutGatewayApi.ts
│ │ ├── supabaseStorage.ts
│ │ ├── constants.ts
│ │ ├── utils.ts
│ │ └── validators.ts
│ ├── styles/
│ │ └── globals.css
├── prisma/
│ └── schema.prisma
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn-ui |
| **State Management** | Redux Toolkit |
| **Database** | PostgreSQL (via Prisma ORM on Supabase) |
| **Caching** | Redis (ioredis) |
| **Testing** | Jest + React Testing Library + Playwright |
| **Auth** | Supabase Auth |
| **AI Services** | OCR/AI Autofill (KYC + Product Data) |
| **Chatbot** | Text + Voice (Speech-to-Text + TTS) |

---

## ⚙️ Setup & Running

### 🧩 Prerequisites
Ensure you have **Node.js** and **npm** installed.  
You can install Node via **nvm**:  
👉 [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### 🔧 Steps

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd seller-app

# Install dependencies
npm install

# Start the development server
npm run dev

# Run Prisma migrations
npx prisma migrate dev
🔐 Environment Variables

Create a .env file in the project root:

DATABASE_URL="postgresql://postgres:password@db.supabase.co:5432/postgres"
REDIS_URL="redis://default:password@redis-host:port"
SUPABASE_URL=<SUPABASE_URL>
SUPABASE_KEY=<SUPABASE_KEY>

🧩 Coding Standards
Category	Convention
Language	TypeScript (strict mode)
Components	Functional Components with Hooks
Props/State	PascalCase interfaces (e.g., ProductType)
Folders	kebab-case (e.g., user-auth/)
Components	PascalCase (e.g., ProductCard.tsx)
Utilities	lowercase (e.g., utils.ts)
Functions	camelCase (e.g., handleClick)
Variables	camelCase (e.g., userName)
Constants	UPPER_SNAKE_CASE (e.g., API_URL)
Hooks	Prefix with use (e.g., useAuth)

All forms, buttons, and interactive components meet WCAG AA accessibility standards.

🎨 Color Standards
Variable	Hex	Usage
--primary	#ed1f5d	Buttons, CTAs, active links
--primary-dark	#c91a52	Button hover states
--primary-text	#ffffff	Text on primary backgrounds
--background	#f0f0f0	Main background
--card	#fcfcfc	Cards, modals
--text	#1a1a1a	Main text
--text-muted	#6b6b6b	Secondary text
--border	#e8e8e8	Dividers, borders
Example
<div className="bg-card border border-border text-text p-4 rounded-lg shadow-light">
  Product Card
</div>

<button className="bg-primary text-primary-text hover:bg-primary-dark px-4 py-2 rounded">
  Add to Cart
</button>

🧱 Component Guidelines

Product Cards: Include price, discount badge, health score, allergens.

Forms: Multi-step KYC with AI autofill and clear focus states.

Analytics Graphs: Standardized colors and hover tooltips.

Chatbot: Floating button, voice + text input, subtle animations.

🖥️ API & Backend

API Routes: REST-style via Next.js App Router

Validation: Zod Schemas (validators.ts)

Database: Prisma ORM (PostgreSQL)

Caching: Redis (Analytics & Sessions)

Services:

AI (OCR + Autofill)

Payout Gateway

Notification Service

🚀 Deployment

Open the Lovable Dashboard

Click Share → Publish

(Optional) Connect a custom domain via:
Project → Settings → Domains → Connect Domain

📘 Lovable Docs: Setting up a Custom Domain

🤝 Contributing

Clone the repo & install dependencies

Follow the coding and color standards

Run tests before submitting PRs:

npm run test


Ensure accessibility and responsiveness

Submit a PR with a clear, descriptive summary

📧 Contact / Support

Maintainer: daliasen16@gmail.com

ProtiMart Seller Portal — Empowering sellers with AI, simplicity, and insights.


---

Would you like me to include **badges** (e.g., build status, license, version, Node version, etc.) at the top for GitHub polish?  
I can also generate a **compact README** variant for your Lovable project dashboard.
