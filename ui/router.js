import { useEffect } from 'react';

export function useLinkHandler(navigate) {
  useEffect(() => {
    function onClick(event) {
      const link = event.target.closest('a');
      if (link) {
        event.preventDefault();
        navigate(link.pathname + link.search);
      }
    }

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [navigate]);
}

export function getGlobalLocation() {
  return window.location.pathname + window.location.search;
}
