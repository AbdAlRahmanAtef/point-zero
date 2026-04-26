import express from "express";
import { z } from "zod";
import db from "./db";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();

// Middleware to ensure user is sysadmin
router.use(authenticateToken, authorizeRole(["sysadmin"]));

// Get all users
router.get("/users", (req, res) => {
  try {
    const users = db
      .prepare(
        "SELECT id, name, email, role, organization_id, created_at FROM users"
      )
      .all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Delete a user
router.delete("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Get all organizations
router.get("/organizations", (req, res) => {
  try {
    const orgs = db.prepare("SELECT * FROM organizations").all();
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
});

// Update organization status
router.put("/organizations/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = z
      .object({ status: z.enum(["active", "suspended", "pending"]) })
      .parse(req.body);

    const result = db
      .prepare("UPDATE organizations SET status = ? WHERE id = ?")
      .run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json({ message: "Organization status updated" });
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
});

export default router;
