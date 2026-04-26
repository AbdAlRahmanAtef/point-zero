import React from "react";
import { Activity, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", threats: 4, blocked: 240 },
  { name: "Tue", threats: 3, blocked: 139 },
  { name: "Wed", threats: 2, blocked: 980 },
  { name: "Thu", threats: 7, blocked: 390 },
  { name: "Fri", threats: 5, blocked: 480 },
  { name: "Sat", threats: 2, blocked: 380 },
  { name: "Sun", threats: 1, blocked: 430 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="System Health"
          value="99.99%"
          icon={<Activity className="text-emerald-400" />}
          trend="+0.01%"
        />
        <StatCard
          title="Active Threats"
          value="3"
          icon={<Shield className="text-rose-400" />}
          trend="-12%"
          inverse
        />
        <StatCard
          title="Open Incidents"
          value="1"
          icon={<AlertTriangle className="text-amber-400" />}
          trend="+1"
          inverse
        />
        <StatCard
          title="Security Score"
          value="A+"
          icon={<CheckCircle className="text-cyan-400" />}
          trend="Stable"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-lg font-bold text-white mb-6">
            Threat Traffic Analysis
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    border: "1px solid #333",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#colorBlocked)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-lg font-bold text-white mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            <AlertItem
              title="SQL Injection Attempt"
              time="2 min ago"
              severity="high"
            />
            <AlertItem
              title="Port Scan Detected"
              time="15 min ago"
              severity="medium"
            />
            <AlertItem
              title="Failed Login (Root)"
              time="1 hour ago"
              severity="low"
            />
            <AlertItem
              title="New Device Detected"
              time="2 hours ago"
              severity="low"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, inverse }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-neutral-400 text-sm font-medium">{title}</span>
        {icon}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            inverse
              ? "bg-rose-500/10 text-rose-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {trend}
        </div>
      </div>
    </div>
  );
}

function AlertItem({ title, time, severity }: any) {
  const colors = {
    low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    high: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  } as any;

  return (
    <div
      className={`p-3 rounded-lg border flex items-center justify-between ${colors[severity]}`}
    >
      <div>
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs opacity-70">{time}</div>
      </div>
      <div className="text-xs font-bold uppercase tracking-wider">
        {severity}
      </div>
    </div>
  );
}
