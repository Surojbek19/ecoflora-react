import React from "react";
import { Box, Container } from "@mui/material";

type Testimonial = {
  title: string;
  text: string;
  name: string;
  role: string;
  rating: number; // keep 5.0 like screenshot
  avatar: string; // image path in public/img
};

const PAIRS: Array<[Testimonial, Testimonial]> = [
  [
    {
      title: "Gorgeous Plants!",
      text:
        "The plants arrived healthy and beautifully packed. My living room feels calmer and fresher already. Highly recommended.",
      name: "Leslie Alexander",
      role: "Plant Lover",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
    {
      title: "Amazing Plants!",
      text:
        "Great quality and the care guide was super helpful. The leaves look stunning and the pot is perfect for my space.",
      name: "Leslie Alexander",
      role: "Plant Passionate",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
  ],
  [
    {
      title: "So Fresh & Healthy",
      text:
        "Fast delivery, healthy roots, and zero damage. EcoFlora makes it easy to create a greener home.",
      name: "Brooklyn Simmons",
      role: "Indoor Gardener",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
    {
      title: "Perfect for My Office",
      text:
        "Looks beautiful on my desk and it’s easy to care for. The plant quality is top-level.",
      name: "Cody Fisher",
      role: "Office Decor Fan",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
  ],
  [
    {
      title: "Beautiful Packaging",
      text:
        "Everything came neatly protected. The plant was vibrant and exactly like the photo.",
      name: "Kristin Watson",
      role: "Home Stylist",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
    {
      title: "Lovely Experience",
      text:
        "Customer support was kind and quick. My plants are thriving and I’ll order again.",
      name: "Wade Warren",
      role: "Plant Beginner",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
  ],
  [
    {
      title: "High Quality Plants",
      text:
        "The leaves are thick and healthy. The soil was moist and the plant adjusted quickly.",
      name: "Jenny Wilson",
      role: "Plant Collector",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
    {
      title: "Makes Home Peaceful",
      text:
        "Small change, big difference. The greenery adds calm and beauty to the room.",
      name: "Guy Hawkins",
      role: "Minimalist Decor",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
  ],
  [
    {
      title: "Exactly What I Wanted",
      text:
        "Clean design, strong plant, and very clear care instructions. Super satisfied.",
      name: "Savannah Nguyen",
      role: "Plant Enthusiast",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
    {
      title: "Worth Every Penny",
      text:
        "Premium look and feel. The plant is thriving and the quality is noticeable.",
      name: "Albert Flores",
      role: "Green Home Builder",
      rating: 5.0,
      avatar: "/img/user13.jpeg",
    },
  ],
];

export default function Testimonials() {
  const [index, setIndex] = React.useState(0);

  // auto change every 5 seconds
  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % PAIRS.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const [left, right] = PAIRS[index];

  return (
    <Box className="testimonials-frame">
      <Container>
        <Box className="testimonials-header">
          <Box className="testimonials-kicker">Testimonial</Box>
          <Box className="testimonials-title">
            <span>What Our Clients Say</span>
          </Box>
        </Box>

        <Box className="testimonials-grid">
          <TestimonialCard t={left} />
          <TestimonialCard t={right} />
        </Box>

        <Box className="testimonials-dots">
          {PAIRS.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonials ${i + 1}`}
              type="button"
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Box className="testimonial-card">
      <Box className="testimonial-top">
        <Box className="testimonial-stars">
          {"★★★★★"}
          <span className="testimonial-rating">{t.rating.toFixed(1)}</span>
        </Box>
      </Box>

      <Box className="testimonial-heading">{t.title}</Box>
      <Box className="testimonial-text">{t.text}</Box>

      <Box className="testimonial-footer">
        <img className="testimonial-avatar" src={t.avatar} alt={t.name} />
        <Box>
          <Box className="testimonial-name">{t.name}</Box>
          <Box className="testimonial-role">{t.role}</Box>
        </Box>

        {/* light quote circles like screenshot */}
        <Box className="testimonial-quotes" aria-hidden="true">
          <span />
          <span />
        </Box>
      </Box>
    </Box>
  );
}
