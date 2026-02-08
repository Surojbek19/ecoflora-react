import React, { useRef } from "react";
import {
    Box,
    Button,
    Container,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    IconButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Logout } from "@mui/icons-material";
import { CartItem } from "../../../lib/data/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/data/config";

interface OtherNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void; // KEEP
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

    // ✅ Keep focus on the opener (avatar button)
    const avatarBtnRef = useRef<HTMLButtonElement | null>(null);

    // ✅ Wrap your existing close handler so we can restore focus
    const closeMenuAndRestoreFocus = () => {
        handleCloseLogout();
        avatarBtnRef.current?.focus();
    };

    const open = Boolean(anchorEl);

    return (
        <div
            className="other-navbar"
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
                                    onClick={() => setLoginOpen(true)}
                                >
                                    Login
                                </Button>
                            </Stack>
                        ) : (
                            // ✅ Use a real focusable element as the menu opener
                            <IconButton
                                ref={avatarBtnRef}
                                onClick={handleLogoutClick}
                                aria-controls={open ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                sx={{ p: 0 }}
                            >
                                <img
                                    className="user-avatar"
                                    src={
                                        authMember?.memberImage
                                            ? `${serverApi}/${authMember.memberImage}`
                                            : "/icons/default-user.svg"
                                    }
                                    alt="User"
                                />
                            </IconButton>
                        )}

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={closeMenuAndRestoreFocus}
                            onClick={closeMenuAndRestoreFocus}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleLogoutRequest();
                                    // ✅ ensure menu closes + focus restored
                                    closeMenuAndRestoreFocus();
                                }}
                            >
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>

                <Stack className="header-frame">
                    <Box className="hero-box">
                        <Box className="hero-tag">Explore EcoFlora</Box>
                        <Box className="hero-title">LET'S BE GREEN</Box>
                        <Box className="hero-sub">
                            Browse curated indoor & outdoor plants for your next space
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
