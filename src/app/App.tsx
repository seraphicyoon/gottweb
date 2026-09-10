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
import image_a6581ea87ef7420b4834deabc17656a8_1 from '@/imports/a6581ea87ef7420b4834deabc17656a8-1.jpg'
import image_a6581ea87ef7420b4834deabc17656a8 from '@/imports/a6581ea87ef7420b4834deabc17656a8.jpg'
import { useState } from "react";
import {
  Menu, X, Search, Play, Users, BookOpen, MapPin, Phone,
  Mail, Clock, ArrowRight, Calendar, Music, ChevronDown,
  ChevronRight, LayoutDashboard, UserCheck, Building2, LogOut,
  TrendingUp, MessageSquare, CheckCircle, Eye, Trash2, Upload,
  Heart, Filter, Headphones, Bell, Star, Globe, Handshake,
  Video, Leaf
} from "lucide-react";

type Page = "home" | "about" | "events" | "sermons" | "gallery" | "contact" | "login" | "admin";

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

const TEAM = [
  {
    name: "Pastor Emmanuel Kwame",
    role: "Senior Pastor & Founder",
    avatar: "photo-1560250097-0b93528c311a",
    bio: "Passionate about raising disciples who know Christ deeply and impact their world.",
  },
  {
    name: "Elder Sarah Mensah",
    role: "Associate Pastor",
    avatar: "photo-1573496359142-b8d87734a5a2",
    bio: "Leading prayer ministry and women's discipleship with prophetic insight and pastoral care.",
  },
  {
    name: "Deacon Kofi Asante",
    role: "Outreach Director",
    avatar: "photo-1472099645785-5658abf4ff4e",
    bio: "Equipping believers to serve communities and share the Gospel with love and action.",
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
    { label: "Enseñanzas e Historia", page: "sermons" },
    { label: "Galería", page: "gallery" },
    { label: "Contacto", page: "contact" },
  ];
  const isAdmin = page === "admin";
  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => nav("home")} className="flex items-center gap-2.5">
            <div>
              <div className="font-bold text-[#8B4513] text-base leading-none" style={serif}>GETS</div>
              <div className="text-[10px] text-gray-400 font-medium tracking-wide hidden sm:block">
                Grupo Educativo Teresiano Sanjuanista
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
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
            <PrimaryBtn onClick={() => nav("contact")} size="sm">
              Entra a la comunidad
            </PrimaryBtn>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-black/5 bg-white px-4 pb-4 pt-2">
          {links.map((l) => (
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
            <PrimaryBtn onClick={() => nav("contact")} full>
              Únete a la comunidad
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
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#5C2D0E]">
        <img
          src={IMG("photo-1529070538774-1843cb3265df", 1920, 1080)}
          alt="Community worship gathering"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2D0E]/90 via-[#8B4513]/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-0.5 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">VIDA Y ORACIÓN</span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6"
              style={serif}
            >¿Qué es GETS?<br /></h1>
            <p className="text-base md:text-lg text-white/80 mb-7 md:mb-10 leading-relaxed max-w-xl">GETS (Grupo Educativo Teresiano Sanjuanista) es una comunidad espiritual que promueve el encuentro íntimo con Dios a través de la oración, el estudio y la vivencia diaria de la espiritualidad de Santa Teresa de Jesús y San Juan de la Cruz.</p>
            <div className="flex flex-wrap gap-3">
              <PrimaryBtn onClick={() => nav("contact")} size="lg">
                Entra a la comunidad <ArrowRight size={18} />
              </PrimaryBtn>
              <OutlineBtn white onClick={() => nav("about")}>
                Leer más <ChevronRight size={16} />
              </OutlineBtn>
            </div>
            {/* Stats row */}
            <div className="flex gap-6 md:gap-8 mt-8 md:mt-14 pt-6 md:pt-10 border-t border-white/10">
              {[
                { n: "2,400+", l: "Miembros" },
                { n: "12", l: "Espacios visitados" },
                { n: "7 años", l: "De trayectoria" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold text-white" style={serif}>{s.n}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
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

      {/* Volunteer & Sponsor */}
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Año de inicio", value: "2018" },
                  { label: "Miembros", value: "2,400+" },
                  { label: "Talleres impartidos", value: "12" },
                  { label: "Espacios visitados", value: "8" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F5EFE8] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#8B4513]" style={serif}>{s.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
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
          <div className="flex justify-center">
            {TEAM.slice(0, 1).map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative inline-block mb-5">
                  <img
                    src={image_a6581ea87ef7420b4834deabc17656a8_1}
                    alt={member.name}
                    className="w-28 h-28 rounded-2xl object-cover mx-auto ring-4 ring-[#F5EFE8] group-hover:ring-[#8B4513]/20 transition-all"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                    <Star size={12} className="text-white" fill="white" />
                  </div>
                </div>
                <h4 className="font-bold text-[#5C4033]" style={serif}>Nombre</h4>
                <p className="text-[#8B4513] text-xs font-semibold mt-1 mb-3">Cargo</p>
                <p className="text-gray-400 text-sm">Descripción corta</p>
              </div>
            ))}
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
              { icon: Handshake, title: "Servicio Comunitario", desc: "Viviendo el amor de Dios a través del apoyo práctico a los demás." },
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

function SermonsPage() {
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

      {/* Contenido Completo de la Historia de GETS solicitado */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Introducción */}
          <div className="bg-[#F5EFE8] rounded-3xl p-8 md:p-10 border border-[#8B4513]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#5C4033] mb-4" style={serif}>
              Historia de GETS (Grupo Educativo Teresiano Sanjuanista)
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Les invito a conocernos en cinco líneas dinámicas que van entretejidas en nuestros orígenes, historia y dinamismo misionero, nacidos de la fuente contemplativo-apostólica Teresiana. Esta última nace de la Iglesia y para la Iglesia desde la familia, doctrina y misión de los doctores místicos de la Iglesia, Santa Teresa de Jesús y Juan de la Cruz, fundadores del carmelo Teresiano. Del principio al presente, el ritmo y los pasos, en el compartir las enseñanzas de dos de los grandes místicos van acompañados y cobran vida desde la Palabra de Dios que se conjuga en el carmelo en una mística centrada en la humanidad de Jesucristo, viviendo en una relación de amistad creciente con Jesucristo.
            </p>
          </div>

          {/* Visión */}
          <div>
            <h3 className="text-xl font-bold text-[#5C4033] mb-4" style={serif}>Nuestra Visión y Valores</h3>
            <p className="text-gray-500 mb-4 text-sm">Pretendemos hacer vida nuestra visión al formar comunidades, verdaderas familias en la Iglesia:</p>
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
                  <li><strong>Jornadas de Contemplación con las Moradas de Santa Teresa de Jesús</strong> (Cuatro años). Creador y dirigente, Rev Padre Rafael Checa ocd. Lugar: Centro Manresa, Tampico.</li>
                  <li><strong>Talleres de Formación Espiritual y humana.</strong> Conferencista Luis Jorge González ocd, Seminario de Tampico.</li>
                  <li><strong>Conferencias sobre psico-neurología y espiritualidad.</strong> Expositor: Luis Jorge Gonzales.</li>
                  <li><strong>Seguimiento retiros y clases a grupos y personas.</strong> Centro de Espiritualidad Teresiano-Sanjuanista Edith Stein de Tampico (20 años).</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#8B4513] text-sm mb-2">2. Espiritualidad y Formación Integral</h4>
                <ul className="text-xs text-gray-600 space-y-2 pl-4 list-disc">
                  <li><strong>Semana de Espiritualidad Teresiano-Sanjuanista</strong> Casa de Ana Maria Rabaté, Expositor y dirigente: Maximiliano Herraiz García ocd.</li>
                  <li><strong>Conferencias sobre Santa Teresa de Jesús y San Juan de la Cruz:</strong> Seminario de Tampico (tres años). Ponente: Maximiliano Herraiz García ocd.</li>
                  <li><strong>Talleres de Formación espiritual aplicada a las misiones</strong> en seminarios carmelitas en Nairobi, Kenia y en Morogoro, Tanzania. Coordinadores: Luis Jorge González ocd y Maria Luisa Rodríguez Assemat oscd.</li>
                  <li><strong>Talleres de formación en desarrollo humano y fe para agentes de Pastoral</strong> (seis años). Conferencista y coordinadora: Maria Luisa Rodriguez Assemat. Ciudad Madero, Tamaulipas.</li>
                  <li><strong>Clases Teresiano-Sanjuanistas:</strong> Instituto Cultural Tampico (Diez Años). María Luisa Rodriguez Assemat.</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#8B4513] text-sm mb-2">3. Congresos y Simposios</h4>
                <ul className="text-xs text-gray-600 space-y-2 pl-4 list-disc">
                  <li>Simposio de Psicología y Espiritualidad en Roma 2003.</li>
                  <li>Participación en el Congreso internacional de Mística en Munsterschwartz, Alemania. José Ignacio Rodriguez Assemat y Maria Luisa Rodriguez Assemat.</li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

// ===================== GALLERY PAGE =====================

function GalleryPage() {
  return (
    <div>
      <section className="relative h-64 flex items-center bg-[#8B4513] overflow-hidden">
        <img
          src={IMG("photo-1531206715517-5c0ba140b2b8", 1600, 500)}
          alt="Galería"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>MOMENTOS GETS</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={serif}>Galería de la Comunidad</h1>
          <p className="text-white/60 mt-2">Espacios de oración, reflexión y encuentro fraterno.</p>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-[#F5EFE8]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Heart size={26} className="text-[#D4AF37]" />
          </div>
          <p className="text-[#5C4033] text-xl leading-relaxed" style={serif}>
            Próximamente compartiremos los momentos y vivencias de nuestros talleres presenciales.
          </p>
        </div>
      </section>
    </div>
  );
}

// ===================== CONTACT PAGE =====================

function ContactPage({ nav }: { nav: (p: Page) => void }) {
  const [tab, setTab] = useState<"membership" | "sponsor" | "prayer">("membership");

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

            {/* Forms con el select de las 3 áreas de interés */}
            <div className="lg:col-span-2">
              <div className="flex gap-1 bg-[#F5EFE8] rounded-xl p-1 mb-6 md:mb-8 w-full md:w-fit overflow-x-auto">
                {(["membership", "sponsor", "prayer"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 md:flex-none px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                      tab === t ? "bg-white text-[#8B4513] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t === "membership" ? "Únete al Taller" : t === "sponsor" ? "Patrocinio" : "Intención de Oración"}
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

                {tab === "sponsor" && (
                  <div>
                    <h3 className="font-bold text-[#5C4033] mb-6" style={serif}>Formulario de Patrocinio</h3>
                    {[
                      { l: "Nombre de la organización o empresa", p: "Tu organización" },
                      { l: "Persona de contacto", p: "Nombre completo" },
                      { l: "Correo electrónico", p: "contacto@org.com" },
                      { l: "Número de teléfono", p: "+52..." },
                    ].map((f) => (
                      <div key={f.l} className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">{f.l}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20" placeholder={f.p} />
                      </div>
                    ))}
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">¿Cómo te gustaría apoyar a GETS?</label>
                      <textarea className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 h-24 resize-none" placeholder="Describe cómo te gustaría colaborar con GETS..." />
                    </div>
                    <GoldBtn full>Enviar interés de patrocinio <ArrowRight size={15} /></GoldBtn>
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

function LoginPage({ nav }: { nav: (p: Page) => void }) {
  const [loginType, setLoginType] = useState<"member" | "admin">("member");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex bg-[#8B4513] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMG("photo-1529070538774-1843cb3265df", 800, 1000)}
            alt="Worship"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B4513]/80 to-[#5C2D0E]/90" />
        </div>
        <div className="relative z-10">
          <button onClick={() => nav("home")} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={serif}>GETS</span>
            </div>
            <span className="text-white font-bold text-lg" style={serif}>
              Grupo Educativo Teresiano Sanjuanista
            </span>
          </button>
        </div>
        <div className="relative z-10">
          <div className="text-[#D4AF37] text-4xl mb-4" style={serif}>"</div>
          <blockquote className="text-2xl text-white font-medium leading-relaxed mb-4" style={serif}>
            Buscad leyendo y hallaréis meditando.
          </blockquote>
          <p className="text-white/60 text-sm">— SANTA TERESA DE JESÚS</p>
        </div>
        <div className="relative z-10 text-white/40 text-xs">
          © 2026 GETS. Todos los derechos reservados.
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-5 md:p-8 bg-white">
        <div className="w-full max-w-sm">
          <button onClick={() => nav("home")} className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#8B4513] flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={serif}>GETS</span>
            </div>
          </button>

          <h1 className="text-2xl font-bold text-[#5C4033] mb-1" style={serif}>Bienvenido de nuevo</h1>
          <p className="text-gray-400 text-sm mb-7">Inicia sesión en tu cuenta de GETS</p>

          {/* Toggle */}
          <div className="flex gap-1 bg-[#F5EFE8] rounded-xl p-1 mb-7">
            {(["member", "admin"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setLoginType(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  loginType === t ? "bg-white text-[#8B4513] shadow-sm" : "text-gray-400"
                }`}
              >
                {t === "member" ? "Acceso Miembros" : "Acceso Administrador"}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F5EFE8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] focus:bg-white transition-colors"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-500">Contraseña</label>
                <button className="text-xs text-[#8B4513] font-medium hover:underline">¿Olvidaste tu contraseña?</button>
              </div>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F5EFE8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded" />
              <label htmlFor="remember" className="text-xs text-gray-500">Recordarme por 30 días</label>
            </div>
          </div>

          <PrimaryBtn
            full
            onClick={() => { if (loginType === "admin") nav("admin"); }}
          >
            Iniciar sesión <ArrowRight size={15} />
          </PrimaryBtn>

          <p className="text-center text-xs text-gray-400 mt-6">
            ¿Aún no eres parte?{" "}
            <button onClick={() => nav("contact")} className="text-[#8B4513] font-semibold hover:underline">
              Únete a nuestra comunidad
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================== ADMIN PAGE =====================

const ADMIN_MEMBERS = [
  { id: 1, name: "Abena Owusu", email: "abena@email.com", joined: "June 12, 2025", status: "Active", group: "Bible Study" },
  { id: 2, name: "Michael Darko", email: "michael@email.com", joined: "June 18, 2025", status: "Pending", group: "Youth" },
  { id: 3, name: "Grace Amponsah", email: "grace@email.com", joined: "June 22, 2025", status: "Active", group: "Worship" },
  { id: 4, name: "Kwame Asante", email: "kwame@email.com", joined: "June 25, 2025", status: "Pending", group: "Outreach" },
  { id: 5, name: "Efua Boateng", email: "efua@email.com", joined: "June 30, 2025", status: "Active", group: "Prayer" },
];

const ADMIN_SPONSORS = [
  { id: 1, org: "Bright Star Foundation", contact: "Dr. Samuel Osei", email: "samuel@bsf.org", amount: "GH₵ 5,000", status: "Approved" },
  { id: 2, org: "Heritage Bank Ltd", contact: "Maame Osei", email: "maame@heritage.com", amount: "GH₵ 10,000", status: "Pending" },
  { id: 3, org: "Grace Supplies Co.", contact: "Joseph Mensah", email: "joseph@grace.com", amount: "GH₵ 2,500", status: "Approved" },
];

function AdminPage({ nav }: { nav: (p: Page) => void }) {
  const [section, setSection] = useState<"dashboard" | "members" | "sponsors" | "gallery">("dashboard");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "members", label: "Memberships", icon: UserCheck },
    { id: "sponsors", label: "Sponsors", icon: Building2 },
    { id: "gallery", label: "Gallery", icon: TrendingUp },
  ] as const;

  return (
    <div className="flex min-h-screen bg-[#F5EFE8]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#8B4513] flex flex-col min-h-screen shrink-0">
        <div className="p-5 border-b border-white/10">
          <button onClick={() => nav("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={serif}>GETS</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm" style={serif}>GETS Admin</div>
              <div className="text-white/40 text-[10px]">Management Portal</div>
            </div>
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                section === item.id
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => nav("login")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-[#5C4033] text-lg" style={serif}>
              {section === "dashboard" && "Dashboard"}
              {section === "members" && "Membership Requests"}
              {section === "sponsors" && "Sponsor Requests"}
              {section === "gallery" && "Gallery Management"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-50 rounded-xl">
              <Bell size={16} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src={IMG("photo-1560250097-0b93528c311a", 60, 60)}
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-xs">
                <div className="font-semibold text-[#5C4033]">Pastor Emmanuel</div>
                <div className="text-gray-400">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {section === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Members", value: "2,418", change: "+24 this month", icon: Users, color: "blue" },
                  { label: "Pending Requests", value: "12", change: "4 new today", icon: MessageSquare, color: "gold" },
                  { label: "Active Sponsors", value: "8", change: "+2 this quarter", icon: Building2, color: "green" },
                  { label: "Upcoming Events", value: "6", change: "Next: July 12", icon: Calendar, color: "blue" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          s.color === "gold" ? "bg-[#FFF8E1]" : s.color === "green" ? "bg-[#E8F8F0]" : "bg-[#F5EFE8]"
                        }`}
                      >
                        <s.icon
                          size={16}
                          className={
                            s.color === "gold" ? "text-[#B8860B]" : s.color === "green" ? "text-[#1A7A4A]" : "text-[#8B4513]"
                          }
                        />
                      </div>
                      <TrendingUp size={14} className="text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-[#5C4033]" style={serif}>{s.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                    <div className="text-xs text-green-500 mt-1 font-medium">{s.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#5C4033] text-sm" style={serif}>Recent Members</h3>
                    <button onClick={() => setSection("members")} className="text-xs text-[#8B4513] font-semibold">View all</button>
                  </div>
                  <div className="space-y-3">
                    {ADMIN_MEMBERS.slice(0, 4).map((m) => (
                      <div key={m.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F5EFE8] flex items-center justify-center text-[#8B4513] text-xs font-bold">
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#5C4033]">{m.name}</div>
                            <div className="text-[10px] text-gray-400">{m.group}</div>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          m.status === "Active" ? "bg-[#E8F8F0] text-[#1A7A4A]" : "bg-[#FFF8E1] text-[#B8860B]"
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-[#5C4033] text-sm mb-4" style={serif}>Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Add Event", icon: Calendar, action: () => {} },
                      { label: "Upload Photo", icon: Upload, action: () => setSection("gallery") },
                      { label: "View Members", icon: Users, action: () => setSection("members") },
                      { label: "View Sponsors", icon: Building2, action: () => setSection("sponsors") },
                    ].map((q) => (
                      <button
                        key={q.label}
                        onClick={q.action}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F5EFE8] hover:bg-[#F5EFE8] hover:text-[#8B4513] transition-colors group"
                      >
                        <q.icon size={18} className="text-gray-400 group-hover:text-[#8B4513] transition-colors" />
                        <span className="text-xs font-medium text-gray-500 group-hover:text-[#8B4513]">{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "members" && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="relative w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 bg-[#F5EFE8]"
                    placeholder="Search members..."
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-500 hover:bg-gray-50">
                    <Filter size={12} /> Filter
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5EFE8] text-xs text-gray-400 font-semibold">
                    <tr>
                      {["Name", "Email", "Joined", "Group", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ADMIN_MEMBERS.map((m) => (
                      <tr key={m.id} className="hover:bg-[#F5EFE8] transition-colors">
                        <td className="px-5 py-3.5 text-sm font-medium text-[#5C4033]">{m.name}</td>
                        <td className="px-5 py-3.5 text-xs text-gray-400">{m.email}</td>
                        <td className="px-5 py-3.5 text-xs text-gray-400">{m.joined}</td>
                        <td className="px-5 py-3.5 text-xs text-gray-400">{m.group}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                            m.status === "Active" ? "bg-[#E8F8F0] text-[#1A7A4A]" : "bg-[#FFF8E1] text-[#B8860B]"
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-[#F5EFE8] rounded-lg transition-colors">
                              <Eye size={13} className="text-[#8B4513]" />
                            </button>
                            <button
                              onClick={() => setDeleteId(m.id)}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={13} className="text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === "sponsors" && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-[#5C4033] text-sm" style={serif}>Sponsor Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5EFE8] text-xs text-gray-400 font-semibold">
                    <tr>
                      {["Organization", "Contact", "Email", "Amount", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ADMIN_SPONSORS.map((s) => (
                      <tr key={s.id} className="hover:bg-[#F5EFE8] transition-colors">
                        <td className="px-5 py-3.5 text-sm font-medium text-[#5C4033]">{s.org}</td>
                        <td className="px-5 py-3.5 text-xs text-gray-500">{s.contact}</td>
                        <td className="px-5 py-3.5 text-xs text-gray-400">{s.email}</td>
                        <td className="px-5 py-3.5 text-xs font-semibold text-[#8B4513]">{s.amount}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                            s.status === "Approved" ? "bg-[#E8F8F0] text-[#1A7A4A]" : "bg-[#FFF8E1] text-[#B8860B]"
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-[#F5EFE8] rounded-lg">
                              <Eye size={13} className="text-[#8B4513]" />
                            </button>
                            <button
                              onClick={() => setDeleteId(s.id)}
                              className="p-1.5 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={13} className="text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === "gallery" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#5C4033] text-sm mb-4" style={serif}>Upload New Photo</h3>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center gap-3 hover:border-[#8B4513]/40 transition-colors cursor-pointer bg-[#F5EFE8]">
                  <div className="w-12 h-12 rounded-xl bg-[#F5EFE8] flex items-center justify-center">
                    <Upload size={20} className="text-[#8B4513]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#5C4033]">Drag and drop photos here</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                  </div>
                  <button className="px-5 py-2 bg-[#8B4513] text-white rounded-lg text-xs font-semibold hover:bg-[#4A2010] transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
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
  const [page, setPage] = useState<Page>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (p: Page) => {
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
      {page === "sermons" && <SermonsPage />}
      {page === "gallery" && <GalleryPage />}
      {page === "contact" && <ContactPage nav={nav} />}
      {page === "login" && <LoginPage nav={nav} />}
      {page === "admin" && <AdminPage nav={nav} />}
      {page !== "login" && page !== "admin" && <Footer nav={nav} />}
    </div>
  );
}
