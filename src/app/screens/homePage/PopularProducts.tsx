import React from "react";
import { Box, Container } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePopularProducts } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/data/config";
import { Product } from "../../../lib/data/types/product";

const popularProductsRetriever = createSelector(
    retrievePopularProducts,
    (popularProducts) => ({ popularProducts })
);

export default function PopularProducts() {
    const { popularProducts } = useSelector(popularProductsRetriever);

    console.log("popularProducts:", popularProducts);

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
                    {popularProducts.length !== 0 ? (
                        popularProducts.map((ele: Product) => {
                            const imagePath =
                                ele.productImages?.length > 0
                                    ? `${serverApi}/${ele.productImages[0]}`
                                    : "/img/default-product.JPG";

                            return (
                                <Box key={ele._id} className="popular-product-card">
                                    <Box className="popular-product-imgWrap">
                                        <img
                                            className="popular-product-img"
                                            src={imagePath}
                                            alt={ele.productName ?? "product"}
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src =
                                                    "/img/default-product.JPG";
                                            }}
                                        />
                                    </Box>

                                    <Box className="popular-product-meta">
                                        <span className="popular-product-type">
                                            {ele.productCollection ?? "Indoor Plant"}
                                        </span>

                                        <span className="popular-product-views">
                                            <VisibilityOutlinedIcon className="popular-product-eye" />
                                            {ele.productViews}
                                        </span>
                                    </Box>

                                    <Box className="popular-product-name">
                                        {ele.productName ?? "Plant"}
                                    </Box>
                                    <Box className="popular-product-price">
                                        Price: ${ele.productPrice}
                                    </Box>
                                </Box>
                            );
                        })
                    ) : (
                        <Box className="no-data">Popular Products are not available!</Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
