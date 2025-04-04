import MaterialTable from "@material-table/core";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Upload from "../../assets/upload.png";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./BankRegCSS";

export default function DisplayAllBankReg() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [icon, setIcon] = useState({ byte: "", filename: "upload.png" });
  const [bankName, setBankName] = useState("");
  const [bankDescription, setBankDescription] = useState("");
  const [formError, setformError] = useState({ filename: "" });
  const [bankData, setBankData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [tempPicture, settempPicture] = useState();
  const [open, setOpen] = useState(false);
  const [bankId, setBankId] = useState("");

  /***********************************/

  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;

    if (bankName.length === 0) {
      handleError("bankname", "Bank Name should not be blank...");
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
    formData.append("_id", bankId);
    formData.append("bankicon", icon.byte);

    var response = await postData("bank/edit_bank_picture", formData);
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
    fetchAllBank();
  };

  const handlesubmit = async () => {
    var body = {
      bankname: bankName,
      _id: bankId,
      bankdescription: bankDescription,
    };

    var response = await postData("bank/submit_bankname", body);
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
    fetchAllBank();
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
    setBankName("");
    setBankDescription("");
    setIcon({ byte: "", filename: "upload.png" });
  };

  const deleteData = async () => {
    var body = { id: bankId };
    var response = await postData("bank/delete_bank", body);
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
    fetchAllBank();
    setOpen(false);
  };
  const showBankForm = () => {
    return (
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TitleComponent title="Bank Registartion" />
            </Grid>

            <Grid
              size={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Divider style={{ width: "98%" }} />
            </Grid>

            <Grid size={12}>
              <TextField
                helperText={formError.bankname}
                error={formError.bankname}
                onFocus={() => handleError("bankname", "")}
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                label="Bank Name"
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                helperText={formError.bankdescription}
                error={formError.bankdescription}
                onFocus={() => handleError("bankdescription", "")}
                value={bankDescription}
                onChange={(e) => setBankDescription(e.target.value)}
                label="Bank Description"
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
                alt="Bank Icon"
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
                  Upload Bank Logo
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

  /**************************************/

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
    setBankId(rowData._id);
    setBankName(rowData.bankname);
    setBankDescription(rowData.bankdescription);
    setIcon({
      byte: "",
      filename: `${serverURL}/images/${rowData.bankicon}`,
    });
    settempPicture(rowData.bankicon);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const fetchAllBank = async () => {
    var response = await getData("bank/display_all");
    setBankData(response.result);
  };

  useEffect(() => {
    fetchAllBank();
  }, []);

  const showDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{showBankForm()}</DialogContent>

        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  function ShowAllBanks() {
    return (
      <MaterialTable
        title="Banks List"
        columns={[
          { title: "Bank ID", field: "_id" },
          { title: "Bank Name", field: "bankname" },
          {
            title: "Bank Description",
            render: (rowData) =>
              rowData.bankdescription.length >= 30
                ? rowData.bankdescription.slice(0, 30) + "..."
                : rowData.bankdescription,
          },
          {
            title: "Bank Icon",
            render: (rowData) => (
              <img
                src={`${serverURL}/images/${rowData.bankicon}`}
                alt="Logo"
                width={50}
              />
            ),
          },
        ]}
        data={bankData}
        options={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
          toolbar: true,
          paging: true,
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Bank",
            onClick: (event, rowData) => openDialog(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Bank",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboardadmin/bankregistration"),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.roott}>
      <div className={classes.boxx}>
        {ShowAllBanks()}
        {showDialog()}
      </div>
    </div>
  );
}
