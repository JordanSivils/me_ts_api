import { Router } from "express";
import { requireAdmin } from "../../../middleware/routePermissions";
import { getUsers, updateUser } from "./user.controller";

const router = Router()

router.put("/user", requireAdmin, updateUser);
router.get("/user", requireAdmin, getUsers);