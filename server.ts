import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolvePixKey } from './server/pixProvider.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

/**
 * Endpoint for Pix key resolution (DICT / Banking Provider)
 * POST /api/pix/resolve-key
 * Body: { "key": "valor_digitado" }
 */
app.post('/api/pix/resolve-key', async (req, res) => {
  const { key } = req.body || {};

  if (!key || typeof key !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'PIX_KEY_NOT_FOUND',
    });
  }

  try {
    const result = await resolvePixKey(key);
    return res.json(result);
  } catch (err) {
    console.error('Unexpected error in /api/pix/resolve-key:', err);
    return res.status(500).json({
      success: false,
      error: 'PIX_KEY_NOT_FOUND',
    });
  }
});

// Vite middleware for dev / static files for prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
