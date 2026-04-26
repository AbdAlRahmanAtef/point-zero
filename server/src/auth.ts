import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import db from "./db";
import { User } from "./types";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  organizationName: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, organizationName } = registerSchema.parse(
      req.body
    );

    const existingUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const orgId = uuidv4();
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const createOrg = db.transaction(() => {
      db.prepare("INSERT INTO organizations (id, name) VALUES (?, ?)").run(
        orgId,
        organizationName
      );
      db.prepare(
        "INSERT INTO users (id, email, password, name, role, organization_id) VALUES (?, ?, ?, ?, ?, ?)"
      ).run(userId, email, hashedPassword, name, "owner", orgId);
    });

    createOrg();

    const token = jwt.sign(
      { id: userId, role: "owner", organizationId: orgId },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res
      .status(201)
      .json({
        token,
        user: { id: userId, email, name, role: "owner", organizationId: orgId },
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as any;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, organizationId: user.organization_id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: user.organization_id,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
});

export default router;
