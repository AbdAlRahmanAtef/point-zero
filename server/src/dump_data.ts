import db from "./db";

const users = db.prepare("SELECT * FROM users").all();
const organizations = db.prepare("SELECT * FROM organizations").all();

console.log("--- USERS ---");
console.table(users);
console.log("--- ORGANIZATIONS ---");
console.table(organizations);
