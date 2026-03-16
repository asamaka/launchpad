"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-midnight-950 font-black text-sm">W</span>
              </div>
              <span className="text-xl font-black tracking-tight">
                <span className="text-gold-400">Wee</span>
                <span className="text-white">lz</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Egypt&apos;s premier private chauffeur service.
              Travel between cities in luxury and comfort.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Popular Routes
            </h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li>Cairo → Alexandria</li>
              <li>Cairo → Sharm El Sheikh</li>
              <li>Cairo → Hurghada</li>
              <li>Cairo → Ain Sokhna</li>
              <li>Cairo → Luxor</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Vehicle Classes
            </h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li>Economy Sedan</li>
              <li>Business Class</li>
              <li>First Class</li>
              <li>SUV</li>
              <li>VIP Van & Sprinter</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400" />
                +20 100 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" />
                hello@weelz.eg
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Weelz. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold-400 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
