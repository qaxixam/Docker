function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  console.error(error);
  res.status(500).json({ error: "Internal server error" });
}

export default errorHandler;
