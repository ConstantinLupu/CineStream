import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  GraduationCap,
  UserCheck,
  FileCode,
  Layers,
  LayoutTemplate,
  Search,
  Heart,
  Code2,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Wrench,
  Sparkles,
  Terminal,
  FolderTree,
  Palette,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

// ARBORELE INTEGRAL AL PROIECTULUI (ACTUALIZAT CU .env, .gitignore & FinalPage.jsx)
const FULL_PROJECT_TREE = [
  { text: "Aplicație de căutat filme- Proiect Final", type: "root" },
  {
    text: "├── node_modules/",
    type: "muted",
    note: "pachete instalate (React, Router, Lucide, Tailwind)",
  },
  { text: "├── public/", type: "folder", note: "fișiere statice publice" },
  {
    text: "│   ├── CB.png",
    type: "file",
    note: "portret trainer (drag & drop)",
  },
  { text: "│   ├── favicon.svg", type: "file", note: "pictogramă tab browser" },
  { text: "│   ├── icons.svg", type: "file", note: "iconițe vectoriale" },
  {
    text: "│   └── LC.jpg",
    type: "file",
    note: "portret cursant (drag & drop)",
  },
  { text: "├── src/", type: "folder", note: "codul sursă al aplicației" },
  { text: "│   ├── assets/", type: "folder" },
  { text: "│   │   ├── hero.png", type: "file" },
  { text: "│   │   ├── react.svg", type: "file" },
  { text: "│   │   └── vite.svg", type: "file" },
  {
    text: "│   ├── components/",
    type: "folder",
    note: "componente reutilizabile",
  },
  {
    text: "│   │   ├── Navbar.jsx",
    type: "interactive",
    fileKey: "navbarJsx",
    badge: "4",
  },
  {
    text: "│   │   └── ShowCard.jsx",
    type: "interactive",
    fileKey: "showCardJsx",
    badge: "5",
  },
  { text: "│   ├── pages/", type: "folder", note: "paginile & rutele SPA" },
  {
    text: "│   │   ├── Favorites.jsx",
    type: "interactive",
    fileKey: "favoritesJsx",
    badge: "8",
  },
  {
    text: "│   │   ├── FinalPage.jsx",
    type: "interactive",
    fileKey: "finalPageJsx",
    badge: "13",
  },
  {
    text: "│   │   ├── HomePage.jsx",
    type: "interactive",
    fileKey: "homePageJsx",
    badge: "6",
  },
  {
    text: "│   │   ├── MovieDetails.jsx",
    type: "interactive",
    fileKey: "movieDetailsJsx",
    badge: "7",
  },
  {
    text: "│   │   └── Presentation.jsx",
    type: "interactive",
    fileKey: "presentationJsx",
    badge: "11",
  },
  {
    text: "│   ├── App.css",
    type: "interactive",
    fileKey: "appCss",
    badge: "9",
  },
  {
    text: "│   ├── App.jsx",
    type: "interactive",
    fileKey: "appJsx",
    badge: "3",
  },
  {
    text: "│   ├── index.css",
    type: "interactive",
    fileKey: "indexCss",
    badge: "10",
  },
  {
    text: "│   └── main.jsx",
    type: "interactive",
    fileKey: "mainJsx",
    badge: "2",
  },
  { text: "├── _oxlintrc.json", type: "config", note: "reguli linter" },
  {
    text: "├── .env",
    type: "interactive",
    fileKey: "envSecurity",
    badge: "12",
  },
  {
    text: "├── .gitignore",
    type: "interactive",
    fileKey: "envSecurity",
    badge: "12",
  },
  {
    text: "├── index.html",
    type: "interactive",
    fileKey: "indexHtml",
    badge: "1",
  },
  { text: "├── package-lock.json", type: "config" },
  {
    text: "├── package.json",
    type: "config",
    note: "dependințe & scripturi npm",
  },
  { text: "├── postcss.config.js", type: "config", note: "procesare CSS" },
  { text: "├── README.md", type: "config", note: "documentația proiectului" },
  {
    text: "├── tailwind.config.js",
    type: "config",
    note: "configurare Tailwind",
  },
  {
    text: "└── vite.config.js",
    type: "config",
    note: "configurare bundler Vite",
  },
];

