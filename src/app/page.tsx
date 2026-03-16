"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookingForm from "@/components/BookingForm";
import FleetSection from "@/components/FleetSection";
import RoutesSection from "@/components/RoutesSection";
import BookingConfirmation from "@/components/BookingConfirmation";
import LoginModal from "@/components/LoginModal";
import Footer from "@/components/Footer";
import type { BookingDetails } from "@/lib/data";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loginCallback, setLoginCallback] = useState<(() => void) | null>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoginRequired = () => {
    setLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    setLoginOpen(false);
    if (loginCallback) {
      loginCallback();
      setLoginCallback(null);
    }
  };

  const handleBookingSubmit = (details: BookingDetails) => {
    setBooking(details);
  };

  return (
    <main className="min-h-screen">
      <Header onLoginClick={() => setLoginOpen(true)} onBookClick={scrollToBooking} />

      <Hero onBookClick={scrollToBooking} />

      <BookingForm
        onSubmit={handleBookingSubmit}
        onLoginRequired={handleLoginRequired}
      />

      <FleetSection />

      <RoutesSection />

      <Footer />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {booking && (
        <BookingConfirmation booking={booking} onClose={() => setBooking(null)} />
      )}
    </main>
  );
}
