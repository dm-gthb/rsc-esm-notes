import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFile } from 'node:fs/promises';

const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

app.get('/:noteId?', async (context) => {
  const html = await readFile('./public/index.html', 'utf8');
  return context.html(html, 200);
});

app.get('/rsc/:noteId', async (context) => {
  return context.json({
    noteId: context.req.param('noteId'),
    content: 'This is a sample note content.',
  });
});

serve({
  fetch: app.fetch,
  port: 3002,
  onError: (err) => {
    console.error('Server error:', err);
  },
});