// DATELE EXTINSE ȘI DETALIATE PENTRU FIECARE FIȘIER AL PROIECTULUI (#1 - #13)
const FILES_DETAILS = {
  indexHtml: {
    number: "1",
    name: "index.html",
    folder: "Rădăcina proiectului (/index.html)",
    tag: "HTML5 ENTRY POINT • ARHITECTURĂ SPA",
    accent: "#1F3A34",
    summary:
      "Singurul document HTML real al aplicației. Spre deosebire de site-urile clasice (Multi-Page), unde fiecare click cere un nou fișier .html de la server, într-un Single Page Application (SPA) acest fișier este încărcat o singură dată, iar apoi React preia controlul total asupra interfeței.",
    techNote:
      "Concepte aplicate: Standardul HTML5, structura arborescentă <html> → <head> + <body>, configurarea viewport-ului pentru dispozitive mobile, favicon static din public/ și încărcarea modulelor JavaScript moderne (type='module').",
    code: `<!doctype html>
<html lang="ro">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CineStream - Căutare Filme & Seriale</title>
  </head>
  <body>
    <!-- Containerul unic în care React va injecta întreaga aplicație -->
    <div id="root"></div>

    <!-- Punctul de pornire JavaScript gestionat de bundler-ul Vite -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    codeWalkthrough: [
      {
        snippet: '<!doctype html> & <html lang="ro">',
        explanation:
          "Declară documentul ca HTML5 și setează limba principală în română. Ajută atât motoarele de căutare (SEO), cât și cititoarele de ecran (accesibilitate) să interpreteze corect conținutul.",
      },
      {
        snippet: '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
        explanation:
          "Încarcă pictograma aplicației direct din folderul static public/, afișată în tab-ul browserului.",
      },
      {
        snippet:
          '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        explanation:
          "Esențial pentru designul responsive și mobile-first: instruiește browserul să adapteze lățimea paginii la ecranul telefonului sau al monitorului, fără zoom forțat.",
      },
      {
        snippet: '<div id="root"></div>',
        explanation:
          "Nodul-ancoră din DOM (Document Object Model). Inițial este gol, dar în milisecunda următoare React îl populează dinamic cu Navbar, pagini și Footer.",
      },
      {
        snippet: '<script type="module" src="/src/main.jsx"></script>',
        explanation:
          "Conectează HTML-ul cu JavaScript-ul prin sistemul nativ ES Modules, permițând compilarea rapidă și Hot Module Replacement (HMR) în Vite.",
      },
    ],
  },

  mainJsx: {
    number: "2",
    name: "main.jsx",
    folder: "src/main.jsx",
    tag: "REACT BOOTSTRAP • VIRTUAL DOM",
    accent: "#365B52",
    summary:
      "Puntea de legătură dintre browser (DOM-ul real din index.html) și ecosistemul React. Aici se inițializează motorul de randare React 18+ și se montează componenta rădăcină <App />.",
    techNote:
      "Concepte aplicate: Interacțiunea cu DOM-ul prin document.getElementById('root'), API-ul modern createRoot() din react-dom/client, importul stilurilor globale index.css și verificările suplimentare oferite de <StrictMode>.",
    code: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 1. Identificăm elementul container din index.html
const rootElement = document.getElementById('root');

// 2. Inițializăm rădăcina Virtual DOM și randăm aplicația
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
    codeWalkthrough: [
      {
        snippet: "import './index.css';",
        explanation:
          "Încarcă fișierul CSS global înainte de randarea componentelor, activând astfel toate clasele utilitare Tailwind CSS în întreaga aplicație.",
      },
      {
        snippet: "const rootElement = document.getElementById('root');",
        explanation:
          "Caută în arborele DOM elementul cu id='root' definit în index.html.",
      },
      {
        snippet: "createRoot(rootElement).render(...)",
        explanation:
          "Creează rădăcina Virtual DOM-ului React. De aici înainte, React va calcula eficient doar diferențele (diffing) la schimbarea stării, fără a reîncărca pagina.",
      },
      {
        snippet: "<StrictMode><App /></StrictMode>",
        explanation:
          "Activează modul strict în timpul dezvoltării: verifică dacă efectele (useEffect) sunt curate și avertizează asupra practicilor depreciate.",
      },
    ],
  },

  appJsx: {
    number: "3",
    name: "App.jsx",
    folder: "src/App.jsx",
    tag: "NUCLEUL APLICAȚIEI • ROUTER & CONTEXT API",
    accent: "#C86D51",
    summary:
      "Centrul de comandă al proiectului. Gestionează cele 5 rute ale aplicației prin React Router, păstrează starea globală a listei de favorite sincronizată cu localStorage și aplică structura vizuală comună prin componenta PageWrapper.",
    techNote:
      "Concepte aplicate: Rutare declarativă cu createBrowserRouter + RouterProvider în afara componentei App, rute dinamice (/show/:id), React Context API (createContext + useContext), lazy state initialization și compoziție prin props.children.",
    code: `const FavoritesContext = createContext();

// Layout comun pentru paginile aplicației (Navbar sus + Footer jos)
function PageWrapper({ children }) {
  const { favoritesCount } = useContext(FavoritesContext);
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1F3A34]">
      <Navbar favoritesCount={favoritesCount} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-[#E5E0D8] py-6 text-center text-sm font-medium text-[#4A524E]">
        Proiect Final - IT School, Aplicație de căutat filme, promotia 2026 @ Toate drepturile rezervate
      </footer>
    </div>
  );
}

// Configurarea rutelor în afara componentei App
const router = createBrowserRouter([
  { path: "/", element: <Presentation /> },
  { path: "/acasa", element: <HomeRoute /> },
  { path: "/show/:id", element: <DetailsRoute /> },
  { path: "/favorites", element: <FavoritesRoute /> },
  { path: "/final", element: <FinalRoute /> },
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
    setFavorites((prev) =>
      prev.some((item) => item.id === show.id)
        ? prev.filter((item) => item.id !== show.id)
        : [...prev, show]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, favoritesCount: favorites.length, toggleFavorite }}>
      <RouterProvider router={router} />
    </FavoritesContext.Provider>
  );
}`,
    codeWalkthrough: [
      {
        snippet: "const router = createBrowserRouter([...])",
        explanation:
          "Definește harta celor 5 rute SPA în afara componentei App(), astfel încât routerul să nu fie reinstanțiat la fiecare actualizare de stare. Leagă fluxul complet: Prezentare (/), Catalog (/acasa), Detalii (/show/:id), Favorite (/favorites) și Concluzii (/final).",
      },
      {
        snippet: "function PageWrapper({ children })",
        explanation:
          "Aplică principiul DRY (Don't Repeat Yourself): în loc să scriem Navbar și Footer în fiecare pagină, le definim o singură dată aici, iar conținutul specific fiecărei pagini este injectat prin prop-ul special {children}.",
      },
      {
        snippet:
          "useState(() => { const saved = localStorage.getItem(...); ... })",
        explanation:
          "Inițializare leneșă (lazy initialization): funcția rulează o singură dată la pornirea aplicației și încarcă în memorie serialele/filmele salvate anterior în browser.",
      },
      {
        snippet: "useEffect(() => { localStorage.setItem(...); }, [favorites])",
        explanation:
          "Sincronizare automată: de fiecare dată când utilizatorul adaugă sau elimină un titlu din favorites, noua listă este serializată cu JSON.stringify și salvată în localStorage.",
      },
      {
        snippet: "toggleFavorite(show) cu .some() și .filter()",
        explanation:
          "Verifică imutabil dacă titlul există deja în array (.some()): dacă există îl elimină (.filter()), iar dacă nu există îl adaugă la final ([...prev, show]).",
      },
      {
        snippet: "<FavoritesContext.Provider value={...}>",
        explanation:
          "Expune datele și funcțiile către toate rutele aplicației fără a fi nevoie să le transmitem manual prin zeci de componente intermediare (evită prop drilling).",
      },
    ],
  },

  navbarJsx: {
    number: "4",
    name: "Navbar.jsx",
    folder: "src/components/Navbar.jsx",
    tag: "COMPONENTĂ DE NAVIGAȚIE • UX & RUTARE",
    accent: "#365B52",
    summary:
      "Bara de navigație superioară, fixată în partea de sus a ecranului (sticky), care oferă acces instantaneu la toate cele trei etape ale prezentării și afișează în timp real numărul de titluri salvate la Favorite.",
    techNote:
      "Concepte aplicate: HTML5 semantic (<header>, <nav>), navigare client-side prin componenta <Link> din react-router-dom, detectarea rutei active cu hook-ul useLocation() și randare condiționată.",
    code: `import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Heart, Presentation, Award } from "lucide-react";

export default function Navbar({ favoritesCount }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link to="/acasa" className="flex items-center gap-3 group">
          <Film className="w-6 h-6" />
          <span>CineStream</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link to="/" className={isActive("/") ? "bg-[#365B52] text-white" : "..."}>
            <Presentation className="w-4 h-4" /> 1. Prezentare
          </Link>
          <Link to="/acasa" className={isActive("/acasa") ? "bg-[#365B52] text-white" : "..."}>
            <Film className="w-4 h-4" /> 2. Căutare Filme
          </Link>
          <Link to="/favorites" className={isActive("/favorites") ? "bg-[#365B52] text-white" : "..."}>
            <Heart className="w-4 h-4" /> Favorite
            {favoritesCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-[#C86D51] text-white font-bold">
                {favoritesCount}
              </span>
            )}
          </Link>
          <Link to="/final" className={isActive("/final") ? "bg-[#C86D51] text-white" : "..."}>
            <Award className="w-4 h-4" /> 3. Final & Mulțumiri
          </Link>
        </nav>
      </div>
    </header>
  );
}`,
    codeWalkthrough: [
      {
        snippet:
          "const location = useLocation(); const isActive = (path) => location.pathname === path;",
        explanation:
          "Hook-ul useLocation() citește URL-ul curent din browser. Funcția ajutătoare isActive() compară ruta curentă cu destinația fiecărui buton pentru a-l evidenția vizual.",
      },
      {
        snippet: '<Link to="/acasa"> în loc de <a href="/acasa">',
        explanation:
          "Un tag clasic <a> ar declanșa o cerere HTTP nouă către server și ar șterge starea din memorie. Componenta <Link> interceptează click-ul și schimbă pagina instant în browser.",
      },
      {
        snippet: "sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md",
        explanation:
          "Clase Tailwind care mențin meniul vizibil în partea de sus atunci când utilizatorul derulează lista lungă de filme, cu un efect subtil de sticlă mată (backdrop-blur).",
      },
      {
        snippet: "{favoritesCount > 0 && <span>{favoritesCount}</span>}",
        explanation:
          "Operatorul logic && pentru randare condiționată: insigna numerică este afișată doar dacă utilizatorul are cel puțin un film sau serial salvat.",
      },
    ],
  },

  showCardJsx: {
    number: "5",
    name: "ShowCard.jsx",
    folder: "src/components/ShowCard.jsx",
    tag: "COMPONENTĂ REUTILIZABILĂ • PROPS & DEFENSIVE CODING",
    accent: "#365B52",
    summary:
      "Unitatea vizuală de bază a catalogului. Afișează posterul, nota, anul lansării, butonul interactiv de favorite și link-ul către pagina de detalii. Este reutilizată identic atât în HomePage, cât și în Favorites.",
    techNote:
      "Concepte aplicate: Arhitectură bazată pe componente, flux unidirecțional al datelor prin props, programare defensivă cu Optional Chaining (?.) și rute dinamice construite prin interpolare.",
    code: `import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Calendar } from "lucide-react";

