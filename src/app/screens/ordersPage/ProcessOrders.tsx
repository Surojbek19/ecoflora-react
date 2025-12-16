import react from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector"
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/data/config";
import { Order, OrderItem } from "../../../lib/data/types/order";

/** REDUX SLICE & SELECTOR **/
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({processOrders}) 
);



export default function ProcessOrders() {
    const { processOrders } = useSelector(processOrdersRetriever)
    return( 
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order: Order) => {
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

                                <Box>
                                    <p>
                                        {moment().format("YY-MM-DD HH:mm")}
                                    </p>
                                </Box>
                                <Button 
                                variant="contained" 
                                sx={{backgroundColor: "#3987CB", color: "#ffffff"}}
                                className={"pay-button"}>
                                    VERIFY TO FULFIL
                                </Button>
                            </Box>
                        </Box>
                    )
                })}

                {!processOrders || (processOrders.length === 0 && (
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