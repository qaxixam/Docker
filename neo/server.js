// server.js
import 'dotenv/config';
import app from './app.js';
import { prisma } from './config/primsa.js';

const PORT = process.env.PORT || 4242;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
    console.log(`📚 API base: http://localhost:${PORT}/api`);
});

// Graceful shutdown
const shutdown = async () => {
    console.log('\n🛑 Shutting down...');
    server.close(async () => {
        await prisma.$disconnect();
        console.log('✅ Server closed');
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);