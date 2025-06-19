import * as RSC from 'react-server-dom-esm/client';
import { createElement, use, Suspense, useState, useEffect, useTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { getGlobalLocation, RouterContext, useLinkHandler } from './router.js';

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
  const [isPending, startTransition] = useTransition();

  useLinkHandler((path) => {
    const fetchPromise = fetch('/rsc' + path).then((val) => {
      window.history.pushState({}, '', path);
      return val;
    });

    startTransition(() => {
      setContentPromise(createFromFetch(fetchPromise));
    });
  });

  useEffect(() => {
    updateContentPromise = (newContentPromise) => {
      startTransition(() => {
        setContentPromise(newContentPromise);
      });
    };
  }, []);

  return createElement(RouterContext, { value: { isNavigating: isPending } }, content);
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
