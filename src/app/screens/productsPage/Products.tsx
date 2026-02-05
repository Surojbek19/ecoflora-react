import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Stack, Button } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { CartItem } from "../../../lib/data/types/search";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/data/types/product";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import { useHistory } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/data/config";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
    products,
}));

interface ProductsProps {
    onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);

    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page: 1,
        limit: 6,
        order: "createdAt",
        productCollection: ProductCollection.INDOOR,
        search: "",
    });

    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    const [activeCategory, setActiveCategory] =
        useState<ProductCollection>(ProductCollection.INDOOR);

    useEffect(() => {
        const product = new ProductService();
        product
            .getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch(console.log);
    }, [productSearch]);

    useEffect(() => {
        if (searchText === "") {
            productSearch.search = "";
            setProductSearch({ ...productSearch });
        }
    }, [searchText]);

    /** HANDLERS **/
    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({ ...productSearch });
    };

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch });
    };

    const searchProductHandler = () => {
        productSearch.page = 1;
        productSearch.search = searchText;
        setProductSearch({ ...productSearch });
    };

    const paginationHandler = (_: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
    };

    const chooseDishHnadler = (id: string) => {
        history.push(`/products/${id}`);
    };

    return (
        <div className="products-page">
            <Container>

                {/* TOP BAR */}
                <div className="products-topbar">
                    <div className="products-title">Products</div>

                    <div className="products-tools">
                        <div className="products-search">
                            <SearchIcon className="search-ic" />
                            <input
                                className="search-input"
                                placeholder="Search by name..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && searchProductHandler()}
                            />
                            <button className="search-btn" onClick={searchProductHandler}>
                                Search
                            </button>
                        </div>

                        <select
                            className="sort-select"
                            value={productSearch.order}
                            onChange={(e) => searchOrderHandler(e.target.value)}
                        >
                            <option value="createdAt">Sort: New</option>
                            <option value="productPrice">Sort: Price</option>
                            <option value="productViews">Sort: View</option>
                        </select>
                    </div>
                </div>

                {/* LAYOUT */}
                <div className="products-layout">

                    {/* LEFT CATEGORY */}
                    <div className="products-categories">
                        {[
                            ProductCollection.INDOOR,
                            ProductCollection.OUTDOOR,
                            ProductCollection.FLOWER,
                            ProductCollection.POT,
                            ProductCollection.OTHER,
                        ].map((cat) => (
                            <Button
                                key={cat}
                                variant="contained"
                                className="cat-mui-btn"
                                color={activeCategory === cat ? "primary" : "secondary"}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    searchCollectionHandler(cat);
                                }}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* RIGHT SIDE (ONLY ADDITION) */}
                    <div className="products-right">

                        {products.length > 0 ? (
                            <div className="products-grid">
                                {products.map((product: Product) => {
                                    const imagePath =
                                        product.productImages?.length > 0
                                            ? `${serverApi}/${product.productImages[0]}`
                                            : "/img/default-product.JPG";

                                    return (
                                        <div
                                            className="plant-card"
                                            key={product._id}
                                            onClick={() => chooseDishHnadler(product._id)}
                                        >
                                            <div className="plant-image-frame">
                                                <img
                                                    className="plant-image"
                                                    src={imagePath}
                                                    alt={product.productName}
                                                />

                                                <button
                                                    className="basket-fab"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onAdd({
                                                            _id: product._id,
                                                            quantity: 1,
                                                            name: product.productName,
                                                            price: product.productPrice,
                                                            image: imagePath,
                                                        });
                                                    }}
                                                >
                                                    <ShoppingBasketOutlinedIcon />
                                                </button>
                                            </div>

                                            <div className="plant-meta">
                                                <div>{product.productCollection}</div>
                                                <div className="plant-views">
                                                    <RemoveRedEyeIcon />
                                                    {product.productViews}
                                                </div>
                                            </div>

                                            <div className="product-text">{product.productName}</div>
                                            <div className="product-text">
                                                Price: ${product.productPrice}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="products-empty">
                                No Product Available
                            </div>
                        )}

                    </div>
                </div>

                {/* PAGINATION */}
                <Stack className="pagination-section">
                    <Pagination
                        count={
                            products.length !== 0
                                ? productSearch.page + 1
                                : productSearch.page
                        }
                        page={productSearch.page}
                        onChange={paginationHandler}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                sx={{
                                    "&.Mui-selected": {
                                        backgroundColor: "#204D19",
                                        color: "#fff",
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>

            </Container>
        </div>
    );
}
