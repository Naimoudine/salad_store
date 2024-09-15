import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import authActions from "./modules/auth/authAction";

router.post("/login", authActions.login);

// Ingredients route
import ingredientAction from "./modules/ingredients/ingredientAction";

router.get("/api/ingredients", ingredientAction.browse);

router.get("/api/ingredients/categories", ingredientAction.browseCategories);

router.post("/api/ingredients", ingredientAction.add);

// Salads route
import saladAction from "./modules/salads/saladAction";

router.get("/api/salads", saladAction.browse);

/* ************************************************************************* */

export default router;
