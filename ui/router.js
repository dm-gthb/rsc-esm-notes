import { useEffect, createContext, use } from 'react';

export const RouterContext = createContext();

export function useRouter() {
  const context = use(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
}

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
