import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Button, Modal, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "../../components/divider";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { CartItem } from "../../../lib/data/types/search";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setStore } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveStore } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/data/types/member";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setStore: (data: Member) => dispatch(setStore(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductsRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);

const storeRetriever = createSelector(retrieveStore, (store) => ({ store }));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

const truncate = (text: string, max: number) =>
  text.length > max ? text.slice(0, max).trimEnd() + "..." : text;

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();

  const { setStore, setChosenProduct } = actionDispatch(useDispatch());

  const { chosenProduct } = useSelector(chosenProductsRetriever);
  const { store } = useSelector(storeRetriever);

  // ✅ thumbs
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // ✅ quantity
  const [qty, setQty] = useState<number>(1);
  const minus = () => setQty((p) => Math.max(1, p - 1));
  const plus = () => setQty((p) => p + 1);

  // ✅ zoom
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomSrc, setZoomSrc] = useState<string>("");

  // ✅ server api (adjust if your project uses a different variable)
  const serverApi =
    (process.env.REACT_APP_API_URL as string) ||
    (process.env.REACT_APP_SERVER_API as string) ||
    "";

  useEffect(() => {

    const productService = new ProductService();
    productService
      .getProduct(productId)
      .then((data) => {
        setChosenProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // set initial zoom image when chosenProduct arrives
  useEffect(() => {
    if (chosenProduct?.productImages?.length) {
      const first = chosenProduct.productImages[0];
      setZoomSrc(serverApi ? `${serverApi}/${first}` : first);
    }
  }, [chosenProduct, serverApi]);

  const openZoom = (src: string) => {
    setZoomSrc(src);
    setZoomOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!chosenProduct) return;

    const firstImg =
      chosenProduct.productImages?.length > 0
        ? serverApi
          ? `${serverApi}/${chosenProduct.productImages[0]}`
          : chosenProduct.productImages[0]
        : "";

    onAdd({
      _id: chosenProduct._id,
      quantity: qty,
      name: chosenProduct.productName,
      price: chosenProduct.productPrice,
      image: firstImg,
    });
  };

  const scrollToDescription = () => {
    document
      .getElementById("product-description")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (!chosenProduct) return null;

  const storeNick = store?.memberNick ?? "EcoFlora";

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>

      <Container className={"product-container"}>
        {/* ===== TOP SECTION ===== */}
        <Stack className="top-grid" direction={{ xs: "column", md: "row" }}>
          {/* LEFT: slider */}
          <Stack className={"chosen-product-slider"}>
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper-area"
            >
              {(chosenProduct.productImages ?? []).map(
                (ele: string, index: number) => {
                  const imagePath = serverApi ? `${serverApi}/${ele}` : ele;

                  return (
                    <SwiperSlide key={index}>
                      <img
                        className="slider-image"
                        src={imagePath}
                        alt={`product-${index}`}
                        onClick={() => openZoom(imagePath)}
                      />
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>

            {/* THUMBS */}
            <Box className="thumbs-wrap">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="thumbs-swiper"
              >
                {(chosenProduct.productImages ?? []).map(
                  (ele: string, index: number) => {
                    const imagePath = serverApi ? `${serverApi}/${ele}` : ele;

                    return (
                      <SwiperSlide key={index}>
                        <img
                          className="thumb-image"
                          src={imagePath}
                          alt={`thumb-${index}`}
                          onClick={() => openZoom(imagePath)}
                        />
                      </SwiperSlide>
                    );
                  }
                )}
              </Swiper>
            </Box>
          </Stack>

          {/* RIGHT: info */}
          <Stack className={"chosen-product-info"}>
            <Box className={"info-box"}>
              <Box className="category">{chosenProduct.productCollection}</Box>

              <Box className="name-row">
                <strong className={"product-name"}>
                  {chosenProduct.productName}
                </strong>
                <span className="stock-pill">In Stock</span>
              </Box>

              <span className={"resto-name"}>{storeNick}</span>
              <span className={"resto-name"}>0102345678</span>

              {/* ✅ views only */}
              <Box className={"rating-box"}>
                <div className={"evaluation-box"}>
                  <div className={"product-view"}>
                    <RemoveRedEyeIcon sx={{ mr: "8px" }} />
                    <span>{chosenProduct.productViews} Views</span>
                  </div>
                </div>
              </Box>

              {/* ✅ short preview */}
              <p
                className={"product-desc preview"}
                onClick={scrollToDescription}
              >
                {truncate(chosenProduct.productDesc ?? "No Description", 80)}{" "}
                <span className="read-more">Read more</span>
              </p>

              <Divider height="1" width="100%" bg="#e6e6e6" />

              {/* ✅ ONE PRICE ONLY */}
              <div className={"product-price"}>
                <span className="price-label">Price</span>
                <span className="price-value">
                  ${Number(chosenProduct.productPrice).toFixed(2)}
                </span>
              </div>

              {/* ✅ Qty + Add to Cart */}
              <div className={"button-box"}>
                <div className="qty-box">
                  <button className="qty-btn" onClick={minus} aria-label="minus">
                    –
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button className="qty-btn" onClick={plus} aria-label="plus">
                    +
                  </button>
                </div>

                <Button
                  className="add-btn"
                  variant="contained"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </div>
            </Box>
          </Stack>
        </Stack>

        {/* ===== BOTTOM: Description only ===== */}
        <Box id="product-description" className="desc-section">
          <Box className="desc-title">Description</Box>
          <Box className="desc-text">{chosenProduct.productDesc}</Box>
        </Box>
      </Container>

      {/* ✅ ZOOM MODAL */}
      <Modal open={zoomOpen} onClose={() => setZoomOpen(false)}>
        <Box className="zoom-modal">
          <IconButton className="zoom-close" onClick={() => setZoomOpen(false)}>
            <CloseIcon />
          </IconButton>
          <img className="zoom-image" src={zoomSrc} alt="zoom" />
        </Box>
      </Modal>
    </div>
  );
}