export default function ShowCard({ show, isFavorite, onToggleFavorite }) {
  const image =
    show.image?.medium ||
    "https://via.placeholder.com/210x295?text=Fara+Imagine";
  const rating = show.rating?.average || "N/A";
  const year = show.premiered ? new Date(show.premiered).getFullYear() : "N/A";

  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
      <div className="relative aspect-[2/3] bg-[#EAE5DC]">
        <img src={image} alt={show.name} className="w-full h-full object-cover" />
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(show);
          }}
          className={isFavorite ? "bg-[#C86D51] text-white" : "bg-white/90 text-[#1F3A34]"}
        >
          <Heart className={isFavorite ? "fill-current" : ""} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <span className="text-xs text-[#6B726E]">{year} • ★ {rating}</span>
          <h3 className="font-bold text-[#1F3A34] line-clamp-1">{show.name}</h3>
        </div>
        <Link to={\`/show/\${show.id}\`}>Vezi Detalii</Link>
      </div>
    </div>
  );
}`,
    codeWalkthrough: [
      {
        snippet:
          "export default function ShowCard({ show, isFavorite, onToggleFavorite })",
        explanation:
          "Componenta nu își gestionează singură lista de favorite; ea primește datele (show, isFavorite) și acțiunea (onToggleFavorite) de la părinte prin destructurarea props-urilor.",
      },
      {
        snippet:
          "const image = show.image?.medium || 'https://via.placeholder...'",
        explanation:
          "Programare defensivă: dacă un titlu din API nu are imagine, operatorul ?. previne eroarea 'Cannot read properties of null' și afișează o imagine de rezervă.",
      },
      {
        snippet: "e.preventDefault(); onToggleFavorite(show);",
        explanation:
          "Previne declanșarea altor acțiuni de navigare la apăsarea inimioarei și trimite obiectul show înapoi către App.jsx pentru a actualiza starea globală.",
      },
      {
        snippet: "to={`/show/${show.id}`}",
        explanation:
          "Generează dinamic ruta unică pentru fiecare film sau serial (ex: /show/1396), legând cardul de pagina MovieDetails.",
      },
    ],
  },

  homePageJsx: {
    number: "6",
    name: "HomePage.jsx",
    folder: "src/pages/HomePage.jsx",
    tag: "CATALOG & CĂUTARE • TMDB API KEY + PROMISE.ALL",
    accent: "#C86D51",
    summary:
      "Pagina principală a aplicației (/acasa). Se conectează la TMDB API folosind cheia personală securizată în .env, încarcă simultan 40 de filme și seriale populare la deschidere, permite căutarea în timp real și extinderea catalogului prin butonul 'Încarcă mai multe'.",
    techNote:
      "Concepte aplicate: Variabile de mediu în Vite (import.meta.env.VITE_TMDB_API_KEY), cereri HTTP asincrone paralele cu Promise.all(), funcții de mapare/adaptare a datelor (Adapter Pattern) și gestionarea completă a stărilor loading / error / empty.",
    code: `const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Adapter: transformă obiectul TMDB în formatul așteptat de ShowCard și Favorites
const mapTmdbItem = (item) => ({
  id: item.id,
  name: item.name || item.title || "Fără titlu",
  image: item.poster_path ? { medium: \`\${IMG_BASE_URL}\${item.poster_path}\` } : null,
  rating: { average: item.vote_average ? Number(item.vote_average.toFixed(1)) : null },
  premiered: item.first_air_date || item.release_date || null,
});

export default function HomePage({ favorites, onToggleFavorite }) {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(true);

  const fetchInitialShows = async () => {
    const [res1, res2] = await Promise.all([
      fetch(\`\${BASE_URL}/trending/all/week?api_key=\${API_KEY}&language=ro-RO&page=1\`),
      fetch(\`\${BASE_URL}/trending/all/week?api_key=\${API_KEY}&language=ro-RO&page=2\`),
    ]);
    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
    const combined = [...(data1.results || []), ...(data2.results || [])]
      .filter((item) => item.media_type !== "person")
      .map(mapTmdbItem);
    setShows(Array.from(new Map(combined.map((i) => [i.id, i])).values()));
  };
  ...
}`,
    codeWalkthrough: [
      {
        snippet: "const API_KEY = import.meta.env.VITE_TMDB_API_KEY;",
        explanation:
          "Preia cheia personală de acces TMDB din fișierul .env. Astfel, codul sursă rămâne curat și reutilizabil, fără chei hardcodate.",
      },
      {
        snippet: "const mapTmdbItem = (item) => ({ ... })",
        explanation:
          "Funcție de mapare (Adapter): normalizează diferențele dintre filme (item.title, release_date) și seriale (item.name, first_air_date) din TMDB, păstrând exact același design în ShowCard și Favorites.",
      },
      {
        snippet: "Promise.all([fetch(...page=1), fetch(...page=2)])",
        explanation:
          "Deoarece TMDB returnează 20 de rezultate pe pagină, executăm două cereri în paralel cu Promise.all() pentru a afișa instant 40 de titluri la deschiderea paginii.",
      },
      {
        snippet:
          ".filter((item) => item.media_type !== 'person') & new Map(...)",
        explanation:
          "Elimină actorii/persoanele din rezultatele mixte (trending/search multi) și folosește o structură Map după ID pentru a garanta că nu apar titluri duplicate.",
      },
      {
        snippet: "handleLoadMore() & search/multi",
        explanation:
          "Permite extinderea dinamică a listei cu încă 20 de titluri la fiecare click pe butonul 'Încarcă mai multe', atât în catalogul popular, cât și în rezultatele căutării.",
      },
    ],
  },

  movieDetailsJsx: {
    number: "7",
    name: "MovieDetails.jsx",
    folder: "src/pages/MovieDetails.jsx",
    tag: "RUTĂ DINAMICĂ (/show/:id) • DETALII & DISTRIBUȚIE",
    accent: "#C86D51",
    summary:
      "Pagina de prezentare detaliată a unui titlu (/show/:id). Citește ID-ul din URL, se autentifică cu cheia TMDB din .env, preia informațiile complete + distribuția actorilor și include un mecanism automat de fallback în limba engleză dacă descrierea nu este tradusă în română.",
    techNote:
      "Concepte aplicate: Rutare dinamică cu useParams(), efecte dependente de parametrii URL-ului cu useEffect(..., [id]), query parameter append_to_response=credits și fallback lingvistic asincron.",
    code: `import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        \`\${BASE_URL}/tv/\${id}?api_key=\${API_KEY}&language=ro-RO&append_to_response=credits\`
      );
      const data = await response.json();

      // Fallback automat în engleză dacă overview-ul în română lipsește
      let overviewText = data.overview;
      if (!overviewText) {
        const enRes = await fetch(\`\${BASE_URL}/tv/\${id}?api_key=\${API_KEY}&language=en-US\`);
        const enData = await enRes.json();
        overviewText = enData.overview;
      }

      setShow(formatDetails(data, overviewText));
      setCast((data.credits?.cast || []).slice(0, 8));
    };
    fetchDetails();
  }, [id]);
}`,
    codeWalkthrough: [
      {
        snippet: "const { id } = useParams();",
        explanation:
          "Extrage segmentul variabil :id din adresa URL (ex: din /show/1399 extrage '1399') pentru a ști ce titlu trebuie solicitat de la server.",
      },
      {
        snippet: "append_to_response=credits",
        explanation:
          "Optimizare de rețea oferită de TMDB API: în loc să facem două apeluri separate (unul pentru detalii și unul pentru actori), primim ambele seturi de date într-un singur răspuns JSON.",
      },
      {
        snippet:
          "if (!overviewText) { const enRes = await fetch(...language=en-US); }",
        explanation:
          "Îmbunătățire de experiență utilizator (UX): dacă un serial nu are încă sinopsisul tradus în română pe TMDB, aplicația îl preia automat în engleză în loc să lase zona goală.",
      },
      {
        snippet: "useEffect(() => { ... }, [id]);",
        explanation:
          "Includerea variabilei id în array-ul de dependențe asigură reîncărcarea automată a datelor ori de câte ori se schimbă ID-ul din URL.",
      },
    ],
  },

  favoritesJsx: {
    number: "8",
    name: "Favorites.jsx",
    folder: "src/pages/Favorites.jsx",
    tag: "GESTIONARE FAVORITE • LOCALSTORAGE & ȘTERGERE INDIVIDUALĂ",
    accent: "#365B52",
    summary:
      "Pagina dedicată colecției personale a utilizatorului (/favorites). Afișează toate filmele și serialele salvate în localStorage și oferă un buton dedicat 'Elimină' sub fiecare card, permițând ștergerea controlată, câte un titlu pe rând.",
    techNote:
      "Concepte aplicate: Randare condiționată (stare goală vs. grid populat), randarea listelor cu .map() și atributul key unic, compoziție vizuală prin reutilizarea ShowCard și acțiuni individuale per element.",
    code: `import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, Film } from "lucide-react";
import ShowCard from "../components/ShowCard";

export default function Favorites({ favorites, onToggleFavorite }) {
  return (
    <div className="space-y-8">
      <h1>Seriale Favorite ({favorites.length})</h1>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center">
          <h2>Lista ta de favorite este goală</h2>
          <Link to="/acasa">Explorează serialele</Link>
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
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-[#FDF2EF] text-[#C86D51] border border-[#E5E0D8]"
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
}`,
    codeWalkthrough: [
      {
        snippet: "{favorites.length === 0 ? (...) : (...)}",
        explanation:
          "Tratarea stării goale (Empty State): când utilizatorul nu a salvat încă nimic, afișează un mesaj clar și un buton de acțiune către /acasa.",
      },
      {
        snippet: "favorites.map((show) => (<div key={show.id}>...</div>))",
        explanation:
          "Parcurge array-ul de favorite și generează câte un card pentru fiecare element. Atributul key={show.id} ajută React să identifice exact ce element a fost șters din DOM.",
      },
      {
        snippet:
          "<button onClick={() => onToggleFavorite(show)}>Elimină</button>",
        explanation:
          "Buton individual sub fiecare film/serial: la click, apelează toggleFavorite(show) din App.jsx, elimină doar acel titlu și actualizează instant contorul din Navbar și localStorage.",
      },
    ],
  },

  appCss: {
    number: "9",
    name: "App.css",
    folder: "src/App.css",
    tag: "ARHITECTURĂ CSS • VARIABILE & RESPONSIVE",
    accent: "#365B52",
    summary:
      "Fișierul CSS personalizat al proiectului, care completează clasele utilitare Tailwind cu reguli moderne de stilizare: variabile CSS native, imbricare (CSS Nesting), transformări 3D în perspectivă, layout-uri Flexbox adaptive și Media Queries.",
    techNote:
      "Concepte aplicate: Custom Properties (--accent, --border), CSS Nesting nativ (&:hover, &:focus-visible), transformări 3D (perspective, rotateX/Y/Z), Flexbox adaptiv și pseudo-elemente (::before, ::after).",
    code: `.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &:hover { border-color: var(--accent-border); }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}`,
    codeWalkthrough: [
      {
        snippet: "color: var(--accent); background: var(--accent-bg);",
        explanation:
          "Utilizează variabile CSS native (Custom Properties), facilitând menținerea consistenței cromatice și modificarea rapidă a temei.",
      },
      {
        snippet: "&:hover & &:focus-visible",
        explanation:
          "CSS Nesting nativ pentru stările de interacțiune atât la mouse (:hover), cât și la navigarea din tastatură (:focus-visible — standard de accesibilitate).",
      },
      {
        snippet: "@media (max-width: 1024px) { flex-direction: column; }",
        explanation:
          "Media Query care adaptează automat structura din coloane orizontale (desktop) într-o singură coloană verticală pe tablete și telefoane.",
      },
    ],
  },

  indexCss: {
    number: "10",
    name: "index.css",
    folder: "src/index.css",
    tag: "TAILWIND CSS • CONFIGURARE GLOBALĂ",
    accent: "#1F3A34",
    summary:
      "Punctul central de stilizare al aplicației, importat în main.jsx. Injectează cele trei straturi ale framework-ului Tailwind CSS și definește fundalul ivoire cald (#f3ede2) și culoarea de bază a textului (#1c1917).",
    techNote:
      "Concepte aplicate: Directivele Tailwind CSS (@tailwind base, components, utilities), resetarea marginilor implicite ale browserului și unitățile relative la ecran (min-height: 100vh).",
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  min-height: 100vh;
  background-color: #f3ede2;
  color: #1c1917;
}`,
    codeWalkthrough: [
      {
        snippet: "@tailwind base; @tailwind components; @tailwind utilities;",
        explanation:
          "Activează motorul Tailwind CSS: 'base' normalizează stilurile implicite ale browserelor, 'components' încarcă clasele de componente, iar 'utilities' generează toate clasele utilitare folosite în JSX.",
      },
      {
        snippet: "margin: 0; min-height: 100vh;",
        explanation:
          "Elimină spațiul alb implicit din jurul paginii și garantează că fundalul acoperă întreaga înălțime a ferestrei browserului.",
      },
      {
        snippet: "background-color: #f3ede2; color: #1c1917;",
        explanation:
          "Definește identitatea vizuală de bază: un fundal cald, odihnitor la citire, combinat cu un contrast puternic pentru lizibilitate.",
      },
    ],
  },

  presentationJsx: {
    number: "11",
    name: "Presentation.jsx",
    folder: "src/pages/Presentation.jsx",
    tag: "ETAPA 1 • PREZENTARE INTERACTIVĂ (/)",
    accent: "#C86D51",
    summary:
      "Motorul interactiv al prezentării proiectului (ruta '/'). Îmbină 9 slide-uri tematice cu un Explorer interactiv al întregului arbore de fișiere, ferestre modale cu explicații detaliate pe cod, controale de zoom (85%–145%) și navigație din tastatură.",
    techNote:
      "Concepte aplicate: Gestionarea stărilor multiple cu useState, ascultarea evenimentelor globale de tastatură (keydown) cu useEffect și cleanup function, navigare programatică cu useNavigate() și sub-componente reutilizabile cu props.children.",
    code: `export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [modalExpanded, setModalExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedFile && e.key === "Escape") return setSelectedFile(null);
      if (!selectedFile && e.key === "ArrowRight") nextSlide();
      if (!selectedFile && e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFile]);
  ...
}`,
    codeWalkthrough: [
      {
        snippet: "InteractiveFileCard({ fileKey, children })",
        explanation:
          "Sub-componentă internă reutilizabilă: primește identificatorul fișierului (fileKey) și conținutul vizual (children), iar la click deschide fereastra modală cu explicațiile corespunzătoare.",
      },
      {
        snippet:
          "window.addEventListener('keydown', ...) + return () => removeEventListener(...)",
        explanation:
          "Permite prezentarea fluidă din tastatură (săgeți stânga/dreapta pentru slide-uri, Escape pentru închiderea ferestrei de cod) și curăță ascultătorul la demontare pentru a preveni memory leaks.",
      },
      {
        snippet: "const navigate = useNavigate(); navigate('/acasa');",
        explanation:
          "Navigare programatică din React Router: trece instant din etapa de prezentare în aplicația live de căutat filme.",
      },
    ],
  },

  envSecurity: {
    number: "12",
    name: ".env & .gitignore",
    folder: "Rădăcina proiectului (/.env & /.gitignore)",
    tag: "SECURITATE API KEY • VARIABILE DE MEDIU & GIT",
    accent: "#1F3A34",
    summary:
      "Arhitectura de securitate pentru cheia personală TMDB API: cheia este izolată în fișierul .env din rădăcina proiectului și exclusă explicit din controlul versiunilor prin .gitignore, prevenind expunerea ei publică pe GitHub.",
    techNote:
      "Concepte aplicate: Variabile de mediu în Vite (prefixul obligatoriu VITE_), accesare securizată prin import.meta.env.VITE_TMDB_API_KEY și reguli de ignorare în Git (.gitignore).",
    code: `# 1. Fișierul .env (aflat în rădăcina proiectului, lângă package.json)
