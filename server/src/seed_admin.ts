import db from "./db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const seedSysAdmin = async () => {
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const email = "admin@sys.com";

  // Create sysadmin org if not exists (using dummy org for sysadmin)
  const orgId = uuidv4();
  db.prepare(
    "INSERT INTO organizations (id, name, tier) VALUES (?, ?, 'enterprise')"
  ).run(orgId, "System Admin Dept");

  db.prepare(
    `
        INSERT INTO users (id, email, password, name, role, organization_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `
  ).run(id, email, hashedPassword, "System Administrator", "sysadmin", orgId);

  console.log("Sysadmin created: admin@sys.com / admin123");
};

seedSysAdmin();
