import React from "react";
import { Network, Server, RefreshCw, AlertTriangle } from "lucide-react";

export default function HAConcepts() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            High Availability & Redundancy
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Understanding how we eliminate Single Points of Failure (SPOF) to
            guarantee service continuity.
          </p>
        </div>

        {/* Concept 1: Redundancy */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-cyan-400">
            <Server className="w-8 h-8" />
            <h2 className="text-2xl font-bold text-white">Redundancy</h2>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-neutral-300 leading-relaxed">
              Redundancy is the provision of additional or alternate instances
              of network devices, equipment, and communication mediums within
              network infrastructure. It is a method for ensuring network
              availability in case of a network infrastructure failure and path
              failure.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <h3 className="font-semibold text-white mb-2">
                  Active-Passive
                </h3>
                <p className="text-sm text-neutral-500">
                  One node is active inside the cluster, and the other is
                  standby. If the active node fails, the standby takes over.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <h3 className="font-semibold text-white mb-2">Active-Active</h3>
                <p className="text-sm text-neutral-500">
                  Traffic is load balanced across all nodes. If one fails, the
                  others handle the load.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Concept 2: Load Balancing */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-purple-400">
            <Network className="w-8 h-8" />
            <h2 className="text-2xl font-bold text-white">Load Balancing</h2>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-neutral-300 leading-relaxed">
              Distributing incoming network traffic across a group of backend
              servers. This ensures no single server bears too much demand. By
              spreading the work evenly, load balancing improves application
              responsiveness and increases availability.
            </p>
          </div>
        </section>

        {/* Concept 3: Failover */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-rose-400">
            <RefreshCw className="w-8 h-8" />
            <h2 className="text-2xl font-bold text-white">
              Failover Mechanisms
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-neutral-300 leading-relaxed">
              Failover is a backup operational mode that automatically switches
              to a standby database, server or network upon the failure or
              abnormal termination of the previously active application, server,
              system, or network.
            </p>
          </div>
        </section>

        {/* Concept 4: SPOF */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-amber-400">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-2xl font-bold text-white">
              Single Point of Failure (SPOF)
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-neutral-300 leading-relaxed">
              A part of a system that, if it fails, will stop the entire system
              from working. Elimination of SPOFs is the primary goal of high
              availability architectures.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
