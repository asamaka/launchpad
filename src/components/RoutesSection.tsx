"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Route } from "lucide-react";
import { cities, getRouteInfo, calculatePrice, formatPrice, formatDuration } from "@/lib/data";

const popularRoutes = [
  { from: "cairo", to: "alexandria" },
  { from: "cairo", to: "sharm" },
  { from: "cairo", to: "hurghada" },
  { from: "cairo", to: "ainSokhna" },
  { from: "cairo", to: "luxor" },
  { from: "cairo", to: "mansoura" },
  { from: "cairo", to: "newAlamein" },
  { from: "sharm", to: "dahab" },
  { from: "hurghada", to: "luxor" },
  { from: "luxor", to: "aswan" },
  { from: "cairo", to: "fayoum" },
  { from: "alexandria", to: "marsa" },
];

export default function RoutesSection() {
  const [selectedCategory, setSelectedCategory] = useState("economy");

  const categories = [
    { id: "economy", label: "Economy" },
    { id: "business", label: "Business" },
    { id: "firstClass", label: "First Class" },
    { id: "suv", label: "SUV" },
  ];

  return (
    <section id="routes" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Popular <span className="text-gold-400">Routes & Prices</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Transparent pricing with no hidden fees. All prices in Egyptian Pounds (EGP).
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-gold-500 text-midnight-950"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularRoutes.map((route, i) => {
            const fromCity = cities.find((c) => c.id === route.from)!;
            const toCity = cities.find((c) => c.id === route.to)!;
            const info = getRouteInfo(route.from, route.to);
            const price = calculatePrice(route.from, route.to, selectedCategory, false);

            return (
              <motion.div
                key={`${route.from}-${route.to}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5 hover:border-gold-500/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="text-sm font-medium text-white">{fromCity.name}</span>
                    </div>
                    <div className="w-px h-3 ml-[7px] border-l border-dashed border-white/20" />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span className="text-sm font-medium text-white">{toCity.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gold-400">
                      {price ? formatPrice(price) : "—"}
                    </div>
                    <div className="text-xs text-white/40">EGP</div>
                  </div>
                </div>

                {info && (
                  <div className="flex items-center gap-4 pt-3 border-t border-white/5 text-xs text-white/40">
                    <div className="flex items-center gap-1">
                      <Route className="w-3 h-3" />
                      {info.distanceKm} km
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(info.estimatedMinutes)}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
