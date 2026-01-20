import React from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Logout } from "@mui/icons-material";
import { CartItem } from "../../../lib/data/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/data/config";

// IMPORTANT: make sure this path is correct in your project
import "../../../css/navbar.css";

interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
    const {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
        setSignupOpen,
        setLoginOpen,
        handleCloseLogout,
        handleLogoutClick,
        anchorEl,
        handleLogoutRequest,
    } = props;

    const { authMember } = useGlobals();

    return (
        <div className="home-navbar"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/plant-hero.jpg)`,
            }}
        >
            <Container className="navbar-container">

                {/* ===== Top Menu (Home/Products/Help + Basket + Auth) ===== */}
                <Stack className="menu">
                    <Box className="brand">
                        <NavLink to="/" className="brand-link">
                            <span className="brand-text">EcoFlora</span>
                        </NavLink>
                    </Box>

                    <Stack className="links">
                        <Box className="hover-line">
                            <NavLink to="/" exact activeClassName="underline">Home</NavLink>
                        </Box>

                        <Box className="hover-line">
                            <NavLink to="/products" activeClassName="underline">Products</NavLink>
                        </Box>

                        <Box className="hover-line">
                            <NavLink to="/help" activeClassName="underline">Help</NavLink>
                        </Box>

                        {/* Basket (same logic) */}
                        <Basket
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            onDelete={onDelete}
                            onDeleteAll={onDeleteAll}
                        />

                        {/* Auth buttons (Login + Signup next to each other) */}
                        {!authMember ? (
                            <Stack className="auth-buttons" direction="row" spacing={1.2}>
                                <Button
                                    variant="outlined"
                                    className="login-button"
                                    onClick={() => setLoginOpen(true)}
                                >
                                    Login
                                </Button>

                                <Button
                                    variant="contained"
                                    className="signup-button"
                                    onClick={() => setSignupOpen(true)}
                                >
                                    Sign up
                                </Button>
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

                {/* ===== Hero (same component, only UI) ===== */}
                <Stack className="header-frame">
                    <Box className="hero-box">
                        <Box className="hero-tag">Plant trends 2026</Box>
                        <Box className="hero-title">BRING NATURE HOME</Box>
                        <Box className="hero-sub">
                            Indoor & outdoor plants for calm, balanced living
                        </Box>

                        <Button
                            variant="contained"
                            className="hero-btn"
                            onClick={() => (window.location.href = "/products")}
                        >
                            Discover More
                        </Button>
                    </Box>
                </Stack>

            </Container>
        </div>
    );
}
