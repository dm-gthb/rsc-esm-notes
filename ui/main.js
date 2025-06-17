import { createElement, use, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createFromFetch } from 'react-server-dom-esm/client';

function getGlobalLocation() {
  return window.location.pathname + window.location.search;
}

const fetchPromise = fetch('/rsc' + getGlobalLocation());
const contentPromise = createFromFetch(fetchPromise);

function Root() {
  const content = use(contentPromise);
  return content;
}

createRoot(document.getElementById('root')).render(
  createElement(
    'div',
    null,
    createElement(
      Suspense,
      { fallback: createElement('div', null, 'Loading...') },
      createElement(Root),
    ),
  ),
);
