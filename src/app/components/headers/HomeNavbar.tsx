import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/data/types/search";
import "../../../css/navbar.css";

interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;

    // keep these if App.tsx passes them
    setSignupOpen?: (isOpen: boolean) => void;
    setLoginOpen?: (isOpen: boolean) => void;
    handleLogoutClick?: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl?: HTMLElement | null;
    handleCloseLogout?: () => void;
    handleLogoutRequest?: () => void | Promise<void>;
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
    } = props;

    // ✅ KEEP YOUR OLD LOGIC EXACTLY
    const authMember = true;

    const [count, setCount] = useState<number>(0);
    const [value, setvalue] = useState<boolean>(true);

    useEffect(() => {
        console.log("componentDidMount", count);
        setCount(count + 1);
        return () => {
            console.log("componentWillUnmount");
        };
    }, [value]);

    const buttonHandler = () => {
        setvalue(!value);
        // If you want to open modal instead of toggling value, use:
        // setSignupOpen?.(true);
    };

    return (
        <div
            className="home-navbar"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/plant-hero.jpg)`,
            }}
        >
            <Container className="navbar-container">
                <Stack className="menu">
                    <Box className="brand">
                        <NavLink to="/" className="brand-link">
                            <span className="brand-text">EcoFlora</span>
                        </NavLink>
                    </Box>

                    <Stack className="links" direction="row" alignItems="center">
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

                        {authMember ? (
                            <Box className="hover-line">
                                <NavLink to="/orders" activeClassName="underline">
                                    Orders
                                </NavLink>
                            </Box>
                        ) : null}

                        {authMember ? (
                            <Box className="hover-line">
                                <NavLink to="/member-page" activeClassName="underline">
                                    My Page
                                </NavLink>
                            </Box>
                        ) : null}

                        <Box className="hover-line">
                            <NavLink to="/help" activeClassName="underline">
                                Help
                            </NavLink>
                        </Box>

                        {/* ✅ FIX 2: Basket needs props */}
                        <Basket
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            onDelete={onDelete}
                            onDeleteAll={onDeleteAll}
                        />

                        {!authMember ? (
                            <Stack className="auth-buttons" direction="row" spacing={1.2}>
                                <Button
                                    variant="outlined"
                                    className="login-button"
                                    onClick={() => setLoginOpen?.(true)}
                                >
                                    Login
                                </Button>

                                <Button
                                    variant="contained"
                                    className="signup-button"
                                    onClick={() => {
                                        // keep your old handler logic
                                        buttonHandler();
                                        // also open modal if you have it
                                        setSignupOpen?.(true);
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        ) : (
                            <img
                                className="user-avatar"
                                src={"/icons/default-user.svg"}
                                alt="User"
                            />
                        )}
                    </Stack>
                </Stack>

                <Stack className="header-frame">
                    <Box className="hero-box">
                        <Box className="hero-tag">Plant trends 2026</Box>
                        <Box className="hero-title">BRING NATURE HOME</Box>
                        <Box className="hero-sub">
                            Indoor & outdoor plants for calm, balanced living — {count} hours service
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
