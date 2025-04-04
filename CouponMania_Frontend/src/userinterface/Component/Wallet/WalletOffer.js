import { Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";

export default function WalletOffer({ Data }) {
  return (
    <Paper
      style={{
        width: "30%",
        height: "85%",
        background: "white",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor:'pointer',
      }}
      id={Data._id}
    >
      <div
        style={{
          width: "100%",
          height: "55%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`${serverURL}/images/${Data.walleticon}`}
          style={{ width: "75%" }}
          alt="BankImage"
          id={Data._id}
        />
      </div>
    </Paper>
  );
}