VITE_TMDB_API_KEY=6de5a3dd794ccaaae7f3a996ab4f0137

# 2. Fișierul .gitignore (protejează cheia împotriva publicării pe GitHub)
node_modules
dist
.env
.env.local`,
    codeWalkthrough: [
      {
        snippet: "VITE_TMDB_API_KEY=...",
        explanation:
          "Pentru securitate, Vite nu expune automat toate variabilele sistemului către browser, ci doar pe cele prefixate cu VITE_. Astfel controlăm exact ce informație ajunge în aplicație.",
      },
      {
        snippet: "import.meta.env.VITE_TMDB_API_KEY",
        explanation:
          "Metoda standard prin care HomePage.jsx și MovieDetails.jsx citesc cheia la compilare și o trimit în cererile fetch către TMDB API, păstrând designul și funcționalitățile intacte.",
      },
      {
        snippet: ".env & .env.local în .gitignore",
        explanation:
          "Regulă esențială în fluxul profesional Git & GitHub: fișierul .env rămâne doar pe calculatorul local și nu este urcat niciodată într-un repository public.",
      },
    ],
  },

  finalPageJsx: {
    number: "13",
    name: "FinalPage.jsx",
    folder: "src/pages/FinalPage.jsx",
    tag: "ETAPA 3 • CONCLUZII, COMPETENȚE & MULȚUMIRI (/final)",
    accent: "#365B52",
    summary:
      "Pagina de încheiere a fluxului în 3 etape (/final). Sintetizează într-un grid vizual cele 10 module și competențe dobândite pe parcursul cursului de Web Development și include secțiunea dedicată de mulțumiri pentru trainerul Cristian Barbu și IT School / AI School.",
    techNote:
      "Concepte aplicate: Structurarea datelor statice într-un array de obiecte (LEARNED_MODULES), randare dinamică cu .map(), componente iconografice transmise ca referință (item.icon) și navigare între etape cu <Link>.",
    code: `const LEARNED_MODULES = [
  { step: "01", title: "Fundamentul Web-ului", icon: Globe, accent: "#365B52", description: "..." },
  { step: "02", title: "CSS modern & framework-uri", icon: Palette, accent: "#C86D51", description: "..." },
  // ... toate cele 10 etape până la Proiectul final individual
];

