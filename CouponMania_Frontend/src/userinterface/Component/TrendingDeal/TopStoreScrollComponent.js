import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrandingDeal from "./TrendingDeal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { createRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function TopStoreScrollComponent({ item }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  var settings = {
    dots: matches ? true : false,
    infinite: true,
    speed: 2000,
    slidesToShow: matches ? 1.5 : 5,
    slidesToScroll: matches ? 1 : 4,
    arrows: false,
    autoplay: matches ? true : false,
    centerMode: matches ? true : false,
    centerPadding: matches ? 30 : "",
  };

  const products = () => {
    return item.map((item, i) => {
      return <TrandingDeal item={item} />;
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
    <div className="slider-container">
      <div style={{ position: "relative" }}>
        {matches ? (
          <></>
        ) : (
          <div
            onClick={handleLeftArrow}
            style={{
              opacity: 0.7,
              position: "absolute",
              top: 155,
              left: -20,
              zIndex: 2,
              width: 38,
              height: 38,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#b03a84",
            }}
          >
            <KeyboardArrowLeftIcon
              style={{ fontSize: 28, color: "white", cursor: "pointer" }}
            />
          </div>
        )}
        <Slider ref={sref} {...settings}>
          {" "}
          {products()}
        </Slider>

        {matches ? (
          <></>
        ) : (
          <div
            onClick={handleRightArrow}
            style={{
              opacity: 0.7,
              position: "absolute",
              top: 155,
              right: -20,
              zIndex: 2,
              width: 38,
              height: 38,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#b03a84",
            }}
          >
            <KeyboardArrowRightIcon
              style={{ fontSize: 28, color: "white", cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
