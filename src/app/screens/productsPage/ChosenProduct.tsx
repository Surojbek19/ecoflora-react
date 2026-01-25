import React, { useState } from "react";
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


interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

const truncate = (text: string, max: number) =>
  text.length > max ? text.slice(0, max).trimEnd() + "..." : text;

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;

  // ✅ HARD-CODE DATA (backend later)
  const product = {
    _id: "temp-id",
    productName: "Monstera deliciosa",
    productViews: 245,
    productPrice: 12,
    productDesc:
      "Monstera deliciosa is an iconic indoor plant known for its split leaves. It grows well in bright, indirect light and makes any room feel calm and fresh. Water when the top soil feels dry, and rotate the pot occasionally to encourage even growth.",
    productImages: [
      "/img/product-1.jpg",
      "/img/product-2.jpg",
      "/img/product-3.jpg",
      "/img/product-4.jpg",
    ],
  };

  const restaurant = {
    memberNick: "EcoFlora",
  };

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // ✅ quantity
  const [qty, setQty] = useState<number>(1);
  const minus = () => setQty((p) => Math.max(1, p - 1));
  const plus = () => setQty((p) => p + 1);

  // ✅ zoom
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomSrc, setZoomSrc] = useState(product.productImages[0]);

  const openZoom = (src: string) => {
    setZoomSrc(src);
    setZoomOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd({
      _id: product._id,
      quantity: qty,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages[0],
    });
  };

  const scrollToDescription = () => {
    document.getElementById("product-description")?.scrollIntoView({ behavior: "smooth" });
  };

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
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper-area"
            >
              {product.productImages.map((ele: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    className="slider-image"
                    src={ele}
                    alt={`product-${index}`}
                    onClick={() => openZoom(ele)}
                  />
                </SwiperSlide>
              ))}
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
                {product.productImages.map((ele: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img className="thumb-image" src={ele} alt={`thumb-${index}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Stack>

          {/* RIGHT: info */}
          <Stack className={"chosen-product-info"}>
            <Box className={"info-box"}>
              <Box className="category">Indoor Plant</Box>

              <Box className="name-row">
                <strong className={"product-name"}>{product.productName}</strong>
                <span className="stock-pill">In Stock</span>
              </Box>

              <span className={"resto-name"}>{restaurant.memberNick}</span>

              {/* ✅ views only */}
              <Box className={"rating-box"}>
                <div className={"evaluation-box"}>
                  <div className={"product-view"}>
                    <RemoveRedEyeIcon sx={{ mr: "8px" }} />
                    <span>{product.productViews} Views</span>
                  </div>
                </div>
              </Box>

              {/* ✅ short preview (same desc, truncated) */}
              <p className={"product-desc preview"} onClick={scrollToDescription}>
                {truncate(product.productDesc, 110)} <span className="read-more">Read more</span>
              </p>

              <Divider height="1" width="100%" bg="#e6e6e6" />

              {/* ✅ ONE PRICE ONLY */}
              <div className={"product-price"}>
                <span className="price-label">Price</span>
                <span className="price-value">${product.productPrice.toFixed(2)}</span>
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

                <Button className="add-btn" variant="contained" onClick={handleAddToCart}>
                  Add To Cart
                </Button>
              </div>
            </Box>
          </Stack>
        </Stack>

        {/* ===== BOTTOM: Description only ===== */}
        <Box id="product-description" className="desc-section">
          <Box className="desc-title">Description</Box>
          <Box className="desc-text">{product.productDesc}</Box>
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
