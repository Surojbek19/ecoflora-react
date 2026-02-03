import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/data/types/screen";
import { Store } from "@mui/icons-material";

const initialState: ProductsPageState = {
    store: null,
    chosenProduct: null,
    products: [],
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setStore: (state, action) => {
            state.store = action.payload
        },

        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload
        },

        setProducts: (state, action) => {
            state.products = action.payload
        },

    }
});

export const { setStore, setChosenProduct, setProducts } = productsPageSlice.actions;
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;