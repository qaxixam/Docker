// src/routes/user.routes.js
import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

// GET    /users       → saare users
router.get('/', getAllUsers);

// GET    /users/:id   → ek user
router.get('/:id', getUserById);

// POST   /users       → naya user
router.post('/', createUser);

// PUT    /users/:id   → update
router.put('/:id', updateUser);

// DELETE /users/:id   → delete
router.delete('/:id', deleteUser);

export default router;