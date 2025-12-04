import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const gallery = [
    { title: "Cambio de pantalla - iPhone", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80" },
    { title: "Reparación de placa - Notebook", img: "https://images.unsplash.com/photo-1580910051070-5e04b6f3f1c7?auto=format&fit=crop&w=1200&q=80" },
    { title: "Limpieza interna - Consola", img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sustitución de batería", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80" },
    { title: "Montaje de accesorios", img: "https://images.unsplash.com/photo-1585386959984-a415522c9bda?auto=format&fit=crop&w=1200&q=80" },
    { title: "Diagnóstico profesional", img: "https://images.unsplash.com/photo-1526378723456-9f0f6b8f5a8b?auto=format&fit=crop&w=1200&q=80" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const nombre = e.target.nombre?.value || '';
    const email = e.target.email?.value || '';
    const mensaje = e.target.mensaje?.value || '';

    const mailto = `mailto:contacto@servitec.com?subject=${encodeURIComponent(
      'Contacto desde web'
    )}&body=${encodeURIComponent('Nombre: ' + nombre + '\nCorreo: ' + email + '\nMensaje: ' + mensaje)}`;

    // open mail client
    window.location.href = mailto;

    // open whatsapp
    const textoWhatsApp = encodeURIComponent(`Hola, soy ${nombre}. Mi correo es ${email}. ${mensaje}`);
    window.open(`https://wa.me/56922049971?text=${textoWhatsApp}`, '_blank');

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      e.target.reset();
      setTimeout(() => setSent(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <img src="/logo-servitec.jpg" alt="Logo Servitec" className="w-20 h-auto" />
            <div>
              <h1 className="text-2xl font-bold">SERVITEC</h1>
              <p className="text-sm opacity-90">Servicio Técnico y Accesorios</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 font-semibold">
            <a href="#servicios" className="hover:underline">Servicios</a>
            <a href="#productos" className="hover:underline">Accesorios</a>
            <a href="#galeria" className="hover:underline">Galería</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
          </nav>
        </div>
      </header>

      <section className="h-[360px] bg-cover bg-center flex items-center justify-center text-white text-4xl font-extrabold shadow-inner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80')" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Soluciones rápidas y confiables
        </motion.div>
      </section>

      <section id="servicios" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Servicios Técnicos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Reparación de Celulares", desc: "Pantallas, baterías, software y más." },
            { title: "Reparación de Notebooks", desc: "Limpieza, formateo, teclado, discos y más." },
            { title: "Reparación de Consolas", desc: "Diagnóstico, mantenimiento y más." },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="productos" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Accesorios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Fundas y Protectores", desc: "Para todas las marcas." },
            { title: "Cargadores y Cables", desc: "Originales y certificados." },
            { title: "Auriculares", desc: "Bluetooth y cableados." },
          ].map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="font-bold text-xl mb-2">{p.title}</h3>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="galeria" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Galería de Trabajos</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((item, idx) => (
            <motion.button key={idx} onClick={() => setLightbox({ open: true, index: idx })} whileHover={{ scale: 1.03 }} className="bg-white rounded-xl overflow-hidden shadow">
              <div className="h-44 bg-gray-200">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-left">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm opacity-80">Trabajo de ejemplo — imagen de stock</p>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {lightbox.open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="flex justify-between items-center p-3 border-b">
                  <h3 className="font-bold">{gallery[lightbox.index].title}</h3>
                  <button onClick={() => setLightbox({ open: false, index: 0 })} className="text-gray-600 font-bold px-3 py-1">Cerrar</button>
                </div>
                <div className="w-full h-[60vh] bg-black">
                  <img src={gallery[lightbox.index].img} alt="detalle" className="w-full h-full object-contain bg-black" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="testimonios" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Testimonios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Carlos M.", text: "Excelente servicio, repararon mi celular en menos de una hora." },
            { name: "Fernanda R.", text: "Muy profesionales, mi notebook quedó como nueva." },
            { name: "Diego A.", text: "Atención rápida y precios justos. Recomendado al 100%." },
          ].map((t, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="bg-white p-6 rounded-xl shadow">
              <p className="italic mb-4 opacity-90">“{t.text}”</p>
              <h4 className="font-bold text-right">— {t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contacto" className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Contacto</h2>
        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-100 text-green-700 p-3 mb-4 rounded-lg text-center font-semibold shadow"
            >
              ¡Tu mensaje fue enviado!
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl grid gap-4 border border-gray-200">
          <input name="nombre" type="text" placeholder="Nombre" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500" required />
          <input name="email" type="email" placeholder="Correo" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500" required />
          <textarea name="mensaje" placeholder="Mensaje" className="border p-3 rounded-lg w-full h-32 focus:ring-2 focus:ring-blue-500" required />
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-xl font-bold transition w-full flex items-center justify-center gap-2">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"></motion.div>
              ) : (
                'Enviar por Correo'
              )}
            </button>
            <button type="button" onClick={() => {
              const nombre = document.querySelector('[name=nombre]').value;
              const email = document.querySelector('[name=email]').value;
              const mensaje = document.querySelector('[name=mensaje]').value;
              const texto = encodeURIComponent(`Hola, soy ${nombre}. Mi correo es ${email}. ${mensaje}`);
              window.open(`https://wa.me/56922049971?text=${texto}`, '_blank');
            }} className="bg-green-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-700 transition w-full">Enviar por WhatsApp</button>
          </div>
        </form>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-6">Ubicación</h2>
        <iframe className="w-full h-72 rounded-xl shadow" src="https://maps.google.com/maps?q=Santiago%20Chile&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
      </section>

      <a href="https://wa.me/56922049971" target="_blank" rel="noreferrer" className="fixed right-6 bottom-6 z-50">
        <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className="bg-emerald-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.88 11.88 0 0012 .5 11.81 11.81 0 001.5 12c0 2.1.55 4.06 1.6 5.8L.5 23.5l5.1-1.54A11.81 11.81 0 0012 23.5 11.88 11.88 0 0020.52 3.48zM12 21.5c-1.8 0-3.53-.5-5.02-1.44l-.36-.2-3.03.92.92-3.02-.22-.37A9.5 9.5 0 012.5 12 9.5 9.5 0 1112 21.5z"/></svg>
          <span className="hidden sm:inline-block font-semibold">WhatsApp</span>
        </motion.button>
      </a>

      <footer className="bg-blue-600 text-white py-6 text-center mt-10">
        © 2025 Servitec. Todos los derechos reservados.
      </footer>
    </div>
  );
}
