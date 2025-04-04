import { Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import WalletOffer from "./WalletOffer";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function WalletOffersComponent({ walletdata }) {
  const midIndex = Math.ceil(walletdata.length / 2);
  const firstHalf = walletdata.slice(0, midIndex);
  const secondHalf = walletdata.slice(midIndex);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const FirstWalletOffer = () => {
    return firstHalf.map((item, i) => {
      return <WalletOffer Data={item} />;
    });
  };

  const SecondWalletOffer = () => {
    return secondHalf.map((item, i) => {
      return <WalletOffer Data={item} />;
    });
  };

  const handleClick = (event) => {
    // alert("On Click : " + event.target.id);
    //navigate("/searchjobs",{state:{skill:skill}})
    const queryString = new URLSearchParams({
      walletid: event.target.id,
    }).toString();
    navigate(`/walletloadpage?${queryString}`);
  };

  return (
    <div
      style={{
        width: matches?"100%":"92%",
        height: 230,
        background: "#f5f8ff",
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          width: "40%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          style={{
            width: "95%",
            height: "95%",
            borderRadius: 15,
            background: "#e5ebff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img
              src={`${serverURL}/images/wallet-offers-icon.svg`}
              alt="BankOffer"
            />
            <div
              style={{
                fontSize: 18,
                fontWeight: "bolder",
                color: "#b12a5b",
                marginTop: 20,
              }}
            >
              Wallet Offers
            </div>
          </div>
        </Paper>
      </div>

      {/* Right Section */}
      <div
        style={{
          width: "75%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "95%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleClick}
        >
          {/* /***************************/}
          <div
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <FirstWalletOffer />
          </div>
          {/* /***************************/}
          {/* /***************************/}
          <div
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <SecondWalletOffer />
          </div>
          {/* /***************************/}
        </div>
      </div>
    </div>
  );
}
