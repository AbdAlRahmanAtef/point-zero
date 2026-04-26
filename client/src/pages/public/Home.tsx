import React from "react";
import { ArrowRight, Shield, Server, Globe, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center p-6 bg-grid-white/[0.02]">
        {/* Background Grients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[128px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mx-auto"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Zero-Trust Architecture Simulation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            Secure by Design.
            <br />
            Resilient by Default.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Experience simulated enterprise-grade High Availability and SOC
            operations. Demonstrating No Single Point of Failure (NSPOF)
            architectures for the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors flex items-center gap-2"
            >
              Start Simulation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ha-concepts"
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Learn Architecture
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-cyan-400" />}
              title="Managed SOC"
              description="24/7 simulated security monitoring with real-time threat detection and incident response workflows."
            />
            <FeatureCard
              icon={<Server className="w-8 h-8 text-purple-400" />}
              title="High Availability"
              description="Multi-region redundancy simulation ensuring 99.99% uptime with automated failover mechanisms."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8 text-emerald-400" />}
              title="Zero Trust"
              description="Identity-first security model where no user or device is trusted by default, inside or outside the network."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors group">
      <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:bg-cyan-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}
