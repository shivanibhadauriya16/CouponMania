import React, { useEffect } from "react";
import Template from "../assets/template.webp";
import Template2 from "../assets/template2.jpg";
import SliderComponent from "./Component/slide/SliderComponent";
import Header from "./Component/Header/Header";
import WelcomeComponent from "./Component/Welcome/WelcomeComponent";
import StepsComponent from "./Component/Steps/StepsComponent";
import FooterComponent from "./Component/footer/FooterComponent";
import FeedBackComponent from "./Component/FeedBack/FeedBackComponent";
import AboutComponent from "./Component/About/AboutComponent";
import TopStoreComponent from "./Component/topstore/TopStoreComponent";
import TrandingDealComponent from "./Component/TrendingDeal/TrandingDealComponent";
import HighCashBackScroll from "./Component/HighCashBcak/HighCashBackScroll";
import FAQComponent from "./Component/FAQ/FAQComponent";
import { useState } from "react";
import { getData } from "../services/FetchNodeServices";
import BankOffersComponent from "./Component/BankOffers/BankOffersComponent";
import WalletOffersComponent from "./Component/Wallet/WalletOffersComponent";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TrendingCategory from "./Component/Trending Category/TrendingCategory";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/***************************** Template2 ******************************************/

var template2 = () => {
  return (
    <div>
      <img
        src={Template2}
        alt="Template2"
        style={{ borderRadius: 5, width: 1300, height: 130 }}
      />
    </div>
  );
};

/****************************************************************************/

/***************************** Template ******************************************/

var template = () => {
  return (
    <div>
      <img
        src={Template}
        alt="Template1"
        style={{ borderRadius: 5, width: 1300, height: 130 }}
      />
    </div>
  );
};

/****************************************************************************/

/******************************* Offer Card *********************************************/

const products = [
  {
    id: 1,
    title: "Haier Microwave",
    price: 4839,
    originalPrice: 8599,
    discount: "Flat 3.2%",
    image: "HaierMicrowave.jpg",
    platform: "Amazon",
    platformlogo: "Amazon.png",
  },
  {
    id: 2,
    title:
      "Dot & Key Watermelon Cooling Sunscreen SPF 50+ PA++++ | With Hyaluronic Acid, Instantly Cools Skin, Broad Spectrum Protection | Controls Excess Oil, Checks Tanning, No White Cast, All Skin Types | 50g",
    price: 382,
    originalPrice: 445,
    discount: "Flat 14%",
    image: "dotkey.jpg",
    platform: "Flipkart",
    platformlogo: "Flipkart.png",
  },
  {
    id: 3,
    title:
      "SAMSUNG CUE60 108 cm (43 inch) 4K Ultra HD LED Tizen TV with Crystal Processor 4K (2023 model)",
    price: 25999,
    originalPrice: 52000,
    discount: "Flat 10%",
    image: "samsungcue.webp",
    platform: "Croma",
    platformlogo: "croma.png",
  },
  {
    id: 4,
    title:
      "Dell G15 - 5530 Gaming Laptop (13th Gen Intel Core i5-13450HX/16 GB/512 GB SSD/Nvidia RTX 3050 Graphics/Win 11/MSO/FHD)",
    price: 73299,
    originalPrice: 111999,
    discount: "Flat 30%",
    image: "delllaptop.jpg",
    platform: "Reliance Digital",
    platformlogo: "reliancedigital.png",
  },
  {
    id: 5,
    title: "Panasonic Microwave",
    price: 6599,
    originalPrice: 8999,
    discount: "Flat 6%",
    image: "PanasonicMicrowave.png",
    platform: "Tata Cliq",
    platformlogo: "tatacliq",
  },
  {
    id: 6,
    title:
      "Noise Colorfit Spark Smartwatch with 5.08 cm (2 inch) HD Display, Advanced Bluetooth Calling, Upto 7 Days Battery, 150+ Watch Faces & 100+ Sports Modes, Camera & Music Control (Jet Black)",
    price: 1999,
    originalPrice: 7999,
    discount: "Flat 71%",
    image: "NoiseColorfitSparkSmartwatch.jpg",
    platform: "Amazon.in",
    platformlogo: "Amazon.png",
  },
  {
    id: 7,
    title: "Bosch Microwave",
    price: 9999,
    originalPrice: 12999,
    discount: "Flat 15%",
    image: "BoschMicrowave.png",
    platform: "Flipkart",
    platformlogo: "Flipkart.png",
  },
  {
    id: 8,
    title:
      "Croma 4 in 1 Convertible 1.5 Ton 3 Star Inverter Split AC with Dust Filter (2023 Model, Copper Condenser, CRLA018IND283258)",
    price: 31990,
    originalPrice: 42499,
    discount: "Flat 23.83%",
    image: "cromesplitac.webp",
    platform: "Croma",
    platformlogo: "croma.png",
  },
  {
    id: 9,
    title:
      "LG 7 Kg 5 Star Inverter Fully-Automatic Top Loading Washing Machine (T70SKSF1Z, Middle Free Silver, Smart Motion & TurboDrum)",
    price: 19299,
    originalPrice: 22199,
    discount: "Flat 30%",
    image: "lgwashingmachine.jpg",
    platform: "Reliance Digital",
    platformlogo: "reliancedigital.png",
  },
  {
    id: 10,
    title:
      "Philips SalonDry HP8100/60 Thermo Protect Hair Dryer (Blue) Philips SalonDry HP8100/60 Thermo Protect Hair Dryer (Blue)",
    price: 1099,
    originalPrice: 1899,
    discount: "Flat 40%",
    image: "philipshairdryer.webp",
    platform: "Tata Cliq",
    platformlogo: "tatacliq",
  },
];

