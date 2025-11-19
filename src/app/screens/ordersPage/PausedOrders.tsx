import react from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";



export default function PausedOrders() {
    return( 
        <TabPanel value={"1"}>
            <Stack className="orders-frame">
                {[1, 2].map((ele, index) => {
                    return (
                        <Box key={index} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {[1, 2, 3 ].map((ele2, index2) => {
                                    return (
                                        <Stack key={index2} className={"orders-name-price"}>
                                            <Box className={"product-name"}>
                                                <img 
                                                    src={"/img/lavash.webp"}
                                                    className={"order-dish-img"}
                                                    style={{width:"50px", height:"47px", borderRadius:"50%"}}
                                                />
                                                <p className="title-dish"><b>Lavash</b></p>
                                            </Box>
                                            <Box className={"price-box"}>
                                                <p>&nbsp; $9 &nbsp; X &nbsp; $2  &nbsp; = &nbsp; <b>$24</b> </p>
                                            </Box>
                                        </Stack>
                                    )
                                })}
                            </Box>
                            
                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>&nbsp; Product price &nbsp; $18 &nbsp; + &nbsp; Delivery cost &nbsp; $2  &nbsp; = &nbsp;Total &nbsp;<b>$24</b> </p>
                                </Box>
                                <Button
                                variant="contained"
                                color="secondary"
                                className={"cancel-buttom"}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                variant="contained" 
                                sx={{backgroundColor: "#70B55C", color: "#ffffff"}}
                                className={"pay-button"}>
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    )
                })}

                {false && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img src="/icons/noimage-list.svg"
                        style={{width: 300, height: 300}}
                        />
                    </Box>
                )}
            </Stack>
        </TabPanel>
    )
}