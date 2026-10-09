
import { prisma } from '../config/primsa.js';

// GET /users - Saare users laao
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({

            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};


export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: Number(id) },

        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


export const createUser = async (req, res, next) => {
    try {
        const { name, email, age } = req.body;

        // Validation
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email and name are required',
            });
        }

        const user = await prisma.user.create({
            data: { email, name, age },
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {

        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
            });
        }
        next(error);
    }
};

// PUT /users/:id - User update karo
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, name, age } = req.body;

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { email, name, age },
        });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        next(error);
    }
};