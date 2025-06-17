import { createElement, Suspense } from 'react';
import { NoteList } from './note-list.js';
import { NoteDetails } from './note-details.js';

export function App({ selectedNoteId }) {
  return createElement(
    'div',
    { className: 'app' },
    createElement('h1', null, 'Notes App'),
    createElement(
      'div',
      { className: 'notes-container' },
      createElement(
        Suspense,
        { fallback: createElement('div', null, 'Loading notes...') },
        createElement(NoteList, { selectedNoteId }),
        createElement(
          'div',
          null,
          selectedNoteId
            ? createElement(
                Suspense,
                { fallback: createElement('div', null, 'Loading note...') },
                createElement(NoteDetails, { noteId: selectedNoteId }),
              )
            : createElement('p', null, `Selecte note to view details`),
        ),
      ),
    ),
  );
}
