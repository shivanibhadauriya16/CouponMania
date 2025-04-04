import MaterialTable from "@material-table/core";
import { useStyles } from "./CompanysCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import  Upload  from "../../assets/upload.png";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCompanys() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [icon, setIcon] = useState({ byte: "", filename: Upload });
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [formError, setformError] = useState({ filename: "" });
  const [company, setCompany] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [tempPicture, settempPicture] = useState();
  const [open, setOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");

  const cancelPicture = () => {
    setIcon({ byte: "", filename: `${serverURL}/images/${tempPicture}` });
    setButtonStatus(false);
  };

  const editAndCancel = () => {
    return (
      <div>
        <Button onClick={handlePictureEdit}>Edit</Button>
        <Button onClick={cancelPicture}>Cancel</Button>
      </div>
    );
  };

  const openDialog = (rowData) => {
    setCompanyId(rowData._id);
    setCompanyName(rowData.companyname);
    setCompanyDescription(rowData.companydescription)
    setIcon({
      byte: "",
      filename: `${serverURL}/images/${rowData.companyicon}`,
    });
    settempPicture(rowData.companyicon);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const fetchAllCompany = async () => {
    var response = await getData("company/display_all");
    setCompany(response.result);
  };

  useEffect(() => {
    fetchAllCompany();
  }, []);

  const showDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{showCompanyForm()}</DialogContent>

        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  /***********************Company Form**************************/
  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;
    if (companyName.length === 0) {
      handleError("companyname", "cmpanyname should not be blank...");
      error = true;
    }

    if (icon.byte.length === 0) {
      handleError("filename", "please Choose icon of company...");
      error = true;
    }

    return error;
  };

  const handlePictureEdit = async () => {
    var formData = new FormData();
    formData.append("_id", companyId);
    formData.append("companyicon", icon.byte);

    var response = await postData("company/edit_company_picture", formData);
    if (response.status) {
      Swal.fire({
        icon: "success",
        text: response.message,
        toast: true,
      });
      setButtonStatus(false);
    } else {
      Swal.fire({
        icon: "error",
        text: response.message,
        toast: true,
      });
      setButtonStatus(false);
    }
    fetchAllCompany();
  };

  const handlesubmit = async () => {
    var body = { companyname: companyName, _id: companyId ,companydescription : companyDescription};

    var response = await postData("company/submit_companyname", body);
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
    clearData();
    fetchAllCompany();
  };

  const handleIconChange = (e) => {
    setButtonStatus(true);
    setIcon({
      byte: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    });
    handleError("filename", "");
  };

  const clearData = () => {
    setCompanyName("");
    setCompanyDescription("")
    setIcon({ byte: "", filename: "upload.png" });
  };

  const deleteData = async () => {
    var body = { id: companyId };
    var response = await postData("company/delete_company", body);
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
    fetchAllCompany();
    setOpen(false);
  };

  const showCompanyForm = () => {
    return (
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TitleComponent title="Edit Companys Registartion" />
            </Grid>

            <Grid
              size={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
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

            <Grid size={12}>
            <TextField
              helperText={formError.companydescription}
              error={formError.companydescription}
              onFocus={() => handleError("companydescription", "")}
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              label="Company Description"
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
                alt="Company Logo"
                style={{ width: "15%", alignSelf: "center" }}
              />
              <div className={classes.helperTextStyle}>
                {formError.filename}
              </div>
            </Grid>

            <Grid size={12}>
              {buttonStatus ? (
                editAndCancel()
              ) : (
                <Button
                  startIcon={<CloudUploadIcon />}
                  onChange={handleIconChange}
                  fullWidth
                  component="label"
                  variant="contained"
                  style={{ marginTop: 10 }}
                >
                  <input type="file" multiple hidden accept="image/*" />
                  Upload Company Logo
                </Button>
              )}
            </Grid>

            <Grid size={6}>
              <Button fullWidth variant="contained" onClick={handlesubmit}>
                Edit
              </Button>
            </Grid>

            <Grid size={6}>
              <Button fullWidth variant="contained" onClick={deleteData}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  /*************************************************************/

  function ShowAllCompanys() {
    return (
      <MaterialTable
        title="Companys List"
        columns={[
          { title: "Company ID", field: "_id" },
          { title: "Company Name", field: "companyname" },
          {
            title: "Company Description",
            render: (rowData) => (
              rowData.companydescription.length >= 30 
                ? rowData.companydescription.slice(0, 30)+"..." 
                : rowData.companydescription
            ),
          }, 
          {
            title: "Company Icon",
            render: (rowData) => (
              <img
                src={`${serverURL}/images/${rowData.companyicon}`}
                alt="Logo"
                width={50}
              />
            ),
          },
        ]}
        data={company}
        options={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
          toolbar: true,
          paging: true,
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Company",
            onClick: (event, rowData) => openDialog(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Company",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboardadmin/companys"),
          },
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
