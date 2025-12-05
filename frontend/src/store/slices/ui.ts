import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type OpenOrClosedState = "opened" | "closed"

interface UiState {
  fab: OpenOrClosedState
}

const initialState: UiState = {
  fab: "closed",
}

export const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    changeFab: (state, action: PayloadAction<OpenOrClosedState>) => {
      state.fab = action.payload
    },
  },
})
