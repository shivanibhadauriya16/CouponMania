import { Avatar, Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import TopStore from "./TopStore";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

export default function TopStoreComponent({ topstore }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  var [firstTopStore, ...restTopStore] = topstore;
  var [topStoreData1, topStoreData2] = [
    restTopStore.slice(0, Math.ceil(restTopStore.length / 2)),
    restTopStore.slice(Math.ceil(restTopStore.length / 2)),
  ];

  const handleClick = (event) => {
    const queryString = new URLSearchParams({
      storeid: event.target.id,
    }).toString();
    navigate(`/topstoreloadpage?${queryString}`);
  };

  const TopStore1 = () => {
    return topStoreData1.map((item, i) => {
      return matches ? (
        i < 4 ? (
          <TopStore Data={item} />
        ) : (
          <></>
        )
      ) : (
        <TopStore Data={item} />
      );
    });
  };

  const TopStore2 = () => {
    return topStoreData2.map((item, i) => {
      return matches ? (
        i < 3 ? (
          <TopStore Data={item} />
        ) : (
          <></>
        )
      ) : (
        <TopStore Data={item} />
      );
    });
  };
  return (
    <div
      style={{
        width: matches ? "90%" : "80%",
        height: 340,
        background: "#ebf1ff",
        borderRadius: 10,
        padding: matches ? 0 : 15,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Left Section */}
      {matches ? (
        <></>
      ) : (
        <div
          style={{
            width: "25%",
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
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleClick}
              id={firstTopStore?._id}
            >
              <img
                src={`${serverURL}/images/${firstTopStore?.company_details?.companyicon}`}
                style={{ width: "70%" }}
                onClick={handleClick}
                id={firstTopStore?._id}
                alt="companyicon"
              />
            </div>

            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
              onClick={handleClick}
              id={firstTopStore?._id}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: "bolder",
                  color: "#b12a5b",
                  alignSelf: "center",
                }}
                id={firstTopStore?._id}
              >
                {firstTopStore?.company_details?.companyname}
              </div>

              <div
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#b12a5b",
                  marginBottom: 25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                id={firstTopStore?._id}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/2.png"
                  sx={{ width: 25, height: 25, marginRight: 1 }}
                />
                Upto 5.2% Voucher Rewards
              </div>
            </div>
          </Paper>
        </div>
      )}

      {/* Right Section */}
      <div
        style={{
          width: matches ? "100%" : "75%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: matches ? "100%" : "95%",
            height: "95%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TopStore1 />
          </div>
          <div
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TopStore2 />
            <Paper
              style={{
                width: matches ? "22%" : "17%",
                height: "90%",
                background: "white",
                borderRadius: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View All
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
