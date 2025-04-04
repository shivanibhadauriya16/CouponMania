import { Grid2, Paper } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from "html-react-parser";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ShowAllComponent({ item, bankDetails }) {
  const [buttonIcon, setButtonIcon] = useState(<KeyboardArrowUpIcon />);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonHead, setButtonHead] = useState("Show Details");
  const [open, setOpen] = React.useState(false);
  console.log(bankDetails);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButton = (e) => {
    if (buttonStatus == true) {
      setButtonHead("Show Details");
      setButtonIcon(<KeyboardArrowUpIcon />);
    } else {
      setButtonIcon(<KeyboardArrowDownIcon />);
      setButtonHead("Hide Details");
    }
    setButtonStatus(!buttonStatus);
  };
  return (
    <Paper elevation={3} style={{ borderRadius: 10 }}>
      <Grid2
        container
        spacing={4}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          background: "#fff",
          padding: 30,
        }}
      >
        <Grid2 style={{ marginLeft: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 27, fontWeight: "bold", color: "#333" }}>
              {item.couponname}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#333",
                marginTop: 6,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {item.couponsubheading.length < 70 ? item.couponsubheading : item.couponsubheading.slice(0, 70) + "..."
             }
            </div>
          </div>
        </Grid2>
        <Grid2 style={{ marginLeft: "auto" }}>
          <Button
            variant="contained"
            style={{ background: "#B53471" }}
            onClick={handleClickOpen}
          >
            Show Code
          </Button>
        </Grid2>
      </Grid2>
      <Divider />

      <Grid2
        style={{
          background: "#f5f5f5",
        }}
      >
        <Accordion style={{ color: "#B53471", padding: "4px 4px 4px 25px " }}>
          <AccordionSummary onClick={handleButton}>
            {buttonHead} {buttonIcon}
          </AccordionSummary>
          <AccordionDetails>{parse(item.coupondescription)}</AccordionDetails>
        </Accordion>
      </Grid2>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
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
                         padding: 10,
                         border: "0.5px solid black",
                         borderRadius: 5,
                         marginRight:20
                       }}
                     >
                       <img
                         src={`${serverURL}/images/${
                           bankDetails?.bankicon || "Loading..."
                         }`}
                         style={{ width: 90, height: 40}}
                         alt="logo"
                       />
                     </div>
                         <h4>{item.couponsubheading.length < 20 ? item.couponsubheading : item.couponsubheading.slice(0, 30) + "..."}</h4>
                       </div>
          }
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText >
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
                  background:'#fab1a0',
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
                {(item.couponcode).toUpperCase()}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
