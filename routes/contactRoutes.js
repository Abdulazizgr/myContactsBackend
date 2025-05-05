import { Router } from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from "../controllers/contactControllers.js";
import validateTokenHandler from "../middleware/validateTokenHandler.js";

const router = Router();

// Middleware to validate token
router.use(validateTokenHandler);

// Get all contacts

router.get("/", getAllContacts);

// Get a contact by ID

router.get("/:id", getContactById);

// Create a new contact

router.post("/", createContact);

// Update a contact by ID

router.put("/:id", updateContactById);

// Delete a contact by ID
router.delete("/:id", deleteContactById);

export default router;
