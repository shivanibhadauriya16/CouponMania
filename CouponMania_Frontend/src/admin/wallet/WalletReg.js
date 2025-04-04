import { useStyles } from "./WalletRegCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { postData } from "../../services/FetchNodeServices";
import Upload from "../../assets/upload.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function WalletReg() {
  const classes = useStyles();
  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");
  const [formError, setformError] = useState("");
  const [icon, setIcon] = useState({ byte: "", filename: Upload });

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

  const handlesubmit = async () => {
    var error = validateData();
    if (error === false) {
      var formData = new FormData();

      formData.append("walleticon", icon.byte);
      formData.append("walletname", walletName);
      formData.append("walletdescription", walletDescription);

      var response = await postData("wallet/submit_wallet", formData);
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

  const handleIconChange = (e) => {
    setIcon({
      byte: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    });
  };

  const clearData = () => {
    setWalletName("");
    setWalletDescription("");
    setIcon({ byte: "", filename: Upload });
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
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
