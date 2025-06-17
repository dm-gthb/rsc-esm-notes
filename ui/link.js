import { createElement } from 'react';

export function Link({ href, children, isHighlighted = false }) {
  console.log(isHighlighted);
  return createElement(
    'a',
    { href, className: isHighlighted ? 'link link--highlighted' : 'link' },
    children,
  );
}
