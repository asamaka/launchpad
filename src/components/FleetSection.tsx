"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, PawPrint, Check, X } from "lucide-react";
import { carCategories } from "@/lib/data";

export default function FleetSection() {
  return (
    <section id="fleet" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Our <span className="text-gold-400">Fleet</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From economy sedans to luxury sprinters — we have the perfect vehicle for every journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {carCategories.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:border-gold-500/20 transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {car.image}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{car.name}</h3>
              <p className="text-sm text-white/50 mb-4">{car.description}</p>

              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 text-white/60">
                  <Users className="w-3.5 h-3.5" />
                  Up to {car.maxPassengers}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 text-white/60">
                  <Briefcase className="w-3.5 h-3.5" />
                  {car.maxLuggage} bags
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs ${
                    car.petsAllowed
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  <PawPrint className="w-3.5 h-3.5" />
                  {car.petsAllowed ? "Pet friendly" : "No pets"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
