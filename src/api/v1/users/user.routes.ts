import { Router } from "express";
import { requireAdmin, requireAuth, requireRoles } from "../../../middleware/routePermissions";
import { createUserHandler, deleteMeUserHandler, getAllMeUsersListHandler, getClerkUsers, getMeUserHandler, meUserPatchHandler } from "./user.controller";

const router = Router()

router.get("/users", requireAuth, getClerkUsers);
router.post("/me/user", requireRoles({ hasAny: ["admin", "manager", "dev", "owner"]}), createUserHandler);
router.get("/me/user/:id", requireRoles({ hasAny: ["admin", "manager", "dev", "owner"]}),getMeUserHandler);
router.patch("/me/user/:id", requireRoles({ hasAny: ["admin", "manager", "dev", "owner"]}), meUserPatchHandler);
router.delete("/me/user/:id", requireRoles({ hasAny: ["admin", "manager", "dev", "owner"]}),deleteMeUserHandler)
router.get("/me-users", requireAuth, getAllMeUsersListHandler);
export default router;