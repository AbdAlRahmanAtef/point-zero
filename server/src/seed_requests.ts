import db from "./db";
import { v4 as uuidv4 } from "uuid";

const seedRequests = () => {
  // Get Curl Org ID
  const curlOrg = db
    .prepare("SELECT id FROM organizations WHERE name = 'Curl Org'")
    .get() as any;

  if (curlOrg) {
    db.prepare(
      `
            INSERT INTO service_requests (id, title, type, priority, requirements, organization_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
    ).run(
      uuidv4(),
      "Curl Request 1",
      "Security",
      "high",
      "Need firewall",
      curlOrg.id,
      "submitted"
    );

    console.log("Seeded request for Curl Org");
  }
};

seedRequests();
