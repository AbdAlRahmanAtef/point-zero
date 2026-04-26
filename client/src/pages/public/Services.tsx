import React from "react";
import { motion } from "framer-motion";
import { Shield, Server, Lock, Activity, Eye, Database } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our Services
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Comprehensive infrastructure and security solutions designed for
            mission-critical applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Shield className="w-8 h-8 text-cyan-400" />}
            title="Managed SOC"
            features={[
              "24/7 Monitoring",
              "Threat Analysis",
              "Incident Response",
              "Vulnerability Management",
            ]}
          />
          <ServiceCard
            icon={<Server className="w-8 h-8 text-purple-400" />}
            title="High Availability Infra"
            features={[
              "Multi-Region Deployment",
              "Load Balancing",
              "Auto-Scaling",
              "Failover Testing",
            ]}
          />
          <ServiceCard
            icon={<Lock className="w-8 h-8 text-emerald-400" />}
            title="Security Audits"
            features={[
              "Penetration Testing",
              "Code Review",
              "Compliance Checks",
              "Architecture Review",
            ]}
          />
          <ServiceCard
            icon={<Activity className="w-8 h-8 text-amber-400" />}
            title="Performance Tuning"
            features={[
              "Database Optimization",
              "CDN Configuration",
              "Latency Reduction",
              "Resource Planning",
            ]}
          />
          <ServiceCard
            icon={<Eye className="w-8 h-8 text-blue-400" />}
            title="Threat Intelligence"
            features={[
              "Dark Web Monitoring",
              "Brand Protection",
              "Fraud Detection",
              "Global Threat Feeds",
            ]}
          />
          <ServiceCard
            icon={<Database className="w-8 h-8 text-rose-400" />}
            title="Disaster Recovery"
            features={[
              "Backup Strategies",
              "Recovery Drills",
              "Business Continuity",
              "Data Integrity Checks",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  features: string[];
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
    >
      <div className="mb-6 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-neutral-400">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
