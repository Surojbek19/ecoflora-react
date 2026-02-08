import React from "react";
import { createSelector } from "reselect";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";

import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/data/types/order";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/data/config";

/** REDUX SLICE & SELECTOR **/
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriever);

    return (
        <TabPanel value={"3"}>
            <Box className="tab-panel">
                <Stack className="orders-frame">
                    {finishedOrders?.map((order: Order) => {
                        // same naming & pattern used everywhere else
                        const productMap = new Map<string, Product>(
                            (order.productData || []).map((p: Product) => [p._id, p])
                        );

                        return (
                            <Box key={order._id} className="order-card">
                                {/* items */}
                                <Box className="order-items">
                                    {order?.orderItems?.map((item: OrderItem) => {
                                        const product = productMap.get(item.productId);
                                        if (!product) return null;

                                        const imagePath =
                                            product.productImages?.length > 0
                                                ? `${serverApi}/${product.productImages[0]}`
                                                : "/img/default-product.JPG";

                                        const lineTotal = item.itemPrice * item.itemQuantity;

                                        return (
                                            <Box key={item._id} className="order-item-row">
                                                <Box className="item-left">
                                                    <img
                                                        src={imagePath}
                                                        className="order-product-img"
                                                        alt={product.productName}
                                                    />
                                                    <Box className="item-text">
                                                        <Box className="product-name">
                                                            {product.productName}
                                                        </Box>
                                                        <Box className="product-note">
                                                            Delivered successfully
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Box className="item-right">
                                                    <Box className="mini-math">
                                                        ${item.itemPrice} <span>×</span> {item.itemQuantity}
                                                    </Box>
                                                    <Box className="mini-total">${lineTotal}</Box>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>

                                {/* footer */}
                                <Box className="order-footer">
                                    <Box className="order-meta">
                                        <Box className="order-badge done">Finished</Box>
                                        <Box className="hint-text">
                                            Thank you for shopping EcoFlora 🌿
                                        </Box>
                                    </Box>

                                    <Box className="grand-total">
                                        <span>Total</span>
                                        <b>${order.orderTotal}</b>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}

                    {(!finishedOrders || finishedOrders.length === 0) && (
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <img
                                src="/icons/noimage-list.svg"
                                style={{ width: 300, height: 300 }}
                                alt="empty"
                            />
                        </Box>
                    )}
                </Stack>
            </Box>
        </TabPanel>
    );
}
