import { testimonyProps } from "@/@types";
import abc_farm from "@/public/assets/abc_farm.png";
import egg_bears from "@/public/assets/egg_bearers.png";
import tech_farm from "@/public/assets/whyUs_img.png";

export const testimony: testimonyProps[] = [
  {
    id: 1,
    testimony:
      "I love the ease it takes `to set up my storefront and get new customers from my location. Poultry Collective is such a convenient platform.",
    name: "ABC Farm",
    src: abc_farm,
  },

  {
    id: 2,
    testimony:
      "Poultry Collective is so easy to use. I that I can simply register my location and buy.",
    name: "Tech Farm",
    src: tech_farm,
  },

  {
    id: 3,
    testimony:
      "Lorem ipsum dolor sit amet consectetur. Malesuada sed ultrices sem varius augue. Ultrices facilisis malesuada nisl eget nunc etiam.",
    name: "Egg Bearers",
    src: egg_bears,
  },
];
