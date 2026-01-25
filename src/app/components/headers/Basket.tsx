import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/data/types/search";
import { Messages, serverApi } from "../../../lib/data/config";
import { sweetErrorHandling } from "../../../lib/data/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();

  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );

  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS (UNCHANGED) **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const procceedOrdersHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();
      history.push("/orders");

      //REFRESH VIA CONTEXT
      setOrderBuilder(new Date());
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  // ====== GLASS UI (like auth modal) ======
  const glassPaperSx = {
    mt: 1.5,
    overflow: "hidden",
    borderRadius: "22px",
    minWidth: 380,
    maxWidth: 420,

    // see-through glass
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.22)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",

    // remove default MenuList padding
    "& .MuiMenu-list": { p: 0 },

    // arrow
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 18,
      width: 12,
      height: 12,
      background: "rgba(255,255,255,0.10)",
      borderLeft: "1px solid rgba(255,255,255,0.18)",
      borderTop: "1px solid rgba(255,255,255,0.18)",
      transform: "translateY(-50%) rotate(45deg)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      zIndex: 0,
    },
  } as const;

  const headerSx = {
    px: 2,
    py: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.18)",
  } as const;

  const itemCardSx = {
    px: 2,
    py: 1.2,
    display: "grid",
    gridTemplateColumns: "44px 1fr auto",
    gap: 1.2,
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
  } as const;

  const qtyBtnSx = {
    width: 30,
    height: 30,
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.92)",
    cursor: "pointer",
    lineHeight: 1,
  } as const;

  const footerSx = {
    px: 2,
    py: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1.5,
  } as const;

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon sx={{ color: "#2f5d50" }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{ elevation: 0, sx: glassPaperSx }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* ===== Header ===== */}
        <Box sx={headerSx}>
          <Box>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: 14,
                color: "#1E3D2B",
              }}
            >
              Basket
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#2D5B16" }}>
              {cartItems.length === 0
                ? ": Cart is empty!"
                : `Items: ${cartItems.length}`}
            </Typography>
          </Box>

          {cartItems.length !== 0 && (
            <DeleteForeverIcon
              onClick={() => onDeleteAll()}
              sx={{
                cursor: "pointer",
                color: "#1E3D2B",
                "&:hover": { color: "rgba(125, 255, 191, 0.95)" },
              }}
            />
          )}
        </Box>

        {/* ===== Items ===== */}
        <Box sx={{ maxHeight: 360, overflowY: "auto" }}>
          {cartItems.map((item: CartItem) => {
            const imagePath = `${serverApi}/${item.image}`;
            return (
              <Box key={item._id} sx={itemCardSx}>
                <Box sx={{ position: "relative", width: 44, height: 44 }}>
                  <img
                    src={imagePath}
                    className={"product-img"}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      objectFit: "cover",
                      border: "1px solid rgba(255,255,255,0.20)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      left: -10,
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      borderRadius: "10px",
                      width: 28,
                      height: 28,
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => onDelete(item)}
                    title="Remove item"
                  >
                    <CancelIcon sx={{ fontSize: 18, color: "#1E3D2B" }} />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#1E3D2B",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#1E3D2B" }}>
                    ${item.price} × {item.quantity}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 0.8, alignItems: "center" }}>
                  <button
                    onClick={() => onRemove(item)}
                    style={{
                      ...qtyBtnSx,
                      color: "#c62828",                 // red
                      background: "rgba(198,40,40,0.15)",
                      border: "1px solid rgba(198,40,40,0.35)",
                    } as any}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    −
                  </button>

                  <button
                    onClick={() => onAdd(item)}
                    style={{
                      ...qtyBtnSx,
                      color: "#2e7d32",                 // green
                      background: "rgba(46,125,50,0.18)",
                      border: "1px solid rgba(46,125,50,0.35)",
                    } as any}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    +
                  </button>
                </Box>

              </Box>
            );
          })}
        </Box>

        {/* ===== Footer ===== */}
        {cartItems.length !== 0 ? (
          <Box sx={footerSx}>
            <Typography
              sx={{
                fontSize: 12,
                color: "#1E3D2B",
                maxWidth: 220,
              }}
            >
              Total:{" "}
              <span style={{ fontWeight: 900, color: "#1E3D2B" }}>
                ${totalPrice}
              </span>{" "}
              <span style={{ opacity: 0.85 }}>
                ({itemsPrice} + {shippingCost})
              </span>
            </Typography>

            <Button
              onClick={procceedOrdersHandler}
              startIcon={<ShoppingCartIcon />}
              variant={"contained"}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 900,
                px: 2.2,
                backgroundColor: "#1E3D2B",
                "&:hover": { backgroundColor: "#285743" },
                boxShadow: "0 16px 28px rgba(0,0,0,0.25)",
              }}
            >
              Order
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Menu>
    </Box>
  );
}
