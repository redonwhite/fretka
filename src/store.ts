import { configureStore, createSelector } from '@reduxjs/toolkit';
import { basicNotes, NoteClassId } from './fretka/fretka';
import { noteSelectionSlice } from './fretka/note-selection';

const store = configureStore({
  reducer: {
    noteSelection: noteSelectionSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const noteSelectionSelector = createSelector(
  (state: RootState) => state.noteSelection,
  (noteSelectionState) => ({
    ...noteSelectionState,
    precomp: Object.keys(basicNotes),
  }),
);
