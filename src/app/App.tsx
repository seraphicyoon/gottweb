import image_WhatsApp_Image_2026_09_04_at_12_44_00_PM_5 from '@/imports/WhatsApp_Image_2026-09-04_at_12.44.00_PM-5.jpeg'
import image_teresa_2 from '@/imports/teresa-2.png'
import image_WhatsApp_Image_2026_09_04_at_12_44_00_PM_4 from '@/imports/WhatsApp_Image_2026-09-04_at_12.44.00_PM-4.jpeg'
import image_WhatsApp_Image_2026_09_04_at_12_44_00_PM_3 from '@/imports/WhatsApp_Image_2026-09-04_at_12.44.00_PM-3.jpeg'
import image_WhatsApp_Image_2026_09_04_at_12_44_00_PM_2 from '@/imports/WhatsApp_Image_2026-09-04_at_12.44.00_PM-2.jpeg'
import image_teresa2_1 from '@/imports/teresa2-1.png'
import image_teresa_1 from '@/imports/teresa-1.png'
import image_teresa2 from '@/imports/teresa2.png'
import image_teresa from '@/imports/teresa.png'
import image_c45ac056fc6d1b61140c12d5f25b495a from '@/imports/c45ac056fc6d1b61140c12d5f25b495a.jpg'
import image_WhatsApp_Image_2026_09_04_at_12_44_00_PM_1 from '@/imports/WhatsApp_Image_2026-09-04_at_12.44.00_PM-1.jpeg'
import image_WhatsApp_Image_2026_09_04_at_12_44_00_PM from '@/imports/WhatsApp_Image_2026-09-04_at_12.44.00_PM.jpeg'
import image_a6581ea87ef7420b4834deabc17656a8 from '@/imports/a6581ea87ef7420b4834deabc17656a8.jpg'
import convivioFoto from '@/imports/convivio-15-septiembre-2026.webp'
import octubreFoto1 from '@/imports/actividad-5-octubre-2026-1.webp'
import octubreFoto2 from '@/imports/actividad-5-octubre-2026-2.webp'
import dinamicaFoto1 from '@/imports/dinamica-28-septiembre-2026-1.webp'
import dinamicaFoto2 from '@/imports/dinamica-28-septiembre-2026-2.webp'
import dinamicaFoto3 from '@/imports/dinamica-28-septiembre-2026-3.webp'
import getsLogo from '@/imports/gets-logo.png'
import getsWordmark from '@/imports/gets-wordmark.png'
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, type GalleryComment } from "./supabase";
import { Classroom, StudentManager } from './Classroom';
import {
  Menu, X, Search, Play, Users, BookOpen, MapPin, Phone,
  Mail, Clock, ArrowRight, Calendar, Music, ChevronDown,
  ChevronRight, LayoutDashboard, UserCheck, Building2, LogOut,
  TrendingUp, MessageSquare, CheckCircle, Eye, Trash2, Upload,
  Heart, Filter, Headphones, Bell, Star, Globe, Handshake,
  Video, Leaf, ScrollText
} from "lucide-react";

type Page = "home" | "about" | "events" | "sermons" | "gallery" | "contact" | "login" | "admin" | "classroom" | "diocese" | "studies" | "parish" | "diocesanMeetings" | "fratelli" | "carmelo" | "diocesanActivities" | "lumen";
const PAGE_PATHS: Record<Page, string> = {
  home: "/", about: "/nosotros", events: "/actividades",
  carmelo: "/actividades/carmelo-descalzo", diocesanActivities: "/actividades/diocesanas", lumen: "/actividades/santa-teresa-lumen-gentium", fratelli: "/historia/estudio-fratelli-tutti", parish: "/historia/parroquia-nuestra-senora-del-rosario", diocesanMeetings: "/historia/encuentros-diocesanos", studies: "/historia/estudios-personales", diocese: "/historia/actividades-diocesis-tampico", sermons: "/ensenanzas-e-historia", gallery: "/galeria",
  contact: "/contacto", login: "/ingresar", admin: "/admin", classroom: "/alumnas",
};
function pageFromPath(path: string): Page {
  const normalized = path.replace(/\/+$/, "") || "/";
  return (Object.entries(PAGE_PATHS).find(([, value]) => value === normalized)?.[0] as Page | undefined) || "home";
}


const IMG = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;

// ===================== DATA =====================

const SERMONS = [
  {
    id: 1,
    title: "Walking in the Light of Truth",
    speaker: "Pastor Emmanuel Kwame",
    date: "June 29, 2025",
    duration: "48 min",
    passage: "John 8:12–20",
    topic: "Discipleship",
    thumb: "photo-1481627834876-b7833e8f5570",
    type: "video",
    featured: true,
  },
  {
    id: 2,
    title: "The Power of Community Prayer",
    speaker: "Elder Sarah Mensah",
    date: "June 22, 2025",
    duration: "35 min",
    passage: "Matthew 18:19–20",
    topic: "Prayer",
    thumb: "photo-1508387027939-27cccde278e8",
    type: "audio",
    featured: false,
  },
  {
    id: 3,
    title: "Faith That Moves Mountains",
    speaker: "Pastor Emmanuel Kwame",
    date: "June 15, 2025",
    duration: "52 min",
    passage: "Mark 11:22–24",
    topic: "Faith",
    thumb: "photo-1504052434569-70ad5836ab65",
    type: "video",
    featured: false,
  },
  {
    id: 4,
    title: "Called to Serve",
    speaker: "Deacon Kofi Asante",
    date: "June 8, 2025",
    duration: "41 min",
    passage: "Mark 10:43–45",
    topic: "Service",
    thumb: "photo-1469571486292-0ba58a3f068b",
    type: "video",
    featured: false,
  },
  {
    id: 5,
    title: "The Good Shepherd",
    speaker: "Elder Sarah Mensah",
    date: "June 1, 2025",
    duration: "38 min",
    passage: "John 10:1–18",
    topic: "Identity",
    thumb: "photo-1493225457124-a3eb161ffa5f",
    type: "audio",
    featured: false,
  },
  {
    id: 6,
    title: "Bearing Fruit in Season",
    speaker: "Pastor Emmanuel Kwame",
    date: "May 25, 2025",
    duration: "45 min",
    passage: "John 15:1–17",
    topic: "Growth",
    thumb: "photo-1531206715517-5c0ba140b2b8",
    type: "video",
    featured: false,
  },
];

const EVENTS = [
  {
    id: 1,
    title: "La Libertad Interior en Santa Teresa de Jesús",
    date: "Todos los lunes.",
    time: "10:00 A.M a 12:00 P.M | 5:00 P.M a 6:30 P.M (2 Grupos).",
    location: "Parroquia San Pedro y San Pablo, Casa Parroquial (Col. Sierra Morena).",
    category: "Worship",
    image: "photo-1529070538774-1843cb3265df",
    featured: true,
    description: "Únete a este taller interactivo impartido por la Lic. María Luisa Rodríguez Assemat. Un espacio para descubrir que \"La Verdadera Libertad nace del interior\".",
  },
  {
    id: 2,
    title: "Young Adults Hangout",
    date: "July 12, 2025",
    time: "6:00 PM",
    location: "Fellowship Hall",
    category: "Youth",
    image: "photo-1488521787991-ed7bbaae773c",
    featured: false,
    description: "An evening of fellowship, worship, and the Word for young adults aged 18–35.",
  },
  {
    id: 3,
    title: "Community Bible Study",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Room 204 & Online",
    category: "Bible Study",
    image: "photo-1504052434569-70ad5836ab65",
    featured: false,
    description: "Deep dive into Scripture in small groups led by trained facilitators.",
  },
  {
    id: 4,
    title: "Prayer & Intercession Night",
    date: "July 18, 2025",
    time: "8:00 PM",
    location: "Prayer Chapel",
    category: "Prayer",
    image: "photo-1508387027939-27cccde278e8",
    featured: false,
    description: "An evening dedicated to corporate prayer, intercession, and seeking God together.",
  },
  {
    id: 5,
    title: "Community Outreach Day",
    date: "July 26, 2025",
    time: "9:00 AM",
    location: "City Centre Park",
    category: "Outreach",
    image: "photo-1469571486292-0ba58a3f068b",
    featured: false,
    description: "Serving our local community with food, practical help, and the love of Christ.",
  },
  {
    id: 6,
    title: "GETS Annual Conference",
    date: "August 15–17, 2025",
    time: "All Day",
    location: "Main Campus",
    category: "Conference",
    image: "photo-1523580494863-6f3031224c42",
    featured: false,
    description: "Three days of intensive teaching, worship, and ministry for disciples of all ages.",
  },
];

const TESTIMONIALS = [
  {
    name: "Abena Owusu",
    role: "Community Member",
    avatar: "photo-1494790108377-be9c29b29330",
    text: "GETS transformed my faith. I came as a stranger and found a family. The teaching is deep, the community is real, and I have grown more in the past year than in the previous ten.",
  },
  {
    name: "Michael Darko",
    role: "Small Group Leader",
    avatar: "photo-1507003211169-0a1dd7228f2d",
    text: "The discipleship journey here is intentional and life-changing. I lead a small group now because someone here first invested in me. That is the GETS way.",
  },
  {
    name: "Grace Amponsah",
    role: "Youth Fellowship Member",
    avatar: "photo-1438761681033-6461ffad8d80",
    text: "As a student, I needed a place where my faith was taken seriously. GETS gave me deep biblical grounding and friendships that will last a lifetime.",
  },
];

const FAQ_ITEMS = [
  {
    q: "¿Cómo me integro a la comunidad?",
    a: "Simplemente asiste a uno de nuestros próximos talleres o pláticas. Como nos reunimos en diferentes parroquias y espacios que nos prestan, te invitamos a revisar nuestro calendario de eventos en esta página o a escribirnos en la sección de contacto para confirmarte el lugar y horario de nuestro siguiente encuentro.",
  },
  {
    q: "¿Dónde y cuándo se imparten los próximos talleres?",
    a: "No tenemos un horario o lugar fijo, ¡llevamos la formación espiritual a donde nos necesiten! Mantente al tanto de nuestro calendario actualizado en esta web o envíanos un mensaje para saber en qué parroquia, salón o comunidad estaremos impartiendo el próximo taller.",
  },
  {
    q: "¿Puedo invitar a GETS a dar una plática en mi parroquia o comunidad?",
    a: "¡Por supuesto! Una de nuestras misiones principales es llevar la espiritualidad teresiana a donde se necesite. Si deseas que visitemos tu parroquia, grupo o espacio, escríbenos a través del formulario de contacto con los detalles de tu comunidad y nos comunicaremos contigo para coordinar fechas y temas.",
  },
  {
    q: "¿Cómo puedo apoyar o servir como voluntario?",
    a: "¡Toda ayuda es bienvenida! Ya sea apoyando en la logística de las pláticas, promoviendo los eventos en tu comunidad, o sirviendo directamente durante los talleres. Mándanos un mensaje en la página de contacto platicándonos un poco sobre ti y cómo te gustaría colaborar.",
  },
  {
    q: "¿Ofrecen pláticas o acompañamiento en línea?",
    a: "Aunque nuestro enfoque principal es llevar los talleres presencialmente a diferentes comunidades, ocasionalmente compartimos material en línea, recursos de oración o transmisiones especiales. Contáctanos o revisa nuestras redes para saber qué recursos digitales tenemos disponibles actualmente.",
  },
];

