import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import authActions from "./modules/auth/authAction";

router.post("/login", authActions.login);

/* ************************************************************************* */

export default router;
