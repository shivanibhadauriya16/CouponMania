import { useStyles } from "./CategoryCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { postData} from "../../services/FetchNodeServices";
import * as React from "react";

export default function Category() {
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState("");
  const [formError, setformError] = useState("");



  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;

    if (categoryName.length === 0) {
      handleError("categoryname", "categoryName should not be blank...");
      error = true;
    }

    return error;
  };

  const handlesubmit = async () => {
    var error = validateData();
    if (error === false) {
      var body = { "categoryname": categoryName , };

      var response = await postData("category/submit_category", body);
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
    setCategoryName("");
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TitleComponent title="Category Registartion" />
          </Grid>

          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>


          <Grid size={12}>
            <TextField
              helperText={formError.categoryname}
              error={formError.categoryname}
              onFocus={() => handleError("categoryname", "")}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              label="Category Name"
              fullWidth
            />
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
