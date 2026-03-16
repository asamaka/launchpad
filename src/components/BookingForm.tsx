"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Briefcase,
  PawPrint,
  Calendar,
  Clock,
  ArrowRight,
  ArrowDownUp,
  ChevronDown,
  Check,
  AlertCircle,
  Navigation,
} from "lucide-react";
import {
  cities,
  carCategories,
  calculatePrice,
  getRouteInfo,
  formatPrice,
  formatDuration,
  type City,
  type CarCategory,
  type BookingDetails,
} from "@/lib/data";
import { isLoggedIn } from "@/lib/auth";

interface BookingFormProps {
  onSubmit: (booking: BookingDetails) => void;
  onLoginRequired: () => void;
}

export default function BookingForm({ onSubmit, onLoginRequired }: BookingFormProps) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(1);
  const [hasPet, setHasPet] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showPrices, setShowPrices] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const routeInfo = fromCity && toCity ? getRouteInfo(fromCity, toCity) : null;

  const availableCategories = carCategories.filter((cat) => {
    if (passengers > cat.maxPassengers) return false;
    if (luggage > cat.maxLuggage) return false;
    if (hasPet && !cat.petsAllowed) return false;
    return true;
  });

  useEffect(() => {
    if (fromCity && toCity && fromCity !== toCity) {
      setShowPrices(true);
      if (selectedCar && !availableCategories.find((c) => c.id === selectedCar)) {
        setSelectedCar("");
      }
    } else {
      setShowPrices(false);
    }
  }, [fromCity, toCity, passengers, luggage, hasPet, selectedCar, availableCategories]);

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSubmit = () => {
    if (!isLoggedIn()) {
      onLoginRequired();
      return;
    }

    const from = cities.find((c) => c.id === fromCity)!;
    const to = cities.find((c) => c.id === toCity)!;
    const car = carCategories.find((c) => c.id === selectedCar)!;
    const price = calculatePrice(fromCity, toCity, selectedCar, hasPet)!;

    onSubmit({
      from,
      to,
      carCategory: car,
      passengers,
      luggage,
      hasPet,
      date,
      time,
      price,
    });
  };

  const isValid =
    fromCity && toCity && fromCity !== toCity && selectedCar && date && time;

  return (
    <section id="booking" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Book Your <span className="text-gold-400">Ride</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Select your route, choose your vehicle, and travel in style across Egypt
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8"
        >
          {/* Route Selection */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                Pickup City
              </label>
              <div className="relative">
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="select-field pr-10"
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id} disabled={city.id === toCity}>
                      {city.name} — {city.nameAr}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={swapCities}
              disabled={!fromCity && !toCity}
              className="self-end p-3 rounded-xl border border-white/10 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all disabled:opacity-30"
              title="Swap cities"
            >
              <ArrowDownUp className="w-5 h-5 text-gold-400" />
            </button>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Navigation className="w-4 h-4 text-gold-400" />
                Dropoff City
              </label>
              <div className="relative">
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="select-field pr-10"
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id} disabled={city.id === fromCity}>
                      {city.name} — {city.nameAr}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Route Info */}
          <AnimatePresence>
            {routeInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-xl bg-gold-500/5 border border-gold-500/10">
                  <div className="text-center">
                    <p className="text-xs text-white/40 uppercase tracking-wider">Distance</p>
                    <p className="text-lg font-bold text-gold-400">{routeInfo.distanceKm} km</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <p className="text-xs text-white/40 uppercase tracking-wider">Est. Duration</p>
                    <p className="text-lg font-bold text-gold-400">
                      {formatDuration(routeInfo.estimatedMinutes)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Passengers, Luggage, Pet */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Users className="w-4 h-4 text-gold-400" />
                Passengers
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:border-gold-500/30 hover:text-gold-400 transition-all text-lg"
                >
                  −
                </button>
                <span className="text-xl font-bold text-white w-8 text-center">{passengers}</span>
                <button
                  onClick={() => setPassengers(Math.min(12, passengers + 1))}
                  className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:border-gold-500/30 hover:text-gold-400 transition-all text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Briefcase className="w-4 h-4 text-gold-400" />
                Luggage
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLuggage(Math.max(0, luggage - 1))}
                  className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:border-gold-500/30 hover:text-gold-400 transition-all text-lg"
                >
                  −
                </button>
                <span className="text-xl font-bold text-white w-8 text-center">{luggage}</span>
                <button
                  onClick={() => setLuggage(Math.min(12, luggage + 1))}
                  className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:border-gold-500/30 hover:text-gold-400 transition-all text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <PawPrint className="w-4 h-4 text-gold-400" />
                Traveling with a Pet?
              </label>
              <button
                onClick={() => setHasPet(!hasPet)}
                className={`w-full py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  hasPet
                    ? "border-gold-500 bg-gold-500/10 text-gold-400"
                    : "border-white/15 text-white/50 hover:border-white/30"
                }`}
              >
                {hasPet ? <Check className="w-4 h-4" /> : null}
                {hasPet ? "Yes, bringing a pet" : "No pets"}
                {hasPet && <span className="text-xs text-gold-400/60">(+200 EGP)</span>}
              </button>
            </div>
          </div>

          {/* Car Categories */}
          <AnimatePresence>
            {showPrices && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-4">
                  Choose Your Vehicle
                </label>

                {availableCategories.length === 0 ? (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">
                      No vehicles available for {passengers} passengers and {luggage} luggage.
                      Please reduce the count.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableCategories.map((cat) => {
                      const price = calculatePrice(fromCity, toCity, cat.id, hasPet);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCar(cat.id)}
                          className={`relative p-4 rounded-xl border text-left transition-all ${
                            selectedCar === cat.id
                              ? "border-gold-500 bg-gold-500/10 shadow-lg shadow-gold-500/5"
                              : "border-white/10 hover:border-white/20 hover:bg-white/5"
                          }`}
                        >
                          {selectedCar === cat.id && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-midnight-950" />
                            </div>
                          )}
                          <div className="text-3xl mb-2">{cat.image}</div>
                          <h4 className="font-bold text-white text-sm">{cat.name}</h4>
                          <p className="text-xs text-white/40 mt-0.5 mb-3 line-clamp-2">
                            {cat.description}
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-gold-400">
                              {price ? formatPrice(price) : "—"}
                            </span>
                            <span className="text-xs text-white/40">EGP</span>
                          </div>
                          <div className="flex gap-3 mt-2 text-xs text-white/30">
                            <span>Up to {cat.maxPassengers} pax</span>
                            <span>{cat.maxLuggage} bags</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                Date
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Clock className="w-4 h-4 text-gold-400" />
                Pickup Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
          >
            {selectedCar && fromCity && toCity
              ? `Book for ${formatPrice(
                  calculatePrice(fromCity, toCity, selectedCar, hasPet) || 0
                )} EGP`
              : "Complete all fields to book"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
