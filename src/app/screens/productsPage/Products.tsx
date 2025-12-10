import React, { useEffect } from "react";
import { Box, Button, CardContent, Container, Input, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CardCover,  Card, CardOverflow, AspectRatio } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import Badge from '@mui/joy/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {Button as JoyButton, Input as JoyInput} from '@mui/joy';
import LocationOn from '@mui/icons-material/LocationOn';

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import { serverApi } from "../../../lib/data/config";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({products}) 
)




export default function Products() {
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever)
 
    useEffect(() => {
        const product = new ProductService();
        product.getProducts({
            page: 1,
            limit: 8,
            order: "createdAt",
            productCollection: ProductCollection.DISH,
            search: "",
        })
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }, [])

    return <div className={"products"}>
       <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
            <Stack className={"avatar-big-box"}>
                <Box className="top-text">
                  Burak Restaurant
                </Box>
                <Box className="search-box">
                      <CssVarsProvider>
                      <JoyInput 
                      className="search-input"
                        placeholder="Type here..."
                        endDecorator={
                        <JoyButton className="search-button" variant="soft" color="neutral" startDecorator={<SearchIcon />} sx={{color: "#E3C08E"}}>
                            Search
                        </JoyButton>
                        }
                        sx={{ width: 300 }}
                    />
                    </CssVarsProvider>
                    
                </Box>
                 {/* <SearchIcon sx={{ color: "#888" }} /> */}

            </Stack>
             <Stack className={"filter-box"}>
                <Stack className="filter">
                    <Box>
                        <Button variant="contained" className="new-button" color="primary">
                            New
                        </Button>
                    </Box>
                     <Box>
                        <Button variant="contained" className="price-button" color="secondary">
                            Price
                        </Button>
                    </Box>
                     <Box>
                        <Button variant="contained" className="view-button" color="secondary">
                            View
                        </Button>
                    </Box>
                
                </Stack>
            </Stack>
             <Stack className={"food-box"}>
                <Stack className="food-menu">
                    <Box>
                        <Button 
                        variant="contained" 
                        className="new-button rotate" 
                        color="primary"
                        sx={{transform: "rotate(-90deg)" }}
                        >
                            New
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="price-button rotate" 
                        color="secondary"
                         sx={{transform: "rotate(-90deg)" }}>
                            Dish
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="view-button rotate" 
                        color="secondary"
                         sx={{transform: "rotate(-90deg)" }}>
                            Price
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="view-button rotate" 
                        color="secondary"
                         sx={{transform: "rotate(-90deg)" }}>
                            Desert
                        </Button>
                    </Box>
                     <Box>
                        <Button variant="contained" className="view-button rotate" color="secondary"  sx={{transform: "rotate(-90deg)" }}>
                            Others
                        </Button>
                    </Box>

                </Stack>
                 <Stack className="food-frame">
                    {products.length !== 0 ? (
                    products.map((product: Product) => {
                        const imagePath = `${serverApi}/${product.productImages[0]}`;
                        const sizeVolume = 
                        product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + " l"
                        : product.productSize + " size";
                        return (
                            <Stack className="food-info">
                                <CssVarsProvider key={product._id}>
                                    <Card className="card">
                                        <CardOverflow>
                                            <div className="food-size">{sizeVolume}</div>
                                            <AspectRatio ratio={"1"} style={{borderRadius:"0px 50px 0px 0px"}}>
                                                <img style={{borderRadius:"0px 50px 0px 0px", width:"100%", height:"100%"}} src={ imagePath } alt="" />
                                            </AspectRatio>
                                            <CardContent className="shopping-cart">
                                                <img src="icons/shopping-cart.svg" alt="" />
                                            </CardContent>
                                        </CardOverflow>
                                        <Badge badgeContent={product.productViews} className="view-badge">
                                            <RemoveRedEyeIcon sx={{
                                                color: product.productViews === 0 ? "gray" : "white",
                                                fontSize:"30px"}}/>
                                        </Badge>
                                    </Card>
                                    <Box className="food-name">{product.productName}</Box>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                        <img style={{width: "32px", height: "31px"}} src="/img/usd.webp" />
                                        <span style={{ fontSize: "20px", fontWeight: "600", color: "#E3C08E" }}>
                                            {product.productPrice}
                                        </span>
                                    </Box>
                                </CssVarsProvider>
                            </Stack>
                        )
                    })
                ) : ( 
                    <Box>Products Are not avaiable</Box>
                )}
                </Stack>

            </Stack>
             <Stack className="pagination-box">
                <Stack className="pagination" spacing={2}
                sx={{
                    // only page number circles
                    "& .MuiPaginationItem-page": { color: "black" },

                    // only selected page circle
                    "& .MuiPaginationItem-page.Mui-selected": {
                        backgroundColor: "red",
                        color: "white",
                    }
                    }}>
                    <Pagination count={3} size="medium" />
                </Stack>
            </Stack>

        </Stack>
       </Container>
       <div className="brand-logo">
        <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className="name">
                    Our Family Brand
                </Box>
            </Stack>
             <Stack className="board-box">
                <Box className="brand-img">
                    <img src="/img/gurme.webp" />
                </Box>
                <Box className="brand-img">
                     <img src="/img/seafood.webp" />
                </Box>
                <Box className="brand-img">
                     <img src="/img/doner.webp" />
                </Box>
                <Box className="brand-img">
                     <img src="/img/sweets.webp" />
                </Box>
            </Stack>
        </Container>
       </div>

       <div>
        <Container>
            <Stack className="address-area">
                <Box className="title">Our Address</Box>
                <iframe
                style={{ marginTop: "60px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12986.229087378231!2d129.26976!3d35.5399369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35662ded71ce0c67%3A0x4a646e34876ef49c!2sUniversity%20of%20Ulsan!5e0!3m2!1sen!2skr!4v1763354784175!5m2!1sen!2skr" 

                width="1320"
                height="500"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

            </Stack>
        </Container>
       </div>
    </div>;
}