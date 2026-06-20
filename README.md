# AStar Flashcards

AStar Flashcards is an AI-powered study application that helps users turn notes, textbook content, or pasted study material into organized flashcard sets. The app uses OpenAI to generate flashcards and quizzes, Clerk for authentication, Firebase Firestore for persistent user data, and Stripe for paid subscription checkout.

![Project Type](https://img.shields.io/badge/Project-AI%20Study%20App-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai)
![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?logo=stripe)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Skills Demonstrated](#skills-demonstrated)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Code Breakdown](#code-breakdown)
- [Application Workflow](#application-workflow)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)

---

## Project Overview

AStar Flashcards is a full-stack web application built to make studying faster and more personalized. Users can sign in, paste study material, generate AI flashcards, save flashcard sets to their account, review cards with a flip-card interface, and generate quizzes from their saved material. The project also includes subscription-based pricing using Stripe, allowing the application to support different user tiers.

This project highlights practical experience with AI integration, serverless API routes, user authentication, database design, payment processing, reusable React components, and responsive UI development.

---

## Key Features

### AI Flashcard Generation

Users can enter study text, and the app sends that text to a Next.js API route powered by OpenAI. The API returns structured JSON containing generated flashcards with front and back content.

### AI Quiz Generation

The app can convert saved flashcards into multiple-choice quiz questions. A separate OpenAI API route formats flashcard content into quiz-style questions and answers.

### User Authentication

Clerk is used to manage sign-in, sign-up, user sessions, and route-level authentication middleware. Signed-out users are redirected away from protected pages such as flashcard generation and saved flashcard views.

### Firestore Data Storage

Firebase Firestore stores user accounts, saved flashcard sets, generated cards, timestamps, subscription tiers, and Stripe subscription data.

### Saved Flashcard Library

Users can view their saved flashcard sets in a folder-style interface. Flashcard sets are queried from Firestore and displayed in order by timestamp.

### Interactive Study Mode

Saved flashcards can be opened in a dedicated study page with card flipping, previous/next navigation, and a countdown timer for study sessions.

### Stripe Subscription Checkout

The app includes Stripe Checkout integration for paid tiers such as Silver and Gold. Checkout sessions are created through server-side API routes, and Stripe webhook events update the user’s tier in Firestore.

### Responsive UI Components

The interface uses Material UI, custom CSS, reusable cards, navigation components, pricing cards, and animated backgrounds to create a polished study experience.

---

## Skills Demonstrated

This project demonstrates experience with:

- Full-stack web development with Next.js and React
- Building client-side pages with React hooks such as `useState` and `useEffect`
- Creating serverless API routes in the Next.js App Router
- Integrating OpenAI for structured AI-generated content
- Parsing and handling JSON responses from AI models
- User authentication and protected routes with Clerk
- Firebase Firestore database reads, writes, subcollections, and batched writes
- Stripe Checkout session creation and subscription management
- Webhook handling for Clerk and Stripe events
- State management for flashcards, quizzes, timers, dialogs, and card flipping
- Reusable component design with React props
- Responsive UI development using Material UI and CSS
- Environment variable configuration for secure API keys
- Client/server separation in a modern React application
- Debugging asynchronous workflows across frontend, backend, and external APIs

---

## Tech Stack

### Frontend

- Next.js 14
- React 18
- JavaScript
- Material UI
- CSS Modules and custom CSS
- Framer Motion
- Lucide React icons
- Material UI icons

### Backend and APIs

- Next.js API routes
- OpenAI API
- Firebase Firestore
- Clerk authentication
- Stripe Checkout and subscriptions

### Tooling

- ESLint
- PostCSS
- Tailwind CSS configuration
- Vercel Analytics
- npm scripts for development, build, start, and lint

---

## Project Architecture

```txt
Project-4-AI-Flashcards-master/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   ├── generateQuiz/
│   │   ├── checkout_session/
│   │   ├── cancel_subscription/
│   │   ├── get_user_tier/
│   │   ├── handle_clerk_event/
│   │   └── handle_stripe_event/
│   ├── about/
│   ├── flashcard/
│   ├── flashcards/
│   ├── generate/
│   ├── quiz/
│   ├── result/
│   ├── sign-in/
│   ├── sign-up/
│   ├── firebase.js
│   ├── layout.js
│   └── page.js
├── components/
│   ├── AboutPage/
│   ├── CardsForFlash/
│   ├── SplitButton/
│   ├── clerkForm/
│   ├── infoCard/
│   ├── navbar/
│   └── paidTierCard/
├── middleware.ts
├── package.json
├── tailwind.config.js
└── next.config.mjs
```

---

## Code Breakdown

### `app/page.js`

The landing page introduces AStar Flashcards, displays the main call-to-action buttons, lists product features, and shows pricing cards. It uses Material UI layout components such as `Box`, `Grid`, `Typography`, and `Button`, along with reusable components like `NavBar`, `InfoCard`, and `PaidTierCard`.

**Skills shown:** React component composition, UI layout, Material UI styling, landing page design, reusable components.

---

### `app/generate/page.js`

This page allows authenticated users to paste text and generate flashcards. It manages form input, sends a `POST` request to `/api/generate`, stores the returned flashcards in state, previews generated cards, and saves flashcard sets to Firestore using batched writes.

Important functionality includes:

- Checking whether a user is signed in
- Sending text to the AI generation endpoint
- Managing generated flashcards in React state
- Opening and closing save dialogs
- Saving flashcard sets under each user’s Firestore document
- Redirecting users to their saved flashcard library

**Skills shown:** React hooks, form handling, API requests, Firebase writes, Firestore subcollections, batch operations, protected page logic.

---

### `app/api/generate/route.js`

This API route receives raw text from the frontend and sends it to OpenAI with a system prompt instructing the model to create exactly 10 flashcards. The route requests a JSON object response, parses the AI result, and returns the flashcard array to the client.

**Skills shown:** OpenAI API integration, prompt engineering, serverless API routes, JSON response formatting, backend request handling.

---

### `app/api/generateQuiz/route.js`

This route converts flashcard pairs into multiple-choice quiz questions. It receives text containing question and answer pairs, sends the content to OpenAI, and returns structured quiz data.

**Skills shown:** AI-powered quiz generation, server-side API design, structured prompt formatting, JSON parsing.

---

### `app/flashcards/page.js`

This page displays the user’s saved flashcard sets. It reads from the user’s Firestore document, queries the `flashcardSets` subcollection, orders sets by timestamp, and renders each saved set using a reusable `FileCard` component.

**Skills shown:** Firestore queries, authenticated user data loading, `useEffect`, dynamic rendering, component-based UI.

---

### `app/flashcard/page.js`

This page opens a selected flashcard set using the `id` search parameter. It loads the correct set from Firestore and displays flashcards one at a time using a flip-card interface. It also includes previous/next navigation, a countdown timer, and a button that routes the user to quiz mode.

**Skills shown:** URL query parameters, dynamic data loading, interactive UI state, timers, card animations, routing.

---

### `app/quiz/page.js`

The quiz page loads a selected flashcard set, formats the flashcards into a text prompt, and sends them to the `/api/generateQuiz` endpoint. The returned questions are used to create a quiz-style study experience.

**Skills shown:** AI workflow chaining, data transformation, API communication, quiz generation, state-driven UI updates.

---

### `app/result/page.js`

The result page reads a Stripe Checkout `session_id` from the URL, calls the checkout API route, and displays whether the payment was successful.

**Skills shown:** URL search parameters, async data fetching, loading states, payment result handling.

---

### `app/api/checkout_session/route.js`

This route creates and retrieves Stripe Checkout sessions. On `POST`, it authenticates the user with Clerk, selects a Stripe price ID based on the chosen plan, creates a subscription checkout session, and records the session-to-user mapping in Firestore. On `GET`, it retrieves checkout session details for the result page.

**Skills shown:** Stripe Checkout, subscription payments, Clerk server authentication, Firestore integration, secure backend logic.

---

### `app/api/handle_stripe_event/route.js`

This webhook route handles Stripe payment events. When checkout succeeds, it retrieves invoice data, identifies the purchased price ID, maps the Stripe session back to a Clerk user, updates the user’s subscription tier and subscription ID in Firestore, and removes the temporary session mapping.

**Skills shown:** Stripe webhooks, event-driven backend development, subscription tier mapping, Firestore updates, payment lifecycle handling.

---

### `app/api/handle_clerk_event/route.js`

This webhook route listens for Clerk user creation events and creates a corresponding Firestore user document with default values such as an empty flashcard list and a free tier.

**Skills shown:** Clerk webhooks, user provisioning, backend automation, database initialization.

---

### `app/api/cancel_subscription/route.js`

This route retrieves the current user’s Stripe subscription ID from Firestore and updates the Stripe subscription so it cancels at the end of the billing period.

**Skills shown:** Stripe subscription management, authenticated API routes, backend billing workflows.

---

### `app/api/get_user_tier/route.js`

This route gets the authenticated user’s current tier from Firestore and returns it as JSON. This can be used to control feature access based on subscription level.

**Skills shown:** user-based backend data retrieval, role/tier access logic, Clerk + Firestore integration.

---

### `app/firebase.js`

This file initializes the Firebase application and exports the Firestore database instance used throughout the app.

**Skills shown:** Firebase configuration, Firestore initialization, environment variable usage.

---

### `app/utils/api/firestoreHelper.js`

This helper file centralizes Firestore operations related to user creation, checkout session mapping, tier lookup, and subscription ID lookup. It helps keep API routes cleaner by moving repeated database logic into reusable functions.

**Skills shown:** utility function design, reusable backend helpers, Firestore abstraction.

---

### `app/utils/getStripe.js` and `app/utils/api/getServerStripe.js`

These files create reusable Stripe instances for client-side checkout redirection and server-side Stripe API operations.

**Skills shown:** third-party SDK setup, singleton pattern for client Stripe loading, server/client separation.

---

### `app/utils/getPricingPlans.js`

This file maps user-facing plan names such as `Silver` and `Gold` to Stripe price IDs. It also maps Stripe price IDs back to readable plan names for webhook processing.

**Skills shown:** configuration mapping, payment plan management, maintainable constants.

---

### `middleware.ts`

This file applies Clerk middleware across the application and API routes while excluding static assets and Next.js internals.

**Skills shown:** authentication middleware, route matching, Next.js request protection.

---

### `components/navbar/navbar.js`

The navigation bar displays different UI states depending on whether the user is signed in or signed out. Signed-in users see a drawer menu with links to create flashcards, load saved sets, view the about page, and access their Clerk user button.

**Skills shown:** conditional rendering, authentication-aware UI, drawer navigation, Material UI components.

---

### `components/paidTierCard/paidTierCard.js`

This reusable pricing card displays subscription plan details and starts the Stripe Checkout flow when the user chooses a plan.

**Skills shown:** reusable component props, client-side API calls, Stripe redirect flow, pricing UI.

---

### `components/CardsForFlash/cardsforflash.js`

This component renders saved flashcard sets as folder-style cards with hover behavior and an open button that routes to the selected flashcard set.

**Skills shown:** reusable card components, hover state, dynamic routing, UI interaction.

---

### `components/infoCard/infoCard.js`

This component is used on the landing page to display feature cards with icons, titles, and descriptions.

**Skills shown:** reusable UI components, props, layout consistency.

---

### CSS Files

The project includes several CSS files for page-specific styling, animated backgrounds, flip-card interactions, typewriter effects, timers, and custom card styling.

Examples include:

- `app/typewrite.css`
- `app/generate/text.css`
- `app/flashcard/flashcard.css`
- `app/flashcard/countdowntimer.css`
- `components/navbar/navbar.css`
- `components/CardsForFlash/cardsforflash.css`
- `components/paidTierCard/general.css`

**Skills shown:** custom CSS, animation, visual design, responsive styling, UI polish.

---

## Application Workflow

1. A user visits the landing page.
2. The user signs up or logs in using Clerk.
3. Clerk webhook logic creates a matching Firestore user record.
4. The user goes to the Generate page and enters study material.
5. The frontend sends the text to `/api/generate`.
6. OpenAI returns 10 AI-generated flashcards.
7. The user previews and saves the generated cards.
8. Firestore stores the flashcard set under the authenticated user.
9. The user opens saved sets from the flashcard library.
10. The user reviews cards, flips them, uses the timer, or generates a quiz.
11. If the user purchases a paid plan, Stripe Checkout handles payment.
12. Stripe webhook logic updates the user’s subscription tier in Firestore.

---

## Environment Variables

Create a `.env.local` file in the root of the project and include the required credentials.

```env
OPEN_AI_API_KEY=your_openai_api_key
FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Depending on your Clerk and Stripe webhook setup, you may also need webhook signing secrets or additional provider-specific environment variables.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Project-4-AI-Flashcards-master
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create `.env.local` and add the keys listed in the [Environment Variables](#environment-variables) section.

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the app

Visit:

```txt
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev      # Start the local development server
npm run build    # Build the production application
npm run start    # Start the production server
npm run lint     # Run Next.js linting
```

---

## Future Improvements

- Add stronger validation for OpenAI responses before rendering flashcards or quizzes
- Add loading indicators during flashcard and quiz generation
- Add edit and delete functionality for saved flashcard sets
- Add quiz scoring and result tracking
- Add spaced repetition algorithms for smarter review scheduling
- Add role-based feature limits based on the user’s subscription tier
- Add webhook signature verification for improved Stripe and Clerk security
- Improve mobile responsiveness across study and quiz pages
- Add TypeScript types across the project for stronger maintainability
- Add unit tests for utility functions and integration tests for API routes

---

## Summary

AStar Flashcards is a modern AI-powered study platform that combines frontend development, backend API design, AI-generated content, user authentication, persistent cloud storage, and subscription payments. The project demonstrates the ability to build a full-stack application that integrates multiple real-world services into a practical and interactive learning tool.
