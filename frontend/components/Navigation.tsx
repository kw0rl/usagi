"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Mail, HelpCircle, Wind, Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/letters", label: "Letters", icon: Mail },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/breathe", label: "Breathe", icon: Wind },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-6 left-4 md:inset-x-0 z-50 flex items-center md:justify-center justify-start px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5 rounded-full px-2 py-2 pointer-events-auto w-max"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200/20 via-sky-200/20 to-purple-200/20 -z-10" />

        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 group">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative w-5 h-5"
            >
              <Image src="/bmo.png" alt="BMO" width={20} height={20} className="object-contain w-5 h-auto" />
            </motion.div>
            <span className="font-semibold text-gray-700 group-hover:text-rose-500 transition-colors hidden sm:inline">usagi</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 ml-2 rounded-md bg-transparent"
            >
              {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-16 left-4 z-50 w-44 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-white/60 overflow-hidden"
                >
                  <div className="flex flex-col">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`px-4 py-3 text-sm flex items-center gap-3 ${isActive ? "text-sky-600 bg-sky-50" : "text-gray-700 hover:bg-gray-100"}`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-6 bg-gray-200/80 mx-1 hidden md:block" />

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    isActive ? "text-sky-600" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-sky-100/80 to-blue-100/80 rounded-full shadow-sm"
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? "text-sky-500" : ""}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
