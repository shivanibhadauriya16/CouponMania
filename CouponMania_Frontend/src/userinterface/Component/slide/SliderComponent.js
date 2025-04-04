import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { createRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SliderComponent({ images }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  var settings = {
    dots: matches ? true : false,
    infinite: true,
    slidesToShow: matches ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: matches ? false : true,
    centerPadding: -10,
    arrows: false,
  };
  const navigate = useNavigate();
  const handleClick = (event) => {
    const queryString = new URLSearchParams({
      storeid: event.target.id,
    }).toString();
    navigate(`topstoreloadpage/?${queryString}`);
  };

  var sref = createRef();

  const handleLeftArrow = () => {
    sref.current.slickPrev();
  };

  const handleRightArrow = () => {
    sref.current.slickNext();
  };

  const showJobs = () => {
    return images.map((item) => {
      return (
        <div>
          <img
            src={`${serverURL}/images/${item.slideicon}`}
            style={{
              width: 600,
              height: 300,
              borderRadius: 20,
              cursor: "pointer",
            }}
            id={item.companyid}
            alt="Slide"
            onClick={handleClick}
          />
        </div>
      );
    });
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
              position: "absolute",
              top: 140,
              left: -20,
              zIndex: 2,
              width: 38,
              height: 38,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: matches ? "green" : "white",
            }}
          >
            <KeyboardArrowLeftIcon
              style={{ fontSize: 28, color: "black", cursor: "pointer" }}
            />
          </div>
        )}
        <Slider ref={sref} {...settings}>
          {showJobs()}
        </Slider>

        {matches ? (
          <></>
        ) : (
          <div
            onClick={handleRightArrow}
            style={{
              position: "absolute",
              top: 140,
              right: -20,
              zIndex: 3,
              width: 38,
              height: 38,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: matches ? "green" : "white",
            }}
          >
            <KeyboardArrowRightIcon
              style={{ fontSize: 28, color: "black", cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
