import react from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";

export default function PausedOrders() {
    return (
        <TabPanel value={"1"}>
            <Box className="tab-panel">
                <Stack className="orders-frame">
                    {[1, 2].map((ele, index) => {
                        return (
                            <Box key={index} className="order-card">
                                {/* items */}
                                <Box className="order-items">
                                    {[1, 2, 3].map((ele2, index2) => {
                                        return (
                                            <Box key={index2} className="order-item-row">
                                                <Box className="item-left">
                                                    <img
                                                        src={"/img/lavash.webp"}
                                                        className="order-product-img"
                                                        alt="product"
                                                    />
                                                    <Box className="item-text">
                                                        <Box className="product-name">Lavash</Box>
                                                        <Box className="product-note">Fresh & crispy wrap</Box>
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

                                {/* footer */}
                                <Box className="order-footer">
                                    <Box className="total-line">
                                        <span>Products</span>
                                        <b>$18</b>
                                    </Box>
                                    <Box className="total-line">
                                        <span>Delivery</span>
                                        <b>$2</b>
                                    </Box>

                                    <Box className="grand-total">
                                        <span>Total</span>
                                        <b>$24</b>
                                    </Box>

                                    <Box className="order-actions">
                                        <Button variant="outlined" className="btn-outline">
                                            Cancel
                                        </Button>

                                        <Button variant="contained" className="btn-primary">
                                            Payment
                                        </Button>
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
