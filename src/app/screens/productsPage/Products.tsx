import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Product, ProductInquiry } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import { serverApi } from "../../../lib/data/config";
import { kMaxLength } from "buffer";
import { Key } from "@mui/icons-material";
import { useHistory } from "react-router-dom";


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
    const { products } = useSelector(productsRetriever);
    const[productSearch, setProductSearch] = useState<ProductInquiry>({
            page: 1,
            limit: 8,
            order: "createdAt",
            productCollection: ProductCollection.DISH,
            search: "",
    });

    const [searchText, setSearchText] = useState<string>("");
 
    const history = useHistory();

    useEffect(() => {
        const product = new ProductService();
        product.getProducts(productSearch)
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }, [productSearch]);

    useEffect(() => {
        if(searchText === "") {
            productSearch.search = "";
            setProductSearch({...productSearch});
        }
    }, [searchText]);

    /** HAMDLERS **/
    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({...productSearch});
    }

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({...productSearch });
    }

    const searchProductHandler = () => {
        productSearch.search = searchText;
        setProductSearch({...productSearch });
    }

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({...productSearch });
    }

    const chooseDishHnadler =(id: string) => {
        history.push(`/products/${id}`)
    }

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
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key == "Enter") searchProductHandler()
                        }}
                        endDecorator={
                        <JoyButton 
                        className="search-button" 
                        variant="soft" 
                        color="neutral" 
                        startDecorator={<SearchIcon />} 
                        sx={{color: "#E3C08E"}}
                        onClick={searchProductHandler}
                        >
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
                        <Button variant="contained" 
                        className="new-button" 
                        color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                        onClick={() => searchOrderHandler("createdAt")}
                        >
                            New
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="price-button" 
                        color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                        onClick={() => searchOrderHandler("productPrice")}
                        >
                            Price
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="view-button" 
                        color={productSearch.order === "productViews" ? "primary" : "secondary"}
                        onClick={() => searchOrderHandler("productViews")}
                        >
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
                        color={productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"}
                        sx={{transform: "rotate(-90deg)" }}
                        onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                        >
                            Dish
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="price-button rotate" 
                        color={productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"}
                         sx={{transform: "rotate(-90deg)" }}
                         onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                         >
                            Salad
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="view-button rotate" 
                         color={productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"}
                         sx={{transform: "rotate(-90deg)" }}
                         onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                         >
                            Drink
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="view-button rotate" 
                         color={productSearch.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"}
                         sx={{transform: "rotate(-90deg)" }}
                         onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
                         >
                            Desert
                        </Button>
                    </Box>
                     <Box>
                        <Button 
                        variant="contained" 
                        className="view-button rotate" 
                         color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"}  
                        sx={{transform: "rotate(-90deg)" }}
                        onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                        >
                            Other
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
                            <Stack 
                                className="food-info"
                                key={product._id}
                                onClick={() => chooseDishHnadler(product._id)}
                                sx={{ cursor: "pointer" }}
                                >
                                <CssVarsProvider>
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
                    <Box className="no-data">Products are not avaiable</Box>
                )}
                </Stack>

            </Stack>
             <Stack className="pagination-box">
                <Stack className="pagination" spacing={2}>
                   <Pagination 
                   count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
                   page={productSearch.page}
                   renderItem={(item) => (
                    <PaginationItem 
                    slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                    }}
                    {...item}
                    color="secondary"
                    />
                   )}
                   onChange={paginationHandler}
                   />
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