/****************************************************************************/

export default function LandingPage() {
  const [slidesData, setSlidesData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [topCategoryData, setTopCategoryData] = React.useState([]);
  const [topStore, setTopStore] = React.useState([]);
  const [highCashBackData, setHighCashBackData] = React.useState([]);

  const fetchAllTopCategory = async () => {
    var response = await getData("coupon/display_top_categories");
    setTopCategoryData(response.result);
  };

  const fetchAllHighCashBack = async () => {
    var response = await getData("coupon/top_cashback_companies");
    setHighCashBackData(response.result);
  };

  const fetchAllTopStore = async () => {
    var response = await getData("coupon//display_top_companies");
    setTopStore(response.result);
  };

  const fetchAllSlides = async () => {
    var response = await getData("slide/display_all");
    setSlidesData(response.result);
  };

  const fetchAllBank = async () => {
    var response = await getData("bank/display_all");
    setBankData(response.result);
  };

  const fetchAllWallet = async () => {
    var response = await getData("wallet/display_all");
    setWalletData(response.result);
  };

  useEffect(() => {
    fetchAllBank();
    fetchAllSlides();
    fetchAllWallet();
    fetchAllTopCategory();
    fetchAllTopStore();
    fetchAllHighCashBack();
  }, []);

  return (
    <div>
      <Header />
      <WelcomeComponent />
      <div
        style={{
          width: matches ? "95%" : "80%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifySelf: "center",
          marginBottom: 50,
        }}
      >
        <SliderComponent images={slidesData} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
        id="trendingdeal"
      >
        <TrandingDealComponent item={products} />
      </div>

      <div
        style={{
          marginBottom: 50,
          display: "flex",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <StepsComponent />
      </div>
      {matches ? (
        <></>
      ) : (
        <div style={{ marginBottom: 50, justifySelf: "center" }}>
          {template2()}
        </div>
      )}

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          marginBottom: 80,
          flexDirection: "column",
          color: "#b12a5b",
        }}
        id="store"
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          style={{ color: "#b12a5b", alignSelf: "center" }}
        >
          Top Stores
        </Typography>
        <TopStoreComponent topstore={topStore} />
      </div>

      <div
        style={{
          width: matches ? "90%" : "85%",
          height: "100%",
          marginBottom: 80,
          color: "#b12a5b",
          display: "flex",
          flexDirection: "column",
          justifySelf: "center",
          alignSelf: "center",
          padding: 10,
        }}
        id="highcashback"
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          style={{ color: "#b12a5b", alignSelf: "center" }}
        >
          High Cashback Stores
        </Typography>
        <HighCashBackScroll item={highCashBackData} />
      </div>

      {matches ? (
        <></>
      ) : (
        <div style={{ marginBottom: 60, justifySelf: "center" }}>
          {template()}
        </div>
      )}

      <Box
        id="highlights"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          color: "white",
          bgcolor: "hsl(220, 35%, 3%)",
          width: "100%",
        }}
      >
        <Container
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 3, sm: 6 },
          }}
        >
          <Box
            sx={{
              width: { sm: "100%", md: "60%" },
              textAlign: { sm: "left", md: "center" },
            }}
          >
            <Typography
              component="h2"
              variant="h4"
              gutterBottom
              style={{ color: "#b12a5b" }}
            >
              Looking For More Offers
            </Typography>
            <Typography variant="body1" sx={{ color: "grey.400" }}>
              Discover why Coupon Mania stands out: Maximum cashback,
              hassle-free tracking, and quick payouts. Enjoy a seamless
              experience with trusted savings on every purchase!
            </Typography>
          </Box>
        </Container>
        <div
          style={{
            height: "100%",
            width: matches ? "90%" : "85%",
            display: "flex",
            flexDirection: matches ? "column" : "row",
            justifyContent: "space-between",
            justifySelf: "center",
            marginTop: 25,
            marginRight: 20,
          }}
        >
          <div style={{ width: matches ? "100%" : "49%" }}>
            <BankOffersComponent bankdata={bankData} />{" "}
          </div>
          <div
            style={{
              width: matches ? "100%" : "49%",
              marginTop: matches ? 30 : "",
            }}
          >
            <WalletOffersComponent walletdata={walletData} />
          </div>
        </div>
      </Box>

      <div
        style={{
          marginTop: 40,
          width: matches ? "94%" : "80%",
          justifySelf: "center",
          marginBottom: 60,
        }}
        id="about"
      >
        <AboutComponent />
      </div>

      {matches ? (
        <></>
      ) : (
        <div id="category">
          <TrendingCategory topcategory={topCategoryData} />
        </div>
      )}

      <div id="review">
        <FeedBackComponent />
      </div>

      <div
        style={{
          width: matches ? "100%" : "80%",
          height: "100%",
          color: "#b12a5b",
          display: "flex",
          flexDirection: "column",
          justifySelf: "center",
        }}
        id="faq"
      >
        <FAQComponent />
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
}
