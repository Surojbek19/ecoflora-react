import react from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";
import moment from "moment";



export default function ProcessOrders() {
    return( 
        <TabPanel value={"2"}>
            <Stack>
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