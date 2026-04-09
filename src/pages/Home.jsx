import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowDown, MapPin, Phone, WhatsappLogo, Star, Quotes,
  CaretLeft, CaretRight, CheckCircle, Rocket, ShieldCheck, Target,
  Buildings, Lightbulb, Package,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import siteData from '../data/siteData';

const iconMap = { Buildings, Lightbulb, Rocket, ShieldCheck, Star, Target };

function AnimatedCounter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = numericTarget / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numericTarget, duration]);
  return <span ref={ref}>{inView ? count.toLocaleString() : '0'}{suffix}</span>;
}

function NoiseTexture({ opacity = 0.035 }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
    }} />
  );
}


/* ================================================================
   1. HERO — Clean white split with blue accent
   ================================================================ */
function HeroSection() {
  const { business, hero } = siteData;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          <motion.div style={{ y: textY }}>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-[3px] bg-emerald-600 mb-6 origin-left" />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-emerald-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
              {hero.badge}
            </motion.p>
            <div className="overflow-hidden">
              {['VITANIC', 'PLANT NURSERY.'].map((line, i) => (
                <motion.div key={line} initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}>
                  <h1 className={`font-heading leading-[0.88] tracking-tight ${
                    i === 1 ? 'text-emerald-600' : 'text-navy-900'
                  }`} style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', fontWeight: i === 0 ? 700 : 300 }}>
                    {line}
                  </h1>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="text-navy-700/60 text-sm sm:text-base mt-6 max-w-md leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              {hero.subtitle || business.description}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-center gap-3 mt-6">
              <div className="flex items-center gap-0.5">
                {[...Array(Math.round(business.rating))].map((_, i) => <Star key={i} size={14} weight="fill" className="text-emerald-600" />)}
              </div>
              <span className="text-navy-700/40 text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
                {business.rating} / 5 &middot; {business.reviewCount} Reviews
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.4 }} className="flex flex-wrap gap-4 mt-10">
              <Link to="/contact" className="group inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/20" style={{ fontFamily: 'var(--font-sans)' }}>
                {hero.ctaPrimary} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="group inline-flex items-center gap-3 border-2 border-navy-900/10 text-navy-900 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:border-emerald-600 hover:text-emerald-600" style={{ fontFamily: 'var(--font-sans)' }}>
                {hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="relative">
            <motion.div style={{ scale: imgScale }} className="overflow-hidden">
              <img src={hero.backgroundImages[0]?.url} alt={hero.backgroundImages[0]?.alt} className="w-full aspect-[4/5] object-cover object-center" loading="eager" />
            </motion.div>
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-emerald-600/30" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-emerald-600/30" />
            <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-5 sm:p-6 shadow-2xl">
              <div className="text-center">
                <div className="font-heading text-2xl sm:text-3xl leading-none font-bold">{business.projectsCompleted || '500+'}</div>
                <div className="text-white/70 text-[10px] uppercase tracking-[0.15em] mt-1" style={{ fontFamily: 'var(--font-sans)' }}>Growies</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-navy-900/20 text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-sans)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ArrowDown size={14} className="text-emerald-600/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}


/* ================================================================
   2. PROCESS — Visit > Select > Grow
   ================================================================ */
function ProcessSteps() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const steps = [
    { num: '01', title: 'Visit', desc: 'Browse our nursery on Maasdorp Avenue. Hundreds of plant species ready for your garden.', icon: Package },
    { num: '02', title: 'Select', desc: 'Our experts help you choose the perfect plants for your soil, space, and style.', icon: Target },
    { num: '03', title: 'Grow', desc: 'We deliver and provide care guides. Watch your garden flourish season after season.', icon: CheckCircle },
  ];
  return (
    <section ref={ref} className="bg-earth-50 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16 sm:mb-20">
          <div className="w-12 h-[3px] bg-emerald-600 mx-auto mb-6" />
          <p className="text-emerald-600/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Process</p>
          <h2 className="font-heading text-navy-900 leading-[0.92]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            Grow With <span className="text-emerald-600">Us</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-emerald-600/20 via-emerald-600/40 to-emerald-600/20 z-0" />
          {steps.map((step, i) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }} className="relative z-10 text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/20">
                <step.icon size={28} weight="fill" />
              </div>
              <div className="text-emerald-600/20 font-heading text-4xl font-bold mb-2">{step.num}</div>
              <h3 className="font-heading text-navy-900 text-2xl mb-3">{step.title}</h3>
              <p className="text-navy-700/50 text-sm leading-relaxed max-w-xs mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   3. SERVICES — White bg, blue accent
   ================================================================ */
function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { servicesPreview, services } = siteData;
  const imgs = [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
  ];
  return (
    <section ref={ref} className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[3px] bg-emerald-600 mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-emerald-600/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Collection</p>
              <h2 className="font-heading text-navy-900 leading-[0.92]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                What We <span className="text-emerald-600">Grow</span>
              </h2>
            </div>
            <Link to="/services" className="group text-navy-900/30 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-emerald-600 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
              All Services <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesPreview.map((service, i) => {
            const IconComp = iconMap[service.icon] || Star;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 * i }}>
                <Link to={`/services#${services?.items?.[i]?.slug || ''}`} className="group relative block overflow-hidden aspect-[3/4] bg-earth-50">
                  <img src={imgs[i] || imgs[0]} alt={service.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
                  <div className="absolute top-5 left-5 z-10 w-10 h-10 bg-emerald-600 flex items-center justify-center shadow-lg">
                    <IconComp size={18} weight="fill" className="text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <h3 className="font-heading text-white text-xl sm:text-2xl tracking-wide mb-2">{service.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{service.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-emerald-400 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>Learn More</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-600 z-10" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   4. STATS — Blue band
   ================================================================ */
function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { stats } = siteData;
  return (
    <section ref={ref} className="relative bg-emerald-600 overflow-hidden">
      <NoiseTexture opacity={0.04} />
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12 }} className="text-center relative">
              <div className="font-heading text-white leading-none font-bold" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                <AnimatedCounter target={stat.number.replace(/[^0-9]/g, '')} suffix={stat.number.replace(/[0-9]/g, '')} />
              </div>
              <div className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.25em] mt-3" style={{ fontFamily: 'var(--font-sans)' }}>{stat.label}</div>
              {i < stats.length - 1 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-white/20" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   5. ABOUT — Split on white
   ================================================================ */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { business } = siteData;
  return (
    <section ref={ref} className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
            <div className="w-12 h-[3px] bg-emerald-600 mb-6" />
            <p className="text-emerald-600/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>About Us</p>
            <h2 className="font-heading text-navy-900 leading-[0.95] mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Harare's<br /><span className="text-emerald-600">Hottest Courier</span>
            </h2>
            <p className="text-navy-700/50 text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              Vitanic Services brings the heat to Harare's delivery scene. We believe every parcel deserves VIP treatment — from a single envelope to a pallet of goods. Our network covers every corner of Harare and extends to all major Zimbabwean cities.
            </p>
            <p className="text-navy-700/35 text-sm leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              With a fleet of motorbikes for rapid inner-city drops and vans for bulk consignments, we have the right vehicle for every job. Real-time tracking, proof of delivery, and friendly service come standard.
            </p>
            <div className="w-full h-px bg-navy-900/5 my-8" />
            <div className="flex gap-10 sm:gap-16">
              <div>
                <div className="text-emerald-600 font-heading text-3xl sm:text-4xl leading-none font-bold">{business.established || '2018'}</div>
                <div className="text-navy-900/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Founded</div>
              </div>
              <div>
                <div className="text-emerald-600 font-heading text-3xl sm:text-4xl leading-none font-bold">{business.projectsCompleted || '500+'}</div>
                <div className="text-navy-900/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Growies</div>
              </div>
              <div>
                <div className="text-emerald-600 font-heading text-3xl sm:text-4xl leading-none font-bold">{business.rating}</div>
                <div className="text-navy-900/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Rating</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80" alt="Our operations" className="w-full aspect-[4/5] object-cover object-center" loading="lazy" />
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-emerald-600/30" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-emerald-600/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   6. WHY US — Blue checks on light bg
   ================================================================ */
function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const points = [
    { title: 'Selected Growies', desc: 'Every parcel tracked in real-time via GPS. Know exactly where your shipment is.' },
    { title: 'Competitive Rates', desc: 'Transparent pricing with no hidden fees. Get an instant quote on our website.' },
    { title: 'Professional Team', desc: 'Trained, uniformed couriers who treat your packages with care and respect.' },
    { title: 'Flexible Scheduling', desc: 'Same-day, next-day, or scheduled deliveries to fit your business needs.' },
  ];
  return (
    <section ref={ref} className="bg-earth-50 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14 sm:mb-20">
          <div className="w-12 h-[3px] bg-emerald-600 mx-auto mb-6" />
          <h2 className="font-heading text-navy-900 leading-[0.95]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Why Choose <span className="text-emerald-600">Vitanic</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6">
          {points.map((point, i) => (
            <motion.div key={point.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * i }}
              className="flex gap-5 bg-white p-8 border border-navy-900/5 hover:border-emerald-600/20 transition-colors duration-500">
              <div className="shrink-0 mt-1">
                <div className="w-10 h-10 bg-emerald-600 flex items-center justify-center">
                  <CheckCircle size={20} weight="fill" className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-heading text-navy-900 text-lg mb-2">{point.title}</h4>
                <p className="text-navy-700/40 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   7. TESTIMONIALS — dark section
   ================================================================ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { homeTestimonials } = siteData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const next = useCallback(() => setActive((p) => (p + 1) % homeTestimonials.length), [homeTestimonials.length]);
  const prev = useCallback(() => setActive((p) => (p - 1 + homeTestimonials.length) % homeTestimonials.length), [homeTestimonials.length]);
  useEffect(() => { const t = setInterval(next, 7000); return () => clearInterval(t); }, [next]);
  const t = homeTestimonials[active];
  return (
    <section ref={ref} className="relative bg-navy-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
          <Quotes size={48} weight="fill" className="text-emerald-500/15 mx-auto mb-8" />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <blockquote className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed font-heading mb-10">&ldquo;{t.text}&rdquo;</blockquote>
              <div className="flex flex-col items-center gap-3">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30" loading="lazy" />}
                <div className="w-8 h-[2px] bg-emerald-500" />
                <div className="text-white text-sm uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.name}</div>
                <div className="text-white/40 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>{t.role}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} weight="fill" className="text-emerald-500" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors" aria-label="Previous"><CaretLeft size={16} /></button>
            <div className="flex gap-2">
              {homeTestimonials.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`h-[2px] transition-all duration-500 ${i === active ? 'w-10 bg-emerald-500' : 'w-3 bg-white/10'}`} aria-label={`Testimonial ${i + 1}`} />)}
            </div>
            <button onClick={next} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors" aria-label="Next"><CaretRight size={16} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ================================================================
   8. CTA — Full bleed image
   ================================================================ */
function CTASection() {
  const { business, homeCta } = siteData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  return (
    <section ref={ref} className="relative py-28 sm:py-36 lg:py-48 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={homeCta?.backgroundImage || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=85'} alt="CTA" className="w-full h-[130%] object-cover object-center" loading="lazy" />
        <div className="absolute inset-0 bg-navy-950/70" />
      </motion.div>
      <NoiseTexture opacity={0.03} />
      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1 }}>
          <div className="w-16 h-[3px] bg-emerald-500 mx-auto mb-8" />
          <h2 className="font-heading text-white leading-[0.92] mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            GROW<br /><span className="text-emerald-500">BEAUTIFUL</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-lg mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {homeCta?.subtitle || 'Visit Vitanic Plant Nursery today. Your green journey starts with the first seed.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="group inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/25" style={{ fontFamily: 'var(--font-sans)' }}>
              {homeCta?.ctaPrimary || 'Get a Quote'} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={`https://wa.me/${business.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-white/10" style={{ fontFamily: 'var(--font-sans)' }}>
              <WhatsappLogo size={20} weight="fill" /> {homeCta?.ctaSecondary || 'WhatsApp Us'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <ProcessSteps />
      <ServicesGrid />
      <StatsBand />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
}
