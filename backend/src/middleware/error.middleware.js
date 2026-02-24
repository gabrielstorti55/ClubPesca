export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = error.message || "Erro interno do servidor";

  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).json({ error: message });
}
