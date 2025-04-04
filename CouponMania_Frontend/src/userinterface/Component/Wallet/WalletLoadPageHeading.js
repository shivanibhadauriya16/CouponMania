import { Grid2, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { postData, serverURL } from "../../../services/FetchNodeServices";
import WalletShowAllComponent from "./WalletShowAllComponent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function WalletLoadPageHeading({ walletid }) {
  const [walletOfferList, setWalletOfferList] = useState([]);
  const [walletDetails, setWalletDetails] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchAllWalletOffer = async () => {
    var response = await postData("coupon/fetch_walletoffer", { walletid });
    setWalletOfferList(response.data);
  };

  const fetchAllWalletDetails = async () => {
    var response = await postData("coupon/fetch_walletdetails", { walletid });
    console.log(JSON.stringify(response.data[0]));
    setWalletDetails(response.data[0]);
  };

  const showWalletOffer = () => {
    return walletOfferList.map((item) => {
      return (
        <div>
          <WalletShowAllComponent item={item} walletDetails={walletDetails} />
        </div>
      );
    });
  };

  useEffect(() => {
    fetchAllWalletOffer();
    fetchAllWalletDetails();
  }, []);

  return (
    <Grid2 style={{ display: "flex", Object: "fit" }} container>
      <Grid2
        style={{
          background: "#272e3a",
          height: 380,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: matches ? "end" : "center",
          flexDirection: matches ? "column" : "row",
        }}
        size={12}
      >
        <img
          src={`${serverURL}/images/${
            walletDetails?.walleticon || "Loading..."
          }`}
          style={{
            width: 150,
            height: 80,
            marginRight: 40,
            borderRadius: 10,
            marginTop: matches ? 110 : "",
          }}
          alt="logo"
        />
        <div
          style={{
            height: "60%",
            width: matches ? "90%" : "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: 25, fontWeight: 500, color: "#fff" }}>
            {walletDetails?.walletname || "Loading..."} Offers & Coupons
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
          >
            {showAll
              ? walletDetails?.walletdescription || "Loading..."
              : (walletDetails?.walletdescription?.slice(0, 100) ||
                  "Loading...") +
                (walletDetails?.walletdescription?.length > 100 ? "..." : "")}

            {walletDetails?.walletdescription?.length > 100 && (
              <Button
                variant="text"
                onClick={() => setShowAll(!showAll)}
                style={{ color: "white", marginLeft: 5 }}
              >
                {showAll ? "View Less" : "View More"}
              </Button>
            )}
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
            width: matches ? "90%" : "47%",
            display: "flex",
            flexDirection: "column",
            margin: "30px 0px 30px 0px",
          }}
          container
          spacing={4}
        >
          {showWalletOffer()}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
