import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import { postData, serverURL } from "../../../services/FetchNodeServices";
import React from "react";
import Offer from "./Offer";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function TrendingCategory({ topcategory }) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(null);
  const [offerData, setOfferData] = React.useState([]);
  const navigate= useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  var [offerData1, offerData2] = [
    offerData.slice(0, Math.ceil(offerData.length / 2)), // First half
    offerData.slice(Math.ceil(offerData.length / 2)), // Second half
  ];

  const handlecategoryid=(e)=>{
    // alert(e.target.id)
    setSelectedItemIndex(e.target.id)
  }

  const handleShowMore=()=>{
    const queryString = new URLSearchParams({
      categoryid: selectedItemIndex,
    }).toString();
    navigate(`/categoryloadpage?${queryString}`);
  }

  const icon = [
    { iconname: "fashion.png" },
    { iconname: "airplane.png" },
    { iconname: "cutlery.png" },
    { iconname: "smartphone.png" },
    { iconname: "other.png" },
    { iconname: "cinema.png" },
  ];
  
  const couponData = (data) => {
    return data.map((item, index) => (
      <Offer key={index} icon={icon[index]} item={item} />
    ));
  };

  const fetchAllOffers = async () => {
    let categoryid = selectedItemIndex ?? "679620383367b31d34abf979";
    var response = await postData("coupon/display_coupons_by_category", {
      categoryid,
    });
    setOfferData(response.result);
  };

  React.useEffect(() => {
    fetchAllOffers();
  }, [selectedItemIndex]);


  const category = () => {
    return topcategory.map((item, i) => (
      <div
        id={item._id} // Add a key prop for React to efficiently update the list
        style={{
          width: "100%",
          height: "16%",
          borderRadius: 5,
          marginBottom: "5px", // Add some spacing between items
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor:'pointer'
        }}
        onClick={handlecategoryid}
      >
        <img src={`${serverURL}/images/${(icon[i]).iconname}`} alt="categoryicon" style={{width:35,height:35,marginRight:13}} id={item._id}/>
        <Typography
          component="h1"
          variant="h6"
          gutterBottom
          style={{ color: "#b12a5b" }}
          id={item._id}
        >
          {item.category_details.categoryname}
        </Typography>
      </div>
    ));
  };
  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(to bottom,#f1f5f8,#dfe8ef)",
        height: "700px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          style={{ color: "#b12a5b" ,marginTop:20}}
        >
          Top Coupons & Offers
        </Typography>
      </div>
      <div style={{ width: "80%", height: "95%" }}>
        <Box
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            flexDirection:matches?'column':'row'
          }}
        >
          <div
            style={{
              width: "24%",
              height: "95%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: 8,
            }}
          >
            <Paper style={{ width: "90%", height: "95%",display:'flex',flexDirection:'column' }}>{category()}</Paper>
          </div>
          <div
            style={{
              width: "74%",
              height: "90%",
              objectFit: "contain",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {couponData(offerData1)}
            </div>
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {couponData(offerData2)}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                style={{  color: "#B53471",width: "25%" }}
                onClick={handleShowMore}
              >
                Show More
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
