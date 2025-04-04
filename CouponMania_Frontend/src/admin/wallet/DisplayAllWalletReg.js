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
import { useStyles } from "./WalletRegCSS";

export default function DisplayAllWalletReg() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [icon, setIcon] = useState({ byte: "", filename: "upload.png" });
  const [formError, setformError] = useState({ filename: "" });
  const [walletData, setWalletData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [tempPicture, settempPicture] = useState();
  const [open, setOpen] = useState(false);
  const [walletId, setWalletId] = useState("");
  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;

    if (walletName.length === 0) {
      handleError("walletname", "Wallet Name should not be blank...");
      error = true;
    }
    if (walletDescription.length === 0) {
      handleError(
        "walletdescription",
        "Wallet Description should not be blank..."
      );
      error = true;
    }
    if (icon.byte.length === 0) {
      handleError("filename", "please Choose icon of Bank...");
      error = true;
    }

    return error;
  };

  const handlePictureEdit = async () => {
    var formData = new FormData();
    formData.append("_id", walletId);
    formData.append("walleticon", icon.byte);

    var response = await postData("wallet/edit_wallet_picture", formData);
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
    fetchAllWallet();
  };

  const handlesubmit = async () => {
    var body = {
      walletname: walletName,
      _id: walletId,
      walletdescription: walletDescription,
    };

    var response = await postData("wallet/submit_walletname", body);
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
    fetchAllWallet();
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
    setWalletName("");
    setWalletDescription("");
    setIcon({ byte: "", filename: "upload.png" });
  };

  const deleteData = async () => {
    var body = { id: walletId };
    var response = await postData("wallet/delete_wallet", body);
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
    fetchAllWallet();
    setOpen(false);
  };

  const showWalletForm = () => {
    return (
      <div>
        <div>
          <Grid container spacing={2}>
          <Grid size={12}>
            <TitleComponent title="Wallet Registartion" />
          </Grid>

          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>


          <Grid size={12}>
            <TextField
              helperText={formError.walletname}
              error={formError.walletname}
              onFocus={() => handleError("walletname", "")}
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              label="Wallet Name"
              fullWidth
            />
          </Grid>

          <Grid size={12}>
            <TextField
              helperText={formError.walletdescription}
              error={formError.walletdescription}
              onFocus={() => handleError("walletdescription", "")}
              value={walletDescription}
              onChange={(e) => setWalletDescription(e.target.value)}
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
              alt="Wallet Icon"
              style={{ width: "15%", alignSelf: "center" }}
            />
            <div className={classes.helperTextStyle}>{formError.filename}</div>
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
              Upload Wallet Logo
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
    setWalletId(rowData._id);
    setWalletName(rowData.walletname);
    setWalletDescription(rowData.walletdescription);
    setIcon({
      byte: "",
      filename: `${serverURL}/images/${rowData.walleticon}`,
    });
    settempPicture(rowData.walleticon);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const fetchAllWallet = async () => {
    var response = await getData("wallet/display_all");
    setWalletData(response.result);
  };

  useEffect(() => {
    fetchAllWallet();
  }, []);

  const showDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{showWalletForm()}</DialogContent>

        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  function ShowAllWallets() {
      return (
        <MaterialTable
          title="Wallet List"
          columns={[
            { title: "Wallet ID", field: "_id" },
            { title: "Wallet Name", field: "walletname" },
            {
              title: "Wallet Description",
              render: (rowData) =>
                rowData.walletdescription.length >= 30
                  ? rowData.walletdescription.slice(0, 30) + "..."
                  : rowData.walletdescription,
            },
            {
              title: "Wallet Icon",
              render: (rowData) => (
                <img
                  src={`${serverURL}/images/${rowData.walleticon}`}
                  alt="Logo"
                  width={50}
                />
              ),
            },
          ]}
          data={walletData}
          options={{
            pageSize: 5,
            pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
            toolbar: true,
            paging: true,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Wallet",
              onClick: (event, rowData) => openDialog(rowData),
            },
            {
              icon: "add",
              tooltip: "Add Wallet",
              isFreeAction: true,
              onClick: (event) => navigate("/dashboardadmin/walletregistration"),
            },
          ]}
        />
      );
    }
  


  return (
    <div className={classes.roott}>
      <div className={classes.boxx}>
        {ShowAllWallets()}
        {showDialog()}
      </div>
    </div>
  );
}
