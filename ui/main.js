import { createElement, use, Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import * as RSC from 'react-server-dom-esm/client';

function createFromFetch(fetchPromise) {
  return RSC.createFromFetch(fetchPromise, {
    moduleBaseURL: `${window.location.origin}/ui`,
    callServer,
  });
}

async function callServer(id, args) {
  const fetchPromise = fetch(`/action${getGlobalLocation()}`, {
    method: 'POST',
    headers: { 'rsc-action': id },
    body: await RSC.encodeReply(args),
  });

  const actionResponsePromise = createFromFetch(fetchPromise);

  onStreamFinished(fetchPromise, () => {
    updateContentPromise(actionResponsePromise);
  });

  const { returnValue } = await actionResponsePromise;
  return returnValue;
}

function onStreamFinished(fetchPromise, onFinished) {
  return fetchPromise.then(onFinished);
}

let updateContentPromise = () => {};
const fetchPromise = fetch('/rsc' + getGlobalLocation());
const initContentPromise = createFromFetch(fetchPromise);

function Root() {
  const [contentPromise, setContentPromise] = useState(initContentPromise);
  const content = use(contentPromise).app;

  useEffect(() => {
    updateContentPromise = (newContentPromise) => {
      setContentPromise(newContentPromise);
    };
  }, []);

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
