# Product Catalog — Mott MacDonald

This README captures the implementation decisions made during the assignment, along with the reasoning behind them and how they relate to the requirements.

---

## Step 1: Project Initialization & Package Installation

### Why Vite instead of Create React App?

I chose Vite for the project setup instead of Create React App (CRA), as CRA is deprecated for new React applications and Vite provides a lightweight development and build setup.

### Core Technology & Dependencies

- **React + TypeScript + Vite** — Used as the core frontend stack.
- **Apollo Client + GraphQL** — Used to consume the mock GraphQL API and manage server-side data and caching.
- **Zustand** — Used for lightweight global client-side state such as filters and selected product state.
- **react-window** — Used for list virtualization as required by the performance requirements.
- **Jest + React Testing Library** — Used for unit and integration testing as specified in the assignment.
- **jest-environment-jsdom** — Provides the DOM environment required for React component tests.
- **ts-jest + @types/jest** — Used to run TypeScript-based Jest tests with type support.
- **@testing-library/user-event** — Used to test user interactions such as typing, clicking and keyboard actions.
- **ESLint + TypeScript ESLint + React Hooks ESLint** — Used for code quality, TypeScript linting and React Hooks rules.
- **React Refresh ESLint plugin** — Used with the Vite React setup.
- **Prettier + eslint-config-prettier** — Used for consistent formatting and to avoid conflicts between ESLint and Prettier.
- **Husky + lint-staged** — Used to run code-quality checks before committing changes.
- **TypeScript** — Configured with strict type checking.

### Testing Tooling Decision

I initially considered Vitest because it integrates well with Vite. However, the assignment specifically requires **Jest + React Testing Library**, so I decided to use Jest and configured it to work with the project's TypeScript and ESM setup.

---

## Step 2: Mock GraphQL API & Apollo Client

### Mock GraphQL Server

A local GraphQL mock server was created using **GraphQL Yoga**.

The server runs with:
```bash
node server.js
```
