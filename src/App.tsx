/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, MapPin, Clock, Heart, Music, Camera, Info } from "lucide-react";
import React, { useEffect, useState } from "react";

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-12">
    {subtitle && <p className="font-script text-2xl text-wedding-secondary mb-2">{subtitle}</p>}
    <h2 className="font-serif text-4xl md:text-5xl text-wedding-accent font-bold tracking-tight">{children}</h2>
    <div className="w-24 h-1 bg-wedding-accent mx-auto mt-4 rounded-full opacity-30" />
  </div>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8 mt-8">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-wedding-accent/20 shadow-sm">
            <span className="text-2xl md:text-3xl font-serif font-bold text-wedding-secondary">{item.value}</span>
          </div>
          <span className="text-xs uppercase tracking-widest mt-2 block text-gray-500 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const backgroundY = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);

  const photos = [
    "https://vitreous-coral-e38slbgu2d.edgeone.app/on1.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/to2.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/thre3.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/fou4.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/fiv5.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/IMG_5314.JPG.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/DSC08550.JPG.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/DSC08469.JPG.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/DSC08449-1.JPG.jpeg",
    "https://vitreous-coral-e38slbgu2d.edgeone.app/DSC08444.JPG.jpeg",
  ];

  return (
    <div className="relative min-h-screen floral-bg selection:bg-wedding-secondary/20">
      {/* --- Hero Section --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background Photo with Overlay */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 h-[120%] -top-[10%]"
        >
          {/* Desktop Background (Large Screens) */}
          <img 
            src={photos[0]} 
            alt="Preeti and Praveen" 
            className="hidden lg:block w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          {/* Mobile & Tablet Background */}
          <img 
            src={photos[7]} 
            alt="Preeti and Praveen" 
            className="block lg:hidden w-full h-full object-cover opacity-50 object-[center_15%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-b from-wedding-cream/80 via-transparent to-wedding-cream" />
        </motion.div>

        <motion.div 
          style={{ opacity, scale, y: textY }}
          className="text-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2904/2904973.png" 
              alt="Ganesha Icon" 
              className="w-16 h-16 mx-auto opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-gray-500 mb-8 font-medium">
            We cordially invite you to the wedding of
          </p>
          
          <div className="flex flex-col items-center">
            <h1 className="font-serif text-7xl md:text-9xl text-wedding-secondary mb-2 drop-shadow-[0_4px_12px_rgba(216,27,96,0.2)]">Preeti</h1>
            <span className="font-script text-4xl md:text-5xl text-wedding-accent my-4">with</span>
            <h1 className="font-serif text-7xl md:text-9xl text-wedding-secondary drop-shadow-[0_4px_12px_rgba(216,27,96,0.2)]">Praveen</h1>
          </div>

          <div className="mt-12 space-y-2">
            <p className="font-serif text-xl md:text-2xl text-gray-700 italic">May 06, 2026</p>
            <p className="font-sans text-sm uppercase tracking-widest text-wedding-accent font-semibold">Shimoga, Karnataka</p>
          </div>

          <Countdown targetDate="2026-05-06T10:00:00" />
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-linear-to-b from-wedding-accent to-transparent" />
        </motion.div>
      </section>

      {/* --- Invitation Message with Integrated Photo --- */}
      <section className="py-24 px-4 bg-white/30 backdrop-blur-xs relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 border border-wedding-accent/20 rounded-[3rem] rotate-3" />
              <img 
                src={photos[1]} 
                alt="Preeti and Praveen" 
                className="relative z-10 w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wedding-secondary/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-8 h-8 text-wedding-secondary mb-6 mx-auto md:mx-0" />
            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-gray-800 mb-8 italic">
              "Two souls with but a single thought, two hearts that beat as one."
            </p>
            <p className="font-sans text-gray-600 leading-loose text-lg mb-12">
              We cordially invite you and your family to attend the wedding ceremony and bless the bride and groom as they embark on this beautiful journey together.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-white/50 rounded-2xl border border-wedding-accent/10 shadow-sm">
                <p className="font-script text-2xl text-wedding-secondary mb-2">The Bride</p>
                <h3 className="font-serif text-xl font-bold text-gray-800">Preeti</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">Daughter of</p>
                <p className="text-gray-700 font-medium text-sm">Shri. Chandru & Smt. Mamatha</p>
              </div>
              <div className="p-6 bg-white/50 rounded-2xl border border-wedding-accent/10 shadow-sm">
                <p className="font-script text-2xl text-wedding-secondary mb-2">The Groom</p>
                <h3 className="font-serif text-xl font-bold text-gray-800">Praveen</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">Son of</p>
                <p className="text-gray-700 font-medium text-sm">Shri. Chidanand & Smt. Renuka</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Moments Section (Creative Layout) --- */}
      <section className="py-24 px-4 bg-wedding-accent/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Capturing our">Beautiful Moments</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[1000px]">
            <motion.div 
              className="md:col-span-8 md:row-span-1 relative overflow-hidden rounded-3xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src={photos[2]} alt="Moment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            <motion.div 
              className="md:col-span-4 md:row-span-1 relative overflow-hidden rounded-3xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img src={photos[3]} alt="Moment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div 
              className="md:col-span-4 md:row-span-1 relative overflow-hidden rounded-3xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img src={photos[4]} alt="Moment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div 
              className="md:col-span-4 md:row-span-1 relative overflow-hidden rounded-3xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <img src={photos[5]} alt="Moment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div 
              className="md:col-span-4 md:row-span-1 relative overflow-hidden rounded-3xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <img src={photos[6]} alt="Moment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div 
              className="md:col-span-6 md:row-span-1 relative overflow-hidden rounded-3xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <img src={photos[7]} alt="Moment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div 
              className="md:col-span-6 md:row-span-1 relative overflow-hidden rounded-3xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <img src={photos[8]} alt="Moment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Event Details with Background Photo --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={photos[9]} 
            alt="Background" 
            className="w-full h-full object-cover opacity-10 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading subtitle="Join us for the">Wedding Events</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Engagement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 md:p-12 bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl shadow-wedding-accent/5 border border-wedding-accent/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-secondary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-wedding-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-wedding-secondary" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-gray-800 mb-4">Engagement</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-wedding-accent" />
                    <span>Tuesday, 5 May 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-wedding-accent" />
                    <span>Evening Ceremony</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Muhurthum */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 md:p-12 bg-wedding-secondary text-white rounded-[2rem] shadow-xl shadow-wedding-secondary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4">Muhurthum</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-white/90">
                    <Calendar className="w-5 h-5" />
                    <span>Wednesday, 6 May 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <Clock className="w-5 h-5" />
                    <span>10:00 AM to 10:40 AM</span>
                  </div>
                </div>
                <a 
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Preeti+%26+Praveen+Wedding&dates=20260506T100000/20260506T110000&details=Wedding+Ceremony+of+Preeti+and+Praveen&location=Adinath+Jain+Samudaya+Bhavan,+Shimoga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-wedding-secondary px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-wedding-cream hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
                >
                  <Calendar className="w-4 h-4" />
                  Save the Date
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Location --- */}
      <section className="py-24 px-4 bg-wedding-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading subtitle="Where it happens">The Venue</SectionHeading>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-wedding-accent/10 border border-wedding-accent/20"
          >
            <div className="w-16 h-16 bg-wedding-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <MapPin className="w-8 h-8 text-wedding-accent" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-gray-800 mb-4">Adinath Jain Samudaya Bhavan</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Kr Puram, Spm Road, Lashkar Mohalla,<br />
              Shimoga - 577202, Karnataka
            </p>
            
            <a 
              href="https://maps.app.goo.gl/bqEUEd784nbCcj4R8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wedding-accent hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-wedding-accent/30 mb-12"
            >
              <MapPin className="w-5 h-5" />
              View on Google Maps
            </a>

            <div className="border-t border-wedding-accent/10 pt-12">
              <h4 className="font-serif text-xl font-bold text-gray-800 mb-6">Nearby Places</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 bg-wedding-accent/5 rounded-2xl">
                  <p className="font-bold text-wedding-accent mb-1">Bus Stand</p>
                  <p className="text-xs text-gray-500">Shimoga KSRTC Bus Stand (~2 km)</p>
                </div>
                <div className="p-4 bg-wedding-accent/5 rounded-2xl">
                  <p className="font-bold text-wedding-accent mb-1">Railway Station</p>
                  <p className="text-xs text-gray-500">Shimoga Railway Station (~3 km)</p>
                </div>
                <div className="p-4 bg-wedding-accent/5 rounded-2xl">
                  <p className="font-bold text-wedding-accent mb-1">Landmark</p>
                  <p className="text-xs text-gray-500">Near KR Puram Police Station</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-24 px-4 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <p className="font-script text-4xl text-wedding-secondary mb-6">Thank You</p>
          <p className="text-gray-600 leading-loose mb-12">
            Your presence will make our celebration truly special. We look forward to seeing you there!
          </p>
          
          <div className="flex items-center justify-center gap-4 text-wedding-accent opacity-50">
            <div className="h-px w-12 bg-current" />
            <Heart className="w-4 h-4 fill-current" />
            <div className="h-px w-12 bg-current" />
          </div>
          
          <p className="mt-12 font-serif text-2xl text-wedding-accent font-bold">Preeti & Praveen</p>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mt-4">#PreetiWedsPraveen</p>
        </div>
      </footer>

      {/* --- Floating Action Button --- */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="https://maps.app.goo.gl/bqEUEd784nbCcj4R8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-wedding-accent text-white rounded-full shadow-2xl hover:bg-pink-700 transition-all hover:scale-105 active:scale-95 group"
        >
          <MapPin className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">Location</span>
        </a>
      </div>
    </div>
  );
}
