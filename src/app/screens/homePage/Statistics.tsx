import React from "react";
import { Box, Container, Stack } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

export default function Statistics() {
    return (
        <div className="benefits-frame">
            <Container>
                <Stack className="benefits" direction="row" justifyContent="space-between" alignItems="center">
                    <Stack className="benefit" direction="row" spacing={1.5} alignItems="center">
                        <LocalShippingOutlinedIcon className="benefit-icon" />
                        <Box>
                            <Box className="benefit-title">Free Delivery</Box>
                            <Box className="benefit-sub">Free shipping on all orders</Box>
                        </Box>
                    </Stack>

                    <Stack className="benefit" direction="row" spacing={1.5} alignItems="center">
                        <ReplayOutlinedIcon className="benefit-icon" />
                        <Box>
                            <Box className="benefit-title">Money Return</Box>
                            <Box className="benefit-sub">Back guarantee in 7 days</Box>
                        </Box>
                    </Stack>

                    <Stack className="benefit" direction="row" spacing={1.5} alignItems="center">
                        <DiscountOutlinedIcon className="benefit-icon" />
                        <Box>
                            <Box className="benefit-title">Member Discount</Box>
                            <Box className="benefit-sub">Orders over $130.00</Box>
                        </Box>
                    </Stack>

                    <Stack className="benefit" direction="row" spacing={1.5} alignItems="center">
                        <SupportAgentOutlinedIcon className="benefit-icon" />
                        <Box>
                            <Box className="benefit-title">Online Support</Box>
                            <Box className="benefit-sub">Support 24 hours a day</Box>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
