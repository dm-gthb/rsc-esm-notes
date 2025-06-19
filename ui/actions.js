'use server';

import { updateNote } from '../notes-data.js';

export async function saveNote(_previousState, formData) {
  try {
    const id = formData.get('noteId');
    const title = formData.get('title');
    const text = formData.get('text');
    const updatedNote = await updateNote(id, { title, text });
    return updatedNote;
  } catch (error) {
    console.error('Error updating note:', error);
    throw new Error('Failed to update note');
  }
}
