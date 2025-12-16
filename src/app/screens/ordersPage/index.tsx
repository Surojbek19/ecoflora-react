import { useState, SyntheticEvent, useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders"
import FinishedOrders from "./FinishedOrders";
import Divider from "../../components/divider";
import { setPausedOrders, setProcessOrders, setFinishedOrders  } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Order, OrderInquiry } from "../../../lib/data/types/order";
import "../../../css/order.css";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import OrderService from "../../services/OrderService";
import theme from "../../material/MaterialTheme";



/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});


export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders  } = actionDispatch(useDispatch());
  const [value, setValue] = useState("1");

  const [ordeInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  })

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOreder({ ...ordeInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

      order
      .getMyOreder({ ...ordeInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

      order
      .getMyOreder({ ...ordeInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [ordeInquiry]);

  /** HANDLERS **/

  
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return <div className={"orders-page"}>
    <Container className="order-container">
      <Stack className="order-left">
        <TabContext value={value}>
          <Box className={"order-nav-frame"}>
            <Box sx={{ boderBottom: 1, borderColor: "divider" }}>
              <Tabs 
              value={value}
              onChange={handleChange}
              aria-label="basic tab example"
              className={"table_list"}
              >
                <Tab label="PAUSED ORDERS" value={"1"} />
                <Tab label="PROCESS ORDERS" value={"2"} />
                <Tab label="FINISHED ORDERS" value={"3"} />
              </Tabs>
              
            </Box>
          </Box>
          <Divider height= "2" width="679" bg="#a1a1a1"/>
          <Stack className="order-main-content">
            <PausedOrders />
            <ProcessOrders />
            <FinishedOrders />
          </Stack>
        </TabContext>


      </Stack>

      <Stack className="order-right">
        <Stack className="user-info-box">
          <Box className={"user-pic"}>
            <img  src="img/justin.webp" />
          </Box>
          <Box className={"user-name"}>
            Justin
          </Box>
          <Box className={"user-status"}>
            USER
          </Box>
          <Divider height= "2" width="332" bg="#a1a1a1"/>
          <Box className={"user-location"}>
            <LocationOnIcon/> 
            <Box className={"location"}>South Korea, Busan</Box>
          </Box>

        </Stack>
        <Stack className="user-card-info">
            <Stack className="card-num">
              <input type="text" placeholder="Card number: 1234 5678 9101 1234" />
            </Stack>
            <Stack className="card-date-info">
              <Box className={"expire-date"}>
                <input type="text" placeholder="07/24" />
              </Box>
              <Box className={"cvv-num"}>
                <input type="text" placeholder="CVV: 010"/>
              </Box>
            </Stack>
            <Stack className="card-user-name">
              <input type="text" placeholder="Justin Robertson"/>
            </Stack>
            <Stack className="card-type">
             <Box>
              <img src="icons/western-card.svg" alt="" />
             </Box>
             <Box>
             <img src="icons/master-card.svg" alt="" />
             </Box>
              <Box>
                <img src="icons/paypal-card.svg" alt="" />
              </Box>
              <Box>
              <img src="icons/visa-card.svg" alt="" />
              </Box>
            </Stack>
        </Stack>
      </Stack>
    </Container>
  </div>
}