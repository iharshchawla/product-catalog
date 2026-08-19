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

---

## Step 3: Created Custom Hooks

### `useProducts`

Created a custom `useProducts` hook to encapsulate the Apollo Client product-list query.  Returns `products`, `loading`, and `error`.

### `useProduct`

Created a custom `useProduct` hook for fetching an individual product by ID.

### `useDebounce`

Created a reusable generic `useDebounce` hook for the product search input. Delays updating the search value until the user stops typing.

---

## Step 4: Created Presentational (Dumb) Components

Created the initial reusable UI components for the product catalog:

- **`SearchBar.tsx`** — Controlled input for product name search. It receives `value` and `onChange` through props and does not keep its own state or handle debouncing. The debounce logic is handled by the `useDebounce` hook in the parent.

- **`CategoryFilter.tsx`** — Controlled dropdown for selecting a category. The category options are passed through props instead of being hardcoded, so the component does not depend on where the category data comes from.

- **`ProductList.tsx`** — Renders the virtualized product list using the `List` component from `react-window` v2 (`rowComponent`, `rowCount`, and `rowHeight`). It handles loading, error, and empty states and delegates the rendering of each row to `ProductListItem`.

- **`ProductListItem.tsx`** — Renders an individual product row. It is wrapped with `React.memo` to avoid unnecessary re-renders when the row's props have not changed.

**Design note:** Category filtering is handled server-side by passing the selected category as a GraphQL variable. Name search is handled on the client using the already-fetched product list through `useProductFilter`. Category changes trigger a new query, while the search stays client-side so we do not make an API request for every character typed, even with debouncing.

---

## Step 6: Product Detail Modal (Compound Component)

Implemented the product detail modal using the compound component pattern:

`ProductDetailModal.Root / .Header / .Body / .Footer`

React Context is used internally to share the `onClose` handler between the modal sub-components, avoiding the need to pass the same props through each level.

- Clicking the overlay closes the modal, while clicking inside the modal content keeps it open. This is handled using event propagation control.
- `Root` returns `null` when the modal is closed, so the modal content is not rendered or mounted until it is opened.