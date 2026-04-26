import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Shield, Lock, Activity, Menu, X } from "lucide-react";
import { useState } from "react";

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500/30 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tighter"
          >
            <Shield className="w-6 h-6 text-cyan-500" />
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Zer0-P0!nT
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <Link
              to="/services"
              className="hover:text-cyan-400 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/ha-concepts"
              className="hover:text-cyan-400 transition-colors"
            >
              HA & Redundancy
            </Link>
            <Link to="/about" className="hover:text-cyan-400 transition-colors">
              Mission
            </Link>
            <Link
              to="/contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-400"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-white/5">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                to="/services"
                className="text-neutral-400 hover:text-cyan-400"
              >
                Services
              </Link>
              <Link
                to="/ha-concepts"
                className="text-neutral-400 hover:text-cyan-400"
              >
                HA & Redundancy
              </Link>
              <Link
                to="/about"
                className="text-neutral-400 hover:text-cyan-400"
              >
                Mission
              </Link>
              <Link
                to="/contact"
                className="text-neutral-400 hover:text-cyan-400"
              >
                Contact
              </Link>
              <div className="h-px bg-white/5 my-2" />
              <Link to="/login" className="text-neutral-400 hover:text-white">
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16 flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-neutral-900/50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Shield className="w-5 h-5 text-cyan-500" />
              <span>Zer0-P0!nT</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Academic simulation of an enterprise-grade security and
              high-availability infrastructure provider.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>
                <Link to="/services" className="hover:text-cyan-400">
                  Managed SOC
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400">
                  HA Architecture
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400">
                  Penetration Testing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>
                <Link to="/about" className="hover:text-cyan-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-cyan-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">System Status</h3>
            <div className="flex items-center gap-2 text-sm text-emerald-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational (Simulated)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
