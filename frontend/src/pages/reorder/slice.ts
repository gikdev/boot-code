import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PositionItem } from "./positioned-card"

type ApiState = "full" | "empty" | "error" | "pending"

interface ReorderItemsState {
  items: PositionItem[]
  state: ApiState
}

const initialState: ReorderItemsState = {
  state: "pending",
  items: [],
}

export const reorderItemsSlice = createSlice({
  name: "Reorder Items",
  initialState,
  reducers: {
    moveUp: (state, action: PayloadAction<number>) => {
      moveBlock(state, action.payload, -1)
    },

    moveDown: (state, action: PayloadAction<number>) => {
      moveBlock(state, action.payload, 1)
    },

    setItems: (state, action: PayloadAction<PositionItem[]>) => {
      state.items = action.payload
    },

    changeState: (state, action: PayloadAction<ApiState>) => {
      state.state = action.payload
    },
  },
})

function moveBlock(state: ReorderItemsState, id: number, delta: 1 | -1) {
  const block = state.items.find(i => i.id === id)
  if (!block) return

  const newPosition = block.position + delta
  const other = state.items.find(i => i.position === newPosition)
  if (other) other.position = block.position
  block.position = newPosition

  state.items.sort((a, b) => a.position - b.position)
}
