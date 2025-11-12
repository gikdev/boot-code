import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WritingAreaState {
  pieces: string | null
  isOpen: {
    fabMenu: boolean
    newTextDialog: boolean
  }
}

const initialState: WritingAreaState = {
  pieces: null,
  isOpen: {
    fabMenu: false,
    newTextDialog: false,
  },
}

export const writingAreaSlice = createSlice({
  name: "Writing Area",
  initialState,
  reducers: {
    toggleFabMenu: state => {
      state.isOpen.fabMenu = !state.isOpen.fabMenu
    },

    openNewTextDialog: state => {
      state.isOpen.newTextDialog = true
    },
    closeNewTextDialog: state => {
      state.isOpen.newTextDialog = false
    },

    setPieces: (state, action: PayloadAction<string | null>) => {
      state.pieces = action.payload
    },

    // addText: (state, action: PayloadAction<string>) => {
    //   state.pieces.push({
    //     id: state.pieces.length,
    //     payload: JSON.stringify({ content: action.payload }),
    //     position: state.pieces.length + 1,
    //     status: "Created",
    //     type: "Text",
    //   })
    // },

    // moveUp: (state, action: PayloadAction<number>) => {
    //   const currentIndex = state.pieces.findIndex(p => p.id === action.payload)
    //   const previousIndex = currentIndex - 1

    //   // Check if the current piece exists
    //   const pieceExists = currentIndex >= 0
    //   // Check if there is a piece above to swap with
    //   const hasPreviousPiece = previousIndex >= 0

    //   if (pieceExists && hasPreviousPiece) {
    //     const currentPiece = state.pieces[currentIndex]
    //     const previousPiece = state.pieces[previousIndex]

    //     const tempPosition = previousPiece.position
    //     previousPiece.position = currentPiece.position
    //     currentPiece.position = tempPosition

    //     state.pieces.sort((a, b) => a.position - b.position)
    //   }

    //   return
    // },

    // moveDown: (state, action: PayloadAction<number>) => {
    //   const currentIndex = state.pieces.findIndex(p => p.id === action.payload)
    //   const nextIndex = currentIndex + 1

    //   // Check if the current piece exists in the array
    //   const pieceExists = currentIndex >= 0
    //   // Check if there is a piece below to swap with
    //   const hasNextPiece = nextIndex < state.pieces.length

    //   if (pieceExists && hasNextPiece) {
    //     const currentPiece = state.pieces[currentIndex]
    //     const nextPiece = state.pieces[nextIndex]

    //     const tempPosition = nextPiece.position
    //     nextPiece.position = currentPiece.position
    //     currentPiece.position = tempPosition

    //     state.pieces.sort((a, b) => a.position - b.position)
    //   }

    //   return
    // },

    // remove: (state, action: PayloadAction<number>) => {
    //   const idx = state.pieces.findIndex(p => p.id === action.payload)
    //   if (idx === -1) return // Not found — do nothing

    //   const piece = state.pieces[idx]

    //   switch (piece.status) {
    //     case "Untouched": {
    //       piece.status = "Deleted"
    //       break
    //     }

    //     case "Edited": {
    //       piece.status = "Deleted"
    //       break
    //     }

    //     case "Created": {
    //       state.pieces.splice(idx, 1)
    //       break
    //     }

    //     case "Deleted":
    //     default:
    //       break
    //   }
    // },
  },
})
