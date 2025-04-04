import { useStyles } from "./SubCategoryCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { postData, getData } from "../../services/FetchNodeServices";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SubCategory() {
  const classes = useStyles();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [formError, setformError] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;

    if (categoryId.length === 0) {
      handleError("categoryid", "Category Id should not be blank...");
      error = true;
    }

    if (subCategoryName.length === 0) {
      handleError("subcategoryname", "Sub CategoryName should not be blank...");
      error = true;
    }

    return error;
  };

  const clearData = () => {
    setSubCategoryName("");
    setCategoryId("");
    fetchAllCategory();
  };

  const handlesubmit = async () => {
    var error = validateData();
    if (error === false) {
      var body = { categoryid: categoryId, subcategoryname: subCategoryName };

      var response = await postData("subcategory/submit_subcategory", body);
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

  const fillCategoryMenu = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item._id}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchAllCategory = async () => {
    var response = await getData("subcategory/display_all_category");
    setCategoryList(response.result);
    console.log(response.result);
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TitleComponent title="Sub Category Registartion" />
          </Grid>

          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel>Category Name</InputLabel>
              <Select
                label="Category Name"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                onFocus={() => handleError("categoryid", "")}
                error={formError.categoryid}
              >
                {fillCategoryMenu()}
              </Select>
              <div className={classes.helperTextStyle}>
                {formError.categoryid}
              </div>
            </FormControl>
          </Grid>

          <Grid size={12}>
            <TextField
              helperText={formError.subcategoryname}
              error={formError.subcategoryname}
              onFocus={() => handleError("subcategoryname", "")}
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              label="Sub Category Name"
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
