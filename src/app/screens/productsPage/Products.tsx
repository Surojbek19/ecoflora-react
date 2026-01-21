import React from "react";
import { Box, Container, Stack } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { CartItem } from "../../../lib/data/types/search";

interface ProductsProps {
    onAdd: (item: CartItem) => void;
}

type Category = "Indoor" | "Outdoor" | "Flower" | "Pots" | "Others";

type ProductUI = {
    _id: string;
    productName: string;
    productPrice: number;
    productViews: number;
    category: Category;
};

const HARD_PRODUCTS: ProductUI[] = [
    { _id: "p1", productName: "Plant", productPrice: 12.5, productViews: 1240, category: "Indoor" },
    { _id: "p2", productName: "Plant", productPrice: 20.0, productViews: 980, category: "Indoor" },
    { _id: "p3", productName: "Plant", productPrice: 12.0, productViews: 1450, category: "Indoor" },

    { _id: "p4", productName: "Plant", productPrice: 18.0, productViews: 880, category: "Outdoor" },
    { _id: "p5", productName: "Plant", productPrice: 9.99, productViews: 620, category: "Outdoor" },
    { _id: "p6", productName: "Plant", productPrice: 14.0, productViews: 1100, category: "Outdoor" },

    { _id: "p7", productName: "Plant", productPrice: 22.0, productViews: 500, category: "Flower" },
    { _id: "p8", productName: "Plant", productPrice: 16.5, productViews: 760, category: "Pots" },
    { _id: "p9", productName: "Plant", productPrice: 11.0, productViews: 1320, category: "Others" },
];

const CATEGORIES: Category[] = ["Indoor", "Outdoor", "Flower", "Pots", "Others"];

export default function Products(props: ProductsProps) {
    const { onAdd } = props;

    return (
        <div className="products-page">
            <Container>
                {/* TOP BAR */}
                <div className="products-topbar">
                    <div className="products-title">Products</div>

                    <div className="products-tools">
                        <div className="products-search">
                            <SearchIcon className="search-ic" />
                            <input className="search-input" placeholder="Search by name..." />
                            <button className="search-btn" type="button">
                                Search
                            </button>
                        </div>

                        <select className="sort-select" defaultValue="new">
                            <option value="new">Sort: New</option>
                            <option value="price">Sort: Price</option>
                            <option value="view">Sort: View</option>
                        </select>
                    </div>
                </div>

                {/* LAYOUT */}
                <div className="products-layout">
                    {/* LEFT CATEGORY COLUMN (visual only) */}
                    <div className="products-categories">
                        {CATEGORIES.map((cat, idx) => (
                            <button
                                key={cat}
                                className={idx === 0 ? "cat-btn active" : "cat-btn"}
                                type="button"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* RIGHT GRID: ALWAYS 9 CARDS */}
                    <div className="products-grid">
                        {HARD_PRODUCTS.map((product) => (
                            <div className="plant-card" key={product._id}>
                                <div className="plant-image-frame">
                                    <img
                                        className="plant-image"
                                        src="/img/monsteria.jpg"
                                        alt={product.productName}
                                        draggable={false}
                                    />

                                    {/* hover-only basket */}
                                    <button
                                        className="basket-fab"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAdd({
                                                _id: product._id,
                                                quantity: 1,
                                                name: product.productName,
                                                price: product.productPrice,
                                                image: "monsteria.jpg",
                                            });
                                        }}
                                        aria-label="add to basket"
                                    >
                                        <ShoppingBasketOutlinedIcon />
                                    </button>
                                </div>

                                <div className="plant-meta">
                                    <div className="plant-category">{product.category} Plant</div>

                                    <div className="plant-views">
                                        <RemoveRedEyeIcon className="views-ic" />
                                        <span>{product.productViews}</span>
                                    </div>
                                </div>

                                <div className="plant-name">{product.productName}</div>
                                <div className="plant-price">${product.productPrice.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination (visual only) */}
                <div className="pagination-mock">
                    <button type="button" className="page-arrow">
                        ←
                    </button>
                    <button className="page-btn">1</button>
                    <button type="button" className="page-arrow">
                        →
                    </button>
                </div>
                <div>
                    <Container>
                        <Stack className="address-area">
                            <Box className="title">Our Address</Box>
                            <iframe
                                style={{ marginTop: "60px" }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12986.229087378231!2d129.26976!3d35.5399369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35662ded71ce0c67%3A0x4a646e34876ef49c!2sUniversity%20of%20Ulsan!5e0!3m2!1sen!2skr!4v1763354784175!5m2!1sen!2skr"

                                width="1320"
                                height="500"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                        </Stack>
                    </Container>
                </div>
            </Container>
        </div>
    );
}
