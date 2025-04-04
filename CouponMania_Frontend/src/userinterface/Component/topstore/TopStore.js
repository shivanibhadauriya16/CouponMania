import { Avatar, Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function TopStore({ Data }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = (event) => {
    const queryString = new URLSearchParams({
      storeid: event.target.id,
    }).toString();
    navigate(`/topstoreloadpage?${queryString}`);
  };
  return (
    <Paper
      style={{
        width: matches ? "22%" : "17%",
        height: "90%",
        background: "white",
        borderRadius: 15,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={handleClick}
        id={Data._id}
      >
        <img
          src={`${serverURL}/images/${Data.company_details.companyicon}`}
          style={{ width: "70%" }}
          id={Data._id}
          alt="logo"
        />
      </div>

      <div
        style={{
          width: "100%",
          height: "40%",
          display: "flex",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: "bold",
          color: "#b12a5b",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "center",
          flexDirection:matches?'column':'row'
        }}
        id={Data._id}
        onClick={handleClick}
      >
        <Avatar
          alt="Remy Sharp"
          src="/2.png"
          sx={{ width: 25, height: 25, marginRight: 1 }}
        />
        {Data.company_details.companyname}
      </div>
    </Paper>
  );
}
