import React, { useState } from "react";
import { Plus, Filter, FileText } from "lucide-react";

export default function RequestsDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ role: string } | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setRequests(await res.json());
      } else {
        setError("Failed to load requests");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Service Requests</h1>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Request
        </button>
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/5">
        {loading ? (
          <div className="text-center text-neutral-400 py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 text-sm">
                  <th className="py-4 px-4 font-medium">ID</th>
                  <th className="py-4 px-4 font-medium">Title</th>
                  {user?.role === "sysadmin" && (
                    <th className="py-4 px-4 font-medium">Organization</th>
                  )}
                  <th className="py-4 px-4 font-medium">Type</th>
                  <th className="py-4 px-4 font-medium">Priority</th>
                  {/* Date removed for simplicity or add created_at logic if DB has it */}
                  <th className="py-4 px-4 font-medium">Status</th>
                  <th className="py-4 px-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-mono text-sm text-neutral-400">
                      {req.id.slice(0, 8)}
                    </td>
                    <td className="py-4 px-4 font-medium text-white">
                      {req.title}
                    </td>
                    {user?.role === "sysadmin" && (
                      <td className="py-4 px-4 text-sm text-neutral-300">
                        {req.organization_name || "N/A"}
                      </td>
                    )}
                    <td className="py-4 px-4 text-sm text-neutral-300">
                      {req.type}
                    </td>
                    <td className="py-4 px-4 text-sm text-neutral-300">
                      {req.priority}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          req.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : req.status === "submitted"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-sm text-cyan-400 hover:text-cyan-300">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
