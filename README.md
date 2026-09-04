# Recipefy

A clean, minimal recipe manager built with React — create, organize, search, sort, and favorite your recipes, all running entirely in the browser.

<!-- Add a screenshot or banner image here, e.g. ![Recipefy screenshot](./docs/banner.png) -->

## Features

- **Browse & search** — full recipe grid with live search and category filtering (Breakfast, Lunch, Supper, Dinner)
- **Sort** — newest first, oldest first, or alphabetically (A–Z / Z–A)
- **Create & edit** — recipes with dynamic ingredient and instruction lists, real form validation, prep time, servings, and difficulty
- **Favorites** — save recipes you love, with a dedicated favorites view
- **Responsive** — works cleanly from mobile to desktop
- **No backend required** — recipe data persists locally via `localStorage`

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/) for routing
- [React Hook Form](https://react-hook-form.com/) for form handling & validation
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [RemixIcon](https://remixicon.com/) for icons
- [nanoid](https://github.com/ai/nanoid) for unique IDs

## Getting Started

```bash
git clone <your-repo-url>
cd recipe-app
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (or the next available port).

## Project Structure

```
src/
├── components/     # Navbar, RecipeCard, Footer
├── context/        # RecipeContext — recipe data & CRUD logic
├── pages/          # Home, Recipe, SingleRecipe, Create, Favourite, About, PageNotFound
├── routes/         # Route definitions
└── assets/
```

## Live Demo

<!-- Add your deployed link here once it's live, e.g. https://recipefy.vercel.app -->

## Screenshots

<!-- Add a few screenshots: home page, recipe grid, recipe detail, create form -->

---

Built by [Sahil Shaikh](https://github.com/SahilShaikh-Developer)
