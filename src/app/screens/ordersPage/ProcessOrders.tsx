import react from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import "../../../css/order.css";
import moment from "moment";

export default function ProcessOrders() {
    return (
        <TabPanel value={"2"}>
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
                                                        alt="dish"
                                                    />
                                                    <Box className="item-text">
                                                        <Box className="dish-name">Lavash</Box>
                                                        <Box className="dish-note">Preparing with care</Box>
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
                                        <Box className="order-time">{moment().format("YY-MM-DD HH:mm")}</Box>
                                        <Box className="order-badge">Processing</Box>
                                    </Box>

                                    <Box className="grand-total">
                                        <span>Total</span>
                                        <b>$24</b>
                                    </Box>

                                    <Box className="order-actions">
                                        <Button variant="contained" className="btn-success">
                                            VERIFY TO FULFIL
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
