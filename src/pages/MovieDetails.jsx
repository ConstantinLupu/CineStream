import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Star,
  Calendar,
  Clock,
  Tv,
  Users,
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

  const isFavorite = favorites.some((item) => String(item.id) === String(id));

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!API_KEY) {
          throw new Error("Lipsește VITE_TMDB_API_KEY.");
        }

        // 1. Încercăm mai întâi ca serial (/tv/:id)
        let mediaType = "tv";
        let response = await fetch(
          `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ro-RO&append_to_response=credits`
        );

        // 2. Dacă nu există la seriale (404), încercăm ca film (/movie/:id)
        if (!response.ok) {
          mediaType = "movie";
          response = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ro-RO&append_to_response=credits`
          );
        }

        if (!response.ok) {
          throw new Error("Titlul nu a fost găsit în TMDB.");
        }

        const data = await response.json();

        // Fallback în engleză dacă descrierea în română lipsește
        let overviewText = data.overview;
        if (!overviewText) {
          const enRes = await fetch(
            `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
          );
          if (enRes.ok) {
            const enData = await enRes.json();
            overviewText = enData.overview;
          }
        }

        const formattedShow = {
          id: data.id,
          name: data.name || data.title || "Fără titlu",
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
          premiered: data.first_air_date || data.release_date || null,
          genres: (data.genres || []).map((g) => g.name),
          status: data.status || "N/A",
          runtime:
            data.episode_run_time?.[0] || data.runtime || null,
          network:
            data.networks?.[0]?.name ||
            data.production_companies?.[0]?.name ||
            "TMDB",
          summary:
            overviewText || "Nu există o descriere disponibilă pentru acest titlu.",
        };

        setShow(formattedShow);
        setCast((data.credits?.cast || []).slice(0, 8));
      } catch (err) {
        setError("Nu am putut încărca detaliile acestui titlu.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-4 border-[#365B52] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-[#6B726E]">
          Se încarcă detaliile din TMDB...
        </p>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="bg-[#FDF2EF] border border-[#C86D51]/40 rounded-2xl p-6 text-[#C86D51] space-y-3">
        <div className="flex items-center gap-2 font-semibold">
          <AlertCircle className="w-5 h-5" />
          <span>{error || "Titlul nu a fost găsit."}</span>
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

  const poster =
    show.image?.original ||
    "https://via.placeholder.com/400x600?text=Fara+Imagine";
  const year = show.premiered ? new Date(show.premiered).getFullYear() : "N/A";

  return (
    <div className="space-y-8">
      <Link
        to="/acasa"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#365B52] hover:text-[#1F3A34]"
      >
        <ArrowLeft className="w-4 h-4" /> Înapoi la catalog
      </Link>

      <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <img
            src={poster}
            alt={show.name}
            className="w-full rounded-2xl shadow-md object-cover aspect-[2/3]"
          />
        </div>

        <div className="md:col-span-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
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

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F3A34]">
              {show.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#4A524E]">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#C86D51]">
                <Star className="w-4 h-4 fill-current" />{" "}
                {show.rating?.average || "N/A"} / 10
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#365B52]" /> {year}
              </span>
              {show.runtime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#365B52]" /> {show.runtime} min
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-[#365B52]" /> {show.network}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#4A524E] leading-relaxed">
              {show.summary}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onToggleFavorite(show)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                isFavorite
                  ? "bg-[#C86D51] text-white shadow-md"
                  : "bg-[#365B52] hover:bg-[#2A4841] text-white shadow-sm"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Salvat la Favorite" : "Adaugă la Favorite"}
            </button>
          </div>
        </div>
      </div>

      {cast.length > 0 && (
        <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-extrabold text-[#1F3A34] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#365B52]" /> Distribuție principală
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="p-3 rounded-2xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center gap-3"
              >
                <img
                  src={
                    actor.profile_path
                      ? `${IMG_BASE_URL}${actor.profile_path}`
                      : "https://via.placeholder.com/80x80?text=Actor"
                  }
                  alt={actor.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1F3A34] truncate">
                    {actor.name}
                  </p>
                  <p className="text-xs text-[#6B726E] truncate">
                    {actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
