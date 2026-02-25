# Food App

## Overview
A full-stack React + Express application imported from Figma. Features a food category and item listing interface.

## Project Architecture
- **Frontend**: React 18 with Vite, Tailwind CSS, shadcn/ui components, wouter for routing
- **Backend**: Express.js with TypeScript
- **Shared**: Drizzle ORM schema definitions (shared between client and server)
- **Build**: Vite for frontend bundling, esbuild for server bundling

## Structure
```
client/          - React frontend (Vite root)
  src/
    components/ui/ - shadcn/ui components
    pages/         - Page components (Screem, not-found)
    pages/sections/ - Page section components
    hooks/         - Custom React hooks
    lib/           - Utilities and query client
server/          - Express backend
  index.ts       - Server entry point (port 5000)
  routes.ts      - API route definitions
  storage.ts     - Data storage interface
  vite.ts        - Vite dev server integration
shared/          - Shared types and schemas
  schema.ts      - Drizzle ORM schema (users table)
```

## Running
- Dev: `npm run dev` (starts Express + Vite on port 5000)
- Build: `npm run build`
- Production: `npm start`

## Recent Changes
- Migrated from Figma to Replit environment
