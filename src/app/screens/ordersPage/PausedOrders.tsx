import react from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector"
import { Product } from "../../../lib/data/types/product";
import { Messages, serverApi } from "../../../lib/data/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/data/types/order";
import { sweetErrorHandling } from "../../../lib/data/sweetAlert";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import { T } from "../../../lib/data/types/common";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

/** REDUX SLICE & SELECTOR **/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({pausedOrders}) 
);
interface PausedOrdersProps {
    setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
    const {setValue} = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const { pausedOrders } = useSelector(pausedOrdersRetriever)

    /** HANDLER **/
    const deleteOrderHandler = async (e: T) => {
        try{
            if(!authMember) throw new Error(Messages.error2);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {orderId: orderId, orderStatus: OrderStatus.DELETE};

            const confirmation = window.confirm("Do you want to delete the order?")
            if(confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);


                //ORDER REBUILT
                setOrderBuilder(new Date());
            }
        } catch(err) {
            console.log(err);
            sweetErrorHandling(err).then()
        }
    }

       const processOrderHandler = async (e: T) => {
        try{
            if(!authMember) throw new Error(Messages.error2);
            //PAYMENT PROCESS
            const orderId = e.target.value;
            const input: OrderUpdateInput = {orderId: orderId, orderStatus: OrderStatus.PROCESS};

            const confirmation = window.confirm("Do you want to proceed with payment?")
            if(confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                //processOrders => 
                setValue("2")

                setOrderBuilder(new Date());
            }
        } catch(err) {
            console.log(err);
            sweetErrorHandling(err).then()
        }
    }
    return( 
        <TabPanel value={"1"}>
            <Stack className="orders-frame">
                {pausedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((item: OrderItem) => {
                                    const product: Product = order.productData.filter(
                                        (ele: Product) => item.productId === ele._id
                                    ) [0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`
                                    return (
                                        <Stack key={item._id} className={"orders-name-price"}>
                                            <Box className={"product-name"}>
                                                <img 
                                                    src={imagePath}
                                                    className={"order-dish-img"}
                                                    style={{width:"50px", height:"47px", borderRadius:"50%"}}
                                                />
                                                <p className="title-dish"><b>{product.productName}</b></p>
                                            </Box>
                                            <Box className={"price-box"}>
                                                <p>&nbsp; ${item.itemPrice} &nbsp; X &nbsp; {item.itemQuantity}  &nbsp; = &nbsp; <b>${item.itemPrice * item.itemQuantity}</b> </p>
                                            </Box>
                                        </Stack>
                                    )
                                })}
                            </Box>
                            
                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>&nbsp; Product price &nbsp; ${order.orderTotal - order.orderDelivery} &nbsp; + &nbsp; Delivery cost &nbsp; ${order.orderDelivery}  &nbsp; = &nbsp;Total &nbsp;<b>${order.orderTotal}</b> </p>
                                </Box>
                                <Button
                                value={order._id}
                                variant="contained"
                                color="secondary"
                                className={"cancel-buttom"}
                                onClick={deleteOrderHandler}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                value={order._id}
                                variant="contained" 
                                sx={{backgroundColor: "#70B55C", color: "#ffffff"}}
                                className={"pay-button"}
                                onClick={processOrderHandler}
                                >
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    )
                })}

                {!pausedOrders || (pausedOrders.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img src="/icons/noimage-list.svg"
                        style={{width: 300, height: 300}}
                        />
                    </Box>
                ))}
            </Stack>
        </TabPanel>
    )
}