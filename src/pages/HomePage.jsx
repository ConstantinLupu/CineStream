import React, { useState, useEffect } from "react";
import { Search, Film, AlertCircle, Loader2, PlusCircle } from "lucide-react";
import ShowCard from "../components/ShowCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Mapăm structura TMDB (filme + seriale) la structura așteptată de ShowCard și Favorites
const mapTmdbItem = (item) => ({
  id: item.id,
  mediaType: item.media_type || (item.title ? "movie" : "tv"),
  name: item.name || item.title || "Fără titlu",
  image: item.poster_path
    ? {
        medium: `${IMG_BASE_URL}${item.poster_path}`,
        original: `${IMG_BASE_URL}${item.poster_path}`,
      }
    : null,
  rating: {
    average: item.vote_average ? Number(item.vote_average.toFixed(1)) : null,
  },
  premiered: item.first_air_date || item.release_date || null,
  genres: item.genres ? item.genres.map((g) => g.name) : [],
  summary: item.overview || "",
});

export default function HomePage({ favorites, onToggleFavorite }) {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(2); // Pornim cu 2 pagini încărcate (40 titluri)
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Încărcăm simultan paginile 1 și 2 (40 de filme & seriale populare)
  const fetchInitialShows = async () => {
    setLoading(true);
    setError(null);
    try {
      const [res1, res2] = await Promise.all([
        fetch(
          `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ro-RO&page=1`,
        ),
        fetch(
          `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ro-RO&page=2`,
        ),
      ]);

      if (!res1.ok || !res2.ok) {
        throw new Error(
          "Eroare la conectarea cu TMDB API. Verifică cheia din .env.",
        );
      }

      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

      // Filtrăm doar filme și seriale (excludem persoanele) și eliminăm eventualele duplicate
      const combined = [...(data1.results || []), ...(data2.results || [])]
        .filter((item) => item.media_type !== "person")
        .map(mapTmdbItem);

      const uniqueShows = Array.from(
        new Map(combined.map((item) => [item.id, item])).values(),
      );

      setShows(uniqueShows);
      setPage(2);
    } catch (err) {
      setError(err.message || "A apărut o eroare la încărcarea titlurilor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialShows();
  }, []);

  // Încarcă încă 20 de titluri la apăsarea butonului „Încarcă mai multe”
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const endpoint = searchTerm.trim()
        ? `${BASE_URL}/search/multi?api_key=${API_KEY}&language=ro-RO&query=${encodeURIComponent(
            searchTerm,
          )}&page=${nextPage}`
        : `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ro-RO&page=${nextPage}`;

      const response = await fetch(endpoint);
      if (!response.ok)
        throw new Error("Nu s-au putut încărca mai multe titluri.");

      const data = await response.json();
      const newItems = (data.results || [])
        .filter((item) => item.media_type !== "person")
        .map(mapTmdbItem);

      setShows((prev) => {
        const merged = [...prev, ...newItems];
        return Array.from(
          new Map(merged.map((item) => [item.id, item])).values(),
        );
      });
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  // Căutare atât în filme, cât și în seriale (search/multi)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchInitialShows();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=ro-RO&query=${encodeURIComponent(
          searchTerm,
        )}&page=1`,
      );
      if (!response.ok) {
        throw new Error("Eroare la căutarea în baza de date TMDB.");
      }
      const data = await response.json();
      const results = (data.results || [])
        .filter((item) => item.media_type !== "person")
        .map(mapTmdbItem);

      setShows(results);
      setPage(1);
    } catch (err) {
      setError(err.message || "A apărut o eroare la căutare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ZONA HERO + BARA DE CĂUTARE */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm text-center space-y-5">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C86D51]">
          CATALOGUL TĂU DE DIVERTISMENT • TMDB API
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F3A34] tracking-tight">
          Descoperă Seriale și Filme Favorite
        </h1>
        <p className="text-sm sm:text-base text-[#6B726E] max-w-2xl mx-auto">
          Caută prin mii de filme și seriale, salvează titlurile preferate și
          consultă datele în timp real preluate prin TMDB API.
        </p>

        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto flex items-center gap-2 pt-2"
        >
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-[#6B726E] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută un film sau serial (ex: Inception, Breaking Bad)..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F7F5F0] border border-[#E5E0D8] text-sm text-[#1F3A34] placeholder-[#8C9490] focus:outline-none focus:border-[#365B52]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#365B52] hover:bg-[#2A4841] text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            Caută
          </button>
        </form>
      </section>

      {/* TITLU SECȚIUNE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#1F3A34]">
          <Film className="w-5 h-5 text-[#365B52]" />
          <h2 className="text-xl font-bold">
            {searchTerm.trim()
              ? `Rezultate pentru „${searchTerm}”`
              : "Filme & Seriale Populare"}
          </h2>
        </div>
        <span className="text-xs font-medium text-[#6B726E]">
          Afișate: {shows.length} titluri
        </span>
      </div>

      {/* STARE LOADING / ERROR / REZULTATE */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#365B52] space-y-3">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium">
            Se încarcă filmele și serialele din TMDB...
          </p>
        </div>
      ) : error ? (
        <div className="bg-[#FDF2EF] border border-[#C86D51] text-[#C86D51] rounded-2xl p-6 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      ) : shows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center space-y-3">
          <p className="text-base font-bold text-[#1F3A34]">
            Nu am găsit niciun rezultat pentru căutarea ta.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              fetchInitialShows();
            }}
            className="px-5 py-2 rounded-full bg-[#365B52] text-white text-xs font-semibold hover:bg-[#2A4841] cursor-pointer"
          >
            Resetează căutarea
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {shows.map((show) => (
              <ShowCard
                key={show.id}
                show={show}
                isFavorite={favorites.some((fav) => fav.id === show.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          {/* BUTON ÎNCARCĂ MAI MULTE */}
          <div className="pt-6 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#365B52] text-[#1F3A34] hover:text-white border border-[#E5E0D8] hover:border-[#365B52] text-sm font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Se încarcă...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Încarcă mai multe filme &amp; seriale</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
