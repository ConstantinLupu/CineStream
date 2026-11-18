import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Globe,
  Palette,
  Code2,
  FileCode2,
  GitBranch,
  Atom,
  Layers,
  ShieldCheck,
  Sparkles,
  Rocket,
  GraduationCap,
  HeartHandshake,
  ArrowLeft,
  Presentation,
} from "lucide-react";

const LEARNED_MODULES = [
  {
    step: "01",
    title: "Fundamentul Web-ului",
    icon: Globe,
    accent: "#365B52",
    description:
      "Am înțeles cum funcționează internetul și relația dintre browser și server. Construiesc pagini folosind HTML și CSS, aplic principii de responsive design și structurez corect o aplicație web modernă.",
  },
  {
    step: "02",
    title: "CSS modern & framework-uri",
    icon: Palette,
    accent: "#C86D51",
    description:
      "Lucrez cu Flexbox, Grid, animații și elemente avansate de stilizare. Folosesc framework-uri precum Bootstrap și Tailwind CSS pentru a construi rapid interfețe moderne și scalabile.",
  },
  {
    step: "03",
    title: "JavaScript aplicat",
    icon: Code2,
    accent: "#365B52",
    description:
      "Am trecut de la sintaxă la logică reală: funcții, array methods, manipulare DOM, validare formulare, Promises și Fetch API. Interacționez cu API-uri externe și gestionez date într-o aplicație funcțională.",
  },
  {
    step: "04",
    title: "TypeScript",
    icon: FileCode2,
    accent: "#C86D51",
    description:
      "Scriu JavaScript într-un mod mai sigur și mai organizat. TypeScript ajută la detectarea erorilor înainte de rularea codului și crește viteza de lucru pe măsură ce aplicația devine mai complexă.",
  },
  {
    step: "05",
    title: "Git & workflow profesional",
    icon: GitBranch,
    accent: "#365B52",
    description:
      "Lucrez cu Git și linia de comandă, gestionez versiuni, creez pull requests și public proiectele pe GitHub — aplicând un flux de lucru apropiat de cel din echipele reale.",
  },
  {
    step: "06",
    title: "React & aplicații moderne",
    icon: Atom,
    accent: "#C86D51",
    description:
      "Construiesc aplicații complete folosind React, hooks, routing și integrare cu API-uri. Îmbin logica, interfața și gestionarea de stare într-un proiect final funcțional.",
  },
  {
    step: "07",
    title: "Next.js & aplicații complete",
    icon: Layers,
    accent: "#365B52",
    description:
      "Am descoperit Next.js — unul dintre cele mai populare framework-uri din dezvoltarea web modernă — cu ajutorul căruia construim aplicații complete, structurăm rute, gestionăm date și publicăm proiecte online.",
  },
  {
    step: "08",
    title: "Lucrezi după standarde reale",
    icon: ShieldCheck,
    accent: "#C86D51",
    description:
      "Aplic principii folosite în proiecte reale: structurare clară a codului, abordare responsive și mobile-first, utilizarea documentației oficiale, versionare cu Git și noțiuni de accesibilitate și optimizare.",
  },
  {
    step: "09",
    title: "AI & Vibe Coding",
    icon: Sparkles,
    accent: "#365B52",
    description:
      "Folosesc AI-ul ca instrument activ de dezvoltare: scriu prompt-uri clare pentru a genera și ajusta cod, planific arhitectura proiectului prin dialog iterativ și depanez erori eficient prin prompt engineering aplicat.",
  },
  {
    step: "10",
    title: "Proiect final individual",
    icon: Rocket,
    accent: "#C86D51",
    description:
      "Am dezvoltat o aplicație completă (CineStream), integrând tot ce am învățat: structură, logică, interfață și comunicare cu API-uri — un proiect de portofoliu care reflectă nivelul tehnic atins la finalul cursului.",
  },
];

export default function FinalPage() {
  return (
    <div className="space-y-10 py-2">
      {/* SECȚIUNEA 1: ANTET & MULȚUMIRI */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#365B52]/10 text-[#365B52] text-sm font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" /> Etapa 3 • Concluzii, Competențe &amp;
          Mulțumiri
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F3A34] leading-tight">
          Ce am învățat la cursul de{" "}
          <span className="text-[#C86D51]">Web Development</span>
        </h1>

        <p className="text-sm sm:text-base text-[#4A524E] max-w-2xl mx-auto leading-relaxed">
          De la prima sesiune până la absolvire, fiecare etapă a acestui program
          mi-a oferit fundația tehnică și încrederea necesară pentru a construi
          aplicații web moderne de la zero.
        </p>

        {/* CARD SPECIAL DE MULȚUMIRI PENTRU TRAINER */}
        <div className="mt-6 bg-[#F7F5F0] rounded-2xl p-6 border border-[#E5E0D8] text-left flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#365B52]/25 bg-[#365B52] flex-shrink-0 flex items-center justify-center shadow-md">
            <img
              src="/CB.png"
              alt="Cristian Barbu"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="w-full h-full object-cover object-top z-10"
            />
            <span className="absolute text-lg font-bold text-[#F7F5F0]">
              CB
            </span>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C86D51]">
              <HeartHandshake className="w-4 h-4" /> Mulțumiri speciale
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1F3A34]">
              Trainer Cristian Barbu • IT School / AI School
            </h2>
            <p className="text-sm text-[#4A524E] leading-relaxed">
              Mulțumesc trainerului <strong>Cristian Barbu</strong> și echipei{" "}
              <strong>IT School / AI School</strong> pentru răbdare, claritatea
              explicațiilor și modul practic în care ne-au ghidat pas cu pas —
              de la primele linii de HTML și CSS până la arhitectura modernă în
              React, Next.js și lucrul eficient cu AI-ul în dezvoltarea web.
            </p>
          </div>
        </div>
      </section>

      {/* SECȚIUNEA 2: CELE 10 ETAPE ÎNVĂȚATE LA CURS */}
      <section className="space-y-5">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#365B52]">
            <GraduationCap className="w-4 h-4" /> Parcursul complet al cursului
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F3A34] mt-1">
            Competențele dobândite de la prima sesiune până la absolvire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LEARNED_MODULES.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-[#E5E0D8] hover:border-[#365B52] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      style={{ backgroundColor: `${item.accent}15` }}
                      className="p-3 rounded-xl inline-flex items-center justify-center"
                    >
                      <IconComponent
                        style={{ color: item.accent }}
                        className="w-6 h-6"
                      />
                    </div>
                    <span
                      style={{ color: item.accent }}
                      className="text-sm font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-[#F7F5F0] border border-[#E5E0D8]"
                    >
                      Etapa {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1F3A34]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#4A524E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECȚIUNEA 3: SEMNĂTURĂ CURSANT & NAVIGARE RAPIDĂ ÎNTRE CELE 3 ETAPE */}
      <section className="bg-[#1F3A34] text-[#F7F5F0] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <p className="text-sm uppercase tracking-widest text-[#F5B097] font-bold">
            Absolvent Web Development • Promoția 2026
          </p>
          <h3 className="text-2xl font-extrabold">Lupu Constantin</h3>
          <p className="text-sm text-[#DCE3E0]">
            Vă mulțumesc pentru atenție și pentru întreaga experiență de
            învățare!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
          >
            <Presentation className="w-4 h-4" /> 1. Prezentare
          </Link>
          <Link
            to="/acasa"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C86D51] hover:bg-[#B55C40] text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> 2. Înapoi la Aplicația de Filme
          </Link>
        </div>
      </section>
    </div>
  );
}
