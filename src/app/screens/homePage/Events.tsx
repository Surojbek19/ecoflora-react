import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Swiper styles (make sure these are imported somewhere in your app once)
// import "swiper/css";
// import "swiper/css/navigation";

SwiperCore.use([Navigation]);

const blogs = [
  {
    img: "/img/blog1.JPG",
    date: "28 February 2018",
    title: "Necessitatibus Saepe Eveniet",
    desc: `The standard Lorem Ipsum passage, used since the 1500s"Lorem ipsum dolor sit amet, consectetur adipi...`,
  },
  {
    img: "/img/blog2.JPG",
    date: "28 February 2018",
    title: "Quis Autem Reprehender Pariatur",
    desc: `1914 translation by H. Rackham"But I must explain to you how all this mistaken idea of denouncing pl...`,
  },
  {
    img: "/img/blog3.JPG",
    date: "28 February 2018",
    title: "Voluptatem Accusantium Doloremque",
    desc: `If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrass...`,
  },
  {
    img: "/img/blog4.JPG",
    date: "28 February 2018",
    title: "At Vero Eos Et Accusamus",
    desc: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...`,
  },
  {
    img: "/img/blog1.JPG",
    date: "28 February 2018",
    title: "Et Harum Quidem Rerum Facilis",
    desc: `Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod...`,
  },
];

export default function Events() {
  return (
    <Box className="latest-blog-frame">
      <Container>
        <Box className="latest-blog-title">
          <h2>Latest Blog</h2>
          <span className="latest-blog-underline" />
        </Box>

        <Box className="latest-blog-sliderWrap">
          {/* Left Arrow */}
          <button className="latest-blog-prev" type="button" aria-label="Previous">
            ‹
          </button>

          <Swiper
            className="latest-blog-swiper"
            modules={[Navigation]}
            navigation={{
              nextEl: ".latest-blog-next",
              prevEl: ".latest-blog-prev",
            }}
            slidesPerView={3}
            spaceBetween={40}
            loop={false}
            speed={600}
            allowTouchMove={true} // you can make false if you want only arrows
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1200: { slidesPerView: 3, spaceBetween: 40 },
            }}
          >
            {blogs.map((b, idx) => (
              <SwiperSlide key={idx}>
                <Box className="latest-blog-card">
                  <Box className="latest-blog-imgWrap">
                    <img className="latest-blog-img" src={b.img} alt={b.title} />
                  </Box>

                  <Box className="latest-blog-date">
                    <img src="/icons/calendar.svg" alt="calendar" />
                    <span>{b.date}</span>
                  </Box>

                  <Box className="latest-blog-cardTitle">{b.title}</Box>
                  <Box className="latest-blog-desc">{b.desc}</Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Arrow */}
          <button className="latest-blog-next" type="button" aria-label="Next">
            ›
          </button>
        </Box>

        {/* Bottom separator line */}
        <Box className="latest-blog-separator" />
      </Container>
    </Box>
  );
}
