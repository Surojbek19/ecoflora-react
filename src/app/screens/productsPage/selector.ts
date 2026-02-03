import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";
import ProductsPage from ".";

const selectProductsPage = (state: AppRootState) => state.productsPage;
export const retrieveStore = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.store
);

export const retrieveChosenProduct = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.products
);