const GALLERY_ITEMS = [
  { id: 1, album: "Worship", img: "photo-1529070538774-1843cb3265df", tall: false },
  { id: 2, album: "Fellowship", img: "photo-1529156069898-49953e39b3ac", tall: true },
  { id: 3, album: "Bible Study", img: "photo-1504052434569-70ad5836ab65", tall: false },
  { id: 4, album: "Prayer", img: "photo-1508387027939-27cccde278e8", tall: false },
  { id: 5, album: "Youth", img: "photo-1488521787991-ed7bbaae773c", tall: true },
  { id: 6, album: "Outreach", img: "photo-1469571486292-0ba58a3f068b", tall: false },
  { id: 7, album: "Worship", img: "photo-1493225457124-a3eb161ffa5f", tall: false },
  { id: 8, album: "Conferences", img: "photo-1523580494863-6f3031224c42", tall: true },
  { id: 9, album: "Fellowship", img: "photo-1531206715517-5c0ba140b2b8", tall: false },
  { id: 10, album: "Outreach", img: "photo-1521295121783-8a321d551ad2", tall: false },
  { id: 11, album: "Youth", img: "photo-1522202176988-66273c2fd55f", tall: true },
  { id: 12, album: "Bible Study", img: "photo-1454165804606-c3d57bc86b40", tall: false },
];

const ALBUMS = ["All", "Worship", "Fellowship", "Bible Study", "Prayer", "Youth", "Outreach", "Conferences"];
const CATEGORIES = ["Todos", "Oración", "Jóvenes", "Formación", "Retiros", "Comunidad", "Talleres"];
const CATEGORY_MAP: Record<string, string> = {
  "Todos": "All", "Oración": "Worship", "Jóvenes": "Youth",
  "Formación": "Bible Study", "Retiros": "Prayer", "Comunidad": "Outreach", "Talleres": "Conference"
};
const TOPICS = ["Todos", "Oración", "Santa Teresa", "Formación", "Silencio", "Interioridad"];

// ===================== SMALL COMPONENTS =====================

function Badge({ label, color = "blue" }: { label: string; color?: "blue" | "gold" | "green" | "gray" }) {
  const styles: Record<string, string> = {
    blue: "bg-[#F5EFE8] text-[#8B4513]",
    gold: "bg-[#FFF8E1] text-[#B8860B]",
    green: "bg-[#E8F8F0] text-[#1A7A4A]",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[color]}`}>
      {label}
    </span>
  );
}

function PrimaryBtn({ children, onClick, full = false, size = "md" }: {
  children: React.ReactNode; onClick?: () => void; full?: boolean; size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };
  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} ${full ? "w-full" : ""} bg-[#8B4513] text-white rounded-xl font-semibold hover:bg-[#4A2010] transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md`}
    >{children}</button>
  );
}

function GoldBtn({ children, onClick, full = false }: {
  children: React.ReactNode; onClick?: () => void; full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 ${full ? "w-full" : ""} bg-[#D4AF37] text-[#1a1200] rounded-xl text-sm font-semibold hover:bg-[#c4a030] transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm`}
    >
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick, white = false }: {
  children: React.ReactNode; onClick?: () => void; white?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 inline-flex items-center gap-2 ${
        white
          ? "border-white/40 text-white hover:bg-white/10"
          : "border-[#8B4513]/20 text-[#8B4513] hover:bg-[#F5EFE8]"
      }`}
    >{children}</button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-0.5 bg-[#D4AF37]" />
      <span className="text-[#D4AF37] text-xs font-bold tracking-[0.15em] uppercase">{children}</span>
    </div>
  );
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${light ? "text-white" : "text-[#5C4033]"}`}
      style={serif}
    >
      {children}
    </h2>
  );
}

// ===================== NAV =====================

