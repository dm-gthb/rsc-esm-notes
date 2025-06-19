'use client';

import { createElement, Fragment, useState } from 'react';
import { NoteEditor } from './note-editor.js';
import { useRouter } from './router.js';

export function NoteManager({ note, saveNoteAction }) {
  const { isNavigating } = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  return createElement(
    'div',
    { style: { opacity: isNavigating ? 0.5 : 1 } },
    isEditing
      ? createElement(NoteEditor, {
          note,
          onEditCancel: () => setIsEditing(false),
          action: saveNoteAction,
        })
      : createElement(
          Fragment,
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
        ),
  );
}
