import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HighCashBackComponent from "./HighCashBackComponent";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { createRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function HighCashBackScroll({ item }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: matches ? 1 : 3.7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    centerMode: true,
    centerPadding: matches ? 30 : "25px",
  };

  const highcashback = [
    { cashback: "41.3%" },
    { cashback: "19.1%" },
    { cashback: "16.8%" },
    { cashback: "19.1%" },
    { cashback: "14.4%" },
    { cashback: "13.5%" },
    { cashback: "15%" },
    { cashback: "13.5%" },
  ];

  const companys = () => {
    return item.map((item, i) => {
      return (
        <HighCashBackComponent item={item} highcashback={highcashback[i]} />
      );
    });
  };

  var sref = createRef();

  const handleLeftArrow = () => {
    sref.current.slickPrev();
  };

  const handleRightArrow = () => {
    sref.current.slickNext();
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div
          onClick={handleLeftArrow}
          style={{
            opacity: 0.7,
            position: "absolute",
            top: 60,
            left: matches ? -18 : -30,
            zIndex: 2,
            width: 38,
            height: 38,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#b03a84",
            cursor: "pointer",
          }}
        >
          <KeyboardArrowLeftIcon style={{ fontSize: 28, color: "white" }} />
        </div>

        <Slider ref={sref} {...settings}>
          {companys()}
        </Slider>

        <div
          onClick={handleRightArrow}
          style={{
            opacity: 0.7,
            position: "absolute",
            top: 60,
            right: matches - 18,
            zIndex: 2,
            width: 38,
            height: 38,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#b03a84",
            cursor: "pointer",
          }}
        >
          <KeyboardArrowRightIcon style={{ fontSize: 28, color: "white" }} />
        </div>
      </div>
    </div>
  );
}
