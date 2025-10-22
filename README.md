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

**ProtiMart Seller Portal** empowers sellers with smart, AI-driven tools to manage their marketplace presence efficiently.

### ✨ Key Features
- **AI-powered KYC Verification** (OCR + document parsing)
- **AI Product Autofill** for instant product entry
- **Inventory Management** with real-time low-stock alerts
- **Order & Return Management** with tracking
- **Earnings Dashboard** with payout summaries
- **Chatbot & Voice Assistant** for seller support
- **Analytics Dashboard** with sales insights and P&L graphs

---

## 📂 Folder Structure

```bash
/seller-app
├── .next/
├── node_modules/
├── public/
│   ├── images/
│   ├── audio/                     # Chatbot voice/sound effects
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── kyc/
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/KycFormSteps.tsx
│   │   │   └── reset/
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── overview/page.tsx
│   │   │   ├── listings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── add/page.tsx
│   │   │   │   ├── [productId]/page.tsx
│   │   │   │   ├── drafts/page.tsx
│   │   │   │   └── bulk-upload/page.tsx
│   │   │   ├── inventory/page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── returns/page.tsx
│   │   │   ├── earnings/page.tsx
│   │   │   └── account/settings/page.tsx
│   │   │
│   │   └── global-error.tsx
│   │
│   ├── components/
│   ├── common/
│   │   └── ChatWidget.tsx
│   ├── modules/
│   │   ├── auth/
│   │   ├── listings/
│   │   ├── inventory/
│   │   ├── orders/
│   │   ├── earnings/
│   │   ├── analytics/
│   │   └── notifications/
│   ├── ui/
│   ├── lib/
│   │   ├── prismaClient.ts
│   │   ├── supabaseClient.ts
│   │   ├── redisClient.ts
│   │   ├── kycApi.ts
│   │   ├── payoutGatewayApi.ts
│   │   ├── supabaseStorage.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── validators.ts
│   ├── styles/
│   │   └── globals.css
│
├── prisma/
│   └── schema.prisma
│
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md

🧠 Tech Stack
Layer	Technology
Framework	Next.js 15 (App Router)
Language	TypeScript
Styling	Tailwind CSS + shadcn-ui
State Management	Redux Toolkit
Database	PostgreSQL (via Prisma ORM on Supabase)
Caching	Redis (ioredis)
Testing	Jest + React Testing Library + Playwright
Authentication	Supabase Auth
AI Services	OCR/AI Autofill (KYC + Product Data)
Chatbot	Text + Voice (Speech-to-Text + TTS)

⚙️ Setup & Running
🧩 Prerequisites
Ensure you have Node.js and npm installed.
You can install Node via nvm:
👉 Install nvm

🔧 Steps

# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd seller-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Run Prisma migrations
npx prisma migrate dev

🔐 Environment Variables
Create a .env file in the project root directory with the following content:
env
DATABASE_URL="postgresql://postgres:password@db.supabase.co:5432/postgres"
REDIS_URL="redis://default:password@redis-host:port"
SUPABASE_URL=<SUPABASE_URL>
SUPABASE_KEY=<SUPABASE_KEY>

🧩 Coding Standards
Category	Convention
Language	TypeScript (strict mode)
Components	Functional components with Hooks
Props/State	PascalCase interfaces (e.g., ProductType)
Folders	kebab-case (e.g., user-auth/)
Component Files	PascalCase (e.g., ProductCard.tsx)
Utilities	lowercase (e.g., utils.ts)
Functions	camelCase (e.g., handleClick)
Variables	camelCase (e.g., userName)
Constants	UPPER_SNAKE_CASE (e.g., API_URL)
Hooks	Prefix with use (e.g., useAuth)

All forms, buttons, and interactive components conform to WCAG AA accessibility standards.

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

Example Usage:

tsx
Copy code
<div className="bg-card border border-border text-text p-4 rounded-lg shadow-light">
  Product Card
</div>

<button className="bg-primary text-primary-text hover:bg-primary-dark px-4 py-2 rounded">
  Add to Cart
</button>
🧱 Component Guidelines
Product Cards: Show price, discount badge, health score, and allergen info.

Forms: Use multi-step layouts with AI autofill and focus highlights.

Analytics Graphs: Maintain standardized colors and hover tooltips.

Chatbot: Floating action button with text and voice input; subtle animations.

🖥️ API & Backend
Architecture: REST-style routes via Next.js App Router

Validation: Zod schemas (validators.ts)

ORM: Prisma (PostgreSQL)

Caching: Redis for analytics and sessions

Integrated Services:

AI (OCR + Autofill)

Payout Gateway

Notification Service

🚀 Deployment
Open the Lovable Dashboard

Click Share → Publish

(Optional) Connect a custom domain:
Project → Settings → Domains → Connect Domain

📘 Read Lovable Docs on Custom Domains

🤝 Contributing
Clone the repository and install dependencies.

Follow the coding and color conventions.

Run tests before committing:
npm run test
Ensure accessibility and responsive design.

Submit a PR with a clear, descriptive summary.

📧 Contact / Support
Maintainer: daliasen16@gmail.com

🧬 ProtiMart Seller Portal — Empowering sellers with AI, simplicity, and insights.
