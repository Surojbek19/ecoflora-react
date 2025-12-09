import { Member } from "./member";
import { Product } from "./product";

//screen components based type integrations
/** RAECT APP STATE **/
export interface AppRootState {
    homePage: HomePageState; // homePage screen component
    productsPage: ProductsPageState;  // productsPage screen component
    // ordersPage: OrdersPAgeState; // ordersPage screen component
}

/** HOME PAGE **/
export interface HomePageState {
 popularDishes: Product[];
 newDishes: Product[];
 topUsers: Member[]   
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}

/** ORDERS PAGE **/