import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, Film } from "lucide-react";
import ShowCard from "../components/ShowCard";

export default function Favorites({ favorites, onToggleFavorite }) {
  return (
    <div className="space-y-8">
      {/* ANTET PAGINĂ FAVORITE */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E0D8] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#C86D51]/15 text-[#C86D51]">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34]">
              Seriale Favorite
            </h1>
            <p className="text-xs sm:text-sm text-[#6B726E]">
              {favorites.length === 0
                ? "Nu ai niciun serial salvat momentan"
                : `${favorites.length} ${
                    favorites.length === 1 ? "serial salvat" : "seriale salvate"
                  } • Poți elimina individual orice titlu`}
            </p>
          </div>
        </div>
      </div>

      {/* LISTA DE FAVORITE SAU MESAJ GOL */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E5E0D8] p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="inline-flex p-4 rounded-2xl bg-[#F7F5F0] text-[#365B52]">
            <Film className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-[#1F3A34]">
            Lista ta de favorite este goală
          </h2>
          <p className="text-sm text-[#6B726E]">
            Apasă pe inimioara din dreptul serialelor preferate pentru a le
            salva aici.
          </p>
          <div className="pt-2">
            <Link
              to="/acasa"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#365B52] hover:bg-[#2A4841] text-white text-sm font-semibold transition-colors"
            >
              Explorează serialele
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {favorites.map((show) => (
            <div key={show.id} className="flex flex-col space-y-2">
              <ShowCard
                show={show}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
              <button
                onClick={() => onToggleFavorite(show)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-[#FDF2EF] text-[#C86D51] border border-[#E5E0D8] hover:border-[#C86D51] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                title={`Elimină ${show.name} din favorite`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Elimină</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
