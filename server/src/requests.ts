import express, { Request, Response } from "express";
import { z } from "zod";
import db from "./db";
import { authenticateToken, authorizeRole } from "./middleware";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "./types";

const router = express.Router();

const requestSchema = z.object({
  title: z.string().min(5),
  type: z.string(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  requirements: z.string().min(10),
});

// Get all requests (sysadmin sees all, others see own)
router.get("/", authenticateToken, (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  if (authReq.user!.role === "sysadmin") {
    const requests = db
      .prepare(
        `
      SELECT r.*, o.name as organization_name 
      FROM service_requests r 
      JOIN organizations o ON r.organization_id = o.id
    `
      )
      .all();
    return res.json(requests);
  } else {
    // Owners, Admins, Viewers see their own org
    const requests = db
      .prepare("SELECT * FROM service_requests WHERE organization_id = ?")
      .all(authReq.user!.organization_id);
    return res.json(requests);
  }
});

// Create a new request
router.post(
  "/",
  authenticateToken,
  authorizeRole(["owner", "admin"]),
  (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    try {
      const { title, type, priority, requirements } = requestSchema.parse(
        req.body
      );
      const id = uuidv4();

      db.prepare(
        "INSERT INTO service_requests (id, title, type, priority, requirements, organization_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
      ).run(
        id,
        title,
        type,
        priority,
        requirements,
        authReq.user!.organization_id,
        "submitted"
      );

      res.status(201).json({ id, title, status: "submitted" });
    } catch (error) {
      res.status(400).json({ error: "Invalid input" });
    }
  }
);

// Update status (Admin only)
router.patch(
  "/:id/status",
  authenticateToken,
  authorizeRole(["admin", "sysadmin"]),
  (req: Request, res: Response) => {
    const { status } = req.body;
    const { id } = req.params;

    db.prepare("UPDATE service_requests SET status = ? WHERE id = ?").run(
      status,
      id
    );
    res.json({ message: "Status updated" });
  }
);

export default router;
