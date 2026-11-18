import React, { useState, useEffect, createContext, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Presentation from "./pages/Presentation";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import FinalPage from "./pages/FinalPage";

const FavoritesContext = createContext();

function PageWrapper({ children }) {
  const { favoritesCount } = useContext(FavoritesContext);
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1F3A34]">
      <Navbar favoritesCount={favoritesCount} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-[#E5E0D8] py-6 text-center text-sm font-medium text-[#4A524E]">
        Proiect Final - IT School, Aplicație de căutat filme, promotia 2026 @
        Toate drepturile rezervate
      </footer>
    </div>
  );
}

function HomeRoute() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  return (
    <PageWrapper>
      <HomePage favorites={favorites} onToggleFavorite={toggleFavorite} />
    </PageWrapper>
  );
}

function DetailsRoute() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  return (
    <PageWrapper>
      <MovieDetails favorites={favorites} onToggleFavorite={toggleFavorite} />
    </PageWrapper>
  );
}

function FavoritesRoute() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  return (
    <PageWrapper>
      <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
    </PageWrapper>
  );
}

function FinalRoute() {
  return (
    <PageWrapper>
      <FinalPage />
    </PageWrapper>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Presentation />,
  },
  {
    path: "/acasa",
    element: <HomeRoute />,
  },
  {
    path: "/show/:id",
    element: <DetailsRoute />,
  },
  {
    path: "/favorites",
    element: <FavoritesRoute />,
  },
  {
    path: "/final",
    element: <FinalRoute />,
  },
]);

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("cinestream_favs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cinestream_favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (show) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === show.id);
      if (exists) {
        return prev.filter((item) => item.id !== show.id);
      } else {
        return [...prev, show];
      }
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        toggleFavorite,
      }}
    >
      <div className="App primary">
        <RouterProvider router={router} />
      </div>
    </FavoritesContext.Provider>
  );
}
