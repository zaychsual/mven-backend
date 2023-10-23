import { Router } from "express";
import { register  } from "../controllers/AuthController";

const routes = Router();

routes.post("/register", register);

export default routes;