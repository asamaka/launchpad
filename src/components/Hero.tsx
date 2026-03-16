"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Star } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/50 to-midnight-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-midnight-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-8">
            <Star className="w-4 h-4 fill-gold-400" />
            Egypt&apos;s Premium Chauffeur Service
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 tracking-tight">
            <span className="text-white">Travel in</span>
            <br />
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
              Pure Luxury
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Book private chauffeured cars between Egypt&apos;s cities.
            Professional drivers, luxury vehicles, and seamless intercity travel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={onBookClick} className="btn-primary text-lg px-10 py-4 flex items-center gap-3">
              Book Your Ride
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#routes"
              className="px-8 py-4 rounded-xl border border-white/10 text-white/80 hover:border-gold-500/30 hover:text-gold-400 transition-all text-lg font-medium"
            >
              View Prices
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            {
              icon: Shield,
              title: "Safe & Secure",
              desc: "Verified professional drivers",
            },
            {
              icon: Clock,
              title: "Always On Time",
              desc: "Punctual pickup guaranteed",
            },
            {
              icon: Star,
              title: "Premium Fleet",
              desc: "Luxury vehicles maintained daily",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass-card p-6 flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
