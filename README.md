# Product Catalog — Mott MacDonald

This README documents the main implementation decisions made during the assignment and how they map to the requirements.

---

## Step 1: Project Initialization & Package Installation

### Why Vite instead of Create React App?

I used Vite instead of Create React App since CRA is deprecated for new React applications. Vite provides a lightweight and fast development and build setup for React and TypeScript.

### Core Technology & Dependencies

- **React + TypeScript + Vite** — Core frontend stack with strict TypeScript checking.
- **Apollo Client + GraphQL** — Used to consume the mock GraphQL API and manage server-side data and caching.
- **Zustand** — Used for shared client-side state such as category, search and selected product.
- **react-window** — Used for virtualizing the product list as required by the performance requirements.
- **Jest + React Testing Library** — Used for unit and integration testing as required by the assignment.
- **jest-environment-jsdom** — Provides the DOM environment required for React component tests.
- **ts-jest + @types/jest** — Used for TypeScript-based Jest tests and type support.
- **@testing-library/user-event** — Used to test user interactions such as typing and clicking.
- **ESLint + TypeScript ESLint + React Hooks ESLint** — Used for linting, TypeScript checks and React Hooks rules.
- **Prettier + eslint-config-prettier** — Used for consistent formatting and to avoid ESLint/Prettier conflicts.
- **Husky + lint-staged** — Used to run code-quality checks on staged files before commits.
- **TypeScript** — Configured with strict type checking.

### Testing Tooling Decision

Vitest was initially considered because it integrates well with Vite. However, the assignment specifically requires **Jest + React Testing Library**, so Jest was used and configured for the TypeScript/React setup.

---

## Step 2: Mock GraphQL API & Apollo Client

### Mock GraphQL Server

Created a local GraphQL mock server using **GraphQL Yoga**.

The server can be started with:

```bash
node server.js
```

The API is available at:

```text
http://localhost:4000/graphql
```

The server implements the required `Product` type and the `products` and `product` queries from the assignment.

Apollo Client was configured in the React application to consume the mock GraphQL API and manage the returned server data.

---

## Step 3: Custom Hooks

### `useProducts`

Created a custom hook to handle the product-list GraphQL query. It keeps the Apollo query logic outside the UI components and returns `products`, `loading` and `error`.

### `useProduct`

Created a custom hook to fetch an individual product by ID for the product detail modal.

### `useDebounce`

Created a reusable generic debounce hook for the search input. It delays the search value update until the user stops typing.

### `useProductFilter`

Created a custom hook to filter the fetched product list by product name. Search is case-insensitive and is performed on the client using the debounced search value.

**Filtering approach:** Category filtering is handled server-side using the GraphQL `category` variable, while name search is handled client-side. This avoids making a GraphQL request for every search input change.

---

## Step 4: Presentational Components

Created reusable components with separate responsibilities:

- **`SearchBar.tsx`** — Controlled input for product name search. It receives `value` and `onChange` through props and does not contain search or debounce logic.
- **`CategoryFilter.tsx`** — Controlled category dropdown. Category options are passed through props rather than being hardcoded.
- **`ProductList.tsx`** — Renders the virtualized product list using the `react-window` v2 `List` API. Handles loading, error and empty states.
- **`ProductListItem.tsx`** — Renders an individual product row and uses `React.memo` to avoid unnecessary re-renders when its relevant props have not changed.

---

## Step 5: Product Detail Modal

Implemented the product detail modal using the compound component pattern:

`ProductDetailModal.Root / .Header / .Body / .Footer`

React Context is used internally to share the modal actions between the compound components without passing the same props through each level.

- Clicking the overlay closes the modal, while clicking inside the modal content keeps it open.
- `Root` returns `null` when the modal is closed, so the modal content is not mounted until it is opened.

---

## Step 6: Global State (Zustand)

I used Zustand for shared client-side state and kept Apollo Client responsible for server-side product data.

- **Product list** — Kept in Apollo Client's cache. It is already globally available through Apollo, so duplicating it in Zustand would create another source of truth.
- **Selected category** — Stored in Zustand.
- **Search query** — Stored in Zustand.
- **Selected product** — Stored in Zustand and used to control the product detail modal.
- **Loading/error** — Kept with Apollo's `loading` and `error` states instead of duplicating them in Zustand.

`src/store/catalogStore.ts` contains the shared state and setter functions.

This keeps server state and client/UI state separate without duplicating the product data.

---

## Step 7: Tailwind CSS & Responsive Design

Added **Tailwind CSS** for component styling and responsive layouts.

The catalog was updated to work across desktop, tablet and mobile screen sizes.

- **`SearchBar.tsx`** — Adapts to the available width on smaller screens.
- **`CategoryFilter.tsx`** — Works alongside the search input on larger screens and stacks on smaller screens.
- **`ProductList.tsx` / `ProductListItem.tsx`** — Responsive spacing and sizing while retaining list virtualization.
- **Product detail modal** — Uses responsive sizing to fit smaller viewports without overflowing.

Tailwind's responsive utility classes are used with a mobile-first approach rather than relying on fixed dimensions.

---

## Step 8: Performance Optimisation

Implemented the performance requirements from the assignment:

- **Debounced search** — Prevents filtering work on every keystroke.
- **`React.memo`** — Used for product rows to reduce unnecessary re-renders.
- **`react-window`** — Used to virtualize the product list so only the visible rows need to be rendered.
- **Lazy loading / code splitting** — The product detail modal is loaded separately so it does not need to be included in the initial application bundle.
- **Memoised derived data** — Product filtering and other derived values are calculated only when their relevant inputs change.

The mock data set was also expanded so that the virtualized list can be meaningfully exercised during development and testing.

---

## Step 9: Security & Dependency Checks

Added a basic security and dependency review as part of the implementation.

- Avoided direct HTML injection APIs such as `dangerouslySetInnerHTML`.
- User input is treated as text and is not executed as HTML.
- TypeScript strict checking is enabled.
- Dependencies were reviewed and an npm audit was run to identify known vulnerabilities.
- No application secrets or credentials are stored in the source code.

The application does not require any authentication or sensitive user data for this assignment.
