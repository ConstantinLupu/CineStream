import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";

export default function ShowCard({ show, isFavorite, onToggleFavorite }) {
  const rating = show.rating?.average || "N/A";
  const year = show.premiered ? new Date(show.premiered).getFullYear() : "N/A";

  const rawImage = show.image?.medium || show.image?.original;
  const image = rawImage
    ? rawImage.replace("http://", "https://")
    : "https://via.placeholder.com/210x295?text=Fara+Imagine";

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5E0D8] hover:border-[#365B52]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#EAE5DC]">
        <img
          src={image}
          alt={show.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(show);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 shadow-sm ${
            isFavorite
              ? "bg-[#C86D51] text-white"
              : "bg-white/90 text-[#C86D51] hover:bg-white"
          }`}
          title={isFavorite ? "Șterge din favorite" : "Adaugă la favorite"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F3A34]/85 backdrop-blur-md text-xs font-semibold text-[#F7F5F0]">
          <Star className="w-3.5 h-3.5 fill-current text-[#E8A87C]" />
          <span>{rating}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#6B726E] mb-1">
            <span>{year}</span>
            <span>{show.genres?.[0] || "Serial TV"}</span>
          </div>
          <h3 className="font-semibold text-[#1F3A34] group-hover:text-[#365B52] transition-colors line-clamp-1">
            {show.name}
          </h3>
        </div>

        <Link
          to={`/show/${show.id}`}
          className="mt-4 w-full py-2 px-3 rounded-full bg-[#F2EFE9] hover:bg-[#365B52] text-[#1F3A34] hover:text-white text-xs font-semibold text-center transition-colors block"
        >
          Vezi Detalii
        </Link>
      </div>
    </div>
  );
}
