export function errorHandler(error, _req, res, _next) {
  // Erros do multer (ex: arquivo grande demais) não usam o formato HttpError
  if (error.name === "MulterError") {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Arquivo muito grande. Tamanho máximo: 5MB."
        : "Erro no envio do arquivo.";
    return res.status(400).json({ error: message });
  }

  const status = error.status || 500;
  const message = error.message || "Erro interno do servidor";

  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).json({ error: message });
}
