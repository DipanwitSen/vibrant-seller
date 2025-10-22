# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/15676691-8142-4a63-b0aa-bb17541e3611

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/15676691-8142-4a63-b0aa-bb17541e3611) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/15676691-8142-4a63-b0aa-bb17541e3611) and click on Share -> Publish.

ProtiMart Seller Portal

Version: 1.0
Last Updated: October 22, 2025
Theme: Light Theme (Default)

Table of Contents

Project Overview

Folder Structure

Tech Stack

Setup & Running

Coding Standards

Color Standards

Component Guidelines

API & Backend

Deployment

Contributing

Project Overview

ProtiMart is a modern seller portal for a protein marketplace with a fully functional backend and AI-assisted features:

Multi-step KYC Verification with OCR/AI

Product Listing with AI autofill

Inventory Management and low-stock alerts

Order Management with tracking and feedback

Earnings & Payout System

Chatbot & Voice-enabled Assistant

Analytics Dashboard with graphs and P&L summaries

Folder Structure
/seller-app
├── .next/
├── node_modules/
├── public/
│   ├── images/
│   ├── audio/                 # Chatbot voice/sound effects
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (auth)/            # Auth pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── kyc/
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/KycFormSteps.tsx
│   │   │   └── reset/
│   │   ├── (dashboard)/       # Seller dashboard
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
│   │   └── global-error.tsx
│   ├── components/
│   ├── common/                 # Shared UI components
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
├── prisma/
│   └── schema.prisma
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md

Tech Stack

Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS + shadcn-ui

State Management: Redux Toolkit

Database: PostgreSQL via Prisma ORM (Supabase)

Caching: Redis (ioredis)

Linting: ESLint + Prettier

Testing: Jest + React Testing Library + Playwright

Authentication: Supabase Auth

AI: OCR/AI Autofill for KYC & Product

Chatbot: Text + Voice integration

Setup & Running
# Clone the repository
git clone <YOUR_GIT_URL>
cd seller-app

# Install dependencies
npm install

# Start development server
npm run dev

# Prisma migrations
npx prisma migrate dev


Environment Variables (.env):

DATABASE_URL="postgresql://postgres:password@db.supabase.co:5432/postgres"
REDIS_URL="redis://default:password@redis-host:port"
SUPABASE_URL=<SUPABASE_URL>
SUPABASE_KEY=<SUPABASE_KEY>

Coding Standards

Language: TypeScript for type safety

Components: Functional components with hooks

Props/State: PascalCase interfaces (e.g., ProductType)

File Naming:

Folders: kebab-case (user-auth)

Component files: PascalCase (ProductCard.tsx)

Utilities: lowercase (utils.ts)

Functions: camelCase (handleClick)

Variables: camelCase (userName)

Constants: UPPER_SNAKE_CASE (API_URL)

Hooks: Prefix with use (useAuth)

Accessibility: All forms, buttons, and interactive components follow WCAG AA standards

Color Standards

Primary Palette:

Variable	Hex	Usage
--primary	#ed1f5d	Buttons, CTAs, active links
--primary-dark	#c91a52	Button hover states
--primary-text	#ffffff	Text on primary backgrounds
--background	#f0f0f0	Main background
--card	#fcfcfc	Cards, modals
--text	#1a1a1a	Main text
--text-muted	#6b6b6b	Secondary text
--border	#e8e8e8	Dividers, borders

Usage Example:

<div className="bg-card border border-border text-text p-4 rounded-lg shadow-light">
  Product Card
</div>

<button className="bg-primary text-primary-text hover:bg-primary-dark px-4 py-2 rounded">
  Add to Cart
</button>

Component Guidelines

Product Cards: Beautiful UI, hover effect, health score, allergen info, price, discount badge.

Forms: Multi-step KYC, AI autofill, accessible labels, focus states with primary color.

Analytics Graphs: Chart colors standardized, tooltip and hover interactions.

Chatbot: Floating action button, voice and text input, proper shadows.

API & Backend

API Routes: REST-style, Next.js App Router

Validation: Zod schemas (validators.ts)

Database: Prisma ORM with type-safe queries

Caching: Redis for analytics, session storage

Services: AI (OCR, health score), payout gateway, notification service

Deployment

Open Lovable dashboard

Click Share -> Publish

(Optional) Connect custom domain in Project > Settings > Domains

Contributing

Clone repo & install dependencies

Follow coding & color standards

Run tests: npm run test

Submit PR with clear description

Ensure all new components follow accessible design principles

Contact / Support

Email: daliasen16@gmail.com



Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
