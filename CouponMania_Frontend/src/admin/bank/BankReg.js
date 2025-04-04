import { useStyles } from "./BankRegCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { postData, getData } from "../../services/FetchNodeServices";
import  Upload  from "../../assets/upload.png";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function BankReg(){
    const classes = useStyles();
    const [bankName, setBankName] = useState("");
    const [bankDescription , setBankDescription] = useState("")
    const [formError, setformError] = useState("");
    const [icon, setIcon]= useState({byte:'',filename:Upload})


  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;

    if (bankName.length === 0) {
      handleError("bankname", "Bank Name should not be blank...");
      error = true;
    }
    if (bankDescription.length === 0) {
      handleError("bankdescription", "Bank Description should not be blank...");
      error = true;
    }
    if(icon.byte.length===0)
        {
           handleError('filename', 'please Choose icon of Bank...')
           error = true
        }

    return error;
  };

  const handlesubmit=async()=>{
    var error = validateData()
    if(error===false)
    {
      var formData = new FormData();

      formData.append("bankicon", icon.byte)
      formData.append("bankname", bankName)
      formData.append("bankdescription", bankDescription)

      var response = await postData("bank/submit_bank", formData);
      if(response.status){
          Swal.fire({
          icon: "success",
          text: response.message,
          toast: true
            });
          }
          else{
             Swal.fire({
                icon: "error",
                text: response.message,
                toast: true
                     });
          }
     }
     clearData()
  }

  const handleIconChange=(e)=>{
      setIcon({byte:e.target.files[0], filename:URL.createObjectURL(e.target.files[0])})
  }

  const clearData=()=>{
      setBankName('')
      setBankDescription('')
      setIcon({byte:'',filename:Upload})
  }

    return(
        <div className={classes.root}>
      <div className={classes.box}>
      <Grid container spacing={2}>
          <Grid size={12}>
            <TitleComponent title="Bank Registartion" />
          </Grid>

          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
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

          <Grid size={12} style={{display:'flex' , justifyContent:'center', alignItems:'center' , flexDirection: "column"}}>
                         <img src={icon.filename} alt="Bank Icon" style={{width:'15%', alignSelf:'center'}} />
                         <div className={classes.helperTextStyle}>{formError.filename}</div>
                     </Grid>

                     <Grid size={12}>
                         <Button startIcon={<CloudUploadIcon/>} onChange={handleIconChange} fullWidth component='label' variant="contained" style={{ marginTop:10}}>
                          <input type="file" multiple hidden accept="image/*"/>
                          Upload Bank Logo
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
    )
}