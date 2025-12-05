import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Role } from "."

export interface AuthState {
  role: Role
}

const initialState: AuthState = {
  // TODO: Make this with some secret entry...
  role: "admin",
}

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload
    },
  },
})
