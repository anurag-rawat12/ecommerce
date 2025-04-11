import { configureStore } from '@reduxjs/toolkit'
import { CartSlice } from './Slices/CartSlice'

const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
