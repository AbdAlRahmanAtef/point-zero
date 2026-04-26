import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Securing the Digital Frontier
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 max-w-2xl mx-auto"
          >
            Zer0-P0!nT is an academic simulation designed to demonstrate the
            principles of unbreakable infrastructure and zero-trust security.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="mb-4 w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-neutral-400 leading-relaxed">
              To provide a comprehensive educational platform that illustrates
              how enterprise-grade security and high availability systems are
              architected, deployed, and maintained in a hostile digital
              environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="mb-4 w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-neutral-400 leading-relaxed">
              A world where single points of failure are a thing of the past,
              and security is not an afterthought but a fundamental
              architectural guarantee.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard
              icon={<Shield className="text-emerald-400" />}
              title="Safety First"
              desc="Security is the foundation of specific availability."
            />
            <ValueCard
              icon={<Users className="text-blue-400" />}
              title="Transparency"
              desc="Clear visibility into system health and incident response."
            />
            <ValueCard
              icon={<Award className="text-amber-400" />}
              title="Excellence"
              desc="Adhering to the highest standards of engineering reliability."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/5">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
  );
}
