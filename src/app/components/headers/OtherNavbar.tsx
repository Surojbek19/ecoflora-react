import React from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Logout } from "@mui/icons-material";
import { CartItem } from "../../../lib/data/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/data/config";

// IMPORTANT: import OtherNavbar css (separate from navbar.css)

interface OtherNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void; // KEEP (logic/props compatibility)
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
    const {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
        setSignupOpen, // KEEP (unused on purpose)
        setLoginOpen,
        handleCloseLogout,
        handleLogoutClick,
        anchorEl,
        handleLogoutRequest,
    } = props;

    const { authMember } = useGlobals();

    return (
        <div
            className="other-navbar"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/plant-hero.jpg)`,
            }}
        >
            <Container className="navbar-container">
                {/* ===== TOP MENU (match HomeNavbar layout) ===== */}
                <Stack className="menu">
                    <Box className="brand">
                        <NavLink to="/" className="brand-link">
                            <span className="brand-text">EcoFlora</span>
                        </NavLink>
                    </Box>

                    <Stack className="links">
                        <Box className="hover-line">
                            <NavLink to="/" exact activeClassName="underline">
                                Home
                            </NavLink>
                        </Box>

                        <Box className="hover-line">
                            <NavLink to="/products" activeClassName="underline">
                                Products
                            </NavLink>
                        </Box>

                        <Box className="hover-line">
                            <NavLink to="/help" activeClassName="underline">
                                Help
                            </NavLink>
                        </Box>

                        {/* Basket (same logic) */}
                        <Basket
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            onDelete={onDelete}
                            onDeleteAll={onDeleteAll}
                        />

                        {/* Auth (NO signup button on OtherNavbar) */}
                        {!authMember ? (
                            <Stack className="auth-buttons" direction="row" spacing={1.2}>
                                <Button
                                    variant="outlined"
                                    className="login-button"
                                    onClick={() => setLoginOpen(true)}
                                >
                                    Login
                                </Button>

                                {/* Keep logic/props, but DO NOT show signup */}
                                {/* <Button
                  variant="contained"
                  className="signup-button"
                  onClick={() => setSignupOpen(true)}
                >
                  Sign up
                </Button> */}
                            </Stack>
                        ) : (
                            <img
                                className="user-avatar"
                                src={
                                    authMember?.memberImage
                                        ? `${serverApi}/${authMember.memberImage}`
                                        : "/icons/default-user.svg"
                                }
                                onClick={handleLogoutClick}
                                alt="User"
                            />
                        )}

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Boolean(anchorEl)}
                            onClose={handleCloseLogout}
                            onClick={handleCloseLogout}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem onClick={handleLogoutRequest}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>

                {/* ===== SQUARE (same style & placement as HomeNavbar) ===== */}
                <Stack className="header-frame">
                    <Box className="hero-box">
                        <Box className="hero-tag">Explore EcoFlora</Box>
                        <Box className="hero-title">LET'S BE GREEN</Box>
                        <Box className="hero-sub">
                            Browse curated indoor & outdoor plants for your next space
                        </Box>

                        {/* <Button
                            variant="contained"
                            className="hero-btn"
                            onClick={() => (window.location.href = "/products")}
                        >
                            View Products
                        </Button> */}
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
