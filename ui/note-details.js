import { createElement } from 'react';
import { getNote } from '../notes-data.js';

export async function NoteDetails({ noteId }) {
  const note = await getNote(noteId);
  if (!note) {
    return createElement('div', null, 'Note not found');
  }
  return createElement(
    'div',
    { className: 'note-details' },
    createElement('h2', { className: 'note-title' }, note.title),
    createElement('p', null, note.text),
    createElement('p', null, `Created at: ${note.createdAt}`),
  );
}
