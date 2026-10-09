import app from "./src/app.js";
import connectDatabase from "./src/config/database.js";
import { port } from "./src/config/env.js";

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, "0.0.0.0", () => {
      console.log(`Todo API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start Todo API:", error.message);
    process.exit(1);
  }
}

startServer();
