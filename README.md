# PairUp-Frontend

PairUp-Frontend is a modern React-based web application for travelers to plan, share, and join trips with others. It features user authentication, trip posting, trip discovery, user profiles, reviews, and more. The project uses Redux Toolkit for state management, React Router for navigation, and Tailwind CSS for styling.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Core Concepts](#core-concepts)
- [Key Components](#key-components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Register, login, and manage user sessions.
- **Trip Posting**: Create and share trip plans with details, itinerary, and images.
- **Trip Discovery**: Browse and join trips posted by others.
- **User Profiles**: View and edit personal information, upload avatars, and see trip history.
- **Reviews & Ratings**: Write and view reviews for users.
- **Responsive UI**: Built with Tailwind CSS for a modern, mobile-friendly experience.
- **Location Integration**: Uses geolocation for trip meeting points.
- **Redux State Management**: Robust state handling for users, trips, reviews, and ratings.

---

## Project Structure

```
.
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── lib/
│   ├── pages/
│   └── store/
├── public/
├── conf/
├── package.json
├── vite.config.js
├── .env
└── README.md
```

- **src/components/**: Reusable UI components (e.g., Button, Navbar, Loader, ReviewCard).
- **src/features/**: Redux slices for authentication, trips, reviews, ratings, and users.
- **src/pages/**: Page-level components for routing (e.g., Home, Discover, Post Trip, Profile).
- **src/store/**: Redux store configuration.
- **conf/**: Configuration files (e.g., API endpoints).
- **public/**: Static assets.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/PairUp-Frontend.git
   cd PairUp-Frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (see [Environment Variables](#environment-variables)).

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

---

## Environment Variables

Create a `.env` file in the root directory. Example:

```
VITE_API_URL=http://localhost:8001/api/v1
```

- `VITE_API_URL`: Base URL for the backend API.

---

## Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the app for production.
- `npm run preview` – Preview the production build.
- `npm run lint` – Run ESLint.

---

## Core Concepts

### Routing

- Uses **React Router** for client-side navigation.
- Main routes are defined in [`src/main.jsx`](src/main.jsx).

### State Management

- Uses **Redux Toolkit** for global state.
- Slices for authentication, trips, reviews, ratings, and users are in [`src/features/`](src/features/).

### Styling

- Uses **Tailwind CSS** for utility-first styling.
- Custom colors and fonts are defined in [`src/index.css`](src/index.css).

---

## Key Components

- [`components/TripPostCard.jsx`](src/components/TripPostCard.jsx): Card for displaying trip summaries.
- [`components/ReviewCard.jsx`](src/components/ReviewCard.jsx): Card for displaying user reviews.
- [`components/LocationProvider.jsx`](src/components/LocationProvider.jsx): Provides geolocation context.
- [`pages/Post/TripForm.jsx`](src/pages/Post/TripForm.jsx): Form for creating a new trip.
- [`pages/users/UserProfile.jsx`](src/pages/users/UserProfile.jsx): User profile page.
- [`pages/users/UserReviewsDeatils.jsx`](src/pages/users/UserReviewsDeatils.jsx): User reviews and ratings section.
- [`pages/viewDeatails/trip/ViewPostDetails.jsx`](src/pages/viewDeatails/trip/ViewPostDetails.jsx): Detailed trip view.

---

## State Management

- **Auth State**: [`features/auth/authSlice.js`](src/features/auth/authSlice.js)
- **Trip State**: [`features/trip/tripSlice.js`](src/features/trip/tripSlice.js)
- **User State**: [`features/user/userSlice.js`](src/features/user/userSlice.js)
- **Review State**: [`features/reviewSlice.js`](src/features/reviewSlice.js)
- **Rating State**: [`features/ratingSlice.js`](src/features/ratingSlice.js)

---

## API Integration

- All API calls use Axios, configured in [`axiosConfig.js`](axiosConfig.js).
- API endpoints are managed via [`conf/envConfiq.js`](conf/envConfiq.js).
- Example: Fetching user details in [`features/user/userSlice.js`](src/features/user/userSlice.js).

---

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)