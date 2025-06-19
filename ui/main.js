import { createElement, use, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createFromFetch, encodeReply } from 'react-server-dom-esm/client';

const fetchPromise = fetch('/rsc' + getGlobalLocation());

const contentPromise = createFromFetch(fetchPromise, {
  moduleBaseURL: `${window.location.origin}/ui`,
  callServer: async (id, args) => {
    const fetchPromise = fetch(`/action${getGlobalLocation()}`, {
      method: 'POST',
      headers: { 'rsc-action': id },
      body: await encodeReply(args),
    });
    const actionResponsePromise = createFromFetch(fetchPromise);
    const { returnValue } = await actionResponsePromise;
    return returnValue;
  },
});

function Root() {
  const content = use(contentPromise);
  return content;
}

createRoot(document.getElementById('root')).render(
  createElement(
    Suspense,
    {
      fallback: createElement(
        'div',
        { className: 'loading-indicator' },
        createElement('span', null, 'Loading...'),
      ),
    },
    createElement(Root),
  ),
);

function getGlobalLocation() {
  return window.location.pathname + window.location.search;
}
