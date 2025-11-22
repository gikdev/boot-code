import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"
import z from "zod"
import { store } from "#/store"
import { type Block, type BlockInput, BlockSchema } from "./blocks/schemas"

const WriteLessonStateV1Schema = z.object({
  blocks: z.array(BlockSchema),
  version: z.literal(1),
})
const WriteLessonStateSchema = z.discriminatedUnion("version", [
  WriteLessonStateV1Schema,
])
type WriteLessonState = z.infer<typeof WriteLessonStateSchema>

const initialState: WriteLessonState = {
  blocks: [],
  version: 1,
}

export const writeLessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<BlockInput>) => {
      const position = state.blocks.length + 1

      state.blocks.push({
        ...action.payload,
        position,
        id: uuid(),
        baseVersion: 1,
        version: 1,
      })
    },

    removeBlock: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload

      state.blocks = state.blocks.filter(b => b.id !== idToRemove)

      for (const [i, block] of state.blocks.entries()) {
        block.position = i + 1
      }
    },

    moveUp: (state, action: PayloadAction<string>) => {
      moveBlock(state, action.payload, -1)
    },

    moveDown: (state, action: PayloadAction<string>) => {
      moveBlock(state, action.payload, 1)
    },

    updateBlock: (state, action: PayloadAction<Block>) => {
      const updatedBlock = action.payload

      const index = state.blocks.findIndex(b => b.id === updatedBlock.id)

      if (index === -1) {
        console.warn(`Block with id ${updatedBlock.id} not found`)
        return
      }

      state.blocks[index] = updatedBlock
    },

    decode: (_state, action: PayloadAction<WriteLessonState>) => {
      return action.payload
    },
  },
})

export const getEncodedLessonContent = () =>
  JSON.stringify(store.getState().writeLesson)

function moveBlock(state: WriteLessonState, id: string, delta: 1 | -1) {
  const block = state.blocks.find(b => b.id === id)
  if (!block) return

  const newPosition = block.position + delta
  const other = state.blocks.find(b => b.position === newPosition)
  if (other) other.position = block.position
  block.position = newPosition

  state.blocks.sort((a, b) => a.position - b.position)
}
