import React from "react";
import { createSelector } from "reselect";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";
import moment from "moment";

import { retrieveProcessOrders } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { useSelector } from "react-redux";
import { T } from "../../../lib/data/types/common";
import { Messages, serverApi } from "../../../lib/data/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/data/types/order";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/data/sweetAlert";
import { Product } from "../../../lib/data/types/product";

/** REDUX SLICE & SELECTOR **/
const processOrdersRetriever = createSelector(retrieveProcessOrders, (processOrders) => ({ processOrders }));

interface ProcessOrdersProps {
    setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
    const { setValue } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const { processOrders } = useSelector(processOrdersRetriever);

    /** HANDLER **/
    const finishOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);

            const orderId = e.target.value;
            const input: OrderUpdateInput = { orderId: orderId, orderStatus: OrderStatus.FINISH };

            const confirmation = window.confirm("Have you received your order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);

                // move to Finished tab
                setValue("3");

                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"2"}>
            <Box className="tab-panel">
                <Stack className="orders-frame">
                    {processOrders?.map((order: Order) => {
                        // uses same naming as your paused code: order.productData + order.orderItems
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
                                                        <Box className="product-name">{product.productName}</Box>
                                                        <Box className="product-note">Preparing with care</Box>
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
                                        <Box className="order-time">
                                            {order.createdAt ? moment(order.createdAt).format("YY-MM-DD HH:mm") : ""}
                                        </Box>
                                        <Box className="order-badge">Processing</Box>
                                    </Box>

                                    <Box className="grand-total">
                                        <span>Total</span>
                                        <b>${order.orderTotal}</b>
                                    </Box>

                                    <Box className="order-actions">
                                        <Button
                                            value={order._id}
                                            onClick={finishOrderHandler}
                                            variant="contained"
                                            className="btn-success"
                                        >
                                            VERIFY TO FULFIL
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}

                    {(!processOrders || processOrders.length === 0) && (
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <img src="/icons/noimage-list.svg" style={{ width: 300, height: 300 }} alt="empty" />
                        </Box>
                    )}
                </Stack>
            </Box>
        </TabPanel>
    );
}
