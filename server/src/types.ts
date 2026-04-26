import { Request } from "express";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "viewer" | "sysadmin";
  organization_id?: string;
}

export interface AuthRequest extends Request {
  user?: User;
}
