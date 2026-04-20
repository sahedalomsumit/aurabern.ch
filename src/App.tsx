import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Award,
  Sparkles,
  Leaf,
  Droplets,
  Zap,
  MessageCircle,
  Heart
} from 'lucide-react';

// --- Animation Variants ---

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-100px" }
};

const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.95 }
};

const navLinkHover = {
  whileHover: { y: -2, color: "#A88E5E" },
  whileTap: { y: 0 }
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Über uns', href: '#about' },
    { name: 'Behandlungen', href: '#services' },
    { name: 'Produkte', href: '#products' },
    { name: 'Team', href: '#team' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg group-hover:rotate-360 transition-transform duration-700 border border-sand">
            <img src="/img/logo.jpg" alt="Aura Bern Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-2xl tracking-tight text-primary font-semibold">Aura Bern</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name}
              href={link.href} 
              variants={navLinkHover}
              whileHover="whileHover"
              whileTap="whileTap"
              className="text-sm font-medium transition-colors uppercase tracking-widest text-primary/70"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a 
            href="#contact" 
            variants={hoverScale}
            whileHover="whileHover"
            whileTap="whileTap"
            className="btn-primary py-2 text-sm"
          >
            Termin buchen
          </motion.a>
        </div>

        <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 glass border-t border-primary/10 overflow-hidden flex flex-col p-6 gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <motion.a 
                key={link.name}
                href={link.href} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-medium py-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a 
              href="#contact" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="btn-primary text-center mt-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Termin buchen
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-20 px-4">
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-secondary font-medium uppercase text-xs mb-4"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`text-5xl md:text-6xl lg:text-7xl ${light ? 'text-white' : 'text-primary'}`}
    >
      {children}
    </motion.h2>
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`h-0.5 w-32 mx-auto mt-8 ${light ? 'bg-white/30' : 'bg-secondary'}`}
    />
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, image, index }: { icon: React.ElementType, title: string, description: string, image: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    whileHover={{ y: -10 }}
    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-sand h-full"
  >
    <div className="h-72 overflow-hidden relative">
      <motion.img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover" 
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-colors duration-500" />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="absolute top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl"
      >
        <Icon size={28} />
      </motion.div>
    </div>
    <div className="p-10">
      <h3 className="text-3xl mb-4 text-primary">{title}</h3>
      <p className="text-text-muted mb-8 line-clamp-3 leading-relaxed text-lg">
        {description}
      </p>
      <motion.button 
        variants={hoverScale}
        whileHover="whileHover"
        whileTap="whileTap"
        className="flex items-center gap-3 text-secondary font-bold group/btn cursor-pointer"
      >
        Details ansehen <div className="w-8 h-8 rounded-full border border-secondary flex items-center justify-center group-hover/btn:bg-secondary group-hover/btn:text-white transition-all"><ChevronRight size={18} /></div>
      </motion.button>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen selection:bg-secondary/30 bg-beige"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/img/hero.png" 
            alt="Aura Bern Salon" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-beige/95 via-beige/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block py-2 px-6 bg-primary/5 text-primary rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-8 border border-primary/10"
            >
              Berns Exklusivste Wohlfühloase
            </motion.span>
            <h1 className="text-7xl md:text-9xl leading-[0.9] mb-10 tracking-tight">
              Elegante <br /> 
              <span className="text-secondary italic font-normal">Schönheit</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-text-muted mb-12 leading-relaxed max-w-xl font-light"
            >
              Seit 2012 verbinden wir im Herzen von Bern prämierte High-Tech Kosmetik 
              mit einer Atmosphäre purer Entspannung.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-6"
            >
              <motion.a href="#services" variants={hoverScale} whileHover="whileHover" whileTap="whileTap" className="btn-primary px-10 py-4 text-lg">Unsere Services</motion.a>
              <motion.a href="#contact" variants={hoverScale} whileHover="whileHover" whileTap="whileTap" className="btn-outline px-10 py-4 text-lg">Kontakt aufnehmen</motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-primary/30"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scrollen</span>
          <div className="w-px h-16 bg-linear-to-b from-primary/30 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="aspect-4/5 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <img src="/img/treatment-1.png" alt="Behandlung" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-12 -right-12 hidden lg:block w-72 h-72 bg-primary rounded-3xl p-12 text-white shadow-2xl"
            >
              <Award size={56} className="mb-6 text-secondary" />
              <p className="text-5xl font-serif mb-2">12+</p>
              <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Erfolgreiche Jahre</p>
              <p className="mt-6 text-sm opacity-60 leading-relaxed font-light">Exzellenz in der Berner Altstadt seit 2012.</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <SectionHeading subtitle="Die Aura Philosophie">Höchste Standards für Ihre Haut</SectionHeading>
            <motion.div variants={fadeInUp} className="space-y-8 text-text-muted leading-relaxed text-lg font-light">
              <p>
                Aura Bern verkörpert die Symbiose aus medizinisch orientierter Wirkungskosmetik und luxuriöser Wellness. Seit über einem Jahrzehnt sind wir die erste Adresse in Bern für Kunden, die keine Kompromisse bei ihrer Hautqualität eingehen.
              </p>
              <p>
                In den historischen Räumen der Postgasse 56 haben wir einen Ort geschaffen, an dem die Zeit stillzustehen scheint, während Ihre Haut durch modernste Technologien wie Opatra und Elevare eine Verjüngungskur erfährt.
              </p>
              <div className="grid sm:grid-cols-2 gap-10 pt-10">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex items-start gap-5 group">
                  <div className="mt-1 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500"><Sparkles size={24} /></div>
                  <div>
                    <h4 className="text-primary font-serif text-xl mb-2">Technologie</h4>
                    <p className="text-sm leading-relaxed">Führende Systeme für sichtbare Sofortergebnisse.</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex items-start gap-5 group">
                  <div className="mt-1 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500"><ShieldCheck size={24} /></div>
                  <div>
                    <h4 className="text-primary font-serif text-xl mb-2">Vertrauen</h4>
                    <p className="text-sm leading-relaxed">Persönliche Beratung durch zertifizierte Experten.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-sand/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Unser Portfolio">Exklusive Behandlungen</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Droplets, image: "/img/treatment-1.png", title: "Gesichtspflege", text: "Maßgeschneiderte Treatments von der Hydrafacial-Tiefenreinigung bis zum RF-Lifting für ein strahlendes Hautbild." },
              { icon: Zap, image: "/img/treatment-2.png", title: "Body Styling", text: "Velashape und Lymphdrainage für eine definierte Silhouette und tiefenwirksame Regeneration des Gewebes." },
              { icon: Leaf, image: "/img/treatment-1.png", title: "Medical Beauty", text: "Zielgerichtete Problemlösungen für Akne, Pigmentstörungen und Couperose mit nachhaltigem Heilungserfolg." }
            ].map((s, i) => (
              <ServiceCard 
                key={i}
                index={i}
                icon={s.icon}
                image={s.image}
                title={s.title}
                description={s.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology / Warranty Section */}
      <section id="products" className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-sand/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SectionHeading subtitle="Innovation & Garantie">Lifetime Warranty</SectionHeading>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl font-light text-text-muted mb-16 leading-relaxed"
          >
            Wir setzen auf die weltweit führenden Marken für Heimkosmetik-Technologie. 
            Als exklusiver Partner von <span className="text-primary font-medium">Opatra London</span> und <span className="text-secondary font-medium">Elevare Skin</span> 
            bieten wir Ihnen eine lebenslange Garantie auf alle bei uns erworbenen Geräte.
          </motion.p>
          
          <div className="grid sm:grid-cols-2 gap-8 mb-16 text-left">
            {[
              { name: "Opatra London", desc: "Revolutionäre LED-Technologie und Ultraschall für klinisch bewiesene Anti-Aging Resultate in den eigenen vier Wänden.", icon: Sparkles },
              { name: "Elevare Skin", desc: "FDA-zugelassene Infrarot-Systeme zur tiefenwirksamen Zellstimulation und Maximierung der dermalen Elastizität.", icon: ShieldCheck }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * i }}
                whileHover={{ y: -5, borderColor: "#A88E5E" }}
                className="bg-beige/40 p-10 rounded-4xl border border-sand transition-all duration-500"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-6">
                  <p.icon size={24} />
                </div>
                <h3 className="text-2xl text-primary mb-4 font-serif">{p.name}</h3>
                <p className="text-text-muted leading-relaxed font-light text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.a 
            href="#contact" 
            variants={hoverScale}
            whileHover="whileHover"
            whileTap="whileTap"
            className="btn-primary inline-flex items-center gap-3"
          >
            Kostenlose Beratung anfordern <ChevronRight size={18} />
          </motion.a>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Ihre Gastgeber">Die Experten von Aura</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { name: "Guy", role: "Gründer & Lead Expert", bio: "Visionär in der modernen Kosmetik mit internationaler Expertise.", img: "/img/team/guy.png" },
              { name: "Florence", role: "Skin Tech Specialist", bio: "Fokussiert auf die perfekte Kombination von Wirkstoffen und Technik.", img: "/img/team/florence.png" },
              { name: "Julia", role: "Wellness & Spa Manager", bio: "Meisterin der Entspannung und ganzheitlichen Pflegekonzepte.", img: "/img/team/julia.png" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-56 h-72 mx-auto mb-8 rounded-[3rem] overflow-hidden border-8 border-white shadow-xl transition-all duration-700"
                >
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </motion.div>
                <h3 className="text-3xl text-primary mb-2">{member.name}</h3>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-6">{member.role}</p>
                <p className="text-text-muted text-sm px-10 italic font-light leading-relaxed">"{member.bio}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-sand/10 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <SectionHeading subtitle="Wir freuen uns auf Sie">Termin & Anfahrt</SectionHeading>
            
            <div className="space-y-8 mt-12">
              {[
                { icon: MapPin, title: "Standort", text: "Postgasse 56, 3011 Bern" },
                { icon: Phone, title: "Kontakt", text: "+41 31 123 45 67 (WhatsApp)" },
                { icon: Clock, title: "Zeiten", text: "Mo - Sa: Nach Vereinbarung" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex gap-8 group"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-sand flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-primary font-serif text-2xl mb-1">{item.title}</h4>
                    <p className="text-text-muted text-lg font-light">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-16">
              <motion.a 
                href="https://wa.me/41791234567" 
                target="_blank" 
                variants={hoverScale}
                whileHover="whileHover"
                whileTap="whileTap"
                className="btn-primary flex items-center justify-center gap-4 py-5 px-10 text-lg w-full sm:w-auto"
              >
                <MessageCircle size={24} /> Jetzt WhatsApp Nachricht senden
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2724.8711311029415!2d7.452683315795415!3d46.94797397914619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e39c63fb939e3%3A0xc3438997c4e5170d!2sPostgasse%2056%2C%203011%20Bern!5e0!3m2!1sde!2sch!4v1650000000000!5m2!1sde!2sch" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t border-sand text-center">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-sand shadow-sm">
              <img src="/img/logo.jpg" alt="Aura Bern Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-3xl tracking-tight text-primary font-semibold">Aura Bern</span>
          </motion.div>
          <p className="text-text-muted mb-10 font-light">
            &copy; {new Date().getFullYear()} Aura Bern. Exklusive Kosmetik in Bern.
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="px-6 py-3 bg-sand/30 rounded-full flex items-center gap-2 text-sm text-text-muted font-medium hover:bg-sand transition-colors cursor-default"
            >
              <span>Built with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.5, rotate: 10 }}
              >
                <Heart size={16} className="text-red-500 fill-red-500" />
              </motion.div>
              <span>by</span>
              <motion.a 
                href="https://sahedalomsumit.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.1, color: "#1A4269" }}
                className="text-primary font-bold transition-all"
              >
                Sahed
              </motion.a>
            </motion.div>
          </div>

          <div className="flex justify-center flex-wrap gap-10 text-xs font-bold uppercase tracking-[0.2em] text-primary/30">
            {['Impressum', 'Datenschutz', 'AGB'].map((link) => (
              <motion.a 
                key={link}
                href="#" 
                whileHover={{ color: "#A88E5E", y: -2 }}
                className="transition-all"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-10 right-10 z-40"
      >
        <motion.a 
          href="https://wa.me/41791234567" 
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-20 h-20 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl group relative"
        >
          <MessageCircle size={36} />
          <AnimatePresence>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-6 bg-white text-primary px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold pointer-events-none whitespace-nowrap border border-sand"
            >
              Fragen? Schreiben Sie uns!
            </motion.span>
          </AnimatePresence>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
