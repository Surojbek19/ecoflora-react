import React from "react";
import { createSelector } from "reselect";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";

import { retrievePausedOrders } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { useSelector } from "react-redux";
import { T } from "../../../lib/data/types/common";
import { Messages, serverApi } from "../../../lib/data/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/data/types/order";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/data/sweetAlert";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import { Product } from "../../../lib/data/types/product";

/** REDUX SLICE & SELECTOR **/
const pausedOrdersRetriever = createSelector(retrievePausedOrders, (pausedOrders) => ({ pausedOrders }));

interface PausedOrdersProps {
    setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
    const { setValue } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    /** HANDLER **/
    const deleteOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);

            const orderId = e.target.value;
            const input: OrderUpdateInput = { orderId: orderId, orderStatus: OrderStatus.DELETE };

            const confirmation = window.confirm("Do you want to delete the order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);

                // ORDER REBUILT
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const processOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);

            // PAYMENT PROCESS
            const orderId = e.target.value;
            const input: OrderUpdateInput = { orderId: orderId, orderStatus: OrderStatus.PROCESS };

            const confirmation = window.confirm("Do you want to proceed with payment?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);

                // processOrders tab
                setValue("2");

                // ORDER REBUILT
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"1"}>
            <Box className="tab-panel">
                <Stack className="orders-frame">
                    {pausedOrders?.map((order: Order) => {
                        // product lookup by id (uses naming from your code: order.productData)
                        const productMap = new Map<string, Product>(
                            (order.productData || []).map((p: Product) => [p._id, p])
                        );

                        const productsPrice = order.orderTotal - order.orderDelivery;

                        return (
                            <Box key={order._id} className="order-card">
                                {/* items */}
                                <Box className="order-items">
                                    {order?.orderItems?.map((item: OrderItem) => {
                                        const product = productMap.get(item.productId);

                                        // if product info missing for an item, skip rendering that row safely
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
                                                        <Box className="product-name">{product.productName}</Box>
                                                        <Box className="product-note">Paused</Box>
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
                                    <Box className="total-line">
                                        <span>Products</span>
                                        <b>${productsPrice}</b>
                                    </Box>
                                    <Box className="total-line">
                                        <span>Delivery</span>
                                        <b>${order.orderDelivery}</b>
                                    </Box>

                                    <Box className="grand-total">
                                        <span>Total</span>
                                        <b>${order.orderTotal}</b>
                                    </Box>

                                    <Box className="order-actions">
                                        <Button
                                            value={order._id}
                                            onClick={deleteOrderHandler}
                                            variant="outlined"
                                            className="btn-outline"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            value={order._id}
                                            onClick={processOrderHandler}
                                            variant="contained"
                                            className="btn-primary"
                                        >
                                            Payment
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}

                    {(!pausedOrders || pausedOrders.length === 0) && (
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <img src="/icons/noimage-list.svg" style={{ width: 300, height: 300 }} alt="empty" />
                        </Box>
                    )}
                </Stack>
            </Box>
        </TabPanel>
    );
}
