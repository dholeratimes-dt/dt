import img1 from "@/assets/gallery/sir/5000mw-solar-park-dholera-times.webp";
import img2 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-butterfly-dholera-times.webp";
import img3 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-dholera-times.webp";
import img4 from "@/assets/gallery/sir/cargo-terminal-dholera-international-airport-dholera-times.webp";
import img5 from "@/assets/gallery/sir/infrastruction-activation-area-dholera-times.webp";
import img6 from "@/assets/gallery/sir/main-gate-tata-semiconductor-plant-dholera-times.webp";
import img7 from "@/assets/gallery/sir/renew-solar-cell-manufacturing-plant-dholera-times.webp";
import img8 from "@/assets/gallery/sir/riverfront-dholera-activation-area-dholera-times.webp";
import img9 from "@/assets/gallery/sir/runway-dholera-international-airport-dholera-times.webp";
import img10 from "@/assets/gallery/sir/silk-route-park-activation-area-dholera-times.webp";
import img11 from "@/assets/gallery/sir/tata-semiconductor-plant-construction-dholera-times.webp";
import img12 from "@/assets/gallery/sir/tata-solar-park-dholera-times.webp";
import img13 from "@/assets/gallery/sir/water-treatment-plant-dholera-times.webp";
import img14 from "@/assets/gallery/sir/westwyn-estate-dholera-residential-plots.webp";

/* GALLERY DATA*/

export const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: "Solar Park Dholera",
    caption: "5000 MW Solar Park – Dholera",
    link: "https://www.youtube.com/shorts/jm3u-IbngnA",
  },
  {
    id: 2,
    src: img2,
    alt: "Ahmedabad-Dholera Expressway",
    caption: "Ahmedabad–Dholera Expressway Butterfly Junction",
    link: "https://www.youtube.com/shorts/zNflaDMDvlw",
  },
  {
    id: 3,
    src: img4,
    alt: "Dholera International Airport",
    caption: "Ahmedabad–Dholera Expressway",
    link: "https://www.youtube.com/shorts/8xulcipgb1w",
  },
  {
    id: 4,
    src: img7,
    alt: "Dholera ReNew Power Plant",
    caption: "Cargo Terminal – Dholera International Airport",
    link: "https://www.youtube.com/shorts/FUINp8jCK5k",
  },
  {
    id: 5,
    src: img5,
    alt: "Dholera Activation Area Infrastructure",
    caption: "Infrastructure – Dholera Activation Area",
  },
  {
    id: 6,
    src: img6,
    alt: "Tata Semiconductor Plant Dholera",
    caption: "Main Gate – Tata Semiconductor Plant",
    link: "https://www.youtube.com/shorts/Qmyg21f-h0U",
  },
  {
    id: 7,
    src: img3,
    alt: "Dholera Expressway",
    caption: "ReNew Solar Cell Manufacturing Plant",
    link: "https://www.youtube.com/shorts/8xulcipgb1w",
  },
  {
    id: 8,
    src: img8,
    alt: "Dholera Riverfront Development",
    caption: "Riverfront – Dholera Activation Area",
  },
  {
    id: 9,
    src: img9,
    alt: "Dholera International Airport Runway",
    caption: "Runway – Dholera International Airport",
    link: "https://www.youtube.com/shorts/8xulcipgb1w",
  },
  {
    id: 10,
    src: img10,
    alt: "Dholera Silk Route Park",
    caption: "Silk Route Park – Activation Area",
  },
  {
    id: 11,
    src: img11,
    alt: "Semiconductor Plant in Dholera",
    caption: "Tata Semiconductor Plant – Construction Phase",
    link: "https://www.youtube.com/shorts/Qmyg21f-h0U",
  },
  {
    id: 12,
    src: img12,
    alt: "Tata Solar Park Dholera",
    caption: "Tata Solar Park – Dholera",
    link: "https://www.youtube.com/shorts/jm3u-IbngnA",
  },
  {
    id: 13,
    src: img13,
    alt: "Water Treatment Plant Dholera",
    caption: "Water Treatment Plant – Dholera",
    link: "https://www.youtube.com/shorts/eQSdLClaJ6g",
  },
  {
    id: 14,
    src: img14,
    alt: "Residential Plots in Dholera",
    caption: "WestWyn Estate – Dholera Residential Plots",
  },
];

/* LIGHTWEIGHT CLIENT DATA*/

export const galleryClientItems = galleryImages.map(
  ({ id, src, alt, link }) => ({
    id,
    src: src.src,
    alt,
    link: link || null,
  }),
);