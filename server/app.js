import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToPipeableStream } from 'react-server-dom-esm/server';
import { RESPONSE_ALREADY_SENT } from '@hono/node-server/utils/response';

const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

app.use(
  '/ui/*',
  serveStatic({
    root: './ui',
    onNotFound: (_path, context) => context.text('File not found', 404),
    rewriteRequestPath: (path) => path.replace('/ui', ''),
  }),
);

app.get('/:noteId?', async (context) => {
  const html = await readFile('./public/index.html', 'utf8');
  return context.html(html, 200);
});

app.get('/rsc/:noteId?', async (context) => {
  const noteId = context.req.param('noteId') ?? null;
  const { pipe } = renderToPipeableStream(
    createElement('div', null, `Note ID: ${noteId}`),
  );
  pipe(context.env.outgoing);
  return RESPONSE_ALREADY_SENT;
});

serve({
  fetch: app.fetch,
  port: 3002,
  onError: (err) => {
    console.error('Server error:', err);
  },
});
