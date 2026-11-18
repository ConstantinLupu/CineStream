import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Star,
  Calendar,
  Tv,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Preluăm detaliile serialului + distribuția (credits) într-un singur request TMDB
        const response = await fetch(
          `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ro-RO&append_to_response=credits`,
        );
        if (!response.ok) {
          throw new Error("Nu am putut încărca detaliile acestui serial.");
        }
        const data = await response.json();

        // Dacă descrierea nu există în română, facem fallback pe engleză
        let overviewText = data.overview;
        if (!overviewText) {
          const enRes = await fetch(
            `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`,
          );
          if (enRes.ok) {
            const enData = await enRes.json();
            overviewText = enData.overview;
          }
        }

        const formattedShow = {
          id: data.id,
          name: data.name || data.original_name || "Fără titlu",
          image: data.poster_path
            ? {
                medium: `${IMG_BASE_URL}${data.poster_path}`,
                original: `${IMG_BASE_URL}${data.poster_path}`,
              }
            : null,
          rating: {
            average: data.vote_average
              ? Number(data.vote_average.toFixed(1))
              : null,
          },
          premiered: data.first_air_date || null,
          status: data.status || "Necunoscut",
          genres: data.genres ? data.genres.map((g) => g.name) : [],
          network: data.networks?.[0]?.name || "N/A",
          summary:
            overviewText || "Fără descriere disponibilă pentru acest titlu.",
        };

        setShow(formattedShow);
        setCast((data.credits?.cast || []).slice(0, 8));
      } catch (err) {
        setError(err.message || "A apărut o eroare la încărcarea detaliilor.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#365B52] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm font-medium">Se încarcă detaliile din TMDB...</p>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="bg-[#FDF2EF] border border-[#C86D51] text-[#C86D51] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <p className="font-semibold">
            {error || "Serialul nu a fost găsit."}
          </p>
        </div>
        <Link
          to="/acasa"
          className="inline-flex items-center gap-2 text-sm font-bold underline"
        >
          <ArrowLeft className="w-4 h-4" /> Înapoi la catalog
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === show.id);
  const poster =
    show.image?.original ||
    "https://via.placeholder.com/500x750?text=Fara+Imagine";
  const year = show.premiered ? new Date(show.premiered).getFullYear() : "N/A";

  return (
    <div className="space-y-8">
      <Link
        to="/acasa"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#365B52] hover:text-[#1F3A34] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Înapoi la catalog
      </Link>

      {/* CARD PRINCIPAL DETALII */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4 bg-[#EAE5DC]">
          <img
            src={poster}
            alt={show.name}
            className="w-full h-full object-cover max-h-[540px]"
          />
        </div>

        <div className="md:col-span-8 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {show.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full bg-[#365B52]/10 text-[#365B52] text-xs font-bold"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onToggleFavorite(show)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  isFavorite
                    ? "bg-[#C86D51] text-white shadow-sm"
                    : "bg-[#F7F5F0] text-[#1F3A34] border border-[#E5E0D8] hover:border-[#C86D51]"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Salvat la Favorite" : "Adaugă la Favorite"}
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F3A34]">
              {show.name}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-[#4A524E]">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#1F3A34]">
                <Star className="w-4 h-4 text-[#C86D51] fill-current" />
                {show.rating?.average ? `${show.rating.average} / 10` : "N/A"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#365B52]" />
                {year}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-[#365B52]" />
                {show.network} • {show.status}
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B726E]">
                Descriere
              </h2>
              <p className="text-sm sm:text-base text-[#4A524E] leading-relaxed">
                {show.summary}
              </p>
            </div>
          </div>

          {/* DISTRIBUȚIE (CAST) */}
          {cast.length > 0 && (
            <div className="pt-4 border-t border-[#E5E0D8] space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#365B52] flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Distribuție principală
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cast.map((actor) => (
                  <div
                    key={actor.id}
                    className="p-2.5 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] text-xs"
                  >
                    <p className="font-bold text-[#1F3A34] truncate">
                      {actor.name}
                    </p>
                    <p className="text-[#6B726E] truncate">
                      {actor.character || "Actor"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
