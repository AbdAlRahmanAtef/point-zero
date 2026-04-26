import React, { useEffect, useState } from "react";
import { Shield, AlertTriangle, Activity, Lock } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SOCMetrics {
  activeThreats: number;
  blockedAttacks: number;
  systemHealth: number;
  responseTime: number;
  activeSessions: number;
}

interface Alert {
  id: string;
  type: string;
  severity: string;
  timestamp: string;
  sourceIp: string;
}

export default function SOCDashboard() {
  const [metrics, setMetrics] = useState<SOCMetrics | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Simulation: Polling every 2 seconds
  useEffect(() => {
    const fetchData = async () => {
      // In a real app, use fetch('/api/soc/metrics')
      // For demo without full auth flow yet, we simulate locally or use the API if auth is ready
      // I'll simulate locally for now to ensure UI works immediately
      setMetrics({
        activeThreats: Math.floor(Math.random() * 10),
        blockedAttacks: 5000 + Math.floor(Math.random() * 500),
        systemHealth: 98 + Math.random(),
        responseTime: 30 + Math.floor(Math.random() * 20),
        activeSessions: 150 + Math.floor(Math.random() * 50),
      });

      setAlerts((prev) => {
        const newAlert = {
          id: Date.now().toString(),
          type: ["DDoS", "SQL Injection", "Malware", "Phishing"][
            Math.floor(Math.random() * 4)
          ],
          severity: ["low", "medium", "high", "critical"][
            Math.floor(Math.random() * 4)
          ],
          timestamp: new Date().toISOString(),
          sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
            Math.random() * 255
          )}`,
        };
        return [newAlert, ...prev].slice(0, 10);
      });
    };

    const interval = setInterval(fetchData, 2000);
    fetchData();
    return () => clearInterval(interval);
  }, []);

  if (!metrics)
    return (
      <div className="p-10 text-center text-neutral-500">
        Initializing SOC Feed...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-mono text-cyan-400 flex items-center gap-3">
          <Shield className="animate-pulse" /> SOC LIVE MONITOR
        </h1>
        <div className="flex items-center gap-2 text-sm text-emerald-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          SYSTEM OPERATIONAL
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <MetricCard
          label="Active Threats"
          value={metrics.activeThreats}
          color="text-rose-500"
        />
        <MetricCard
          label="Blocked Attacks"
          value={metrics.blockedAttacks.toLocaleString()}
          color="text-cyan-500"
        />
        <MetricCard
          label="System Health"
          value={metrics.systemHealth.toFixed(2) + "%"}
          color="text-emerald-500"
        />
        <MetricCard
          label="Response Time"
          value={metrics.responseTime + "ms"}
          color="text-amber-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl bg-black/40 border border-white/5">
          <h3 className="font-mono text-neutral-400 mb-4 flex items-center gap-2">
            <Activity size={16} /> TRAFFIC VOLUME
          </h3>
          <div className="h-[300px] flex items-center justify-center text-neutral-600">
            [Real-time Traffic Graph Placeholder]
          </div>
        </div>

        <div className="p-6 rounded-xl bg-black/40 border border-white/5">
          <h3 className="font-mono text-neutral-400 mb-4 flex items-center gap-2">
            <AlertTriangle size={16} /> RECENT ALERTS
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded border border-white/5 bg-white/5 text-sm font-mono"
              >
                <div className="flex justify-between mb-1">
                  <span
                    className={`font-bold ${
                      alert.severity === "critical"
                        ? "text-rose-500"
                        : alert.severity === "high"
                        ? "text-orange-500"
                        : "text-cyan-500"
                    }`}
                  >
                    {alert.type.toUpperCase()}
                  </span>
                  <span className="text-neutral-500 text-xs">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-xs text-neutral-400">
                  SRC: {alert.sourceIp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
      <div className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
    </div>
  );
}
