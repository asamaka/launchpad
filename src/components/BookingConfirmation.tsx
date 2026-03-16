"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Users,
  Briefcase,
  PawPrint,
  Calendar,
  Clock,
  Navigation,
  CheckCircle2,
  Phone,
  Download,
} from "lucide-react";
import { formatPrice, formatDuration, getRouteInfo, type BookingDetails } from "@/lib/data";
import { getUser } from "@/lib/auth";
import { useState } from "react";

interface BookingConfirmationProps {
  booking: BookingDetails | null;
  onClose: () => void;
}

export default function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
  const [confirmed, setConfirmed] = useState(false);
  const user = getUser();

  if (!booking) return null;

  const routeInfo = getRouteInfo(booking.from.id, booking.to.id);
  const bookingRef = `WLZ-${Date.now().toString(36).toUpperCase()}`;

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 overflow-y-auto"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative bg-midnight-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {!confirmed ? (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Confirm Your Booking</h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                  <div className="mt-0.5">
                    <MapPin className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">From</p>
                        <p className="font-semibold text-white">{booking.from.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40 uppercase tracking-wider">To</p>
                        <p className="font-semibold text-white">{booking.to.name}</p>
                      </div>
                    </div>
                    {routeInfo && (
                      <p className="text-xs text-white/40 mt-2">
                        {routeInfo.distanceKm} km • ~{formatDuration(routeInfo.estimatedMinutes)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span className="text-xs text-white/40">Date</span>
                    </div>
                    <p className="font-medium text-white text-sm">
                      {new Date(booking.date + "T00:00:00").toLocaleDateString("en-EG", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span className="text-xs text-white/40">Pickup Time</span>
                    </div>
                    <p className="font-medium text-white text-sm">{booking.time}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{booking.carCategory.image}</span>
                    <div>
                      <p className="font-bold text-white">{booking.carCategory.name}</p>
                      <p className="text-xs text-white/40">{booking.carCategory.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1 text-white/60">
                      <Users className="w-3.5 h-3.5" />
                      {booking.passengers} passenger{booking.passengers > 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-1 text-white/60">
                      <Briefcase className="w-3.5 h-3.5" />
                      {booking.luggage} bag{booking.luggage !== 1 ? "s" : ""}
                    </div>
                    {booking.hasPet && (
                      <div className="flex items-center gap-1 text-green-400">
                        <PawPrint className="w-3.5 h-3.5" />
                        Pet included
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Total Price</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-gold-400">
                        {formatPrice(booking.price)}
                      </span>
                      <span className="text-sm text-white/40 ml-1">EGP</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-all font-medium"
                >
                  Cancel
                </button>
                <button onClick={handleConfirm} className="flex-1 btn-primary py-3">
                  Confirm Booking
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="text-white/50 text-sm mb-6">
                Your ride has been booked successfully
              </p>

              <div className="p-4 rounded-xl bg-white/5 mb-6">
                <p className="text-xs text-white/40 mb-1">Booking Reference</p>
                <p className="text-xl font-mono font-bold text-gold-400">{bookingRef}</p>
              </div>

              <div className="space-y-3 text-left mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Route</span>
                  <span className="text-white font-medium">
                    {booking.from.name} → {booking.to.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Date & Time</span>
                  <span className="text-white font-medium">
                    {booking.date} at {booking.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Vehicle</span>
                  <span className="text-white font-medium">{booking.carCategory.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                  <span className="text-white/50">Total</span>
                  <span className="text-xl font-bold text-gold-400">
                    {formatPrice(booking.price)} EGP
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/30 mb-6">
                A confirmation message will be sent to {user?.phone || "your phone"}.
                Your driver will contact you before pickup.
              </p>

              <button onClick={onClose} className="btn-primary w-full py-3">
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
