import { configureStore, createSelector } from '@reduxjs/toolkit';
import { getIndexedLayers } from './layers';
import { layerSlice } from './layers-slice';
import { getPropertiesForAllNotes } from './note-selection';

const store = configureStore({
  reducer: {
    layerState: layerSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const noteStateSelector = createSelector(
  (state: RootState) => state.layerState,
  (noteSelectionState) => {
    const indexedLayers = getIndexedLayers(noteSelectionState);
    return {
      ...noteSelectionState,
      layers: indexedLayers,
      notes: getPropertiesForAllNotes(noteSelectionState),
    };
  }
);
