import { Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";

export default function BankOffer({ Data }) {
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
        <img
          src={`${serverURL}/images/${Data.bankicon}`}
          style={{ width: "85%" ,height:'45px'}}
          alt="BankImage"
          id={Data._id}
        />
    </Paper>
  );
}
