import { useStyles } from "./LandingPageTopSlidesCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { postData, getData } from "../../services/FetchNodeServices";
import * as React from "react";
import Upload from "../../assets/upload.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { upload } from "@testing-library/user-event/dist/upload";

export default function LandingPageTopSlides() {
  const classes = useStyles();
  const [formError, setformError] = useState("");
  const [icon, setIcon] = useState({ byte: "", filename: Upload });
  const [companyName, setCompanyName] = useState("");

  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;
    if (icon.byte.length === 0) {
      handleError("filename", "please Choose icon of company...");
      error = true;
    }
    if (companyName.length === 0) {
      handleError("companyname", "companyname should not be blank...");
      error = true;
    }

    return error;
  };

  const handleIconChange = (e) => {
    setIcon({
      byte: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handlesubmit = async () => {
    var error = validateData();
    if (error === false) {
      var formData = new FormData();

      formData.append("slideicon", icon.byte);
      formData.append("companyid", companyName);

      var response = await postData("slide/submit_slide", formData);
      if (response.status) {
        Swal.fire({
          icon: "success",
          text: response.message,
          toast: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: response.message,
          toast: true,
        });
      }
    }
    clearData();
  };

  const clearData = () => {
    setIcon({ filename: upload, byte: "" });
    setCompanyName("");
  };
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TitleComponent title="Slides Registartion" />
          </Grid>
          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>

          <Grid size={12}>
            <TextField
              helperText={formError.companyname}
              error={formError.companyname}
              onFocus={() => handleError("companyname", "")}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              label="Company Name"
              fullWidth
            />
          </Grid>

          <Grid
            size={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={icon.filename}
              style={{ width: "15%", alignSelf: "center" }}
            />
            <div className={classes.helperTextStyle}>{formError.filename}</div>
          </Grid>

          <Grid size={12}>
            <Button
              startIcon={<CloudUploadIcon />}
              onChange={handleIconChange}
              fullWidth
              component="label"
              variant="contained"
              style={{ marginTop: 10 }}
            >
              <input type="file" multiple hidden accept="image/*" />
              Upload Slide
            </Button>
          </Grid>

          <Grid size={6}>
            <Button fullWidth variant="contained" onClick={handlesubmit}>
              Save
            </Button>
          </Grid>

          <Grid size={6}>
            <Button fullWidth variant="contained" onClick={clearData}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
