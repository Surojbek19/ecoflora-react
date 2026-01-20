import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider, Typography } from "@mui/joy";

type Expert = {
  id: string;
  name: string;
  role: string;
  img: string; // put images in public/img/
};

const experts: Expert[] = [
  {
    id: "e1",
    name: "Lina Park",
    role: "Plant Care Specialist",
    img: "/img/expert3.JPG",
  },
  {
    id: "e2",
    name: "Daniel Hemolto",
    role: "Greenhouse Manager",
    img: "/img/expert2.jpg",
  },
  {
    id: "e3",
    name: "Leonard Allen",
    role: "Indoor Plant Stylist",
    img: "/img/expert1.JPG",
  },
  {
    id: "e4",
    name: "Alice Hamel",
    role: "Customer Support",
    img: "/img/expert4.jpg",
  },
];

export default function ActiveUsers() {
  return (
    <div className="experts-frame">
      <Container>
        <Stack className="experts-main">
          <Box className="experts-title">
            <h2>Our Experts</h2>
            <span className="experts-underline" />
            <p className="experts-subtitle">
              Real people who grow, select, and care for every plant we deliver.
            </p>
          </Box>

          <Stack className="experts-cards" direction="row">
            <CssVarsProvider>
              {experts.map((expert) => (
                <Card key={expert.id} className="expert-card" variant="outlined">
                  <CardOverflow className="expert-image">
                    <AspectRatio ratio="1">
                      <img src={expert.img} alt={expert.name} />
                    </AspectRatio>
                  </CardOverflow>

                  <CardContent className="expert-content">
                    <Typography className="expert-name">{expert.name}</Typography>
                    <Typography className="expert-role">{expert.role}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
