import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface CartState {
    items: Product[];
}

const initialState: CartState = {
    items: []
};

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            if (!state.items.some(item => item.id === action.payload.id)) {
                state.items.push(action.payload);
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { add, remove, clearCart } = CartSlice.actions;
export default CartSlice.reducer;