function Nav({ page, nav, mobileOpen, setMobileOpen }: {
  page: Page; nav: (p: Page) => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
}) {
  const links: { label: string; page: Page }[] = [
    { label: "Inicio", page: "home" },
    { label: "Nosotros", page: "about" },
    { label: "Actividades", page: "events" },
    { label: "Historia", page: "sermons" },
    { label: "Galería", page: "gallery" },
    { label: "Contacto", page: "contact" },
  ];
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  useEffect(() => { setHistoryOpen(false); setActivitiesOpen(false); }, [page, mobileOpen]);
  const activityItems = (<>
    <button type="button" onClick={() => { setActivitiesOpen(false); nav('events'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Todas las actividades</button>
    <button type="button" onClick={() => { setActivitiesOpen(false); nav('carmelo'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Actividades en el Carmelo Descalzo</button>
    <button type="button" onClick={() => { setActivitiesOpen(false); nav('diocesanActivities'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Actividades diocesanas</button>
    <button type="button" onClick={() => { setActivitiesOpen(false); nav('lumen'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Estudio en grupo de Santa Teresa de Jesús y el misterio de la Iglesia: Lumen gentium del Concilio Vaticano II</button>
  </>);
  const historyItems = (
    <>
      <button type="button" onClick={() => { setHistoryOpen(false); nav('sermons'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Historia de GETS</button>
      <button type="button" onClick={() => { setHistoryOpen(false); nav('diocese'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Actividades en la diócesis de Tampico</button>
      <button type="button" onClick={() => { setHistoryOpen(false); nav('studies'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Estudios personales</button>
      <button type="button" onClick={() => { setHistoryOpen(false); nav('parish'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Decano San Pedro y San Pablo · Parroquia Nuestra Señora del Rosario</button>
      <button type="button" onClick={() => { setHistoryOpen(false); nav('diocesanMeetings'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Nuestros encuentros diocesanos</button>
      <button type="button" onClick={() => { setHistoryOpen(false); nav('fratelli'); }} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-[#5C4033] hover:bg-[#F5EFE8]">Estudio en grupo de la encíclica social Fratelli tutti</button>
    </>
  );
  const adminPage = page === "admin";
  if (adminPage) return null;

  return (
    <header className="site-header sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => nav("home")} className="flex items-center gap-3 text-left" aria-label="GETS, ir al inicio">
            <span className="h-10 w-10 shrink-0 rounded-xl bg-[#8B4513] p-1.5 flex items-center justify-center shadow-sm" aria-hidden="true"><img src={getsLogo} alt="" className="h-full w-full object-contain" /></span>
            <span className="rounded-xl bg-[#8B4513] px-2 py-1.5" aria-hidden="true">
              <img src={getsWordmark} alt="" className="w-[165px] sm:w-[230px] h-auto" />
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => l.page === 'events' ? (
              <div key={l.page} className="relative">
                <button type="button" aria-expanded={activitiesOpen} aria-controls="activities-desktop" onClick={() => { setActivitiesOpen(!activitiesOpen); setHistoryOpen(false); }} onKeyDown={event => { if (event.key === 'Escape') setActivitiesOpen(false); }} className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium ${['events', 'carmelo', 'diocesanActivities', 'lumen'].includes(page) ? 'bg-[#F5EFE8] text-[#8B4513]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Actividades <ChevronDown size={14} aria-hidden="true" className={activitiesOpen ? 'rotate-180' : ''} />
                </button>
                {activitiesOpen && <div id="activities-desktop" className="absolute left-0 top-full mt-2 w-80 max-h-[70vh] overflow-y-auto rounded-xl border border-[#E7D9C8] bg-white p-2 shadow-lg">{activityItems}</div>}
              </div>
            ) : l.page === 'sermons' ? (
              <div key={l.page} className="relative">
                <button type="button" aria-expanded={historyOpen} aria-controls="history-desktop" onClick={() => { setHistoryOpen(!historyOpen); setActivitiesOpen(false); }} onKeyDown={event => { if (event.key === 'Escape') setHistoryOpen(false); }} className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium ${page === 'sermons' || page === 'diocese' || page === 'studies' || page === 'parish' || page === 'diocesanMeetings' || page === 'fratelli' ? 'bg-[#F5EFE8] text-[#8B4513]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Historia <ChevronDown size={14} aria-hidden="true" className={historyOpen ? 'rotate-180' : ''} />
                </button>
                {historyOpen && <div id="history-desktop" className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-[#E7D9C8] bg-white p-2 shadow-lg">{historyItems}</div>}
              </div>
            ) : (
              <button
                key={l.page}
                onClick={() => nav(l.page)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === l.page
                    ? "bg-[#F5EFE8] text-[#8B4513]"
                    : "text-gray-600 hover:text-[#8B4513] hover:bg-gray-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => nav("login")}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#8B4513] transition-colors"
            >
              Ingresar
            </button>
            <PrimaryBtn onClick={() => nav("classroom")} size="sm">
              Alumnas
            </PrimaryBtn>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/5 bg-white px-4 pb-4 pt-2">
          {links.map((l) => l.page === 'events' ? (
            <div key={l.page}>
              <button type="button" aria-expanded={activitiesOpen} aria-controls="activities-mobile" onClick={() => { setActivitiesOpen(!activitiesOpen); setHistoryOpen(false); }} className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#8B4513]">
                Actividades <ChevronDown size={16} aria-hidden="true" className={activitiesOpen ? 'rotate-180' : ''} />
              </button>
              {activitiesOpen && <div id="activities-mobile" className="ml-3 mb-2 border-l border-[#E7D9C8] pl-2">{activityItems}</div>}
            </div>
          ) : l.page === 'sermons' ? (
            <div key={l.page}>
              <button type="button" aria-expanded={historyOpen} aria-controls="history-mobile" onClick={() => { setHistoryOpen(!historyOpen); setActivitiesOpen(false); }} className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#8B4513]">
                Historia <ChevronDown size={16} aria-hidden="true" className={historyOpen ? 'rotate-180' : ''} />
              </button>
              {historyOpen && <div id="history-mobile" className="ml-3 mb-2 border-l border-[#E7D9C8] pl-2">{historyItems}</div>}
            </div>
          ) : (
            <button
              key={l.page}
              onClick={() => nav(l.page)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                page === l.page ? "bg-[#F5EFE8] text-[#8B4513]" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {l.label}
            </button>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
            <PrimaryBtn onClick={() => nav("classroom")} full>
              Espacio de alumnas
            </PrimaryBtn>
            <button
              onClick={() => nav("login")}
              className="w-full py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl"
            >
              Ingresar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ===================== HOME PAGE =====================

function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="home-hero relative min-h-[78vh] flex items-center overflow-hidden bg-[#5C2D0E]">
        <img
          src={IMG("photo-1529070538774-1843cb3265df", 1920, 1080)}
          alt="Community worship gathering"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3B2118]/95 via-[#5C2D0E]/90 to-[#5C2D0E]/55" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-0.5 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">VIDA Y ORACIÓN</span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6"
              style={serif}
            >Un espacio para encontrarnos <span className="text-[#EACD87] italic">con Dios y en comunidad.</span></h1>
            <p className="text-base md:text-lg text-white/80 mb-7 md:mb-10 leading-relaxed max-w-xl">GETS (Grupo Educativo Teresiano Sanjuanista) es una comunidad espiritual que promueve el encuentro íntimo con Dios a través de la oración, el estudio y la vivencia diaria de la espiritualidad de Santa Teresa de Jesús y San Juan de la Cruz.</p>
            <div className="flex flex-wrap gap-3">
              <PrimaryBtn onClick={() => nav("contact")} size="lg">
                Entra a la comunidad <ArrowRight size={18} />
              </PrimaryBtn>
              <OutlineBtn white onClick={() => nav("about")}>
                Leer más <ChevronRight size={16} />
              </OutlineBtn>
            </div>
            <p className="mt-10 pt-6 border-t border-white/20 text-sm text-white/75 tracking-wide">Oración · Formación · Fraternidad</p>
          </div>
          <button onClick={() => nav("gallery")} className="hero-photo group relative hidden lg:block text-left" aria-label="Ver la galería de la comunidad">
            <img src={convivioFoto} alt="Integrantes de GETS reunidas durante el convivio del 15 de septiembre" className="w-full h-full object-cover object-[center_40%] transition-transform duration-500 group-hover:scale-[1.03]" />
            <span className="hero-photo-caption"><span>EN COMUNIDAD · 21 SEP 2026</span><strong>Momentos que nos unen <ArrowRight size={18} /></strong></span>
          </button>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel>ESPIRITUALIDAD TERESIANA</SectionLabel>
              <SectionHeading>
                Un lugar para <span className="text-[#8B4513] italic">Encontrarse con Dios</span>
              </SectionHeading>
              <p className="text-gray-500 leading-relaxed mb-6">
                En GETS buscamos crecer juntos en la fe inspirados por Santa Teresa de Jesús. A través de la oración constante y el estudio, creamos un ambiente donde todos pueden experimentar el amor de Cristo.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                No importa si apenas inicias tu camino o si buscas profundizar en tu interior, aquí tienes un espacio seguro para orar, aprender y pertenecer.
              </p>
              <div className="flex gap-3">
                <PrimaryBtn onClick={() => nav("about")}>Nuestro Propósito</PrimaryBtn>
                <OutlineBtn onClick={() => nav("events")}>
                  <Calendar size={15} /> Calendario de Actividades
                </OutlineBtn>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={image_teresa2_1}
                  alt="GETS community fellowship"
                  className="w-full h-[380px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#8B4513] text-white rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-bold" style={serif}>"</div>
                <p className="text-sm italic opacity-90 max-w-[180px] leading-relaxed">
                  Tratar de amistad con quien sabemos nos ama.
                </p>
              </div>
              <div className="absolute -top-5 -right-5 bg-[#D4AF37] rounded-2xl p-4 shadow-lg">
                <Heart size={24} className="text-white" fill="white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 md:py-16 bg-[#F5EFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>NUESTROS PILARES</SectionLabel>
            <SectionHeading>Nuestros Valores</SectionHeading>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, label: "Estudio Espiritual", desc: "Profundizando en la Palabra." },
              { icon: Heart, label: "Fraternidad", desc: "Comunidad auténtica." },
              { icon: Globe, label: "Misión Teresiana", desc: "Compartiendo la experiencia." },
              { icon: Handshake, label: "Servicio", desc: "Amor convertido en acción." },
              { icon: Music, label: "Alabanza y Oración", desc: "Trato íntimo con Dios." },
              { icon: Users, label: "Talleres y Pláticas", desc: "Espacios de formación espiritual." },
              { icon: Star, label: "Vida Interior", desc: "El camino de perfección." },
              { icon: Leaf, label: "Vivencia", desc: "Integrando la fe a la vida diaria." },
            ].map((v) => (
              <div
                key={v.label}
                className="bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5EFE8] flex items-center justify-center group-hover:bg-[#8B4513] transition-colors">
                  <v.icon size={20} className="text-[#8B4513] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-semibold text-[#5C4033] text-sm">{v.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 md:py-20 bg-[#F5EFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <SectionLabel>PRÓXIMOS ENCUENTROS</SectionLabel>
              <SectionHeading>Próximas Actividades</SectionHeading>
            </div>
            <button
              onClick={() => nav("events")}
              className="text-sm font-semibold text-[#8B4513] flex items-center gap-1 hover:gap-2 transition-all"
            >
              Ver todo <ChevronRight size={15} />
            </button>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-xl">
              <div className="relative h-56 overflow-hidden bg-[#8B4513]">
                <img
                  src={image_WhatsApp_Image_2026_09_04_at_12_44_00_PM_5}
                  alt="La Libertad Interior en Santa Teresa de Jesús"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 left-3">
                  <Badge label="Taller Activo" color="gold" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#5C4033] text-lg mb-2" style={serif}>La Libertad Interior en Santa Teresa de Jesús</h3>
                <p className="text-xs text-gray-400 mb-4">Impartido por la Lic. María Luisa Rodríguez Assemat. Un espacio para descubrir que "La Verdadera Libertad nace del interior".</p>
                <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-5">
                  <span className="flex items-center gap-1.5"><Calendar size={11} className="text-[#D4AF37]" /> Todos los lunes</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} className="text-[#D4AF37]" /> 10:00 A.M a 12:00 P.M | 5:00 P.M a 6:30 P.M (2 Grupos)</span>
                  <span className="flex items-center gap-1.5"><MapPin size={11} className="text-[#D4AF37]" /> Parroquia San Pedro y San Pablo, Casa Parroquial (Col. Sierra Morena)</span>
                </div>
                <PrimaryBtn full size="sm" onClick={() => { nav("events"); setTimeout(() => { document.getElementById("taller-actual")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}>Inscríbete ahora</PrimaryBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bible Verse */}
      <section className="py-16 bg-[#8B4513] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-96 h-96 bg-white rounded-full -top-20 -right-20 absolute" />
          <div className="w-64 h-64 bg-[#D4AF37] rounded-full -bottom-10 -left-10 absolute" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="text-[#D4AF37] text-5xl font-serif mb-6">"</div>
          <blockquote
            className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-6"
            style={serif}
          >
            Busca a Dios en tu interior y hallarás la paz que el mundo no te puede dar.
          </blockquote>
          <p className="text-[#D4AF37] font-semibold text-sm tracking-wider uppercase">
            Santa Teresa de Jesús — Pensamiento del Día
          </p>
        </div>
      </section>

      {/* Prayer CTA */}
      <section className="py-10 md:py-16 bg-[#F5EFE8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-[#8B4513] to-[#4A2010] rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart size={28} className="text-[#D4AF37]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4" style={serif}>
                ¿Necesitas oración o intención?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                Nuestro grupo intercede con fe por cada petición. Comparte tus necesidades espirituales y permite que nuestra comunidad te acompañe en oración.
              </p>
              <GoldBtn onClick={() => nav("contact")}>
                Enviar intención de oración <ArrowRight size={16} />
              </GoldBtn>
            </div>
          </div>
        </div>
      </section>

      {/* Participación comunitaria */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden relative group cursor-pointer bg-[#8B4513] min-h-[260px] flex items-end">
              <img
                src={IMG("photo-1469571486292-0ba58a3f068b", 700, 400)}
                alt="Volunteers serving"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
              />
              <div className="relative z-10 p-8">
                <Badge label="Comunidades" color="gold" />
                <h3 className="text-2xl font-bold text-white mt-3 mb-2" style={serif}>
                  Súmate como Voluntario
                </h3>
                <p className="text-white/70 text-sm mb-5">
                  Apoya en la organización de nuestros talleres y lleva la espiritualidad teresiana a más espacios.
                </p>
                <OutlineBtn white onClick={() => nav("contact")}>
                  Quiero participar <ArrowRight size={15} />
                </OutlineBtn>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden relative group cursor-pointer bg-[#5C4033] min-h-[260px] flex items-end">
              <img
                src={IMG("photo-1523580494863-6f3031224c42", 700, 400)}
                alt="Ministry partnership"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
              />
              <div className="relative z-10 p-8">
                <Badge label="Colaboración" color="gold" />
                <h3 className="text-2xl font-bold text-white mt-3 mb-2" style={serif}>
                  Apoya Nuestra Misión
                </h3>
                <p className="text-white/70 text-sm mb-5">
                  Ayúdanos a continuar con esta labor de formación espiritual y oración en Tampico.
                </p>
                <OutlineBtn white onClick={() => nav("contact")}>
                  Conoce cómo apoyar <ArrowRight size={15} />
                </OutlineBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <SectionLabel>MANTENTE CONECTADO</SectionLabel>
          <SectionHeading>Suscríbete a Nuestro Boletín</SectionHeading>
          <p className="text-gray-500 mb-8">
            Recibe avisos sobre nuestros próximos talleres, reflexiones y fechas de encuentros directamente en tu correo.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] bg-[#F5EFE8]"
            />
            <PrimaryBtn>Suscribirme</PrimaryBtn>
          </div>
          <p className="text-xs text-gray-400 mt-3">Cero spam. Puedes darte de baja cuando lo desees.</p>
        </div>
      </section>
    </div>
  );
}

// ===================== ABOUT PAGE =====================

function AboutPage({ nav }: { nav: (p: Page) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center bg-[#8B4513] overflow-hidden">
        <img
          src={IMG("photo-1519406596751-0a3ccc4937fe", 1600, 600)}
          alt="GETS community"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>NUESTRA IDENTIDAD</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={serif}>
            Conoce GETS
          </h1>
          <p className="text-white/60 mt-3 max-w-xl">
            Descubre quiénes somos, nuestra misión y cómo vivimos la espiritualidad teresiana.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel>QUIÉNES SOMOS</SectionLabel>
              <SectionHeading>Llevando la oración a la vida diaria</SectionHeading>
              <p className="text-gray-500 leading-relaxed mb-4">
                GETS (Grupo Educativo Teresiano Sanjuanista) nació con una convicción profunda: acercar las almas a Dios a través de la oración íntima. Somos una comunidad centrada en Cristo donde se comparte el Evangelio, se enseña la riqueza de la espiritualidad carmelitana y sanjuanista, y se acoge a cada persona con amor.

                Lo que comenzó como una pequeña reunión para hacer oración, se ha convertido en una vocación de servicio. Hoy llevamos este mensaje a cualquier lugar donde nos abran las puertas —ya sean parroquias, salones o casas— a través de talleres, pláticas y acompañamiento espiritual, siempre unidos por nuestro amor a Jesús.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={image_teresa_1}
                alt="Bible study gathering"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-20 bg-[#F5EFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-[#8B4513]/10">
              <div className="w-12 h-12 rounded-xl bg-[#8B4513] flex items-center justify-center mb-5">
                <Star size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#5C4033] mb-4" style={serif}>Nuestra Visión</h3>
              <p className="text-gray-500 leading-relaxed">
                Formar una comunidad que conozca a Cristo de manera profunda, viva la espiritualidad teresiana con autenticidad y transforme su entorno a través de la fe, el trato constante en la oración y el servicio.
              </p>
            </div>
            <div className="bg-[#8B4513] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center mb-5">
                <Globe size={20} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4" style={serif}>Nuestra Misión</h3>
              <ul className="space-y-2">
                {[
                  "Construir una comunidad espiritual fraterna y auténtica.",
                  "Impartir formación espiritual mediante pláticas y talleres.",
                  "Promover la oración como un trato de amistad con Dios.",
                  "Brindar herramientas prácticas para el crecimiento interior.",
                  "Llevar el mensaje del Evangelio a cualquier espacio que nos reciba.",
                  "Servir a la comunidad con amor, empatía y compasión.",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>QUIÉN NOS GUÍA</SectionLabel>
            <SectionHeading>Coordinación GETS</SectionHeading>
          </div>
          <div className="max-w-xl mx-auto rounded-3xl border border-[#E7D9C8] bg-[#F9F5EE] px-6 py-10 text-center shadow-[0_15px_45px_rgba(74,32,16,.06)]">
            <div className="w-10 h-0.5 bg-[#D4AF37] mx-auto mb-6" aria-hidden="true" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#5C4033]" style={serif}>
              Lic. Ma. Luisa Rodríguez Assemat
            </h3>
            <p className="mt-3 text-gray-600">Máster en Mística y Ciencias Humanas</p>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-12 md:py-20 bg-[#F5EFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>CÓMO PARTICIPAR</SectionLabel>
            <SectionHeading>Nuestras Actividades</SectionHeading>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Heart, title: "Oración Teresiana", desc: "Acompañamiento, intercesión y crecimiento interior." },
              { icon: Users, title: "Fraternidad", desc: "Encuentros para compartir y fortalecer nuestra fe en comunidad." },
              { icon: BookOpen, title: "Grupos de Estudio", desc: "Reflexión de la Palabra y de los textos de Santa Teresa." },
              { icon: Music, title: "Alabanza", desc: "Acompañando nuestros momentos de encuentro y oración con cantos." },
              { icon: Globe, title: "Talleres y Pláticas", desc: "Llevando la formación espiritual a diferentes espacios e iglesias." },
              { icon: Handshake, title: "Servicio Comunitario", desc: "Viviendo el amor de Dios a través del apoyo practical a los demás." },
            ].map((m) => (
              <div key={m.title} className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow group">
                <div className="w-11 h-11 rounded-xl bg-[#F5EFE8] flex items-center justify-center mb-4 group-hover:bg-[#8B4513] transition-colors">
                  <m.icon size={18} className="text-[#8B4513] group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-[#5C4033] mb-2 text-sm">{m.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <SectionLabel>¿TIENES DUDAS?</SectionLabel>
            <SectionHeading>Preguntas Frecuentes</SectionHeading>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#5C4033] text-sm pr-4">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                    <div className="pt-4">{item.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <PrimaryBtn onClick={() => nav("contact")}>
              ¿Aún tienes preguntas? Contáctanos <ArrowRight size={15} />
            </PrimaryBtn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===================== EVENTS PAGE =====================

function EventsPage({ nav }: { nav: (p: Page) => void }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const filtered = activeCategory === "Todos" ? EVENTS : EVENTS.filter((e) => e.category === CATEGORY_MAP[activeCategory]);
  const featured = EVENTS[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 flex items-center bg-[#8B4513] overflow-hidden">
        <img
          src={IMG("photo-1523580494863-6f3031224c42", 1600, 500)}
          alt="Events"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>NUESTRA AGENDA</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={serif}>Talleres y Pláticas</h1>
          <p className="text-white/60 mt-2">Descubre la fecha y sede de nuestro próximo taller o grupo de estudio.</p>
        </div>
      </section>

      {/* Featured Event */}
      <section id="taller-actual" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#8B4513] to-[#2d4db8] rounded-3xl overflow-hidden grid lg:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <Badge label="Taller Activo" color="gold" />
              <h2 className="text-3xl font-bold text-white mt-5 mb-3 leading-tight" style={serif}>
                {featured.title}
              </h2>
              <p className="text-white/70 text-sm mb-6">{featured.description}</p>
              <div className="flex flex-col gap-2 mb-8">
                {[
                  { icon: Calendar, val: featured.date },
                  { icon: Clock, val: featured.time },
                  { icon: MapPin, val: featured.location },
                ].map((d) => (
                  <span key={d.val} className="flex items-center gap-2 text-sm text-white/80">
                    <d.icon size={14} className="text-[#D4AF37]" /> {d.val}
                  </span>
                ))}
              </div>
              <GoldBtn>Inscríbete ahora <ArrowRight size={15} /></GoldBtn>
            </div>
            <div className="relative h-64 lg:h-auto bg-[#4A2010]">
              <img
                src={image_WhatsApp_Image_2026_09_04_at_12_44_00_PM_1}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-10 bg-[#F5EFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === c
                    ? "bg-[#8B4513] text-white"
                    : "bg-white text-gray-500 hover:bg-[#F5EFE8] hover:text-[#8B4513] border border-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D4C4B7] w-full max-w-md text-center p-10">
              <div className="w-14 h-14 bg-[#F5EFE8] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Calendar size={24} className="text-[#8B4513]" />
              </div>
              <Badge label="Próximamente" color="gold" />
              <h3 className="text-xl font-bold text-[#5C4033] mt-4 mb-2" style={serif}>Nuevos Talleres en Camino</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Muy pronto anunciaremos nuevas fechas, sedes y temas de formación espiritual para la comunidad.
              </p>
              <div className="flex flex-col gap-1.5 text-xs text-gray-400 mb-6 text-left px-4">
                <span className="flex items-center gap-1.5"><Calendar size={11} className="text-[#D4AF37]" /> Por definir</span>
                <span className="flex items-center gap-1.5"><MapPin size={11} className="text-[#D4AF37]" /> Tampico, Tamps.</span>
              </div>
              <OutlineBtn onClick={() => {}}>Mantente atento</OutlineBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===================== SERMONS PAGE (ENSEÑANZAS E HISTORIA) =====================

function SermonsPage({ nav, session }: { nav: (p: Page) => void; session: Session | null }) {
  return (
    <div>
      <section className="relative h-64 flex items-center bg-[#8B4513] overflow-hidden">
        <img
          src={IMG("photo-1465692836717-6e408d9fd7a2", 1600, 500)}
          alt="Enseñanzas e Historia"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>ESPIRITUALIDAD Y TRAYECTORIA</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={serif}>Enseñanzas e Historia de GETS</h1>
          <p className="text-white/60 mt-2">Nuestros orígenes, pilares, desafíos y la historia de nuestra misión en Tampico y Madero.</p>
        </div>
      </section>

      {/* Contenido Completo de la Historia de GETS */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Introducción */}
          <div className="bg-[#F5EFE8] rounded-3xl p-8 md:p-10 border border-[#8B4513]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#5C4033] mb-4" style={serif}>
              Historia de GETS (Grupo Educativo Teresiano Sanjuanista)
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Les invito a conocernos en cinco líneas dinámicas que van entretejidas en nuestros orígenes, historia y dinamismo misionero, nacidos de la fuente contemplativo-apostólica Teresiana. Esta última nace de la Iglesia y para la Iglesia desde la familia, doctrina y misión de los doctores místicos de la Iglesia, Santa Teresa de Jesús y Juan de la Cruz, fundadores del carmelo Teresiano. Del principio al presente, el ritmo y los pasos, en el compartir las enseñanzas de dos de los grandes místicos van acompañados y cobran vida desde la Palabra de Dios que se conjuga en el carmelo en una mística centrada en la humanidad de Jesucristo y hecha vida.
            </p>
          </div>

          {/* Visión */}
          <div>
            <h3 className="text-xl font-bold text-[#5C4033] mb-3" style={serif}>Nuestra Visión y Valores</h3>
            <p className="text-gray-500 mb-5 text-sm leading-relaxed">
              Pretendemos hacer vida nuestra visión. Nuestras comunidades y apostolado responden y tienen como fundamento los documentos del Magisterio de la Iglesia:
            </p>

            {/* Tarjeta de Fundamentos Doctrinales de la Nota */}
            <div className="bg-[#F5EFE8] rounded-2xl p-6 md:p-7 border border-[#8B4513]/15 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ScrollText size={18} className="text-[#8B4513]" />
                <h4 className="font-bold text-[#5C4033] text-sm uppercase tracking-wider">Fundamentos del Laicado</h4>
              </div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#8B4513]/20 mb-4 text-xs text-[#8B4513] font-semibold">
                <BookOpen size={14} />
                <span>La Biblia: tienen como fundamento</span>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span><strong>Decreto:</strong> <em>Apostolicam Actuositatem</em> (Decreto conciliar sobre el apostolado de los laicos).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span><strong>Constitución Dogmática:</strong> <em>Lumen Gentium</em> (Especialmente el <strong>Capítulo IV</strong>, Laicos).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span><strong>Exhortación Apostólica (Post-sinodal):</strong> <em>Christifideles Laici</em> (sobre la vocación y misión de los fieles laicos).</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="bg-[#F5EFE8]/50 p-4 rounded-xl border-l-4 border-[#8B4513] text-sm text-gray-600">
                <strong>En la escucha atenta:</strong> Verdadera, acogedora y profunda.
              </div>
              <div className="bg-[#F5EFE8]/50 p-4 rounded-xl border-l-4 border-[#8B4513] text-sm text-gray-600">
                <strong>En el diálogo:</strong> Dirigido a la comprensión sin intentar cambiar al otro a nuestra forma de pensar o de ser.
              </div>
              <div className="bg-[#F5EFE8]/50 p-4 rounded-xl border-l-4 border-[#8B4513] text-sm text-gray-600">
                <strong>En la oración:</strong> Nacida del encuentro con la mirada de Jesús.
              </div>
            </div>
          </div>

          {/* Lema y Proyección */}
          <div className="bg-[#8B4513] text-white rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="text-[#D4AF37] text-4xl font-serif mb-2">"</div>
            <p className="text-xl md:text-2xl font-medium italic mb-4" style={serif}>
              “Es tiempo de caminar” vamos descalzos, y libres, en comunidad, “Juntos andemos Señor” Con los místicos como fuente y camino hacia la unión con Dios.
            </p>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Lema y Proyección GETS</span>
          </div>

          {/* Desafíos, Pautas y Herramientas */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#F5EFE8] p-6 rounded-2xl">
              <h4 className="font-bold text-[#5C4033] mb-3 text-base" style={serif}>Nuestros Desafíos</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Encender la chispa que arda no tanto en qué hacer en la Iglesia, como en ser mejores, auténticos “hombres nuevos” para transformar en vida y verdad el Evangelio de Jesucristo y reavivar la esperanza en un mundo incierto de cambios vertiginosos.
              </p>
            </div>
            <div className="bg-[#F5EFE8] p-6 rounded-2xl">
              <h4 className="font-bold text-[#5C4033] mb-3 text-base" style={serif}>Nuestras Pautas</h4>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• Conocimiento de sí (Primera Morada).</li>
                <li>• Silencio e interioridad.</li>
              </ul>
            </div>
            <div className="bg-[#F5EFE8] p-6 rounded-2xl">
              <h4 className="font-bold text-[#5C4033] mb-3 text-base" style={serif}>Nuestras Herramientas</h4>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• <strong>La Fe:</strong> Guía irremplazable.</li>
                <li>• <strong>La Esperanza:</strong> “La Esperanza tanto alcanza cuanto espera”.</li>
                <li>• <strong>El Amor:</strong> Única fuerza capaz de movernos y hacernos avanzar hacia el encuentro con Dios.</li>
              </ul>
            </div>
          </div>

          {/* Historia y Misión / Trayectoria */}
          <div className="space-y-6 pt-4 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-[#5C4033]" style={serif}>Historia y Misión: Promoción de Talleres y Retiros</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#8B4513] text-sm mb-2">1. Promoción de talleres y retiros del Carmelo Teresiano</h4>
                <ul className="text-xs text-gray-600 space-y-2 pl-4 list-disc">
                  <li><strong>Jornadas de Contemplación con las Moradas de Santa Teresa de Jesús:</strong> Creador y dirigente: Rev. Padre Rafael Checa ocd. Lugar: Centro Manresa, Tampico (Duración: Cuatro años).</li>
                  <li><strong>Talleres de Formación Espiritual y Humana:</strong> Conferencista: Luis Jorge González ocd. Lugar: Seminario de Tampico.</li>
                  <li><strong>Programación neurolingüística y espiritualidad (Año 2000):</strong> Coordinadores y expositores: Luis Jorge González; colaboradora: María Luisa Rodríguez Assemat.</li>
                  <li><strong>SETS (Seguimiento, retiros y clases a grupos y personas):</strong> Lugar: Residencia particular (Duración: 20 años).</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#8B4513] text-sm mb-2">2. Espiritualidad y Formación Integral</h4>
                <ul className="text-xs text-gray-600 space-y-2 pl-4 list-disc">
                  <li><strong>Semana de Espiritualidad Teresiano-Sanjuanista (Año aprox. 2005):</strong> Expositores y dirigentes: Maximiliano Herraiz García ocd y Luis Jorge González. Lugar: Casa de Ana María Rabaté.</li>
                  <li><strong>Conferencias sobre Santa Teresa de Jesús y San Juan de la Cruz:</strong> Ponente: Maximiliano Herraiz García ocd. Lugar: Seminario de Tampico (Duración: Tres años).</li>
                  <li><strong>Talleres de Formación espiritual aplicada a las misiones:</strong> Coordinadores: Luis Jorge González ocd y María Luisa Rodríguez Assemat oscd. Lugar: Seminarios carmelitas en Nairobi, Kenia y en Morogoro, Tanzania.</li>
                  <li><strong>Talleres de formación en desarrollo humano y fe para agentes de Pastoral:</strong> Conferencista y coordinadora: María Luisa Rodríguez Assemat. Lugar: Ciudad Madero, Tamaulipas (Duración: Seis años).</li>
                  <li><strong>Clases Teresiano-Sanjuanistas:</strong> María Luisa Rodríguez Assemat. Lugar: Instituto Cultural Tampico (Duración: Diez años).</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#8B4513] text-sm mb-2">3. Congresos y Simposios</h4>
                <ul className="text-xs text-gray-600 space-y-2 pl-4 list-disc">
                  <li><strong>Simposio de Psicología y Espiritualidad en Roma (2003):</strong> Participación en Roma de María Luisa Rodríguez Assemat con el Grupo de Psicología y Espiritualidad.</li>
                  <li><strong>Congreso Internacional de Mística en Münsterschwarzach, Alemania:</strong> Participación de José Ignacio Rodríguez Assemat y María Luisa Rodríguez Assemat.</li>
                </ul>
              </div>
            </div>

          </div>
          <CommentsSection nav={nav} session={session} contentType="article" contentId="historia-de-gets" />
        </div>
      </section>

    </div>
  );
}

// ===================== GALLERY PAGE =====================

function CommentsSection({ nav, session, contentType, contentId }: { nav: (p: Page) => void; session: Session | null; contentType: 'photo' | 'article'; contentId: string }) {
  const [comments, setComments] = useState<GalleryComment[]>([]);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    if (!supabase || !session) { setBlocked(false); return; }
    supabase.from('gets_banned_users').select('user_id').eq('user_id', session.user.id).maybeSingle()
      .then(({ data }) => setBlocked(!!data));
  }, [session?.user.id]);
  useEffect(() => {
    if (!supabase) return;
    supabase.from('gets_gallery_comments').select('id,author_id,author_name,body,status,created_at,content_type,content_id')
      .eq('content_type', contentType).eq('content_id', contentId).eq('status', 'approved').order('created_at', { ascending: false }).limit(50)
      .then(({ data, error }) => { if (error) setMessage('No se pudieron cargar los comentarios.'); else setComments(data || []); });
  }, [contentType, contentId]);
  async function submitComment(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase || !session || blocked || !body.trim() || saving) return;
    setSaving(true); setMessage('');
    const { error } = await supabase.from('gets_gallery_comments').insert({
      author_id: session.user.id,
      author_name: String(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Alumna').slice(0, 80),
      body: body.trim(),
      content_type: contentType,
      content_id: contentId,
    });
    setSaving(false);
    if (error) setMessage('No se pudo enviar el comentario. Inténtalo de nuevo.');
    else { setBody(''); setMessage('Comentario enviado. Aparecerá cuando sea aprobado.'); }
  }
  return (
    <div className="mt-12 max-w-3xl mx-auto" id={`comentarios-${contentType}-${contentId}`}>
            <SectionHeading>Comentarios</SectionHeading>
            <p className="text-[#755E51] mb-6">Comparte tu opinión. Revisamos cada comentario antes de publicarlo.</p>
            {comments.length ? <div className="space-y-3 mb-8">{comments.map(c => (
              <article key={c.id} className="rounded-2xl bg-white border border-[#E7D9C8] p-5">
                <div className="flex justify-between gap-3 text-sm text-[#8B4513] font-semibold"><span>{c.author_name}</span><time className="text-gray-400 font-normal" dateTime={c.created_at}>{new Date(c.created_at).toLocaleDateString('es-MX')}</time></div>
                <p className="text-[#5C4033] mt-2 whitespace-pre-wrap break-words">{c.body}</p>
              </article>
            ))}</div> : <p className="text-[#755E51] mb-8">Sé la primera en dejar un comentario.</p>}
            {!supabase ? <p className="text-[#8B4513]">Los comentarios estarán disponibles al configurar Supabase.</p> : session && blocked ? <p className="rounded-xl bg-white border border-[#E7D9C8] p-4 text-[#8B4513]">Tu cuenta tiene restringida la participación en comentarios.</p> : session ? (
              <form onSubmit={submitComment} className="rounded-2xl bg-white border border-[#E7D9C8] p-5 space-y-3">
                <label htmlFor={`comment-${contentType}-${contentId}`} className="block font-semibold text-[#5C4033]">Escribe tu comentario</label>
                <textarea id={`comment-${contentType}-${contentId}`} value={body} onChange={e => setBody(e.target.value)} required maxLength={1000} rows={4} className="w-full rounded-xl border border-[#E7D9C8] p-3 focus:outline-none focus:ring-2 focus:ring-[#8B4513]" placeholder="¿Qué te gustaría compartir?" />
                <button disabled={saving || !body.trim()} className="rounded-xl bg-[#8B4513] px-5 py-2.5 text-white disabled:opacity-50">{saving ? 'Enviando…' : 'Enviar comentario'}</button>
              </form>
            ) : <button onClick={() => nav('login')} className="rounded-xl bg-[#8B4513] px-5 py-2.5 text-white">Inicia sesión para comentar</button>}
            {message && <p role="status" className="mt-3 text-sm text-[#8B4513]">{message}</p>}
          </div>
  );
}

function GalleryPage({ nav, session }: { nav: (p: Page) => void; session: Session | null }) {
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const albums = [
    {
      id: 'actividad-grupo-5-octubre-2026', title: 'Actividad del grupo', date: '5 de octubre de 2026', isoDate: '2026-10-05',
      description: 'Compartimos algunas imágenes de la actividad realizada por nuestras alumnas durante el encuentro del lunes 5 de octubre.',
      cover: octubreFoto1,
      photos: [
        { src: octubreFoto1, alt: 'Alumnas de GETS muestran el trabajo elaborado en equipo durante la actividad del 5 de octubre' },
        { src: octubreFoto2, alt: 'Integrantes de GETS presentan su trabajo en equipo durante el encuentro del 5 de octubre' },
      ],
    },
    {
      id: 'dinamica-grupo-28-septiembre-2026', title: 'Dinámica del grupo', date: '28 de septiembre de 2026', isoDate: '2026-09-28',
      description: 'Compartimos una dinámica de reflexión y convivencia en nuestro grupo GETS.',
      cover: dinamicaFoto3,
      photos: [
        { src: dinamicaFoto1, alt: 'Material de la dinámica dispuesto en el suelo durante el encuentro de GETS' },
        { src: dinamicaFoto2, alt: 'Integrantes de GETS participan en la dinámica del grupo' },
        { src: dinamicaFoto3, alt: 'Integrantes de GETS realizan una actividad de reflexión alrededor de una mesa' },
      ],
    },
    {
      id: 'convivio-15-septiembre-2026', title: 'Convivio del 15 de septiembre', date: '15 de septiembre de 2026', isoDate: '2026-09-15',
      description: 'Compartimos una jornada de convivencia, alegría y fraternidad en GETS. Gracias a quienes hicieron posible este encuentro.',
      cover: convivioFoto,
      photos: [{ src: convivioFoto, alt: 'Participantes de GETS posan alrededor de la mesa durante su convivio del 15 de septiembre' }],
    },
  ];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const latestDate = albums.reduce((latest, album) => album.isoDate > latest ? album.isoDate : latest, albums[0].isoDate);
  const [calendarMonth, setCalendarMonth] = useState(() => latestDate.slice(0, 7));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [year, month] = calendarMonth.split('-').map(Number);
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthAlbums = albums.filter(album => album.isoDate.startsWith(calendarMonth));
  const visibleAlbums = monthAlbums.filter(album => !selectedDate || album.isoDate === selectedDate);
  const years = Array.from(new Set([...albums.map(album => Number(album.isoDate.slice(0, 4))), new Date().getFullYear(), new Date().getFullYear() - 1, year])).sort((a, b) => b - a);
  const changeMonth = (value: string) => { setCalendarMonth(value); setSelectedDate(null); setOpenAlbum(null); };
  const moveMonth = (offset: number) => {
    const next = new Date(year, month - 1 + offset, 1);
    changeMonth(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`);
  };

  return (
    <div>
      <section className="relative min-h-64 py-16 flex items-center bg-[#5C2D0E] overflow-hidden">
        <img src={IMG("photo-1531206715517-5c0ba140b2b8", 1600, 500)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>MOMENTOS GETS</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={serif}>Galería de la Comunidad</h1>
          <p className="text-white/80 mt-3 max-w-xl">Nuestra vida en comunidad, contada a través de momentos compartidos.</p>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-[#F9F5EE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel>RECUERDOS COMPARTIDOS</SectionLabel>
            <SectionHeading>Nuestros encuentros</SectionHeading>
            <p className="text-[#755E51]">Elige un año y un mes. Las fechas marcadas tienen fotos de nuestros encuentros.</p>
          </div>
          <div className="mb-8 rounded-2xl border border-[#E7D9C8] bg-white p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div className="flex gap-3">
                <label className="text-xs font-semibold text-[#755E51]">Año
                  <select value={year} onChange={event => changeMonth(`${event.target.value}-${String(month).padStart(2, '0')}`)} className="mt-1 block rounded-lg border border-[#E7D9C8] bg-white px-3 py-2 text-sm text-[#5C4033]">{years.map(value => <option key={value}>{value}</option>)}</select>
                </label>
                <label className="text-xs font-semibold text-[#755E51]">Mes
                  <select value={month} onChange={event => changeMonth(`${year}-${event.target.value.padStart(2, '0')}`)} className="mt-1 block rounded-lg border border-[#E7D9C8] bg-white px-3 py-2 text-sm text-[#5C4033]">{months.map((name, index) => <option key={name} value={index + 1}>{name}</option>)}</select>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Mes anterior" onClick={() => moveMonth(-1)} className="rounded-lg border border-[#E7D9C8] px-3 py-2 text-[#8B4513]">‹</button>
                <button type="button" onClick={() => changeMonth(latestDate.slice(0, 7))} className="rounded-lg border border-[#E7D9C8] px-3 py-2 text-sm text-[#8B4513]">Últimas fotos</button>
                <button type="button" aria-label="Mes siguiente" onClick={() => moveMonth(1)} className="rounded-lg border border-[#E7D9C8] px-3 py-2 text-[#8B4513]">›</button>
              </div>
            </div>
            <h2 className="mb-4 text-xl font-bold text-[#5C4033]" style={serif}>{months[month - 1]} {year}</h2>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => <span key={day} className="pb-2 text-center text-xs font-semibold text-[#755E51]">{day}</span>)}
              {Array.from({ length: firstWeekday }, (_, index) => <span key={`blank-${index}`} aria-hidden="true" />)}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const date = `${calendarMonth}-${String(day).padStart(2, '0')}`;
                const dayAlbums = monthAlbums.filter(album => album.isoDate === date);
                const marked = dayAlbums.length > 0;
                return (
                  <button key={date} type="button" disabled={!marked} aria-pressed={selectedDate === date} aria-label={`${day} de ${months[month - 1]} de ${year}: ${marked ? dayAlbums.map(album => album.title).join(', ') : 'sin fotos'}`} onClick={() => { setSelectedDate(date); setOpenAlbum(dayAlbums[0].id); }} className={`min-h-14 sm:min-h-20 rounded-lg border p-1 sm:p-2 text-sm flex flex-col items-center justify-center gap-1 ${selectedDate === date ? 'bg-[#8B4513] border-[#8B4513] text-white' : marked ? 'bg-[#F5EFE8] border-[#D4AF37] text-[#8B4513] hover:bg-[#EDE1D2]' : 'border-transparent text-gray-400'} focus-visible:outline-2 focus-visible:outline-[#8B4513]`}>
                    <span className={marked ? 'font-bold' : ''}>{day}</span>
                    {marked && <><span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" /><span className="hidden sm:block text-[10px]">{dayAlbums.reduce((total, album) => total + album.photos.length, 0)} fotos</span></>}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-[#755E51]">Las fechas doradas tienen álbumes. Pulsa una para ver sus fotos.</p>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-[#E7D9C8] pt-4">
              <span className="self-center mr-1 text-xs text-[#755E51]">Meses con fotos:</span>
              {Array.from(new Set(albums.map(album => album.isoDate.slice(0, 7)))).sort().reverse().map(value => <button key={value} type="button" onClick={() => changeMonth(value)} className={`rounded-full px-3 py-1.5 text-xs ${value === calendarMonth ? 'bg-[#8B4513] text-white' : 'bg-[#F5EFE8] text-[#8B4513]'}`}>{months[Number(value.slice(5)) - 1]} {value.slice(0, 4)}</button>)}
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[#5C4033]" style={serif}>{selectedDate ? 'Encuentros de la fecha elegida' : `Álbumes de ${months[month - 1].toLowerCase()}`}</h2>
            {selectedDate && <button type="button" onClick={() => { setSelectedDate(null); setOpenAlbum(null); }} className="text-sm font-semibold text-[#8B4513]">Ver todo el mes</button>}
          </div>
          {visibleAlbums.length === 0 && <p className="rounded-2xl border border-[#E7D9C8] bg-white p-8 text-center text-[#755E51]">Todavía no hay fotos publicadas de este mes.</p>}
          <div className="space-y-5">
            {visibleAlbums.map(album => {
              const expanded = openAlbum === album.id;
              return (
                <article key={album.id} className="overflow-hidden rounded-2xl border border-[#E7D9C8] bg-white shadow-sm">
                  <h2>
                    <button
                      id={`heading-${album.id}`}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`album-${album.id}`}
                      onClick={() => setOpenAlbum(expanded ? null : album.id)}
                      className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-[#FBF8F3] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#8B4513] sm:gap-6 sm:p-5"
                    >
                      <img src={album.cover} alt="" loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-40" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-[#8B4513] sm:text-sm">{album.date}</span>
                        <span className="mt-1 block text-xl font-bold leading-tight text-[#5C4033] sm:text-2xl" style={serif}>{album.title}</span>
                        <span className="mt-2 block text-sm text-[#755E51]">{album.photos.length} {album.photos.length === 1 ? 'foto' : 'fotos'}</span>
                        <span className="mt-2 block text-sm font-semibold text-[#8B4513] sm:hidden">{expanded ? 'Cerrar álbum' : 'Ver fotos'}</span>
                      </span>
                      <span className="hidden text-sm font-semibold text-[#8B4513] sm:block">{expanded ? 'Cerrar álbum' : 'Ver fotos'}</span>
                      <ChevronDown aria-hidden="true" size={22} className={`shrink-0 text-[#8B4513] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                  </h2>
                  <div id={`album-${album.id}`} role="region" aria-labelledby={`heading-${album.id}`} hidden={!expanded}>
                    {expanded && (
                      <div className="border-t border-[#E7D9C8] p-4 sm:p-6">
                        <p className="mb-5 leading-relaxed text-[#755E51]">{album.description}</p>
                        <div className={`grid gap-4 ${album.photos.length > 1 ? 'sm:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
                          {album.photos.map((photo, index) => (
                            <a key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Ver foto completa: ${photo.alt}`} className="group overflow-hidden rounded-xl border border-[#E7D9C8] bg-[#F5EFE8] focus-visible:outline-2 focus-visible:outline-[#8B4513]">
                              <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full object-contain" />
                              <span className="flex justify-between bg-white px-4 py-3 text-xs text-[#755E51]"><span>Foto {index + 1}</span><span className="font-semibold text-[#8B4513] group-hover:underline">Ver completa ↗</span></span>
                            </a>
                          ))}
                        </div>
                        <CommentsSection nav={nav} session={session} contentType="photo" contentId={album.id} />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function DiocesePage() {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>HISTORIA · VIDA DIOCESANA</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serif}>Actividades en la diócesis de Tampico</h1>
          <p className="mt-4 max-w-2xl text-white/80">Artículos y recuerdos de nuestra participación en la vida de la diócesis de Tampico.</p>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-16 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#E7D9C8] bg-white p-8 sm:p-12 text-center">
          <ScrollText size={36} className="mx-auto mb-4 text-[#8B4513]" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-[#5C4033]" style={serif}>Próximamente, nuestros artículos</h2>
          <p className="mt-3 text-[#755E51]">Aquí compartiremos las actividades, encuentros y experiencias de GETS en la diócesis de Tampico.</p>
        </div>
      </section>
    </main>
  );
}

function PersonalStudiesPage() {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>HISTORIA · ESTUDIOS PERSONALES</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serif}>Estudios personales</h1>
          <p className="mt-4 max-w-2xl text-white/80">Catálogo de estudios y reflexiones personales.</p>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-16 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>CATÁLOGO DE ESTUDIOS</SectionLabel>
          <article className="mt-4 rounded-2xl border border-[#E7D9C8] bg-white p-6 sm:p-10">
            <BookOpen size={30} className="mb-5 text-[#8B4513]" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-[#5C4033]" style={serif}>Clasificación de diversas escenas en el Evangelio de San Marcos</h2>
            <p className="mt-4 text-[#755E51]">Lic. María Luisa Rodríguez Assemat</p>
          </article>
        </div>
      </section>
    </main>
  );
}

function FratelliPage() {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>HISTORIA · ESTUDIO EN GRUPO</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serif}>Estudio en grupo de la encíclica social Fratelli tutti</h1>
          <p className="mt-4 max-w-2xl text-white/80">Un espacio para compartir el estudio y la reflexión en grupo sobre Fratelli tutti.</p>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-16 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#E7D9C8] bg-white p-8 sm:p-12 text-center">
          <ScrollText size={36} className="mx-auto mb-4 text-[#8B4513]" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-[#5C4033]" style={serif}>Próximamente, nuestras publicaciones</h2>
          <p className="mt-3 text-[#755E51]">Aquí compartiremos los estudios y reflexiones del grupo sobre esta encíclica.</p>
        </div>
      </section>
    </main>
  );
}

function ParishPage() {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>HISTORIA · VIDA PARROQUIAL</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serif}>Decano San Pedro y San Pablo · Parroquia Nuestra Señora del Rosario</h1>
          <p className="mt-4 max-w-2xl text-white/80">Un espacio para compartir nuestra vida y actividades parroquiales.</p>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-16 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#E7D9C8] bg-white p-8 sm:p-12 text-center">
          <ScrollText size={36} className="mx-auto mb-4 text-[#8B4513]" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-[#5C4033]" style={serif}>Próximamente, nuestras publicaciones</h2>
          <p className="mt-3 text-[#755E51]">Aquí compartiremos las actividades y experiencias de la Parroquia Nuestra Señora del Rosario.</p>
        </div>
      </section>
    </main>
  );
}

function DiocesanMeetingsPage() {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>HISTORIA · VIDA DIOCESANA</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serif}>Nuestros encuentros diocesanos</h1>
          <p className="mt-4 max-w-2xl text-white/80">Recuerdos y experiencias de nuestros encuentros en la diócesis.</p>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-16 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#E7D9C8] bg-white p-8 sm:p-12 text-center">
          <ScrollText size={36} className="mx-auto mb-4 text-[#8B4513]" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-[#5C4033]" style={serif}>Próximamente, nuestros encuentros</h2>
          <p className="mt-3 text-[#755E51]">Aquí compartiremos las publicaciones de nuestros encuentros diocesanos.</p>
        </div>
      </section>
    </main>
  );
}

function CarmeloPage() {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>ACTIVIDADES · CARMELO DESCALZO</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serif}>Actividades en el Carmelo Descalzo</h1>
          <p className="mt-4 max-w-2xl text-white/80">Encuentros y actividades en el Carmelo Descalzo.</p>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-16 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#E7D9C8] bg-white p-8 sm:p-12 text-center">
          <ScrollText size={36} className="mx-auto mb-4 text-[#8B4513]" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-[#5C4033]" style={serif}>Próximamente, nuestras actividades</h2>
          <p className="mt-3 text-[#755E51]">Aquí compartiremos nuestras actividades en el Carmelo Descalzo.</p>
        </div>
      </section>
    </main>
  );
}

function DiocesanActivitiesPage() {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>ACTIVIDADES · VIDA DIOCESANA</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serif}>Actividades diocesanas</h1>
          <p className="mt-4 max-w-2xl text-white/80">Un espacio para compartir nuestras actividades diocesanas.</p>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-16 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#E7D9C8] bg-white p-8 sm:p-12 text-center">
          <ScrollText size={36} className="mx-auto mb-4 text-[#8B4513]" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-[#5C4033]" style={serif}>Próximamente, nuestras actividades</h2>
          <p className="mt-3 text-[#755E51]">Aquí compartiremos las actividades que realizamos en nuestra diócesis.</p>
        </div>
      </section>
    </main>
  );
}

function LumenPage({ nav, session }: { nav: (p: Page) => void; session: Session | null }) {
  return (
    <main>
      <section className="bg-[#5C2D0E] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionLabel>ACTIVIDADES · ESTUDIO EN GRUPO</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={serif}>Estudio en grupo de Santa Teresa de Jesús y el misterio de la Iglesia: Lumen gentium del Concilio Vaticano II</h1>
        </div>
      </section>
      <section className="bg-[#F9F5EE] px-4 py-12 sm:px-6">
        <article className="max-w-5xl mx-auto rounded-2xl border border-[#E7D9C8] bg-white p-5 sm:p-8">
          <SectionLabel>MATERIAL DE ESTUDIO</SectionLabel>
          <h2 className="text-2xl font-bold text-[#5C4033]" style={serif}>Santa Teresa de Jesús y el «misterio» de la Iglesia</h2>
          <p className="mt-3 text-sm text-[#755E51]">Enrique Llamas Martínez · Anales de la Real Academia de Doctores de España · 2005 · 15 páginas</p>
          <div className="mt-6 space-y-5" aria-label="Material de estudio, 15 páginas">
            {Array.from({ length: 15 }, (_, index) => (
              <figure key={index} className="overflow-hidden rounded-xl border border-[#E7D9C8] bg-[#F9F5EE]">
                <img src={`/documentos/lumen-gentium/pagina-${String(index + 1).padStart(2, '0')}.jpg`} alt={`Santa Teresa de Jesús y el misterio de la Iglesia, página ${index + 1} de 15`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" width={1057} height={1500} draggable={false} className="block h-auto w-full" />
                <figcaption className="py-2 text-center text-xs text-[#755E51]">Página {index + 1} de 15</figcaption>
              </figure>
            ))}
          </div>
        </article>
        <CommentsSection nav={nav} session={session} contentType="article" contentId="santa-teresa-lumen-gentium" />
      </section>
    </main>
  );
}

// ===================== CONTACT PAGE =====================

function ContactPage({ nav }: { nav: (p: Page) => void }) {
  const [tab, setTab] = useState<"membership" | "prayer">("membership");

  return (
    <div>
      <section className="relative h-64 flex items-center bg-[#8B4513] overflow-hidden">
        <img
          src={IMG("photo-1508387027939-27cccde278e8", 1600, 500)}
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>CONTÁCTANOS</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={serif}>Ponte en Contacto</h1>
          <p className="text-white/60 mt-2">Estamos aquí para acompañarte. Escríbenos y con gusto te respondemos.</p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#5C4033] mb-6" style={serif}>Información de Contacto</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Teléfono", val: "+52 1 833 323 7636" },
                    { icon: Mail, label: "Correo", val: "gets.tampico@gmail.com" },
                    { icon: Clock, label: "Horario", val: "Lunes 10:00–12:00 | 17:00–18:30" },
                  ].map((c) => (
                    <div key={c.label} className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F5EFE8] flex items-center justify-center shrink-0">
                        <c.icon size={15} className="text-[#8B4513]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-medium">{c.label}</div>
                        <div className="text-sm text-[#5C4033] font-medium">{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-xs text-gray-400 font-medium mb-3">Síguenos</p>
                <div className="flex gap-2">
                  {["Facebook", "Instagram"].map((s) => (
                    <button
                      key={s}
                      className="px-3 py-1.5 bg-[#F5EFE8] text-[#8B4513] rounded-lg text-xs font-medium hover:bg-[#8B4513] hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contacto: inscripción al taller e intenciones de oración */}
            <div className="lg:col-span-2">
              <div className="flex gap-1 bg-[#F5EFE8] rounded-xl p-1 mb-6 md:mb-8 w-full md:w-fit overflow-x-auto">
                {(["membership", "prayer"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 md:flex-none px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                      tab === t ? "bg-white text-[#8B4513] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t === "membership" ? "Únete al Taller" : "Intención de Oración"}
                  </button>
                ))}
              </div>

              <div className="bg-[#F5EFE8] rounded-2xl p-5 md:p-8">
                {tab === "membership" && (
                  <div>
                    <h3 className="font-bold text-[#5C4033] mb-6" style={serif}>Formulario de Registro y Contacto</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      {["Nombre", "Apellido"].map((f) => (
                        <div key={f}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">{f}</label>
                          <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20" placeholder={f} />
                        </div>
                      ))}
                    </div>
                    {[
                      { l: "Correo electrónico", p: "tu@correo.com", t: "email" },
                      { l: "Número de teléfono", p: "+52...", t: "tel" },
                    ].map((f) => (
                      <div key={f.l} className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">{f.l}</label>
                        <input type={f.t} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20" placeholder={f.p} />
                      </div>
                    ))}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Área que más te interesa</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 text-[#5C4033]">
                        <option value="">Selecciona una opción</option>
                        <option value="sdc">S.d.C.</option>
                        <option value="stj">S.T.J.</option>
                        <option value="es">E.S.</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">¿Cómo te enteraste de GETS? (o déjanos un mensaje)</label>
                      <textarea className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 h-24 resize-none" placeholder="Cuéntanos tu historia..." />
                    </div>
                    <PrimaryBtn full>Enviar mensaje <ArrowRight size={15} /></PrimaryBtn>
                  </div>
                )}

                {tab === "prayer" && (
                  <div>
                    <h3 className="font-bold text-[#5C4033] mb-2" style={serif}>Intención de Oración</h3>
                    <p className="text-gray-400 text-sm mb-6">Llevamos cada intención a nuestra oración comunitaria con fidelidad.</p>
                    {["Tu nombre", "Correo electrónico"].map((f) => (
                      <div key={f} className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">{f}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20" placeholder={f} />
                      </div>
                    ))}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Intención de oración</label>
                      <textarea className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 h-32 resize-none" placeholder="Comparte lo que deseas que oremos por ti..." />
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      <input type="checkbox" id="anonymous" className="rounded" />
                      <label htmlFor="anonymous" className="text-xs text-gray-500">Mantener mi intención de forma anónima</label>
                    </div>
                    <PrimaryBtn full>Enviar intención <Heart size={15} /></PrimaryBtn>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===================== LOGIN PAGE =====================

function LoginPage({ nav, session, isAdmin, forceRecovery, onRecoveryComplete }: { nav: (p: Page) => void; session: Session | null; isAdmin: boolean; forceRecovery: boolean; onRecoveryComplete: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [recovery, setRecovery] = useState(forceRecovery);
  useEffect(() => { if (forceRecovery) setRecovery(true); }, [forceRecovery]);
  useEffect(() => {
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  async function updatePassword(event: React.FormEvent) {
    event.preventDefault();
    const { error } = await supabase!.auth.updateUser({ password });
    if (error) setMessage('No se pudo actualizar la contraseña.');
    else { onRecoveryComplete(); setRecovery(false); setPassword(''); setMessage('Contraseña actualizada. Ya puedes continuar.'); }
  }
  async function login(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMessage('No se pudo iniciar sesión. Verifica tu correo y contraseña.');
    else nav('home');
  }
  async function register(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage('');
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(), password,
      options: { data: { full_name: name.trim() }, emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    if (error) setMessage('No se pudo crear la cuenta. Revisa los datos e inténtalo de nuevo.');
    else if (data.session) { setMessage('Cuenta creada. Ya puedes comentar.'); setMode('login'); }
    else setMessage('Revisa tu correo para confirmar la cuenta. Después podrás iniciar sesión.');
  }
  async function resetPassword() {
    if (!supabase || !email.trim()) { setMessage('Escribe tu correo para restablecer la contraseña.'); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin });
    setMessage(error ? 'No se pudo enviar el correo de recuperación.' : 'Si el correo está registrado, recibirás instrucciones para recuperar el acceso.');
  }
  return <div className="min-h-[75vh] bg-[#F9F5EE] flex items-center justify-center px-4 py-16">
    <div className="bg-white border border-[#E7D9C8] shadow-sm rounded-3xl p-7 sm:p-10 w-full max-w-md">
      <h1 className="text-3xl font-bold text-[#5C4033] mb-2" style={serif}>Acceso a GETS</h1>
      <p className="text-[#755E51] mb-7">Ingresa o crea tu cuenta para participar en GETS.</p>
      {recovery ? <form onSubmit={updatePassword} className="space-y-4"><label className="block text-sm font-semibold text-[#5C4033]">Nueva contraseña<input type="password" minLength={8} required autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E7D9C8] px-4 py-3" /></label><button className="rounded-xl bg-[#8B4513] px-5 py-3 text-white">Guardar contraseña</button></form> : session ? <div className="space-y-4"><p className="text-[#5C4033]">Sesión iniciada: {session.user.email}</p>
        <button onClick={() => setRecovery(true)} className="block text-[#8B4513] underline">Crear o cambiar contraseña</button>
        <button onClick={() => nav('classroom')} className="block rounded-xl bg-[#8B4513] text-white px-5 py-3">Espacio de alumnas</button>
        <button onClick={() => nav(isAdmin ? 'admin' : 'gallery')} className="rounded-xl bg-[#8B4513] text-white px-5 py-3">{isAdmin ? 'Ir a moderación' : 'Ir a la galería'}</button>
        <button onClick={async () => { await supabase?.auth.signOut(); nav('home'); }} className="block text-[#8B4513] underline">Cerrar sesión</button></div> :
        <div>
          <div className="flex gap-1 rounded-xl bg-[#F5EFE8] p-1 mb-6">
            <button type="button" onClick={() => { setMode('login'); setMessage(''); }} className={`flex-1 rounded-lg py-2 text-sm ${mode === 'login' ? 'bg-white text-[#8B4513] shadow-sm' : 'text-[#755E51]'}`}>Ingresar</button>
            <button type="button" onClick={() => { setMode('signup'); setMessage(''); }} className={`flex-1 rounded-lg py-2 text-sm ${mode === 'signup' ? 'bg-white text-[#8B4513] shadow-sm' : 'text-[#755E51]'}`}>Crear cuenta</button>
          </div>
          <form onSubmit={mode === 'login' ? login : register} className="space-y-4">
          {mode === 'signup' && <label className="block text-sm font-semibold text-[#5C4033]">Tu nombre<input type="text" required maxLength={80} autoComplete="name" value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E7D9C8] px-4 py-3" /></label>}
          <label className="block text-sm font-semibold text-[#5C4033]">Correo electrónico<input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E7D9C8] px-4 py-3" /></label>
          <label className="block text-sm font-semibold text-[#5C4033]">Contraseña<input type="password" required minLength={mode === 'signup' ? 8 : undefined} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E7D9C8] px-4 py-3" /></label>
          <button type="submit" disabled={busy || !supabase} className="w-full rounded-xl bg-[#8B4513] py-3 text-white disabled:opacity-50">{busy ? 'Espera…' : mode === 'signup' ? 'Crear cuenta' : 'Iniciar sesión'}</button>
          {mode === 'login' && <button type="button" onClick={resetPassword} className="text-sm text-[#8B4513] underline">¿Olvidaste tu contraseña?</button>}
        </form>
        <p className="mt-5 text-center text-sm text-[#755E51]">¿Aún no eres parte? <button onClick={() => { setMode('signup'); setMessage(''); }} className="font-semibold text-[#8B4513] underline">Únete aquí</button></p>
        </div>}
      {!supabase && <p className="mt-4 text-sm text-[#8B4513]">Falta configurar la conexión a Supabase.</p>}
      {message && <p role="status" className="mt-4 text-sm text-[#8B4513]">{message}</p>}
    </div>
  </div>;
}

type BannedUser = { user_id: string; reason: string; banned_at: string };

function AdminPage({ nav, session }: { nav: (p: Page) => void; session: Session }) {
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [comments, setComments] = useState<GalleryComment[]>([]);
  const [banned, setBanned] = useState<BannedUser[]>([]);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [banCandidate, setBanCandidate] = useState<string | null>(null);
  const [banReason, setBanReason] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [sendingRecovery, setSendingRecovery] = useState(false);

  async function refresh(status = filter) {
    if (!supabase) return;
    const [result, bans, pending, approved, rejected] = await Promise.all([
      supabase.from('gets_gallery_comments').select('id,author_id,author_name,body,status,created_at,content_type,content_id')
        .eq('status', status).order('created_at', { ascending: false }).range(0, 49),
      supabase.from('gets_banned_users').select('user_id,reason,banned_at').order('banned_at', { ascending: false }).limit(200),
      supabase.from('gets_gallery_comments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('gets_gallery_comments').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
      supabase.from('gets_gallery_comments').select('id', { count: 'exact', head: true }).eq('status', 'rejected'),
    ]);
    if (result.error || bans.error || pending.error || approved.error || rejected.error) {
      setMessage('No se pudo cargar el panel. Comprueba que ejecutaste el SQL de moderación.');
      return;
    }
    setComments(result.data || []); setOffset(result.data?.length || 0); setHasMore((result.data?.length || 0) === 50);
    setBanned(bans.data || []);
    setCounts({ pending: pending.count || 0, approved: approved.count || 0, rejected: rejected.count || 0 });
    setMessage('');
  }
  useEffect(() => { void refresh(filter); }, [filter]);
  async function loadMore() {
    if (!supabase || !hasMore) return;
    const { data, error } = await supabase.from('gets_gallery_comments')
      .select('id,author_id,author_name,body,status,created_at,content_type,content_id')
      .eq('status', filter).order('created_at', { ascending: false }).range(offset, offset + 49);
    if (error) { setMessage('No se pudieron cargar más comentarios.'); return; }
    setComments(previous => [...previous, ...(data || [])]); setOffset(offset + (data?.length || 0)); setHasMore((data?.length || 0) === 50);
  }
  async function moderate(id: string, status: 'approved' | 'rejected') {
    if (!supabase) return;
    setBusyId(id);
    const { error } = await supabase.from('gets_gallery_comments').update({ status }).eq('id', id);
    setBusyId(null);
    if (error) setMessage('No se pudo guardar la decisión.'); else await refresh();
  }
  async function deleteComment(id: string) {
    if (!supabase || !window.confirm('¿Eliminar este comentario definitivamente? Esta acción no se puede deshacer.')) return;
    setBusyId(id);
    const { error } = await supabase.from('gets_gallery_comments').delete().eq('id', id);
    setBusyId(null);
    if (error) setMessage('No se pudo eliminar el comentario.'); else await refresh();
  }
  async function banUser(userId: string) {
    if (!supabase || !banReason.trim()) return;
    setBusyId(userId);
    const { error } = await supabase.from('gets_banned_users').insert({
      user_id: userId, reason: banReason.trim().slice(0, 200), banned_by: session.user.id,
    });
    setBusyId(null);
    if (error) setMessage('No se pudo restringir la cuenta.');
    else { setBanCandidate(null); setBanReason(''); await refresh(); }
  }
  async function unbanUser(userId: string) {
    if (!supabase) return;
    setBusyId(userId);
    const { error } = await supabase.from('gets_banned_users').delete().eq('user_id', userId);
    setBusyId(null);
    if (error) setMessage('No se pudo quitar la restricción.'); else await refresh();
  }
  async function sendRecovery(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase || !recoveryEmail.trim() || sendingRecovery) return;
    setSendingRecovery(true); setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail.trim(), {
      redirectTo: window.location.origin,
    });
    setSendingRecovery(false);
    setMessage(error ? 'No se pudo solicitar el enlace. Inténtalo más tarde.' : 'Si la cuenta existe, Supabase enviará un enlace para que esa persona elija una contraseña nueva.');
    if (!error) setRecoveryEmail('');
  }
  const isBanned = (userId: string) => banned.some(item => item.user_id === userId);
  return <main className="min-h-[75vh] bg-[#F9F5EE] px-4 py-12">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-7"><div><h1 className="text-3xl font-bold text-[#5C4033]" style={serif}>Moderación de GETS</h1><p className="text-[#755E51] text-sm mt-2">Administradora: {session.user.email}</p></div>
      <div className="flex gap-4"><button onClick={() => void refresh()} className="text-[#8B4513] underline">Actualizar</button><button onClick={async () => { await supabase?.auth.signOut(); nav('home'); }} className="text-[#8B4513] underline">Cerrar sesión</button></div></div>
      <div className="mb-6 flex flex-wrap gap-3"><button onClick={() => nav('classroom')} className="rounded-xl bg-[#8B4513] px-5 py-3 text-white">Materiales y foro privado</button><button onClick={() => nav('home')} className="rounded-xl border border-[#E7D9C8] px-5 py-3 text-[#8B4513]">Volver a la web</button></div>
      <StudentManager session={session} />
      <p className="mb-5 rounded-xl border border-[#E7D9C8] bg-white p-4 text-sm text-[#755E51]">Los comentarios nuevos esperan aprobación. Puedes ocultar uno publicado desde la pestaña Publicados o eliminar definitivamente cualquier comentario. Restringir una cuenta impide nuevos comentarios, oculta los suyos y bloquea su acceso al espacio de alumnas mientras dure la restricción.</p>
      <div className="flex flex-wrap gap-2 mb-6">{([
        ['pending', 'Pendientes'], ['approved', 'Publicados'], ['rejected', 'Rechazados'],
      ] as const).map(([key, label]) => <button key={key} onClick={() => { setFilter(key); setMessage(''); }} aria-pressed={filter === key} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${filter === key ? 'bg-[#8B4513] text-white' : 'bg-white text-[#8B4513] border border-[#E7D9C8]'}`}>{label} ({counts[key]})</button>)}</div>
      <form onSubmit={sendRecovery} className="mb-6 rounded-2xl border border-[#E7D9C8] bg-white p-5">
        <h2 className="text-lg font-bold text-[#5C4033]" style={serif}>Ayudar a recuperar el acceso</h2>
        <p className="mt-1 mb-4 text-sm text-[#755E51]">Escribe el correo de la alumna. Ella recibirá un enlace y elegirá su nueva contraseña; no necesitas conocerla.</p>
        <div className="flex flex-col sm:flex-row gap-2"><label htmlFor="recovery-email" className="sr-only">Correo de la alumna</label><input id="recovery-email" type="email" required autoComplete="off" value={recoveryEmail} onChange={e => setRecoveryEmail(e.target.value)} placeholder="alumna@correo.com" className="flex-1 rounded-lg border border-[#E7D9C8] px-3 py-2" /><button type="submit" disabled={sendingRecovery} className="rounded-lg bg-[#8B4513] px-4 py-2 text-white disabled:opacity-50">{sendingRecovery ? 'Enviando…' : 'Enviar enlace de recuperación'}</button></div>
      </form>
      {message && <p role="status" className="mb-4 text-[#8B4513]">{message}</p>}
      {comments.length === 0 ? <p className="rounded-2xl bg-white p-6 text-[#755E51]">No hay comentarios en esta sección.</p> : <div className="space-y-4">{comments.map(c => <article key={c.id} className="rounded-2xl bg-white border border-[#E7D9C8] p-5">
        <div className="flex flex-wrap justify-between gap-2 text-sm font-semibold text-[#8B4513]"><span>{c.author_name}{isBanned(c.author_id) && <span className="ml-2 text-red-700">Cuenta restringida</span>}</span><time dateTime={c.created_at}>{new Date(c.created_at).toLocaleString('es-MX')}</time></div>
        <p className="mt-2 text-xs text-[#755E51]">{c.content_type === 'photo' ? 'Foto' : 'Artículo'}: {c.content_id}</p>
        <p className="my-4 whitespace-pre-wrap break-words text-[#5C4033]">{c.body}</p>
        <div className="flex flex-wrap gap-2">
          {c.status !== 'approved' && <button disabled={busyId === c.id} onClick={() => void moderate(c.id, 'approved')} className="rounded-lg bg-[#8B4513] px-4 py-2 text-white disabled:opacity-50">Aprobar</button>}
          {c.status !== 'rejected' && <button disabled={busyId === c.id} onClick={() => void moderate(c.id, 'rejected')} className="rounded-lg border border-[#8B4513] px-4 py-2 text-[#8B4513] disabled:opacity-50">{c.status === 'approved' ? 'Ocultar' : 'Rechazar'}</button>}
          <button disabled={busyId === c.id} onClick={() => void deleteComment(c.id)} className="rounded-lg border border-red-300 px-4 py-2 text-red-700 disabled:opacity-50">Eliminar</button>
          {isBanned(c.author_id) ? <button disabled={busyId === c.author_id} onClick={() => void unbanUser(c.author_id)} className="rounded-lg border border-green-700 px-4 py-2 text-green-800 disabled:opacity-50">Quitar restricción</button> : <button onClick={() => { setBanCandidate(c.author_id); setBanReason(''); }} className="rounded-lg border border-red-300 px-4 py-2 text-red-700">Restringir cuenta</button>}
        </div>
        {banCandidate === c.author_id && !isBanned(c.author_id) && <div className="mt-4 rounded-xl bg-[#F9F5EE] p-4"><label className="block text-sm text-[#5C4033] font-semibold" htmlFor={`reason-${c.id}`}>Motivo de la restricción</label><input id={`reason-${c.id}`} maxLength={200} value={banReason} onChange={e => setBanReason(e.target.value)} className="mt-2 w-full rounded-lg border border-[#E7D9C8] p-2" placeholder="Por ejemplo: lenguaje ofensivo" /><div className="flex gap-2 mt-3"><button disabled={!banReason.trim() || busyId === c.author_id} onClick={() => void banUser(c.author_id)} className="rounded-lg bg-red-700 px-4 py-2 text-white disabled:opacity-50">Confirmar restricción</button><button onClick={() => setBanCandidate(null)} className="text-[#755E51] underline">Cancelar</button></div></div>}
      </article>)}</div>}
      {hasMore && <button onClick={() => void loadMore()} className="mt-6 rounded-xl border border-[#8B4513] px-5 py-2 text-[#8B4513]">Cargar más</button>}
      {banned.length > 0 && <section className="mt-12"><h2 className="text-xl font-bold text-[#5C4033] mb-4" style={serif}>Cuentas restringidas</h2><div className="space-y-2">{banned.map(item => <div key={item.user_id} className="rounded-xl border border-[#E7D9C8] bg-white p-4 flex flex-wrap items-center justify-between gap-3"><div><p className="font-medium text-[#5C4033]">{comments.find(c => c.author_id === item.user_id)?.author_name || `Cuenta ${item.user_id.slice(0, 8)}`}</p><p className="text-sm text-[#755E51]">{item.reason} · {new Date(item.banned_at).toLocaleDateString('es-MX')}</p></div><button disabled={busyId === item.user_id} onClick={() => void unbanUser(item.user_id)} className="text-green-800 underline disabled:opacity-50">Quitar restricción</button></div>)}</div></section>}
    </div>
  </main>;
}

// ===================== FOOTER =====================

function Footer({ nav }: { nav: (p: Page) => void }) {
  return (
    <footer className="bg-[#5C2D0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-xl" style={serif}>
                GETS<span className="text-[#D4AF37]">.</span>
              </span>
            </div>
            <p className="text-white/40 text-xs mb-3">Grupo Educativo Teresiano Sanjuanista</p>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              Comunidad espiritual en Tampico, inspirada en Santa Teresa de Jesús y San Juan de la Cruz.
            </p>
          </div>

          {[
            {
              title: "NAVEGACIÓN",
              links: [
                { l: "Inicio", p: "home" as Page },
                { l: "Nosotros", p: "about" as Page },
                { l: "Actividades", p: "events" as Page },
                { l: "Enseñanzas e Historia", p: "sermons" as Page },
                { l: "Contacto", p: "contact" as Page },
              ],
            },
            {
              title: "COMUNIDAD",
              links: [
                { l: "Intenciones de oración", p: "contact" as Page },
                { l: "Espacio de alumnas", p: "classroom" as Page },
                { l: "Voluntariado", p: "contact" as Page },
                { l: "Próximos eventos", p: "events" as Page },
              ],
            },
            {
              title: "CONTACTO",
              links: [],
              info: [
                "Tampico, Tamps. (Sedes itinerantes)",
                "+52 1 833 323 7636",
                "gets.tampico@gmail.com",
                "Lunes y eventos programados",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{col.title}</h4>
              {col.links.map((link) => (
                <button
                  key={link.l}
                  onClick={() => nav(link.p)}
                  className="block text-sm text-white/60 hover:text-white transition-colors mb-2"
                >
                  {link.l}
                </button>
              ))}
              {col.info?.map((i) => (
                <p key={i} className="text-sm text-white/60 mb-2">{i}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2026 GETS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

// ===================== APP =====================

export default function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [recoveryRequested, setRecoveryRequested] = useState(false);
  useEffect(() => {
    const onPopState = () => {
      setPage(pageFromPath(window.location.pathname));
      setMobileOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  useEffect(() => {
    if (!supabase) { setAuthReady(true); return; }
    let active = true;
    const sync = async (next: Session | null) => {
      if (!active) return;
      setSession(next);
      if (next) {
        const { data } = await supabase.from('gets_admins').select('user_id').eq('user_id', next.user.id).maybeSingle();
        if (active) setIsAdmin(!!data);
      } else { setIsAdmin(false); setPage(p => { if (p === 'admin') { window.history.replaceState({}, '', PAGE_PATHS.home); return 'home'; } return p; }); }
      if (active) setAuthReady(true);
    };
    supabase.auth.getSession().then(({ data }) => sync(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === 'PASSWORD_RECOVERY') { setRecoveryRequested(true); window.history.replaceState({}, '', PAGE_PATHS.login); setPage('login'); }
      setTimeout(() => { void sync(next); }, 0);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  const nav = (p: Page) => {
    const path = PAGE_PATHS[p];
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Nav page={page} nav={nav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {page === "home" && <HomePage nav={nav} />}
      {page === "about" && <AboutPage nav={nav} />}
      {page === "events" && <EventsPage nav={nav} />}
      {page === "carmelo" && <CarmeloPage />}
      {page === "diocesanActivities" && <DiocesanActivitiesPage />}
      {page === "lumen" && <LumenPage nav={nav} session={session} />}
      {page === "sermons" && <SermonsPage nav={nav} session={session} />}
      {page === "diocese" && <DiocesePage />}
      {page === "studies" && <PersonalStudiesPage />}
      {page === "parish" && <ParishPage />}
      {page === "diocesanMeetings" && <DiocesanMeetingsPage />}
      {page === "fratelli" && <FratelliPage />}
      {page === "gallery" && <GalleryPage nav={nav} session={session} />}
      {page === "contact" && <ContactPage nav={nav} />}
      {page === "classroom" && (authReady ? <Classroom key={session?.user.id || 'guest'} session={session} isAdmin={isAdmin} onLogin={() => nav('login')} onAdmin={() => nav('admin')} /> : <p className="p-12 text-center">Comprobando sesión…</p>)}
      {page === "login" && <LoginPage nav={nav} session={session} isAdmin={isAdmin} forceRecovery={recoveryRequested} onRecoveryComplete={() => setRecoveryRequested(false)} />}
      {page === "admin" && (authReady && session && isAdmin ? <AdminPage nav={nav} session={session} /> : <LoginPage nav={nav} session={session} isAdmin={isAdmin} forceRecovery={recoveryRequested} onRecoveryComplete={() => setRecoveryRequested(false)} />)}
      {page !== "login" && page !== "admin" && <Footer nav={nav} />}
    </div>
  );
}
