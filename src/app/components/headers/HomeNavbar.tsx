import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Stack,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/data/types/search";
import "../../../css/navbar.css";
import { useGlobals } from "../../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/data/config";

interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;

    // keep these if App.tsx passes them
    setSignupOpen?: (isOpen: boolean) => void;
    setLoginOpen?: (isOpen: boolean) => void;

    // logout menu handlers (same behavior as OtherNavbar)
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

        // logout props (may be undefined if not passed)
        handleLogoutClick,
        anchorEl,
        handleCloseLogout,
        handleLogoutRequest,
    } = props;

    const { authMember } = useGlobals();

    const [count, setCount] = useState<number>(0);
    const [value, setvalue] = useState<boolean>(true);

    useEffect(() => {
        console.log("componentDidMount", count);
        setCount(count + 1);
        return () => {
            console.log("componentWillUnmount");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const buttonHandler = () => {
        setvalue(!value);
        // If you want to open modal instead of toggling value, use:
        // setSignupOpen?.(true);
    };

    // ---- helpers to avoid "Cannot GET /http://..." or double base urls
    const buildAvatarSrc = (img?: string | null) => {
        if (!img) return "/icons/default-user.svg";
        if (img.startsWith("http://") || img.startsWith("https://")) return img;
        const base = serverApi.replace(/\/+$/, "");
        const clean = img.replace(/^\/+/, "");
        return `${base}/${clean}`;
    };

    // safe no-op fallbacks if props not provided
    const onAvatarClick =
        handleLogoutClick ??
        ((e: React.MouseEvent<HTMLElement>) => {
            // If you want, open member page by default when no menu handler is provided
            // history.push("/member-page");
            // For now do nothing.
        });

    const onCloseMenu = handleCloseLogout ?? (() => { });
    const onLogout = handleLogoutRequest ?? (() => { });

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

                        {/* Basket */}
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
                                        buttonHandler();
                                        setSignupOpen?.(true);
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        ) : (
                            <>
                                {/* ✅ avatar works like OtherNavbar */}
                                <img
                                    className="user-avatar"
                                    src={buildAvatarSrc(authMember?.memberImage)}
                                    onClick={onAvatarClick}
                                    alt="User"
                                />

                                {/* ✅ logout menu works like OtherNavbar */}
                                <Menu
                                    anchorEl={anchorEl ?? null}
                                    id="account-menu"
                                    open={Boolean(anchorEl)}
                                    onClose={onCloseMenu}
                                    onClick={onCloseMenu}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <MenuItem onClick={onLogout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Stack>
                </Stack>

                <Stack className="header-frame">
                    <Box className="hero-box">
                        <Box className="hero-tag">Plant trends 2026</Box>
                        <Box className="hero-title">BRING NATURE HOME</Box>
                        <Box className="hero-sub">
                            Indoor & outdoor plants for calm, balanced living — {count} hours
                            service
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
