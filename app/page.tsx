import Homepage from "@/components/LandingPage/Homepage";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Poultry Collective",
  description: "Buy and Sell Poultry Eggs with Ease, Anywhere, Anytime",
};

const Home: NextPage = () => {
  return <Homepage />;
};

export default Home;
