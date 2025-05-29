const API_KEY = process.env.API_KEY || 'ma_clef_secrete';

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Accès refusé : clé API invalide' });
  }
  next();
}

app.use(apiKeyMiddleware);
