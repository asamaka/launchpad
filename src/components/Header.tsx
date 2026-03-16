"use client";

import { useState, useEffect } from "react";
import { User, Phone, LogOut, Menu, X } from "lucide-react";
import { getUser, logout, isLoggedIn } from "@/lib/auth";

interface HeaderProps {
  onLoginClick: () => void;
  onBookClick: () => void;
}

export default function Header({ onLoginClick, onBookClick }: HeaderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const user = getUser();
    if (user) setUserPhone(user.phone);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUserPhone("");
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-midnight-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <span className="text-midnight-950 font-black text-lg">W</span>
            </div>
            <span className="text-2xl font-black tracking-tight">
              <span className="text-gold-400">Wee</span>
              <span className="text-white">lz</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onBookClick}
              className="text-sm font-medium text-white/70 hover:text-gold-400 transition-colors"
            >
              Book a Ride
            </button>
            <a
              href="#fleet"
              className="text-sm font-medium text-white/70 hover:text-gold-400 transition-colors"
            >
              Our Fleet
            </a>
            <a
              href="#routes"
              className="text-sm font-medium text-white/70 hover:text-gold-400 transition-colors"
            >
              Routes & Prices
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {loggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-sm text-white/80">{userPhone}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="btn-primary text-sm py-2 px-5">
                Sign In
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 text-white/70"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-midnight-950/95 backdrop-blur-xl border-b border-white/5 px-4 pb-4">
          <nav className="flex flex-col gap-3">
            <button
              onClick={() => {
                onBookClick();
                setMenuOpen(false);
              }}
              className="text-left py-2 text-white/80 hover:text-gold-400 transition-colors"
            >
              Book a Ride
            </button>
            <a href="#fleet" className="py-2 text-white/80 hover:text-gold-400 transition-colors">
              Our Fleet
            </a>
            <a href="#routes" className="py-2 text-white/80 hover:text-gold-400 transition-colors">
              Routes & Prices
            </a>
            {loggedIn ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <User className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-white/80">{userPhone}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-left py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMenuOpen(false);
                }}
                className="btn-primary text-sm py-2.5 mt-2"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
