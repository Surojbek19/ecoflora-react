import React from "react";
import { Box, Container } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function PopularProducts() {
    const cards = [
        { id: 1, views: 1240, price: "$12.50" },
        { id: 2, views: 980, price: "$20.00" },
        { id: 3, views: 1450, price: "$12.00" },
        { id: 4, views: 760, price: "$18.00" },
    ];

    return (
        <Box className="popular-products-frame">
            <Container>
                <Box className="popular-products-header">
                    <Box className="popular-products-title">Popular Products</Box>
                    <Box className="popular-products-subtitle">
                        Most viewed plants right now
                    </Box>
                </Box>

                <Box className="popular-products-grid">
                    {cards.map((c) => (
                        <Box key={c.id} className="popular-product-card">
                            <Box className="popular-product-imgWrap">
                                {/* image name has space, keep it EXACT */}
                                <img
                                    className="popular-product-img"
                                    src="/img/default-product.JPG"
                                    alt="default product"
                                />
                            </Box>

                            <Box className="popular-product-meta">
                                <span className="popular-product-type">Indoor Plant</span>

                                <span className="popular-product-views">
                                    <VisibilityOutlinedIcon className="popular-product-eye" />
                                    {c.views}
                                </span>
                            </Box>

                            <Box className="popular-product-name">Plant</Box>
                            <Box className="popular-product-price">{c.price}</Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
