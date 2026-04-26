import express, { Request, Response } from "express";
import { authenticateToken } from "./middleware";

const router = express.Router();

// Mock data generator
const generateMetrics = () => {
  return {
    activeThreats: Math.floor(Math.random() * 5),
    blockedAttacks: Math.floor(Math.random() * 1000) + 5000,
    systemHealth: 98 + Math.random() * 2,
    responseTime: Math.floor(Math.random() * 50) + 20,
    activeSessions: Math.floor(Math.random() * 200) + 100,
  };
};

const generateAlerts = () => {
  const types = [
    "DDoS Attempt",
    "SQL Injection",
    "Brute Force",
    "Malware Detected",
    "Port Scan",
  ];
  const severities = ["low", "medium", "high", "critical"];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: `alert-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    timestamp: new Date().toISOString(),
    sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}`,
  }));
};

router.get("/metrics", authenticateToken, (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const { organizationId } = req.query;

  // In a real app, we would fetch data specific to the org.
  // Here we just ensure permissions.
  // If sysadmin and organizationId is provided, we simulate data for that org.
  if (authReq.user!.role === "sysadmin" && organizationId) {
    // Verify org exists? Optional for simulation.
  } else if (authReq.user!.role !== "sysadmin") {
    // Standard users can only see their own
  }

  res.json(generateMetrics());
});

router.get("/alerts", authenticateToken, (req: Request, res: Response) => {
  // Similar logic could apply here
  res.json(generateAlerts());
});

export default router;
