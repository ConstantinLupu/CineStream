import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Heart, Presentation, Award } from "lucide-react";

export default function Navbar({ favoritesCount }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link to="/acasa" className="flex items-center gap-3 group">
          <div className="p-2.5 rounded-xl bg-[#365B52] text-[#F7F5F0] group-hover:bg-[#2A4841] transition-colors">
            <Film className="w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#1F3A34]">
            Cine<span className="text-[#C86D51]">Stream</span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              isActive("/")
                ? "bg-[#365B52] text-white"
                : "text-[#4A524E] hover:bg-[#EAE5DC] hover:text-[#1F3A34]"
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>1. Prezentare</span>
          </Link>

          <Link
            to="/acasa"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              isActive("/acasa")
                ? "bg-[#365B52] text-white"
                : "text-[#4A524E] hover:bg-[#EAE5DC] hover:text-[#1F3A34]"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>2. Căutare Filme</span>
          </Link>

          <Link
            to="/favorites"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              isActive("/favorites")
                ? "bg-[#365B52] text-white"
                : "text-[#4A524E] hover:bg-[#EAE5DC] hover:text-[#1F3A34]"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Favorite</span>
            {favoritesCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-[#C86D51] text-white font-bold">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            to="/final"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              isActive("/final")
                ? "bg-[#C86D51] text-white shadow-sm"
                : "bg-[#C86D51]/15 text-[#C86D51] hover:bg-[#C86D51] hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>3. Final &amp; Mulțumiri</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
