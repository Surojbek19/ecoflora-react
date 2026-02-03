import React from "react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/data/config";

const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({ newProducts })
);

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);

  console.log("newProducts:", newProducts);

  return (
    <Box className="new-products-frame-ui">
      <Container>
        <Box className="new-products-header">
          <Box className="new-products-title">New Products</Box>
          <Box className="new-products-subtitle">
            Fresh arrivals this week
          </Box>
        </Box>

        {newProducts.length > 0 ? (
          <Box className="new-products-grid">
            {newProducts.map((product: Product) => {
              const imagePath =
                product.productImages?.length > 0
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/img/default-product.JPG";

              return (
                <Box key={product._id} className="new-product-card">
                  <Box className="new-product-imgWrap">
                    <Box className="new-pill">NEW</Box>

                    <img
                      className="new-product-img"
                      src={imagePath}
                      alt={product.productName ?? "product"}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/img/default-product.JPG";
                      }}
                    />
                  </Box>

                  <Box className="new-product-type">
                    {product.productCollection}
                  </Box>

                  <Box className="new-product-name product-text">
                    {product.productName}
                  </Box>

                  <Box className="new-product-price product-text">
                    Price: ${product.productPrice}
                  </Box>
                </Box>
              );
            })}
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
