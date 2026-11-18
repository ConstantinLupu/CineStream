# CineStream — Aplicație web de căutare și gestionare a filmelor și serialelor

Proiect Final — Curs Web Development
Instituție: IT School (Promoția 2026)  
Autor: Lupu Constantin  
Trainer: Cristian Barbu

## 1. Descrierea generală a proiectului

CineStream este o aplicație web de tip Single Page Application (SPA) dezvoltată în React, care permite căutarea, explorarea detaliată și salvarea serialelor și filmelor preferate într-o listă persistentă. Datele afișate în timp real sunt preluate prin apeluri HTTP asincrone către serviciul extern TVMaze REST API.

Aplicația a fost proiectată nu doar ca un produs funcțional de portofoliu, ci și ca un instrument complet de susținere a proiectului final, fiind organizată într-un flux logic împărțit în trei etape distincte:

1. Etapa 1 — Prezentarea tehnică interactivă (`/`)
   O prezentare integrată direct în aplicație (9 slide-uri), care expune echipa (trainer și cursant), arhitectura pe straturi a proiectului, arborele complet al folderelor și fișierelor, precum și ferestre modale interactive cu explicații detaliate pe secvențe de cod.
2. Etapa 2 — Aplicația CineStream (`/acasa`, `/show/:id`, `/favorites`)
   Aplicația propriu-zisă de catalog, căutare și gestionare a preferințelor utilizatorului, construită cu navigare fără reîncărcarea paginii.
3. Etapa 3 — Concluzii, Competențe și Mulțumiri (`/final`)
   O secțiune dedicată sintezei celor 10 module și competențe tehnice dobândite pe parcursul programului de pregătire, însoțită de mulțumirile adresate trainerului și instituției.

## 2. Funcționalități principale

### A. Catalog și căutare în timp real (`/acasa`)

- Încărcarea automată a unei selecții de seriale populare la deschiderea paginii, prin intermediul hook-ului `useEffect`.
- Formular de căutare interactiv care interoghează dinamic endpoint-ul `https://api.tvmaze.com/search/shows?q=...` și actualizează rezultatele fără refresh.
- Gestionarea completă a stărilor de interfață: indicator vizual de încărcare (`loading`), tratarea excepțiilor de rețea (`error`) și afișarea mesajelor dedicate atunci când nu există rezultate.
- Tratarea sigură a datelor incomplete din API prin _Optional Chaining_ (`?.`) și imagini de rezervă (_fallback_) pentru titlurile fără poster.

### B. Pagina de detalii cu rutare dinamică (`/show/:id`)

- Extragerea parametrului dinamic `:id` din URL folosind hook-ul `useParams()`.
- Interogarea endpoint-ului `https://api.tvmaze.com/shows/:id?embed=cast` pentru a prelua într-un singur răspuns JSON atât detaliile complete ale serialului (titlu, an, genuri, rating, rețea TV, status), cât și distribuția actorilor.
- Curățarea rezumatului primit de la API de tag-uri HTML reziduale (`<p>`, `<b>`, `<i>`) folosind expresii regulate (_RegEx_), pentru o afișare clară a textului.

### C. Sistemul de favorite persistent (`/favorites`)

- Adăugarea sau eliminarea unui titlu din lista de favorite atât din pagina principală (`ShowCard`), cât și din pagina de detalii (`MovieDetails`).
- Sincronizarea stării globale prin React Context API (`FavoritesContext`), actualizând instant contorul afișat în bara de navigație (`Navbar`).
- Persistența automată a datelor în browser prin LocalStorage API, astfel încât lista salvată să rămână intactă după închiderea sau reîncărcarea paginii.
- Posibilitatea de a elimina individual orice titlu din pagina de favorite prin butonul dedicat de ștergere de pe fiecare card.

### D. Prezentare interactivă și documentație integrată (`/`)

- Navigare între slide-uri atât prin controale vizuale, cât și din tastatură (`ArrowLeft`, `ArrowRight`, `Escape`).
- Controale de scalare a interfeței (`Zoom In`, `Zoom Out`, `Reset 100%`) pentru lizibilitate optimă în timpul prezentării.
- Explorer interactiv al fișierelor proiectului, cu inspecție pe cod și explicații pas cu pas.

## 3. Tehnologii și arhitectură

- React (Hooks & Context API): Organizarea interfeței în componente modulare și reutilizabile (`useState`, `useEffect`, `useContext`, `createContext`).
- React Router (`createBrowserRouter` & `RouterProvider`): Configurarea declarativă a rutelor SPA în afara componentei rădăcină, gestionarea rutelor dinamice (`/show/:id`) și navigarea prin `<Link>` și `useNavigate()`.
- Tailwind CSS & CSS3: Stilizare bazată pe clase utilitare, design _responsive_ și _mobile-first_, completată de stiluri globale și reguli CSS personalizate.
- Lucide React: Librărie de pictograme vectoriale scalabile pentru elementele de navigație și acțiuni.
- TVMaze REST API: Sursă externă de date cinematografice în format JSON.
- LocalStorage API: Stocare locală în browser pentru preferințele utilizatorului.
- Vite: Bundler modern pentru dezvoltare rapidă (HMR) și optimizarea pachetului de producție.

