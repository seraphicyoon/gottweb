import type { ReactNode } from 'react';
import './teresa-juan.css';

const topics = ['Dos voces, una misma búsqueda interior', 'Contexto y colaboración', 'Santa Teresa de Jesús', 'San Juan de la Cruz', 'Lectura comparada', 'La oración se hace vida', 'Cierre y diálogo', 'Fuentes', 'Dinámica de fuentes', 'Dinámica participativa'];
function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return <section id={`tema-${n}`} className="tj-block" aria-labelledby={`titulo-${n}`}><div className="tj-heading"><span>{String(n).padStart(2, '0')}</span><h2 id={`titulo-${n}`}>{title}</h2></div>{children}</section>;
}
function Steps({ items }: { items: { title: string; text: string; time?: string }[] }) {
  return <ol className="tj-steps">{items.map((item, i) => <li key={item.title}><span className="tj-step-number">{item.time || String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>;
}
export default function TeresaJuan() {
  return <main className="tj-page">
    <header className="tj-hero"><div><p className="tj-eyebrow">Formación teresiana y sanjuanista</p><h1>Santa Teresa de Jesús<br />y San Juan de la Cruz</h1><p className="tj-subtitle">Dos voces, una misma búsqueda interior</p><p>Presentación educativa · Grupo Santa Teresa y San Juan de la Cruz</p><a className="tj-start" href="#tema-1">Explorar el contenido ↓</a></div></header>
    <div className="tj-layout"><aside className="tj-index"><nav aria-label="Contenido de Teresa y Juan"><p className="tj-eyebrow">En este apartado</p><ol>{topics.map((t, i) => <li key={t}><a href={`#tema-${i + 1}`}><span>{String(i + 1).padStart(2, '0')}</span>{t}</a></li>)}</ol></nav></aside><div className="tj-content">
      <Block n={1} title="Dos voces, una misma búsqueda interior"><p className="tj-lead">Santa Teresa de Jesús y San Juan de la Cruz</p><p>Síntesis educativa basada en fuentes vaticanas y carmelitas.</p><div className="tj-note">Dos voces, una misma fuente: Jesucristo.</div></Block>
      <Block n={2} title="Una reforma nacida del encuentro"><p className="tj-eyebrow">Objetivo, contexto y colaboración</p><h3>España, siglo XVI</h3><p>Teresa (1515–1582) y Juan (1542–1591) llegan desde experiencias distintas y convergen en una renovación contemplativa del Carmelo.</p><Steps items={[
        {time:'1562', title:'Teresa funda San José en Ávila', text:'Oración, pobreza y vida fraterna como núcleo de la reforma.'},
        {time:'1567', title:'Teresa y Juan se conocen', text:'El encuentro une experiencia, disciplina y una visión común.'},
        {time:'1568', title:'Duruelo: primera comunidad masculina reformada', text:'La reforma se extiende a frailes y monjas carmelitas descalzos.'}
      ]}/><div className="tj-note">El cambio no comenzó con una teoría, sino con una alianza espiritual y una práctica compartida.</div></Block>
      <Block n={3} title="Santa Teresa de Jesús"><p className="tj-eyebrow">1515–1582 · Mística · Escritora · Reformadora</p><h3 className="tj-lead">Teresa convierte la oración en amistad</h3><blockquote>«Orar es estar muchas veces a solas con quien sabemos nos ama».</blockquote><div className="tj-two"><div><h3>Obras clave</h3><ul><li>Libro de la Vida</li><li>Camino de Perfección</li><li>Castillo Interior o Las Moradas</li></ul></div><div className="tj-soft"><h3>Vida interior</h3><p>Recogimiento</p><p>Oración perseverante</p></div></div><div className="tj-note">En 1970: primera mujer proclamada Doctora de la Iglesia.</div></Block>
      <Block n={4} title="San Juan de la Cruz"><p className="tj-eyebrow">1542–1591 · Poeta · Místico · Guía espiritual</p><h3 className="tj-lead">Juan: el camino es un viaje a través de una noche transformadora de la persona</h3><p>La «noche» no describe un vacío sin sentido: expresa un proceso de purificación en el que se sueltan apoyos, imágenes y seguridades para crecer en libertad y amor.</p><div className="tj-two"><div><h3>Obras clave</h3><ul><li>Subida del Monte Carmelo</li><li>Noche Oscura</li><li>Cántico espiritual</li><li>Llama de amor viva</li></ul></div><div className="tj-soft"><h3>Desasimiento</h3><p>Silencio</p><p>Unión</p></div></div><div className="tj-note">Su poesía convierte la experiencia interior en lenguaje de transformación.</div></Block>
      <Block n={5} title="Dos voces, una misma fuente: Jesucristo"><p className="tj-eyebrow">Lectura comparada</p><div className="tj-table-wrap" tabIndex={0} role="region" aria-label="Comparación entre Teresa y Juan"><table><thead><tr><th scope="col">Lectura</th><th scope="col">Teresa</th><th scope="col">Juan</th></tr></thead><tbody>
        <tr><th scope="row">Lenguaje</th><td>Teología y escritos desarrollados desde su experiencia de vida: siempre en relación de amistad con Jesús.</td><td>El más grande místico católico, enamorado de Dios, el mejor poeta de habla hispana.</td></tr>
        <tr><th scope="row">Camino</th><td>Oración como puerta al interior, al alma; «determinación determinada» y autoconocimiento para alcanzar la libertad interior, siempre como enlace con Jesucristo. Cf. El Castillo Interior.</td><td>Un viaje de encuentro sagrado; de búsqueda, desapego, libertad interior y feliz encuentro con Dios. Cf. Cántico Espiritual.</td></tr>
        <tr><th scope="row">Acento</th><td>Camino de libertad en unión creciente con Dios por la oración y las obras.</td><td>Amor que atraviesa la noche y conduce a la unión.</td></tr>
      </tbody></table></div><p className="tj-formula">Oración + Libertad interior + Amor</p><p>La diferencia de estilo amplía, no divide, una misma tradición espiritual.</p></Block>
      <Block n={6} title="La oración se hace vida y la vida oración"><Steps items={[
        {title:'Silencio',text:'Reservar un tiempo real y reducir el ruido que dispersa.'},
        {title:'Verdad',text:'Reconocer deseos, miedos y resistencias sin maquillarlos.'},
        {title:'Desprendimiento',text:'Soltar la necesidad de controlar resultados y seguridades.'},
        {title:'Servicio',text:'Dejar que la oración transforme decisiones y servicio a los demás en la Iglesia y en la sociedad.'}
      ]}/><div className="tj-note">La interioridad madura cuando produce más libertad, más verdad, más capacidad de amar: se califica en las obras.</div><p className="tj-caption">Aplicación contemporánea: síntesis del contenido, no cita textual.</p></Block>
      <Block n={7} title="La contemplación transforma la vida desde dentro"><p className="tj-eyebrow">Cierre y diálogo</p><h3>Preguntas para conversación y reflexión personal</h3><ol className="tj-questions"><li>¿Qué ruido necesito reconocer antes de buscar silencio?</li><li>¿Qué apego limita hoy mi libertad interior?</li><li>¿Cómo puede mi oración convertirse en servicio concreto?</li></ol><blockquote><small>Una misma invitación</small>No se trata de sentir más, sino de amar con más libertad.</blockquote><p>Teresa aporta cercanía. Juan aporta profundidad simbólica. Ambos orientan hacia una vida transformada unida a Dios.</p></Block>
      <Block n={8} title="Fuentes para seguir profundizando"><div className="tj-two"><div><h3>Santa Teresa de Jesús</h3><p>Santa Sede · Benedicto XVI.</p><p>Audiencia general: Santa Teresa de Jesús. 2 de febrero de 2011.</p><p>vatican.va</p><p>Ana de Jesús, ed., Santa Teresa de Jesús, Escritos y documentos. Monte Carmelo, Burgos, 1996.</p></div><div><h3>San Juan de la Cruz</h3><p>Santa Sede · Benedicto XVI.</p><p>Audiencia general: San Juan de la Cruz. Miércoles 16 de febrero de 2011.</p><p>vatican.va</p></div></div><div className="tj-note">Leer sus obras es lo más recomendado.</div><p className="tj-caption">Fuentes indicadas en la presentación, consultadas el 31 de octubre de 2026.</p></Block>
      <Block n={9} title="Escuchar a Teresa y Juan en diálogo"><p className="tj-eyebrow">Dinámica de fuentes · Equipos de 4 · 15 minutos</p><p>El facilitador entrega un fragmento breve de una obra teresiana y otro de una obra sanjuanista.</p><div className="tj-two"><div className="tj-soft"><h3>Teresa</h3><p>Camino de perfección o Castillo interior.</p></div><div className="tj-soft"><h3>Juan</h3><p>Cántico espiritual o Noche oscura.</p></div></div><h3 className="tj-dialogue">Poner en diálogo · 1 lector por autor</h3><Steps items={[
        {title:'Subrayar',text:'¿Qué palabra o imagen llama la atención?'},
        {title:'Comparar',text:'¿Qué movimiento interior propone cada texto?'},
        {title:'Aterrizar',text:'¿Qué práctica concreta inspira al grupo?'}
      ]}/><div className="tj-note">Cierre común: «Estas fuentes nos invitan a…»</div><p className="tj-caption">Fuentes de trabajo: obras principales de Santa Teresa de Jesús y San Juan de la Cruz.</p></Block>
      <Block n={10} title="Del silencio a un compromiso compartido"><p className="tj-eyebrow">Dinámica participativa · En parejas o tríos · 12 minutos</p><Steps items={[
        {time:'2 min',title:'Silencio',text:'Cada persona elige una palabra que resuma lo que más le habló.'},
        {time:'4 min',title:'Compartir',text:'Compartan por turnos, sin interrumpir ni aconsejar.'},
        {time:'3 min',title:'Elegir',text:'Acuerden una acción concreta que el grupo pueda vivir esta semana.'},
        {time:'3 min',title:'Expresar',text:'Escriban una frase breve y compártanla en plenaria.'}
      ]}/><div className="tj-note">Frase de cierre: «Como grupo, esta semana elegimos compartir …»</div><p>Objetivo: escuchar, discernir y convertir la reflexión en una acción común.</p></Block>
      <a className="tj-back" href="#tema-1">Volver al inicio del contenido ↑</a>
    </div></div>
  </main>;
}
