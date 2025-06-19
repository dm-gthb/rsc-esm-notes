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
      createElement(
        'label',
        {
          htmlFor: 'note-title',
          className: 'note-editor-label',
        },
        'Title',
      ),
      createElement('input', {
        id: 'note-title',
        type: 'text',
        name: 'title',
        defaultValue: note.title,
        placeholder: 'Note Title',
        className: 'note-editor-title-input',
        required: true,
      }),
    ),
    createElement(
      'div',
      { className: 'note-editor-form-row' },
      createElement(
        'label',
        {
          htmlFor: 'note-text',
          className: 'note-editor-label',
        },
        'Text',
      ),
      createElement('textarea', {
        id: 'note-text',
        name: 'text',
        defaultValue: note.text,
        placeholder: 'Note Text',
        className: 'note-editor-textarea',
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
        className: 'note-editor-button',
        disabled: isPending,
      },
      isPending ? 'Saving...' : 'Save Note',
    ),
    createElement(
      'button',
      {
        type: 'button',
        className: 'note-editor-button',
        onClick: onEditCancel,
        disabled: isPending,
      },
      'Return to View Note',
    ),
    createElement(
      'div',
      null,
      formState?.error &&
        createElement('p', { className: 'error-message' }, formState.error.message),
    ),
  );
}
