import React from "react";
import { Box, Container } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/data/types/product";

const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (NewProducts) => ({ NewProducts })
);

/** Temporary hardcoded cards (until backend ready) */
const FALLBACK_PRODUCTS: Product[] = [
  { _id: "f1", productPrice: 12.5 } as Product,
  { _id: "f2", productPrice: 20.0 } as Product,
  { _id: "f3", productPrice: 12.0 } as Product,
  { _id: "f4", productPrice: 18.0 } as Product,
];

export default function NewProducts() {
  const { NewProducts } = useSelector(newProductsRetriever);

  const productsToShow: Product[] =
    NewProducts && NewProducts.length > 0
      ? NewProducts.slice(0, 4)
      : FALLBACK_PRODUCTS;

  return (
    <Box className="new-products-frame-ui">
      <Container>
        <Box className="new-products-header">
          <Box className="new-products-title">New Products</Box>
          <Box className="new-products-subtitle">Fresh arrivals this week</Box>
        </Box>

        {productsToShow.length > 0 ? (
          <Box className="new-products-grid">
            {productsToShow.map((product: Product) => (
              <Box key={product._id} className="new-product-card">
                <Box className="new-product-imgWrap">
                  <Box className="new-pill">NEW</Box>

                  <img
                    className="new-product-img"
                    src="/img/monsteria.jpg"
                    alt="monsteria"
                  />
                </Box>

                <Box className="new-product-type">Indoor Plant</Box>

                <Box className="new-product-name">Monsteria</Box>

                <Box className="new-product-price">
                  ${Number(product.productPrice ?? 0).toFixed(2)}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box className="new-products-empty">
            New products are not available!
          </Box>
        )}
      </Container>
    </Box>
  );
}
