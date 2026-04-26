import React, { useState, useEffect } from "react";
import { Users, Building, Trash2, CheckCircle, XCircle } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organization_id: string;
  created_at: string;
}

interface Organization {
  id: string;
  name: string;
  tier: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "users") {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        setUsers(await res.json());
      } else {
        const res = await fetch(
          "http://localhost:5000/api/admin/organizations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch organizations");
        setOrgs(await res.json());
      }
    } catch (err) {
      setError("Failed to load data. Ensure you have admin permissions.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const updateOrgStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/organizations/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        setOrgs(orgs.map((o) => (o.id === id ? { ...o, status } : o)));
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Administration</h1>

      <div className="border-b border-white/10">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-4 text-sm font-medium transition-colors relative ${
              activeTab === "users"
                ? "text-cyan-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            User Management
            {activeTab === "users" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("orgs")}
            className={`pb-4 text-sm font-medium transition-colors relative ${
              activeTab === "orgs"
                ? "text-cyan-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Organizations
            {activeTab === "orgs" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
            )}
          </button>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/5 min-h-[400px]">
        {loading ? (
          <div className="text-center text-neutral-400 py-20">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-20">{error}</div>
        ) : activeTab === "users" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 text-sm">
                  <th className="pb-4 font-medium">Name</th>
                  <th className="pb-4 font-medium">Email</th>
                  <th className="pb-4 font-medium">Role</th>
                  <th className="pb-4 font-medium">Joined</th>
                  <th className="pb-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="text-sm">
                    <td className="py-4 text-white font-medium">{user.name}</td>
                    <td className="py-4 text-neutral-400">{user.email}</td>
                    <td className="py-4 text-neutral-400">
                      <span className="px-2 py-1 rounded bg-white/10 text-xs">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 text-neutral-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      {user.role !== "sysadmin" && (
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 text-sm">
                  <th className="pb-4 font-medium">Organization</th>
                  <th className="pb-4 font-medium">Tier</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Created</th>
                  <th className="pb-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orgs.map((org) => (
                  <tr key={org.id} className="text-sm">
                    <td className="py-4 text-white font-medium">{org.name}</td>
                    <td className="py-4 text-neutral-400 capitalize">
                      {org.tier}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs capitalize ${
                          org.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : org.status === "suspended"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {org.status}
                      </span>
                    </td>
                    <td className="py-4 text-neutral-500">
                      {new Date(org.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 flex gap-2">
                      <button
                        onClick={() => updateOrgStatus(org.id, "active")}
                        className="p-1 hover:bg-emerald-500/20 rounded text-emerald-400 transition-colors"
                        title="Activate"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateOrgStatus(org.id, "suspended")}
                        className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                        title="Suspend"
                      >
                        <XCircle className="w-4 h-4" />
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