## 4. Structura proiectului

Aplicație de căutat filme- Proiect Final/
├── public/ # Resurse statice servite direct din rădăcină
│ ├── CB.png # Portret trainer (Cristian Barbu)
│ ├── LC.jpg # Portret cursant (Lupu Constantin)
│ ├── favicon.svg # Pictograma aplicației în tab-ul browserului
│ └── icons.svg # Resurse vectoriale statice
├── src/
│ ├── assets/ # Resurse grafice interne ale aplicației
│ │ ├── hero.png
│ │ ├── react.svg
│ │ └── vite.svg
│ ├── components/ # Componente UI reutilizabile
│ │ ├── Navbar.jsx # Bara de navigație superioară și contorul de favorite
│ │ └── ShowCard.jsx # Cardul individual pentru afișarea unui serial
│ ├── pages/ # Paginile corespunzătoare rutelor aplicației
│ │ ├── Presentation.jsx # Etapa 1: Prezentarea interactivă a proiectului (/)
│ │ ├── HomePage.jsx # Etapa 2: Catalogul și căutarea serialelor (/acasa)
│ │ ├── MovieDetails.jsx # Detaliile complete ale unui serial (/show/:id)
│ │ ├── Favorites.jsx # Lista de seriale favorite (/favorites)
│ │ └── FinalPage.jsx # Etapa 3: Competențe dobândite și mulțumiri (/final)
│ ├── App.jsx # Definirea routerului, FavoritesContext și PageWrapper
│ ├── App.css # Stiluri CSS personalizate
│ ├── index.css # Configurarea Tailwind CSS și stilurile globale
│ └── main.jsx # Punctul de intrare React și montarea în DOM (#root)
├── index.html # Documentul HTML unic al aplicației SPA
├── package.json # Dependințele proiectului și scripturile npm
├── postcss.config.js # Configurare PostCSS
├── tailwind.config.js # Configurare Tailwind CSS
├── vite.config.js # Configurare Vite
└── README.md # Documentația tehnică a proiectului

## 5. Competențe integrate în acest proiect

Dezvoltarea aplicației CineStream reflectă aplicarea practică a etapelor parcurse în cadrul cursului de Web Development:

1. Fundamentul Web-ului: Înțelegerea comunicării client–server, structurarea semantică HTML5 și arhitectura unei aplicații web moderne.
2. CSS modern și framework-uri: Utilizarea Flexbox, Grid, a designului responsive și a framework-ului Tailwind CSS.
3. JavaScript aplicat: Lucrul cu funcții, metode pe array-uri (`.map()`, `.filter()`, `.some()`), manipularea DOM-ului, Promises și `fetch` API.
4. Organizare și siguranță în cod: Scrierea unui cod modular, predictibil și ușor de întreținut.
5. Git și workflow profesional: Gestionarea versiunilor și organizarea structurii proiectului conform bunelor practici.
6. React și aplicații moderne: Gestionarea stării locale și globale, ciclul de viață al componentelor și rutarea SPA.
7. Arhitectură de aplicații complete: Structurarea rutelor, separarea componentelor de pagini și gestionarea fluxului de date.
8. Standarde reale de dezvoltare: Abordare _mobile-first_, tratarea erorilor de rețea și accesibilitate.
9. AI și Vibe Coding: Utilizarea asistată a inteligenței artificiale pentru planificarea arhitecturii, rafinarea codului și depanare eficientă.
10. Proiect final individual: Integrarea tuturor conceptelor într-o aplicație completă, funcțională și documentată.

## 6. Instalare și rulare locală

Pentru a rula proiectul pe un mediu local de dezvoltare, sunt necesare **Node.js** și **npm** instalate pe sistem.

1. Instalarea dependințelor proiectului:

bash
npm install

2. Pornirea serverului local de dezvoltare:

bash
npm run dev

3. Accesarea aplicației în browser:
   Deschide adresa afișată în terminal (implicit `http://localhost:5173`).
4. Generarea versiunii optimizate pentru producție (opțional):

bash
npm run build

## 7. Mulțumiri

Mulțumiri speciale trainerului Cristian Barbu și echipei IT School pentru structura clară a programului, îndrumarea constantă și sprijinul oferit pe tot parcursul cursului de Web Development.

Proiect Final - IT School, Aplicație de căutat filme, promoția 2026 @ Toate drepturile rezervate