export default function FinalPage() {
  return (
    <div className="space-y-10 py-2">
      {/* Card Mulțumiri Trainer Cristian Barbu • IT School / AI School */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {LEARNED_MODULES.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.step}>
              <IconComponent style={{ color: item.accent }} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
    codeWalkthrough: [
      {
        snippet: "const LEARNED_MODULES = [ ... 10 etape ... ]",
        explanation:
          "Separă conținutul (datele despre cele 10 module ale cursului) de structura JSX, făcând codul ușor de citit, extins și întreținut.",
      },
      {
        snippet: "const IconComponent = item.icon; <IconComponent ... />",
        explanation:
          "Demonstrează tratarea componentelor React ca valori JavaScript: fiecare obiect din array stochează referința către iconița sa Lucide, care este apoi randată dinamic.",
      },
      {
        snippet: "Cardul de mulțumiri & navigarea către / și /acasa",
        explanation:
          "Închide prezentarea într-o notă profesională, oferind acces rapid înapoi la Slide-uri (/) sau la Aplicația CineStream (/acasa).",
      },
    ],
  },
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [modalExpanded, setModalExpanded] = useState(false);
  const navigate = useNavigate();

  const zoomIn = () => setZoomLevel((z) => Math.min(z + 15, 145));
  const zoomOut = () => setZoomLevel((z) => Math.max(z - 15, 85));
  const resetZoom = () => setZoomLevel(100);

  const InteractiveFileCard = ({ fileKey, children }) => {
    const file = FILES_DETAILS[fileKey];
    return (
      <div
        onClick={() => {
          setSelectedFile(file);
          setModalExpanded(false);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") setSelectedFile(file);
        }}
        className="group relative bg-white p-5 rounded-2xl border border-[#E5E0D8] hover:border-[#365B52] shadow-sm hover:shadow-md transition-all cursor-pointer text-left flex flex-col justify-between"
        title={`Click pentru a deschide explicațiile detaliate și codul pentru ${file.name}`}
      >
        <div>{children}</div>
        <div className="mt-4 pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-sm font-semibold text-[#365B52] group-hover:text-[#C86D51] transition-colors">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Click pentru explicații
            detaliate pe cod
          </span>
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  };

  const slides = [
    // SLIDE 1: COPERTA PROIECTULUI
    {
      id: 1,
      badge: "IT SCHOOL • PROIECT FINAL FRONT-END",
      render: () => (
        <div className="text-center max-w-3xl mx-auto space-y-6 py-4">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#365B52] text-[#F7F5F0] shadow-md mb-1">
            <Film className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1F3A34] leading-tight">
            Proiect Final <br />
            <span className="text-[#365B52]">„Aplicație de căutat filme”</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B726E] max-w-2xl mx-auto">
            <strong>CineStream</strong> — Aplicație web Single Page Application
            (SPA) realizată în React, conectată la <strong>TMDB API</strong> cu{" "}
            <strong>API Key securizat</strong>, pentru căutarea, explorarea și
            salvarea filmelor și serialelor favorite.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="px-5 py-3 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm">
              <span className="text-[#6B726E]">Instituție: </span>
              <strong className="text-[#1F3A34]">IT School</strong>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm">
              <span className="text-[#6B726E]">Trainer: </span>
              <strong className="text-[#1F3A34]">Cristian Barbu</strong>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm">
              <span className="text-[#6B726E]">Cursant: </span>
              <strong className="text-[#C86D51]">Lupu Constantin</strong>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 2: CONTAINER CU CELE DOUĂ POZE (CB.png și LC.jpg)
    {
      id: 2,
      badge: "DESPRE TRAINER & CURSANT",
      render: () => (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F3A34]">
              Mentorat & Dezvoltare
            </h2>
            <p className="text-[#6B726E] text-sm mt-1">
              O colaborare între îndrumarea tehnică și pasiunea pentru
              dezvoltare web
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#365B52]/20 bg-[#365B52] flex items-center justify-center shadow-md">
                <img
                  src="/CB.png"
                  alt="Cristian Barbu"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover object-top z-10"
                />
                <span className="absolute text-2xl font-bold text-[#F7F5F0]">
                  CB
                </span>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#365B52]/10 text-[#365B52] text-sm font-semibold mb-2">
                  <GraduationCap className="w-3.5 h-3.5" /> Trainer IT School
                </span>
                <h3 className="text-xl font-bold text-[#1F3A34]">
                  Cristian Barbu
                </h3>
              </div>

              <p className="text-sm text-[#4A524E] leading-relaxed">
                Un mentor răbdător și atent la detalii, care ne-a ghidat de la
                fundamentele dezvoltării web până la arhitectura modernă în
                React, explicând clar legăturile dintre componente, fluxul
                datelor și bunele practici din industrie.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#C86D51]/25 bg-[#C86D51] flex items-center justify-center shadow-md">
                <img
                  src="/LC.jpg"
                  alt="Lupu Constantin"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover object-top z-10"
                />
                <span className="absolute text-2xl font-bold text-[#F7F5F0]">
                  LC
                </span>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C86D51]/15 text-[#C86D51] text-sm font-semibold mb-2">
                  <UserCheck className="w-3.5 h-3.5" /> Cursant & Autor Proiect
                </span>
                <h3 className="text-xl font-bold text-[#1F3A34]">
                  Lupu Constantin
                </h3>
              </div>

              <p className="text-sm text-[#4A524E] leading-relaxed">
                Pasionat de tehnologie și interfețe intuitive. Am dezvoltat
                acest proiect pentru a integra tot ce am acumulat la curs:
                structură semantică, rutare dinamică, apeluri autentificate cu
                API Key către TMDB și persistența datelor.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 3: STRUCTURA INTEGRALĂ A PROIECTULUI (INCLUSIV .env & .gitignore)
    {
      id: 3,
      badge: "STRUCTURA INTEGRALĂ A PROIECTULUI • CLICK PE FIȘIERE",
      render: () => (
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34]">
              Structura Completă a Proiectului
            </h2>
            <p className="text-[#6B726E] text-sm mt-1">
              Organizarea integrală a folderelor și fișierelor (click pe
              fișierele evidențiate #1 – #13 pentru explicații detaliate pe cod)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* COLOANA STÂNGĂ: ARBORELE COMPLET DIN PROIECT (SCROLLABIL) */}
            <div className="lg:col-span-6 bg-[#1F3A34] text-[#F7F5F0] p-4 rounded-2xl border border-[#365B52] shadow-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/15">
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#E5E0D8]">
                  <FolderTree className="w-4 h-4 text-[#C86D51]" />
                  Explorer — Structură Proiect
                </span>
                <span className="text-sm text-[#A8B5B0]">
                  Click pe fișierele (#1 – #13)
                </span>
              </div>

              <div className="max-h-[54vh] overflow-y-auto pr-1 space-y-0.5 font-mono text-sm">
                {FULL_PROJECT_TREE.map((item, idx) => {
                  if (item.type === "interactive") {
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedFile(FILES_DETAILS[item.fileKey]);
                          setModalExpanded(false);
                        }}
                        className="w-full flex items-center justify-between px-2 py-1 rounded-lg bg-white/10 hover:bg-[#C86D51] text-white font-bold transition-colors cursor-pointer text-left group"
                        title="Click pentru explicații detaliate pe cod"
                      >
                        <span>{item.text}</span>
                        <span className="inline-flex items-center gap-1 text-sm bg-black/25 px-2 py-0.5 rounded-full">
                          #{item.badge} • cod
                        </span>
                      </button>
                    );
                  }

                  if (item.type === "root") {
                    return (
                      <div
                        key={idx}
                        className="font-bold text-[#F5B097] pb-1 text-sm"
                      >
                        {item.text}
                      </div>
                    );
                  }

                  if (item.type === "folder") {
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-2 py-0.5 text-[#9AD1C2] font-semibold"
                      >
                        <span>{item.text}</span>
                        {item.note && (
                          <span className="text-sm font-sans text-white/50 italic">
                            {item.note}
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-2 py-0.5 ${
                        item.type === "muted"
                          ? "text-white/40"
                          : item.type === "config"
                            ? "text-white/75"
                            : "text-white/85"
                      }`}
                    >
                      <span>{item.text}</span>
                      {item.note && (
                        <span className="text-sm font-sans text-white/45 italic hidden sm:inline">
                          {item.note}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLOANA DREAPTĂ: DIAGRAMA VIZUALĂ & EXPLICAȚIA ZONELOR */}
            <div className="lg:col-span-6 space-y-3.5">
              {!imgError && (
                <div className="bg-white p-3 rounded-2xl border border-[#E5E0D8] shadow-sm flex justify-center">
                  <img
                    src="/arhitectura.png"
                    alt="Arhitectura Proiectului CineStream"
                    onError={() => setImgError(true)}
                    className="max-h-[30vh] w-auto object-contain rounded-xl"
                  />
                </div>
              )}

              <div className="bg-white p-4 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-2 text-sm">
                <h3 className="font-bold text-[#1F3A34] text-sm">
                  Cum este organizat proiectul pe straturi:
                </h3>
                <div className="space-y-1.5 text-[#4A524E]">
                  <p>
                    <strong className="text-[#365B52]">
                      1. Configurare & Build (Rădăcină):
                    </strong>{" "}
                    <code>vite.config.js</code>, <code>tailwind.config.js</code>
                    , <code>postcss.config.js</code> și{" "}
                    <code>package.json</code>.
                  </p>
                  <p>
                    <strong className="text-[#C86D51]">
                      2. Puncte de intrare & Stiluri:
                    </strong>{" "}
                    <code>index.html</code> (<code>#root</code>),{" "}
                    <code>src/main.jsx</code>, <code>src/App.jsx</code>,{" "}
                    <code>src/App.css</code> și <code>src/index.css</code>.
                  </p>
                  <p>
                    <strong className="text-[#1F3A34]">
                      3. Arhitectura modulară (src/):
                    </strong>{" "}
                    Separare clară între <code>components/</code> (
                    <code>Navbar</code>, <code>ShowCard</code>) și{" "}
                    <code>pages/</code> (<code>Presentation</code>,{" "}
                    <code>HomePage</code>, <code>MovieDetails</code>,{" "}
                    <code>Favorites</code>, <code>FinalPage</code>).
                  </p>
                </div>
              </div>

              {/* SECȚIUNE API KEY & SECURITATE (.env & .gitignore) */}
              <div className="bg-white p-4 rounded-2xl border border-[#C86D51]/40 shadow-sm space-y-2 text-sm">
                <h3 className="font-bold text-[#1F3A34] text-sm flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[#C86D51]" />
                  4. API Key TMDB &amp; Securitate (.env + .gitignore):
                </h3>
                <p className="text-[#4A524E] leading-relaxed">
                  Am adaptat <code>HomePage.jsx</code> și{" "}
                  <code>MovieDetails.jsx</code> să folosească{" "}
                  <strong>TMDB API</strong> cu cheia mea personală din{" "}
                  <code>.env</code> (
                  <code>import.meta.env.VITE_TMDB_API_KEY</code>), păstrând
                  exact același design și aceleași funcționalități.
                </p>
                <p className="text-[#4A524E] leading-relaxed">
                  Am inclus <code>.env</code> în fișierul{" "}
                  <code>.gitignore</code>, astfel încât cheia mea API să fie
                  protejată și să nu fie publicată pe GitHub.
                </p>
              </div>

              {/* SECȚIUNE RESURSE STATICE PUBLIC/ & DRAG AND DROP */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-1.5 text-sm">
                <h3 className="font-bold text-[#1F3A34] text-sm">
                  5. Resurse Statice (folderul public/ &amp; Drag &amp; Drop):
                </h3>
                <p className="text-[#4A524E] leading-relaxed">
                  <code>CB.png</code> și <code>LC.jpg</code> au fost adăugate în{" "}
                  <code>public/</code> prin <strong>drag &amp; drop</strong> în
                  Explorer-ul VS Code, alături de <code>favicon.svg</code> și{" "}
                  <code>icons.svg</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 4: FIȘIERELE 1 & 2
    {
      id: 4,
      badge: "PASUL 1 & 2 • CLICK PE CARD PENTRU EXPLICAȚII PE COD",
      render: () => (
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34]">
              1. index.html & 2. main.jsx
            </h2>
            <p className="text-[#6B726E] text-sm mt-1">
              Legătura dintre scheletul HTML de bază și aplicația React
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InteractiveFileCard fileKey="indexHtml">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1F3A34] font-bold">
                  <FileCode className="w-5 h-5 text-[#365B52]" />
                  <span>1. index.html (Rădăcina DOM)</span>
                </div>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Orice aplicație web pornește de la un fișier HTML cu structură
                  arborescentă (<code>&lt;html&gt;</code>,{" "}
                  <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code>). Fiind
                  un SPA, avem un singur container <code>#root</code>.
                </p>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-3.5 rounded-xl text-sm font-mono overflow-x-auto leading-relaxed">
                  {`<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>`}
                </pre>
              </div>
            </InteractiveFileCard>

            <InteractiveFileCard fileKey="mainJsx">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1F3A34] font-bold">
                  <Code2 className="w-5 h-5 text-[#C86D51]" />
                  <span>2. main.jsx (Montarea React)</span>
                </div>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Fișierul <code>main.jsx</code> preia elementul{" "}
                  <code>root</code> din HTML folosind{" "}
                  <code>document.getElementById</code> și randează componenta
                  părinte <code>&lt;App /&gt;</code>.
                </p>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-3.5 rounded-xl text-sm font-mono overflow-x-auto leading-relaxed">
                  {`import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <App />
);`}
                </pre>
              </div>
            </InteractiveFileCard>
          </div>
        </div>
      ),
    },

    // SLIDE 5: FIȘIERELE 3, 9 & 10 (App.jsx, App.css & index.css)
    {
      id: 5,
      badge: "PASUL 3, 9 & 10 • App.jsx, App.css & index.css",
      render: () => (
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34]">
              3. App.jsx • 9. App.css • 10. index.css
            </h2>
            <p className="text-[#6B726E] text-sm mt-1">
              Rutare SPA, Context, props.children și fișierele de stilizare CSS
              & Tailwind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InteractiveFileCard fileKey="appJsx">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#1F3A34]">
                  <Code2 className="w-5 h-5 text-[#C86D51]" />
                  <span>3. App.jsx (Router & Context)</span>
                </div>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Configurează <code>createBrowserRouter</code> în afara
                  componentei, gestionează <code>FavoritesContext</code> +{" "}
                  <code>localStorage</code> și încadrează paginile cu{" "}
                  <code>PageWrapper(&#123; children &#125;)</code>.
                </p>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-3 rounded-xl text-sm font-mono overflow-x-auto">
                  {`const router = createBrowserRouter([
  { path: '/', element: <Presentation /> },
  { path: '/acasa', element: <HomeRoute /> },
  { path: '/show/:id', element: <DetailsRoute /> },
  { path: '/final', element: <FinalRoute /> },
]);`}
                </pre>
              </div>
            </InteractiveFileCard>

            <InteractiveFileCard fileKey="appCss">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#1F3A34]">
                  <Palette className="w-5 h-5 text-[#365B52]" />
                  <span>9. App.css (Stilizare CSS)</span>
                </div>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Include variabile CSS (<code>var(--accent)</code>), CSS
                  Nesting nativ (<code>&amp;:hover</code>), transformări 3D (
                  <code>.hero</code>), Flexbox și <code>@media</code> queries.
                </p>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-3 rounded-xl text-sm font-mono overflow-x-auto">
                  {`.counter {
  color: var(--accent);
  background: var(--accent-bg);
  &:hover { border-color: var(--accent-border); }
}`}
                </pre>
              </div>
            </InteractiveFileCard>

            <InteractiveFileCard fileKey="indexCss">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#1F3A34]">
                  <Palette className="w-5 h-5 text-[#1F3A34]" />
                  <span>10. index.css (Tailwind & Body)</span>
                </div>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Activează directivele Tailwind CSS și setează stilurile
                  globale pe <code>body</code> (fundal <code>#f3ede2</code> și
                  text <code>#1c1917</code>).
                </p>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-3 rounded-xl text-sm font-mono overflow-x-auto">
                  {`@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f3ede2;
  color: #1c1917;
}`}
                </pre>
              </div>
            </InteractiveFileCard>
          </div>
        </div>
      ),
    },

    // SLIDE 6: FIȘIERELE 4 & 5
    {
      id: 6,
      badge: "PASUL 4 & 5 • COMPONENTE REUTILIZABILE",
      render: () => (
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34]">
              4. Navbar.jsx & 5. ShowCard.jsx
            </h2>
            <p className="text-[#6B726E] text-sm mt-1">
              HTML semantic, navigare SPA cu &lt;Link&gt; și transmiterea
              datelor prin props
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InteractiveFileCard fileKey="navbarJsx">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#1F3A34]">
                  <LayoutTemplate className="w-5 h-5 text-[#365B52]" />
                  <span>4. Navbar.jsx (components/)</span>
                </div>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Folosește tag-uri semantice (<code>&lt;header&gt;</code>,{" "}
                  <code>&lt;nav&gt;</code>), înlocuiește{" "}
                  <code>&lt;a href&gt;</code> cu <code>&lt;Link&gt;</code> și
                  leagă toate cele 3 etape ale proiectului.
                </p>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-3 rounded-xl text-sm font-mono overflow-x-auto">
                  {`<Link to="/favorites">
  <Heart /> Favorite ({favoritesCount})
</Link>`}
                </pre>
              </div>
            </InteractiveFileCard>

            <InteractiveFileCard fileKey="showCardJsx">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#1F3A34]">
                  <Layers className="w-5 h-5 text-[#C86D51]" />
                  <span>5. ShowCard.jsx (components/)</span>
                </div>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Componentă copil reutilizată în catalog și favorite. Primește{" "}
                  <code>show</code>, <code>isFavorite</code> și{" "}
                  <code>onToggleFavorite</code> prin props.
                </p>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-3 rounded-xl text-sm font-mono overflow-x-auto">
                  {`<Link to={\`/show/\${show.id}\`}>
  Vezi Detalii
</Link>`}
                </pre>
              </div>
            </InteractiveFileCard>
          </div>
        </div>
      ),
    },

    // SLIDE 7: PAGINILE & INTEGRAREA TMDB API KEY (.env + .gitignore)
    {
      id: 7,
      badge: "PAGINILE APLICAȚIEI & INTEGRAREA TMDB API KEY",
      render: () => (
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34]">
              Integrarea TMDB API Key &amp; Paginile Aplicației
            </h2>
            <p className="text-[#6B726E] text-sm mt-1">
              Click pe oricare card pentru a vedea cum este apelată cheia{" "}
              <code>import.meta.env.VITE_TMDB_API_KEY</code> și cum este
              protejată prin <code>.env</code> + <code>.gitignore</code>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InteractiveFileCard fileKey="envSecurity">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1F3A34] text-white text-sm font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 12. .env &amp;
                  .gitignore
                </span>
                <h3 className="font-bold text-[#1F3A34] text-base">
                  Securizare API Key
                </h3>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Cheia <code>VITE_TMDB_API_KEY</code> este stocată în{" "}
                  <code>.env</code> și ignorată prin <code>.gitignore</code> ca
                  să nu ajungă pe GitHub.
                </p>
              </div>
            </InteractiveFileCard>

            <InteractiveFileCard fileKey="homePageJsx">
              <div className="space-y-2.5">
                <span className="px-2.5 py-1 rounded-full bg-[#365B52]/10 text-[#365B52] text-sm font-bold">
                  6. HomePage.jsx
                </span>
                <h3 className="font-bold text-[#1F3A34] text-base">
                  TMDB API &amp; Căutare
                </h3>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Folosește <code>import.meta.env.VITE_TMDB_API_KEY</code>{" "}
                  pentru a încărca 40+ filme &amp; seriale și a căuta în timp
                  real.
                </p>
              </div>
            </InteractiveFileCard>

            <InteractiveFileCard fileKey="movieDetailsJsx">
              <div className="space-y-2.5">
                <span className="px-2.5 py-1 rounded-full bg-[#C86D51]/15 text-[#C86D51] text-sm font-bold">
                  7. MovieDetails.jsx
                </span>
                <h3 className="font-bold text-[#1F3A34] text-base">
                  Detalii &amp; Cast (TMDB)
                </h3>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Extrage <code>:id</code> cu <code>useParams()</code> și
                  apelează TMDB API cu cheia din <code>.env</code> pentru
                  detalii și distribuție.
                </p>
              </div>
            </InteractiveFileCard>

            <InteractiveFileCard fileKey="finalPageJsx">
              <div className="space-y-2.5">
                <span className="px-2.5 py-1 rounded-full bg-[#365B52]/10 text-[#365B52] text-sm font-bold">
                  8. Favorites &amp; 13. Final
                </span>
                <h3 className="font-bold text-[#1F3A34] text-base">
                  Favorite &amp; Concluzii
                </h3>
                <p className="text-sm text-[#4A524E] leading-relaxed">
                  Eliminare individuală a favoritelor salvate în{" "}
                  <code>localStorage</code> și pagina finală cu cele 10 etape
                  învățate la curs.
                </p>
              </div>
            </InteractiveFileCard>
          </div>
        </div>
      ),
    },

    // SLIDE 8: PROVOCĂRI TEHNICE & SECURITATE API KEY
    {
      id: 8,
      badge: "PROVOCĂRI TEHNICE & INTEGRARE API KEY",
      render: () => (
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34]">
              Provocări Rezolvate &amp; Securizarea Cheii API
            </h2>
            <p className="text-[#6B726E] text-sm mt-1">
              Cum am integrat TMDB API Key păstrând designul și protejând datele
              sensibile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#C86D51]">
                <Wrench className="w-5 h-5" />
                <span>Provocări tehnice rezolvate</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[#4A524E] leading-relaxed">
                <li>
                  <strong>1. Migrarea la TMDB API cu API Key real:</strong> Am
                  adaptat <code>HomePage.jsx</code> și{" "}
                  <code>MovieDetails.jsx</code> să folosească{" "}
                  <strong>TMDB API</strong> cu cheia mea din <code>.env</code> (
                  <code>import.meta.env.VITE_TMDB_API_KEY</code>), păstrând
                  exact același design și aceleași funcționalități.
                </li>
                <li>
                  <strong>2. Protejarea cheii API (.env + .gitignore):</strong>{" "}
                  Am configurat fișierul <code>.env</code> în rădăcina
                  proiectului și l-am adăugat în <code>.gitignore</code>, astfel
                  încât cheia mea să nu fie publicată pe GitHub.
                </li>
                <li>
                  <strong>3. Încărcare extinsă a catalogului:</strong> Am
                  combinat cereri paralele (<code>Promise.all</code>) și un
                  buton <em>„Încarcă mai multe”</em> pentru a afișa 40+ filme și
                  seriale.
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#365B52]">
                <Sparkles className="w-5 h-5" />
                <span>Ce urmează în Versiunea 2.0</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[#4A524E] leading-relaxed">
                <li>
                  - <strong>Filtrare avansată:</strong> După gen (Drama, Sci-Fi,
                  Comedy), an de lansare și nota minimă TMDB.
                </li>
                <li>
                  - <strong>Trailere oficiale din TMDB:</strong> Afișarea
                  videoclipurilor oficiale (<code>/videos</code>) direct în
                  pagina de detalii.
                </li>
                <li>
                  - <strong>Sincronizare cont TMDB:</strong> Autentificare
                  utilizator cu Session ID din TMDB.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 9: FLUXUL APLICAȚIEI & DEMO LIVE
    {
      id: 9,
      badge: "FUNCȚIONALITATE & DEMO LIVE",
      render: () => (
        <div className="max-w-3xl mx-auto text-center space-y-6 py-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F3A34]">
            Cum funcționează aplicația în sine
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#365B52]">
                <Search className="w-5 h-5" />
                <span>1. Căutare Filme &amp; Seriale (TMDB API)</span>
              </div>
              <p className="text-sm text-[#4A524E] leading-relaxed">
                Introduci titlul dorit în bara de căutare, aplicația trimite un
                request autentificat cu cheia din <code>.env</code> către{" "}
                <strong>TMDB API</strong>, primește răspunsul JSON și afișează
                instant rezultatele cu poster, notă, an și gen.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C86D51]">
                <Heart className="w-5 h-5" />
                <span>2. Salvare &amp; Eliminare Individuală la Favorite</span>
              </div>
              <p className="text-sm text-[#4A524E] leading-relaxed">
                Apeși pe inimioara de pe orice card sau din pagina de detalii.
                Contorul din <code>Navbar</code> se actualizează instant, iar în
                pagina de Favorite poți elimina individual orice titlu salvat în{" "}
                <code>localStorage</code>.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate("/acasa")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#365B52] hover:bg-[#2A4841] text-white font-bold text-base shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              Deschide Aplicația CineStream (Demo Live)
            </button>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedFile) {
        if (e.key === "Escape") setSelectedFile(null);
        return;
      }
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFile]);

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1F3A34] flex flex-col justify-between p-4 sm:p-8 overflow-y-auto">
      {/* BARA DE SUS + CONTROALE ZOOM */}
      <div className="max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-widest uppercase text-[#C86D51]">
            {slides[currentSlide].badge}
          </span>
          <span className="text-sm text-[#6B726E] font-medium">
            ({currentSlide + 1} / {slides.length})
          </span>
        </div>

        {/* CONTROALE MĂRIRE PAGINĂ (ZOOM) */}
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E5E0D8] shadow-sm">
          <button
            onClick={zoomOut}
            className="p-1 text-[#6B726E] hover:text-[#1F3A34] cursor-pointer"
            title="Micșorează textul"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-[#1F3A34] min-w-[3rem] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={zoomIn}
            className="p-1 text-[#6B726E] hover:text-[#1F3A34] cursor-pointer"
            title="Mărește textul"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          {zoomLevel !== 100 && (
            <button
              onClick={resetZoom}
              className="p-1 text-[#C86D51] hover:text-[#1F3A34] cursor-pointer ml-1"
              title="Resetează la 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => navigate("/acasa")}
          className="text-sm font-semibold text-[#6B726E] hover:text-[#1F3A34] underline transition-colors cursor-pointer"
        >
          Sari direct în aplicație →
        </button>
      </div>

      {/* CONȚINUTUL SLIDE-ULUI CURENT */}
      <div
        style={{ zoom: `${zoomLevel}%` }}
        className="max-w-6xl w-full mx-auto my-auto py-6 transition-all"
      >
        {slides[currentSlide].render()}
      </div>

      {/* CONTROALELE DE JOS + FOOTER */}
      <div className="max-w-6xl w-full mx-auto space-y-4">
        <div className="flex items-center justify-between border-t border-[#E5E0D8] pt-5">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              currentSlide === 0
                ? "text-[#B5B0A6] cursor-not-allowed"
                : "bg-white border border-[#E5E0D8] text-[#1F3A34] hover:bg-[#EAE5DC] cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Înapoi
          </button>

          {/* PUNCTELE DE PROGRES */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  index === currentSlide
                    ? "w-8 bg-[#365B52]"
                    : "w-2.5 bg-[#DCD6CC] hover:bg-[#B5B0A6]"
                }`}
                title={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {isLastSlide ? (
            <button
              onClick={() => navigate("/acasa")}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#365B52] hover:bg-[#2A4841] text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Intră în aplicație <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#365B52] hover:bg-[#2A4841] text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Înainte <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* FOOTER OFICIAL PROIECT FINAL */}
        <footer className="text-center text-sm font-medium text-[#4A524E] pt-1">
          Proiect Final - IT School, Aplicație de căutat filme, promotia 2026 @
          Toate drepturile rezervate
        </footer>
      </div>

      {/* FEREASTRĂ INTERACTIVĂ CU EXPLICAȚII DETALIATE PE COD (SCROLL + ZOOM) */}
      {selectedFile && (
        <div
          onClick={() => setSelectedFile(null)}
          className="fixed inset-0 z-50 bg-[#1F3A34]/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ zoom: `${zoomLevel}%` }}
            className={`bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl shadow-2xl flex flex-col transition-all ${
              modalExpanded
                ? "w-full h-[94vh] max-w-6xl"
                : "w-full max-w-4xl max-h-[88vh]"
            }`}
          >
            {/* HEADER MODAL */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E0D8] rounded-t-2xl flex-shrink-0">
              <div>
                <span
                  style={{ backgroundColor: selectedFile.accent }}
                  className="inline-block px-2.5 py-0.5 rounded-full text-white text-sm font-bold tracking-wider uppercase mb-1"
                >
                  {selectedFile.tag} • {selectedFile.folder}
                </span>
                <h3 className="text-xl font-extrabold text-[#1F3A34] font-mono">
                  {selectedFile.number}. {selectedFile.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-full bg-[#F7F5F0] hover:bg-[#EAE5DC] text-[#1F3A34] cursor-pointer"
                  title="Micșorează"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-full bg-[#F7F5F0] hover:bg-[#EAE5DC] text-[#1F3A34] cursor-pointer"
                  title="Mărește"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModalExpanded(!modalExpanded)}
                  className="px-3 py-1.5 rounded-full bg-[#365B52] text-white text-sm font-semibold hover:bg-[#2A4841] flex items-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  {modalExpanded ? "Dimensiune normală" : "Mărește fereastra"}
                </button>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-2 rounded-full bg-[#FDF2EF] hover:bg-[#C86D51] text-[#C86D51] hover:text-white transition-colors cursor-pointer"
                  title="Închide (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CORP MODAL CU SCROLL VERTICAL */}
            <div className="p-6 overflow-y-auto space-y-5 flex-grow">
              <div className="bg-white p-4 rounded-xl border border-[#E5E0D8] space-y-1.5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#365B52]">
                  Rolul fișierului în arhitectură
                </h4>
                <p className="text-sm text-[#1F3A34] leading-relaxed">
                  {selectedFile.summary}
                </p>
              </div>

              <div className="bg-[#EFECE6] p-4 rounded-xl border border-[#DCD6CC] space-y-1.5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#C86D51]">
                  Concepte &amp; Componente aplicate
                </h4>
                <p className="text-sm text-[#1F3A34] leading-relaxed">
                  {selectedFile.techNote}
                </p>
              </div>

              {/* CODUL SURSĂ COMPLET */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1F3A34] flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#365B52]" />
                  Codul sursă al fișierului
                </h4>
                <pre className="bg-[#1F3A34] text-[#F7F5F0] p-4 rounded-xl text-sm font-mono overflow-x-auto overflow-y-auto max-h-72 leading-relaxed shadow-inner">
                  {selectedFile.code}
                </pre>
              </div>

              {/* EXPLICAȚII DETALIATE PE FIECARE SECVENȚĂ DE COD */}
              <div className="bg-white p-5 rounded-xl border border-[#E5E0D8] space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#365B52]">
                  Explicație detaliată pe cod (ce face fiecare secvență și de
                  ce)
                </h4>
                <div className="space-y-3">
                  {selectedFile.codeWalkthrough.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] space-y-1.5"
                    >
                      <code className="inline-block px-2.5 py-1 rounded-md bg-[#1F3A34] text-[#F7F5F0] text-sm font-mono">
                        {step.snippet}
                      </code>
                      <p className="text-sm text-[#1F3A34] leading-relaxed">
                        {step.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
