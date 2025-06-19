'use client';

import { createElement, useState } from 'react';
import { NoteEditor } from './note-editor.js';

export function NoteManager({ note, saveNoteAction }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return createElement(NoteEditor, {
      note,
      onEditCancel: () => setIsEditing(false),
      action: saveNoteAction,
    });
  }

  return createElement(
    'div',
    null,
    createElement('h2', { className: 'note-title' }, note.title),
    createElement('p', null, note.text),
    createElement('p', null, `Created at: ${note.createdAt}`),
    createElement(
      'button',
      {
        className: 'edit-button',
        onClick: () => setIsEditing(true),
      },
      'Edit Note',
    ),
  );
}
