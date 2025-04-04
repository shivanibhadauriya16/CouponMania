import MaterialTable from "@material-table/core";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./LandingPageTopSlidesCSS";
import * as React from "react";
import Upload from "../../assets/upload.png";
import { upload } from "@testing-library/user-event/dist/upload";

export default function DisplayAllSlides() {
  const classes = useStyles();
  const navigate = useNavigate()
  const [formError, setformError] = useState("");
  const [icon, setIcon] = useState({ byte: "", filename: Upload });
  const [tempPicture, settempPicture] = useState();
  const [open, setOpen] = useState(false);
  const [slideId, setSlideId] = useState("");
  const [slideData, setSlideData] = useState([]);

  const cancelPicture = () => {
    setIcon({ byte: "", filename: `${serverURL}/images/${tempPicture}` });
  };

  const openDialog = (rowData) => {
    setSlideId(rowData._id);
    setIcon({ byte: "", filename: `${serverURL}/images/${rowData.slideicon}` });
    settempPicture(rowData.slideicon);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const fetchAllSlides = async () => {
    var response = await getData("slide/display_all");
    setSlideData(response.result);
  };

  useEffect(() => {
    fetchAllSlides();
  }, []);

  const showDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{showSlideform()}</DialogContent>

        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;
    if (icon.byte.length === 0) {
      handleError("filename", "please Choose icon of company...");
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

  const deleteData = async () => {
    var body = { id: slideId };
    var response = await postData("slide/delete_slide", body);
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
    fetchAllSlides();
    setOpen(false);
  };

  const showSlideform = () => {
    return (
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TitleComponent title="Slides Registartion" />
            </Grid>
            <Grid
              size={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Divider style={{ width: "98%" }} />
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
              <div className={classes.helperTextStyle}>
                {formError.filename}
              </div>
            </Grid>

            {/* <Grid size={12}>
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
            </Grid> */}

            <Grid size={6}>
              <Button fullWidth variant="contained" onClick={deleteData}>
                Delete
              </Button>
            </Grid>

            <Grid size={6}>
              <Button fullWidth variant="contained" onClick={cancelPicture}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  function ShowAllCompanys() {
    return (
      <MaterialTable
        title="Slides List"
        columns={[
          { title: "Slide ID", field: "_id" },
          {
            title: "Slide Images",
            render: (rowData) => (
              <img
                src={`${serverURL}/images/${rowData.slideicon}`}
                alt="Logo"
                width={50}
              />
            ),
          },
        ]}
        data={slideData}
        options={{
          pageSize: 4,
          pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
          toolbar: true,
          paging: true,
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Save User",
            onClick: (event, rowData) => openDialog(rowData),
          },
          {
            icon: 'add',
            tooltip: 'Add Company',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboardadmin/landingpageslides")
          }
        ]}
      />
    );
  }
  return (
    <div className={classes.roott}>
      <div className={classes.boxx}>
        {ShowAllCompanys()}
        {showDialog()}
      </div>
    </div>
  );
}
