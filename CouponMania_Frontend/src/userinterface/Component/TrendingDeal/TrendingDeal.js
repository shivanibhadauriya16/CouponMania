import { Avatar, Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";

export default function TrandingDeal({ item }) {
  return (
    <div style={{ display: "flex" }}>
      <Paper
        style={{
          width: 220,
          height: 320,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={2}
      >
        <div style={{ width: "70%", height: "40%", padding: 8 }}>
          <img
            src={`${serverURL}/images/${item.image}`}
            style={{ width: "100%", height: "100%" }}
            alt="productimage"
          />
        </div>
        <div style={{ width: "88%", height: "53%" }}>
          <div
            style={{
              height: "50%",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: 16, wordWrap: "break-word", color: "#333333" }}
            >
              {item.title.length > 40
                ? item.title.substring(0, 40) + ".."
                : item.title}
            </div>
          </div>
          <div
            style={{
              height: "50%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: "#e5fff5",
                height: "35%",
                width: "53%",
                display: "flex",
                justifyContent: "space-between",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/2.png"
                sx={{ width: 25, height: 25 }}
              />

              <div
                style={{
                  alignSelf: "center",
                  color: "#0b5b24",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {item.discount}
              </div>
            </div>

            <div
              style={{ display: "flex", alignItems: "center", marginTop: 12 }}
            >
              <div style={{ fontWeight: "bold", fontSize: 21 }}>
                &#8377;{item.originalPrice}
              </div>{" "}
              <div style={{ color: "#888888", fontSize: 14, marginLeft: 10 }}>
                <s>&#8377;{item.price}</s>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
