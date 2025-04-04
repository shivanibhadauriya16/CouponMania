import { Button, Divider, Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import { useState } from "react";
import logo from "../../../assets/Logo.png";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Offer({ item}) {
  console.log(item.companyid);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper
      style={{
        width: 240,
        height: 220,
        borderRadius: 8,
        padding: 15,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      elevation={3}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "",
        }}
      >
        <div style={{ padding: 5, width: "50%" }}>
          <img src={logo} style={{ width: 50, height: 50 }} />
        </div>
        <div
          style={{
            backgroundColor: "#f0f2f5",
            borderRadius: "6px",
            padding: 5,
            textAlign: "center",
            width: "50%",
            fontSize: 14,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {item.couponname}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 14, color: "#555" }}>
          {item.couponsubheading}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          style={{ background: "#B53471", width: "90%" }}
          onClick={handleClickOpen}
        >
          Show Code
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ background: "#f1f2f6" }} id="alert-dialog-title">
          {
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                  border: "0.5px solid black",
                  borderRadius: 5,
                  marginRight: 20,
                }}
              >
                <img
                  src={logo || "Loading..."}
                  style={{ width: 60, height: 40 }}
                  alt="logo"
                />
              </div>
              <h4>
                {item.couponsubheading.length < 20
                  ? item.couponsubheading
                  : item.couponsubheading.slice(0, 30) + "..."}
              </h4>
            </div>
          }
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <div
                style={{
                  maxWidth: 300,
                  maxHeight: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {"Copy and Use The Coupon"}
              </div>
              <img
                src={`${serverURL}/images/giftbox.gif`}
                style={{ width: "35%", height: "35%" }}
                alt="giftbox"
              />

              <div
                style={{
                  border: "1px solid red",
                  background: "#fab1a0",
                  maxWidth: 200,
                  maxHeight: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  fontSize: 22,
                  fontWeight: "bold",
                  borderRadius: 8,
                  marginTop: 10,
                }}
              >
                {item.couponcode.toUpperCase()}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
