import logger from '../utils/logger.js'; // Import par défaut

export default (err, req, res, next) => {
  logger.error(err.stack); // Accès via logger.error
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Erreur serveur' : err.message
  });
};
