import { createElement } from 'react';
import { getNote } from '../notes-data.js';
import { NoteManager } from './note-manager.js';

export async function Note({ noteId }) {
  const note = await getNote(noteId);
  if (!note) {
    return createElement('div', null, 'Note not found');
  }
  return createElement(NoteManager, { note });
}
