import { useState } from 'react';
import slideText from './teresa-juan-text.json';
import './teresa-juan.css';

const topics = ['Presentación', 'Contexto y colaboración', 'Santa Teresa de Jesús', 'San Juan de la Cruz', 'Lectura comparada', 'La oración se hace vida', 'Cierre y diálogo', 'Fuentes', 'Dinámica de fuentes', 'Dinámica participativa'];
export default function TeresaJuan() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return <main className="tj-page">
    <header className="tj-intro"><p>FORMACIÓN TERESIANA Y SANJUANISTA</p><h1>Santa Teresa de Jesús y San Juan de la Cruz</h1><span>Dos voces, una misma búsqueda interior</span></header>
    <nav className="tj-index" aria-label="Contenido de Teresa y Juan">{topics.map((topic, i) => <a key={topic} href={`#tema-${i + 1}`}>{String(i + 1).padStart(2, '0')} · {topic}</a>)}</nav>
    <div className="tj-slides">{topics.map((topic, i) => <section key={topic} id={`tema-${i + 1}`} className="tj-slide" aria-labelledby={`titulo-${i}`}>
      <div className="tj-slide-label"><h2 id={`titulo-${i}`}>{String(i + 1).padStart(2, '0')} · {topic}</h2><button type="button" onClick={() => setExpanded(i)} aria-label={`Ampliar diapositiva ${i + 1}: ${topic}`}>Ampliar ↗</button></div>
      <img src={`/teresa-juan/diapositiva-${String(i + 1).padStart(2, '0')}.webp`} width="1920" height="1080" alt={`Diapositiva ${i + 1}: ${topic}. El texto completo está disponible debajo.`} loading={i === 0 ? 'eager' : 'lazy'} />
      <details className="tj-transcript"><summary>Leer el texto de esta diapositiva</summary><div>{slideText[i].map((text, j) => <p key={j}>{text}</p>)}</div></details>
    </section>)}</div>
    {expanded !== null && <div className="tj-modal" role="dialog" aria-modal="true" aria-label={`Diapositiva ${expanded + 1} ampliada`} onKeyDown={event => { if (event.key === 'Escape') setExpanded(null); }}>
      <button type="button" autoFocus className="tj-close" onClick={() => setExpanded(null)}>Cerrar ✕</button>
      <div className="tj-zoom-scroll"><img src={`/teresa-juan/diapositiva-${String(expanded + 1).padStart(2, '0')}.webp`} width="1920" height="1080" alt={topics[expanded]} /></div>
    </div>}
  </main>;
}
