export const port = Number(process.env.PORT) || 3000;
export const mongoUri = process.env.MONGODB_URI || "mongodb://mongo:27017/todo_app";
export const nodeEnv = process.env.NODE_ENV || "development";
