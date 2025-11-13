import { combineReducers, configureStore } from "@reduxjs/toolkit"
import type { PropsWithChildren } from "react"
import { Provider, useDispatch, useSelector, useStore } from "react-redux"
import { authSlice } from "#/auth/slice"

// import { writingAreaSlice } from "#/routes/_app/lessons/$id/write/-writing-area/store"

const rootReducer = combineReducers({
  // writingArea: writingAreaSlice.reducer,
  auth: authSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export const AppStoreProvider = (p: PropsWithChildren) => (
  <Provider store={store}>{p.children}</Provider>
)

export type AppStore = typeof store
export const useAppStore = useStore.withTypes<AppStore>()

export type AppState = ReturnType<typeof rootReducer>
export const useAppSelector = useSelector.withTypes<AppState>()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
