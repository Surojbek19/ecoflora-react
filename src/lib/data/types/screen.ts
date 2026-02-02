import { Product } from "./product";
import { Member } from "./member";
import { Order } from "./order";

//screen components based type integrations
/** RAECT APP STATE **/
export interface AppRootState {
    homePage: HomePageState; // homePage screen component
    productsPage: ProductsPageState;  // productsPage screen component
    ordersPage: OrdersPageState; // ordersPage screen component
}

/** HOME PAGE **/
export interface HomePageState {
    P: Product[];
    NewProducts: Product[];
    topUsers: Member[]
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}

/** ORDERS PAGE **/
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}