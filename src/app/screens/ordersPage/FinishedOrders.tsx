import react from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";

export default function FinishedOrders() {
    return (
        <TabPanel value={"3"}>
            <Box className="tab-panel">
                <Stack className="orders-frame">
                    {[1, 2].map((ele, index) => {
                        return (
                            <Box key={index} className="order-card">
                                <Box className="order-items">
                                    {[1, 2, 3].map((ele2, index2) => {
                                        return (
                                            <Box key={index2} className="order-item-row">
                                                <Box className="item-left">
                                                    <img
                                                        src={"/img/lavash.webp"}
                                                        className="order-dish-img"
                                                        alt="product"
                                                    />
                                                    <Box className="item-text">
                                                        <Box className="product-name">Lavash</Box>
                                                        <Box className="product-note">Delivered successfully</Box>
                                                    </Box>
                                                </Box>

                                                <Box className="item-right">
                                                    <Box className="mini-math">
                                                        $9 <span>×</span> 2
                                                    </Box>
                                                    <Box className="mini-total">$24</Box>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>

                                <Box className="order-footer">
                                    <Box className="order-meta">
                                        <Box className="order-badge done">Finished</Box>
                                        <Box className="hint-text">Thank you for shopping EcoFlora 🌿</Box>
                                    </Box>

                                    <Box className="grand-total">
                                        <span>Total</span>
                                        <b>$24</b>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}

                    {false && (
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <img src="/icons/noimage-list.svg" style={{ width: 300, height: 300 }} />
                        </Box>
                    )}
                </Stack>
            </Box>
        </TabPanel>
    );
}
