'use client';

import { createElement } from 'react';

export function NoteEditor({ note, onEditCancel }) {
  return createElement(
    'form',
    {
      className: 'note-editor-form',
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
      }),
    ),
    createElement(
      'button',
      {
        type: 'submit',
        className: 'note-editor-button',
      },
      'Save Note',
    ),
    createElement(
      'button',
      {
        type: 'button',
        className: 'note-editor-button',
        onClick: onEditCancel,
      },
      'Cancel',
    ),
  );
}
