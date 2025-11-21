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
      const id = action.payload

      const itemToMove = state.items.find(i => i.id === id)
      if (!itemToMove) return

      const newPosition = itemToMove.position - 1

      const otherItems = state.items.filter(i => i.position === newPosition)

      for (const item of otherItems) {
        item.position = itemToMove.position
      }

      itemToMove.position = newPosition

      state.items.sort((a, b) => a.position - b.position)
    },

    moveDown: (state, action: PayloadAction<number>) => {
      const id = action.payload

      const itemToMove = state.items.find(i => i.id === id)
      if (!itemToMove) return

      const newPosition = itemToMove.position + 1

      const otherItems = state.items.filter(i => i.position === newPosition)

      for (const item of otherItems) {
        item.position = itemToMove.position
      }

      itemToMove.position = newPosition

      state.items.sort((a, b) => a.position - b.position)
    },

    setItems: (state, action: PayloadAction<PositionItem[]>) => {
      state.items = action.payload
    },

    changeState: (state, action: PayloadAction<ApiState>) => {
      state.state = action.payload
    },
  },
})
