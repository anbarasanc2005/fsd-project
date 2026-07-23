# Smart Gadgets Store — React + Material UI

This is a full React conversion of the old static HTML/Tailwind "Smart Gadgets" site.
All the original content (copy, offers, testimonials, achievements, pricing, footer
info, form validation rules) has been preserved and rebuilt using **Material UI (MUI)**
components, with clean React patterns (hooks, context, protected routes).

## Pages (5, as requested)

| Route        | Page       | Notes |
|--------------|------------|-------|
| `/`          | Home       | Protected — redirects to `/login` if not signed in (mirrors the old `home.html` guard) |
| `/about`     | About      | Mission, vision, values, achievements, why-choose-us |
| `/products`  | Products   | Category grid + featured products table |
| `/login`     | Login      | Email/password sign-in |
| `/register`  | Register   | New account creation |

## Multi-user auth (useState + Context, no backend)

- `src/context/AuthContext.jsx` holds a `users` array in React state (persisted to
  `localStorage` under `sg_users`) — this is your **multi-user store**. Every person
  who registers gets pushed into that array.
- `register()` checks the array for a duplicate email, then adds the new user.
- `login()` looks the entered email up in the array and checks the password.
- `currentUser` (also state, persisted under `sg_currentUser`) tracks who's signed in.
- A demo account is seeded automatically: `demo@smartgadgets.com` / `Demo@1234`
  (same as the old site).

This is intentionally framework-free (no server) so it runs anywhere — swap
`AuthContext` for real API calls later without touching the pages, since components
only ever call `login()` / `register()` / `logout()` from the context.

## Folder structure

```
reactproj/
├── public/
│   ├── index.html
│   └── images/              # product photos carried over from the old site
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # header + nav, shows Login/Register or Welcome+Logout
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx   # multi-user register/login state
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Product.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── theme/
│   │   └── theme.js          # MUI theme using the old site's blue/indigo palette
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Running it

```bash
npm install
npm start
```

Opens at http://localhost:3000. Register a new account, then log in with it — or
use the demo account above. Try registering a second, different user to see the
multi-user list grow (open dev tools → Application → Local Storage → `sg_users`).

## Build for production

```bash
npm run build
```
