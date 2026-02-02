import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrieveP = createSelector(
    selectHomePage,
    (HomePage) => HomePage.P
);

export const retrieveNewProducts = createSelector(
    selectHomePage,
    (HomePage) => HomePage.NewProducts
);

export const retrieveTopUsers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topUsers
);