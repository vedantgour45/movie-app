# Movix - Movie and TV Show App

Movix is a web application that allows users to explore movies and TV shows, providing information such as trailers, cast details, ratings, directors, writers, and more. The app includes various sections like Similar, Popular, Trending, and Top Rated to enhance the user's entertainment experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [API Integration](#api-integration)
- [Development](#development)
- [Photos](#photos)

## Installation

Before getting started, make sure you have Node.js and npm installed on your machine.

1. **Clone the repository:**
   git clone https://github.com/your-username/movix.git

2. **Install dependencies:**
   npm install

3. **Set up environment variables:** 
   Create a .env file in the project root and add your TMDB API token:
   VITE_APP_TMDB_TOKEN=your_tmdb_api_token
   
4. **Usage:** 
  To start the development server, run:
  npm run dev
  Visit http://localhost:3000 in your browser to explore Movix.

## Features
  - Browse movies and TV shows by categories.
  - View trailers, cast details, ratings, directors, and writers for each title.
  - Explore sections such as Similar, Popular, Trending, and Top Rated.

## Features
   - React
   - Redux Toolkit
   - Vite
   - Axios
   - Dayjs
   - React Router
   - React Icons
   - React Lazy Load Image Component
   - React Player
   - React Infinite Scroll Component
   - React Select
   - Sass

## API Integration
   Movix integrates with The Movie Database (TMDB) API for fetching movie and TV show data. Ensure you have a TMDB API token and set it in the .env file as described in the installation steps.

## Development
   For building the project, you can use the following npm scripts:

   - npm run build: Build the project for production.
   - npm run preview: Preview the production build locally.

## Photos

   ![image](https://github.com/vedantgour45/movie-app/assets/113295244/81df2399-ee05-43a6-8113-bc907bf08681)
   ![image](https://github.com/vedantgour45/movie-app/assets/113295244/d0470d31-f59e-4cf8-b939-76e7582ea51d)
   ![image](https://github.com/vedantgour45/movie-app/assets/113295244/44d5feed-98fe-43a1-ab4b-4ad8e1994a9d)
   ![image](https://github.com/vedantgour45/movie-app/assets/113295244/98436372-2640-4d4c-b0d4-57aa6f7adbb3)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
