
import express from 'express';
import userRoutes from './routes/user.route.js';

import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware - JSON parse karne ke liye
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Neo API is running',
        endpoints: {
            users: '/api/users',

        },
    });
});

// Routes connect karo
app.use('/api/users', userRoutes);


// Error handlers (sabse aakhir mein)
app.use(notFound);
app.use(errorHandler);

export default app;