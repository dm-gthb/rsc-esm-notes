'use client';

import { createElement, useActionState } from 'react';

export function NoteEditor({ note, onEditCancel, action }) {
  const [formState, formAction, isPending] = useActionState(action);

  return createElement(
    'form',
    {
      className: 'note-editor-form',
      action: formAction,
    },
    createElement(
      'div',
      { className: 'note-editor-form-row' },
      createElement('label', { htmlFor: 'note-title' }, 'Title'),
      createElement('input', {
        id: 'note-title',
        type: 'text',
        name: 'title',
        defaultValue: note.title,
        placeholder: 'Note Title',
        disabled: isPending,
        required: true,
      }),
    ),
    createElement(
      'div',
      { className: 'note-editor-form-row' },
      createElement('label', { htmlFor: 'note-text' }, 'Text'),
      createElement('textarea', {
        id: 'note-text',
        name: 'text',
        defaultValue: note.text,
        placeholder: 'Note Text',
        disabled: isPending,
        required: true,
      }),
    ),
    createElement('input', {
      type: 'hidden',
      name: 'noteId',
      value: note.id,
    }),
    createElement(
      'button',
      {
        type: 'submit',
        disabled: isPending,
      },
      isPending ? 'Saving...' : 'Save Note',
    ),
    createElement(
      'button',
      {
        type: 'button',
        onClick: onEditCancel,
        disabled: isPending,
      },
      'Return to View Note',
    ),
    createElement(
      'div',
      null,
      formState?.error && createElement('p', null, formState.error.message),
    ),
  );
}
