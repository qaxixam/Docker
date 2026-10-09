import mongoose from "mongoose";

function getHealth(req, res) {
  const isDatabaseConnected = mongoose.connection.readyState === 1;
  res.status(isDatabaseConnected ? 200 : 503).json({
    status: isDatabaseConnected ? "ok" : "unavailable",
    database: isDatabaseConnected ? "connected" : "disconnected",
  });
}

export { getHealth };
