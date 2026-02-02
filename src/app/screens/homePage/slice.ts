import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/data/types/screen";


const initialState: HomePageState = {
    P: [],
    NewProducts: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setP: (state, action) => {
            state.P = action.payload;
        },

        setNewProducts: (state, action) => {
            state.NewProducts = action.payload;
        },

        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

export const { setP, setNewProducts, setTopUsers } = homePageSlice.actions;


const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;

