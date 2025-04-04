import { Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import TopStoreScrollComponent from "./TopStoreScrollComponent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function TrandingDealComponent({ item }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      style={{
        backgroundImage: `url(${serverURL}/images/background.png)`,
        height: matches ? "68vh" : "60vh",
        width: matches ? "95%" : "80%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "95%",
          height: "13%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: 5,
            marginLeft: 5,
            fontSize: 22,
            fontWeight: 800,
            color: "#B53471",
            background: "none",
          }}
        >
          Top Deals
        </div>
        <Paper
          style={{
            padding: 5,
            marginRight: 5,
            fontSize: 20,
            fontWeight: 600,
            background: "#B53471",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Show More
        </Paper>
      </div>
      <div
        style={{
          width: matches ? "100%" : "95%",
          height: "67%",
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        <TopStoreScrollComponent item={item} />
      </div>
    </div>
  );
}
