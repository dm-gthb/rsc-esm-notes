import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToPipeableStream, decodeReply } from 'react-server-dom-esm/server';
import { RESPONSE_ALREADY_SENT } from '@hono/node-server/utils/response';
import { App } from '../ui/app.js';

const moduleBasePath = new URL('../ui', import.meta.url).href;

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

app.get('/rsc/:noteId?', async (context) => {
  const noteId = context.req.param('noteId') ?? null;
  const { pipe } = renderToPipeableStream(
    createElement(App, { selectedNoteId: noteId }),
    moduleBasePath,
  );
  pipe(context.env.outgoing);
  return RESPONSE_ALREADY_SENT;
});

app.get('/:noteId?', async (context) => {
  const html = await readFile('./public/index.html', 'utf8');
  return context.html(html, 200);
});

app.post('/action/:noteId?', async (context) => {
  const serverReference = context.req.header('rsc-action');
  const [filepath, name] = serverReference.split('#');
  const action = (await import(filepath))[name];

  if (action.$$typeof !== Symbol.for('react.server.reference')) {
    throw new Error('Invalid action');
  }

  const formData = await context.req.formData();
  const args = await decodeReply(formData, moduleBasePath);
  const result = await action(...args);

  const { pipe } = renderToPipeableStream({ returnValue: result }, moduleBasePath);

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
