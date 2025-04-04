import React from "react";
import reveal from "../../../assets/reveal.png";
import select from "../../../assets/select.png";
import search from "../../../assets/search.png";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function StepsComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const StepsData = [
    {
      step: "Step One",
      title: "Search/Find your Coupon",
      icon: search,
    },
    {
      step: "Step Two",
      title: "Select Your Coupon",
      icon: select,
    },
    {
      step: "Step Three",
      title: "Click on Show Coupon to reveal Coupon Code",
      icon: reveal,
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: matches ? "90%" : "80%",
        padding: 10,
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        gutterBottom
        style={{ color: "#b12a5b", marginBottom: 20, alignSelf: "center" }}
      >
        Three Steps to save with CouponMania
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: matches ? "column" : "row",
          alignItems: "center",
        }}
      >
        {StepsData.map((item, index) => (
          <div
            style={{
              background: "#f1f2f6",
              width: 330,
              border: "1px solid #ddd",
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: matches ? 15 : "",
            }}
          >
            <img
              alt="step"
              src={item.icon}
              width={"18%"}
              style={{ margin: 40 }}
            />
            <div>
              <h3>{item.step}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
