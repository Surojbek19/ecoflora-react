import { useState, SyntheticEvent } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Divider from "../../components/divider";
import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"orders-page"}>
      <Container className="order-container">
        {/* LEFT */}
        <Stack className="order-left">
          <Box className="order-left-card">
            <Box className="order-title">Orders</Box>
            <Box className="order-subtitle">Track and manage your purchases 🌿</Box>

            <TabContext value={value}>
              <Box className={"order-nav-frame"}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tab example"
                  className={"tabs-list"}
                >
                  <Tab label="Paused" value={"1"} className="tab-item" />
                  <Tab label="Processing" value={"2"} className="tab-item" />
                  <Tab label="Finished" value={"3"} className="tab-item" />
                </Tabs>
              </Box>

              <Divider height="1" width="100%" bg="#e6e6e6" />

              <Stack className="order-main-content">
                <PausedOrders />
                <ProcessOrders />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Box>
        </Stack>

        {/* RIGHT */}
        <Stack className="order-right">
          <Box className="order-right-card">
            <Stack className="user-info-box">
              <Box className={"user-pic"}>
                <img src="img/justin.webp" alt="user" />
              </Box>

              <Box className={"user-name"}>Justin</Box>
              <Box className={"user-status"}>USER</Box>

              <Divider height="1" width="100%" bg="#e6e6e6" />

              <Box className={"user-location"}>
                <LocationOnIcon />
                <Box className={"location"}>South Korea, Busan</Box>
              </Box>
            </Stack>

            <Box className="payment-card">
              <Box className="payment-title">Payment Details</Box>
              <Box className="payment-subtitle">Secure checkout info (demo)</Box>

              <Stack className="user-card-info">
                <Stack className="card-num">
                  <input type="text" placeholder="Card number: 1234 5678 9101 1234" />
                </Stack>

                <Stack className="card-date-info">
                  <Box className={"expire-date"}>
                    <input type="text" placeholder="07/24" />
                  </Box>
                  <Box className={"cvv-num"}>
                    <input type="text" placeholder="CVV: 010" />
                  </Box>
                </Stack>

                <Stack className="card-user-name">
                  <input type="text" placeholder="Justin Robertson" />
                </Stack>

                <Stack className="card-type">
                  <Box>
                    <img src="icons/western-card.svg" alt="western" />
                  </Box>
                  <Box>
                    <img src="icons/master-card.svg" alt="master" />
                  </Box>
                  <Box>
                    <img src="icons/paypal-card.svg" alt="paypal" />
                  </Box>
                  <Box>
                    <img src="icons/visa-card.svg" alt="visa" />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
