import { createElement } from 'react';
import { getNotes } from '../notes-data.js';
import { Link } from './link.js';

export async function NoteList({ selectedNoteId }) {
  const notes = await getNotes();
  return createElement(
    'ul',
    { className: 'note-list' },
    notes.map((note) =>
      createElement(
        'li',
        { key: note.id, className: 'note-list-item' },
        createElement(
          Link,
          { href: `/${note.id}`, isHighlighted: note.id === +selectedNoteId },
          note.title,
        ),
      ),
    ),
  );
}
