import { Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function HighCashBackComponent({ item, highcashback }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = (event) => {
    const queryString = new URLSearchParams({
      cashbackid: event.target.id,
    }).toString();
    navigate(`/highcashbackloadpage?${queryString}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <Paper
        style={{
          width: matches ? "350" : "300px",
          height: "130px",
          display: "flex",
          padding: 10,
          border: "solid 1px #eaeaea",
          cursor: "pointer",
        }}
        onClick={handleClick}
        id={item?._id}
      >
        <div
          style={{
            width: "35%",
            height: "100%",
            marginRight: 8,
            border: "solid 1px #f4f4f4",
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id={item?._id}
        >
          <img
            src={`${serverURL}/images/${(item?.companyDetails).companyicon}`}
            alt="logo"
            width={"90%"}
            id={item?._id}
          />
        </div>
        <div
          style={{
            width: "65%",
            height: "96%",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
          }}
          id={item?._id}
        >
          <div
            style={{ fontSize: 18, letterSpacing: "0.28px", color: "#333" }}
            id={item.id}
          >
            {item?.companyDetails?.companyname}
          </div>

          <div
            style={{
              background: "#e5fff5",
              display: "flex",
              padding: 5,
              borderRadius: 5,
            }}
            id={item?._id}
          >
            <Avatar
              alt="Remy Sharp"
              src="/2.png"
              sx={{ width: 25, height: 25 }}
              id={item?._id}
            />

            <div
              style={{
                alignSelf: "center",
                color: "#0b5b24",
                fontSize: 14,
                fontWeight: "bold",
                marginLeft: 4,
              }}
              id={item?._id}
            >
              Flat {highcashback?.cashback} CashBack
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
