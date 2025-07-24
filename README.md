# HomeFinder

A modern, full-featured real estate platform built with Next.js, React, and TypeScript. HomeFinder enables users to search, buy, sell, and manage properties with a beautiful, responsive UI and robust role-based access control.

---

## Table of Contents

- [HomeFinder](#homefinder)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [User Roles](#user-roles)
  - [Screenshots](#screenshots)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
  - [License](#license)

---

## Overview

**HomeFinder** is a real estate web application where users can:

- Search and filter properties by city, price, and features
- List properties for sale (owners)
- Manage offers and favorites (customers)
- Approve users and properties (admins)

The platform is designed for scalability, accessibility, and ease of use, with a clean codebase and modern best practices.

---

## Features

- 🔒 **Authentication & Role-Based Access**: Secure login and registration for Admins, Owners, and Customers
- 🏠 **Property Listings**: Add, edit, and view detailed property listings with images and rich metadata
- 🔍 **Advanced Search & Filters**: Find properties by city, price, type, and amenities
- ⭐ **Favorites & Offers**: Customers can favorite properties and make offers
- 🛠️ **Owner Dashboard**: Manage your properties and offers
- 🛡️ **Admin Dashboard**: Approve users and properties, manage platform data
- 📱 **Responsive Design**: Fully responsive and mobile-friendly
- ♿ **Accessibility**: Built with accessible components and best practices
- 🚀 **Performance**: Optimized with Next.js, code-splitting, and modern libraries

---

## User Roles

- **Admin**: Approves users and properties, manages all platform data
- **Owner**: Lists and manages properties, reviews offers
- **Customer**: Searches, favorites, and makes offers on properties

---

## Screenshots

<!-- Add screenshots/gifs here if available -->

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Sass](https://sass-lang.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **State & Data**: React Context, Custom Hooks
- **Tables**: [TanStack Table](https://tanstack.com/table/v8)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Utilities**: clsx, class-variance-authority, sonner (toasts)

---

## Project Structure

```
src/
  components/      # Reusable UI and feature components
  context/         # React Contexts (e.g., Auth)
  hooks/           # Custom React hooks
  lib/             # Utility functions
  pages/           # Next.js pages (routing)
  styles/          # Global and component styles
  types/           # TypeScript type definitions
  utils/           # API and helper utilities
```

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd waa-final-project-fe
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   ```

yarn install

````
3. **Set up environment variables:**
- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_BASE_URL` to your backend API URL.
4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
````

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` — The base URL for your backend API

---

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

**Code Style:**

- Use Prettier and ESLint (configured)
- Use TypeScript for all code
- Write clear, descriptive commit messages

---

## License

This project is licensed under the MIT License.
