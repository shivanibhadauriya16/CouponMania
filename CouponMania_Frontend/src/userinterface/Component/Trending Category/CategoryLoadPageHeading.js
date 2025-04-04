import { Button, Grid2 } from "@mui/material";
import { useState, useEffect } from "react";
import { postData, serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CategoryShowAllComponent from "./CategoryShowAllComponent";
import logo from "../../../assets/Logo.png";

export default function CategoryLoadPageHeading({ categoryid }) {
  const [topStoreOfferList, setCategoryCouponList] = useState([]);
  const [categoryDetails, setTCategoryDetails] = useState(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchAllCategoryOffer = async () => {
    var response = await postData("coupon/display_coupons_by_categoryid", { categoryid});
    setCategoryCouponList(response.result);
  };

  const fetchAllCategoryDetails = async () => {
    var response = await postData("coupon/display_category_details", { categoryid});
    setTCategoryDetails(response.result);
    console.log(response.result)
  };

  const showTopStoreOffer = () => {
    return topStoreOfferList.map((item) => {
      return (
        <div>
          <CategoryShowAllComponent
            item={item}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    fetchAllCategoryOffer();
    fetchAllCategoryDetails()
  }, []);

  return (
    <Grid2 style={{ display: "flex",Object:'fit' }} container>
      <Grid2
        style={{
          background: "#272e3a",
          height: matches?380:300,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent:matches?'end': "center",
          flexDirection:matches?'column':'row',
        }}
        size={12}
      >
        <img
          src={logo || "Loading..."}
          style={{ width: 150, height: 80, marginRight: 40, borderRadius: 10 ,marginTop:matches?110:'',background:'white'}}
          alt="logo"
        />
        <div
          style={{
            height: "60%",
            width:matches?'90%': "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom:10
          }}
        >
          <div style={{ fontSize: 25, fontWeight: 500, color: "#fff" }}>
            {categoryDetails?.categoryname || "Loading..."} Cashback and Offer
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#fff",
              marginTop: 6,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >Highlight the benefits of exploring the category.
          </div>
        </div>
      </Grid2>
      <Grid2
        style={{
          height: "auto",
          background: "#f5f5f5",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid2
          style={{
            width:matches?"90%": "47%",
            display: "flex",
            flexDirection: "column",
            margin: "30px 0px 30px 0px",
          }}
          container
          spacing={4}
        >
          {showTopStoreOffer()}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
