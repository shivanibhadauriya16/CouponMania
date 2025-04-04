import { useStyles } from "./CouponCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";

export default function DisplayAllCoupon() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [couponSubHeading, setCouponSubHeading] = useState("");
  const [couponName, setCouponName] = useState("");
  const [couponDescription, setCouponDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [couponType, setCouponType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [formError, setformError] = useState({ filename: "" });
  const [coupon, setCoupon] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [SubCategoryId, setSubCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /***************Coupon Form*******************/
  const handleError = (label, message) => {
    setformError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;
    if (couponName.length === 0) {
      handleError("couponname", "CouponName should not be blank...");
      error = true;
    }
    if (couponDescription.length === 0) {
      handleError(
        "coupondescription",
        "CouponDescription should not be blank..."
      );
      error = true;
    }
    if (SubCategoryId.length === 0) {
      handleError("subcategoryid", "Sub Category Name should not be blank...");
      error = true;
    }
    if (categoryId.length === 0) {
      handleError("categoryid", "Category Name should not be blank...");
      error = true;
    }
    if (companyId.length === 0) {
      handleError("companyid", "Company Name should not be blank...");
      error = true;
    }
    if (couponSubHeading.length === 0) {
      handleError(
        "couponsubheading",
        "coupon Sub-Heading should not be blank..."
      );
    }
    if (couponCode.length === 0) {
      handleError("couponcode", "coupon Code should not be blank...");
    }
    if (couponType.length === 0) {
      handleError("coupontype", "coupon Type should not be blank...");
      error = true;
    }

    return error;
  };

  const handleCouponData = async () => {
    var error = validateData();
    if (error === false) {
      var body = {
        couponname: couponName,
        coupondescription: couponDescription,
        categoryid: categoryId,
        subcategoryid: SubCategoryId,
        companyid: companyId,
        couponsubheading: couponSubHeading,
        couponcode: couponCode,
        coupontype: couponType,
      };

      var response = await postData("coupon/edit_coupon_data", body);
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
    fetchAllCoupon();
  };

  const deleteData = async () => {
    var body = { id: couponId };
    var response = await postData("coupon/delete_coupon", body);
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
    fetchAllCoupon();
    setOpen(false);
  };

  const clearData = () => {
    setCompanyId("");
    setCategoryId("");
    setCouponName("");
    setCouponDescription("");
    setSubCategoryId("");
    fetchAllSubCategory();
    setCouponSubHeading("");
    setCouponCode("");
    setCouponType("");
  };

  const fetchAllCompany = async () => {
    var response = await getData("coupon/display_all_company");
    setCompanyList(response.result);
  };

  const fetchAllCategory = async () => {
    var response = await getData("coupon/display_all_category");
    setCategoryList(response.result);
  };

  const fetchAllSubCategory = async (data) => {
    var response = await postData("coupon/display_all_subcategory", {
      id_category: data,
    });
    setSubCategoryList(response.result);
  };

  const fillCompanyMenu = () => {
    return companyList.map((item) => {
      return <MenuItem value={item._id}>{item.companyname}</MenuItem>;
    });
  };

  const fillCategoryMenu = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item._id}>{item.categoryname}</MenuItem>;
    });
  };

  const fillSubCategoryMenu = () => {
    return subCategoryList.map((item) => {
      return <MenuItem value={item._id}>{item.subcategoryname}</MenuItem>;
    });
  };

  const handleCategory = (e) => {
    setCategoryId(e.target.value);
    fetchAllSubCategory(e.target.value);
  };

  const handleTypeChange = (event) => {
    setCouponType(event.target.value);
  };

  const showCouponForm = () => {
    return (
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TitleComponent title="Edit Coupon Registartion" />
            </Grid>

            <Grid
              size={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Divider style={{ width: "98%" }} />
            </Grid>

            <Grid size={12}>
              <Autocomplete
                value={
                  companyList.find((option) => option._id === companyId) || null
                } // Find object by _id
                onChange={(event, newValue) => {
                  setCompanyId(newValue ? newValue._id : ""); // Store only _id
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={companyList} // Pass full company objects
                getOptionLabel={(option) => option.companyname} // Display company name
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                } // Ensure correct selection
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company Name"
                    variant="standard"
                    error={Boolean(formError.companyid)}
                    helperText={formError.companyid}
                    onFocus={() => handleError("companyid", "")}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Category Name</InputLabel>
                <Select
                  error={formError.categoryid}
                  onFocus={() => handleError("categoryid", "")}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  label="Category Name"
                >
                  {fillCategoryMenu()}
                </Select>
                <div className={classes.helperTextStyle}>
                  {formError.categoryid}
                </div>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Sub Category Name</InputLabel>
                <Select
                  error={formError.subcategoryid}
                  onFocus={() => handleError("subcategoryid", "")}
                  value={SubCategoryId}
                  onChange={(e) => handleCategory(e)}
                  label="Sub Category Name"
                >
                  {fillSubCategoryMenu()}
                </Select>
                <div className={classes.helperTextStyle}>
                  {formError.subcategoryid}
                </div>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <TextField
                error={formError.couponname}
                helperText={formError.couponname}
                onFocus={() => handleError("couponname", "")}
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                label="Coupon Name"
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                error={formError.couponsubheading}
                helperText={formError.couponsubheading}
                onFocus={() => handleError("couponsubheading", "")}
                value={couponSubHeading}
                onChange={(e) => setCouponSubHeading(e.target.value)}
                label="Coupon Sub-Heading"
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                error={formError.couponcode}
                helperText={formError.couponcode}
                onFocus={() => handleError("couponcode", "")}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                label="Coupon Code"
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <FormControl
                error={formError.coupontype}
                onFocus={() => handleError("coupontype", "")}
              >
                <FormLabel id="demo-error-radios">Type :</FormLabel>
                <RadioGroup
                  value={couponType}
                  onChange={handleTypeChange}
                  style={{ display: "flex", flexDirection: "row" }}
                  name="quiz"
                >
                  <FormControlLabel
                    value="coupon"
                    control={<Radio />}
                    label="Coupon"
                  />
                  <FormControlLabel
                    value="cashback"
                    control={<Radio />}
                    label="Cashback"
                  />
                  <FormControlLabel
                    value="deal"
                    control={<Radio />}
                    label="Deal"
                  />
                </RadioGroup>
              </FormControl>
              <div className={classes.helperTextStyle}>
                {formError.coupontype}
              </div>
            </Grid>

            <Grid size={12}>
              <ReactQuill
                placeholder="Coupon Description"
                onChange={(e) => setCouponDescription(e)}
                onFocus={() => handleError("coupondescription", "")}
                value={couponDescription}
                theme="snow"
                modules={{
                  toolbar: {
                    container: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["code-block"],
                      ["clean"],
                    ],
                  },
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "video",
                  "code-block",
                ]}
              />
              <div className={classes.helperTextStyle}>
                {formError.coupondescription}
              </div>
            </Grid>

            <Grid size={6}>
              <Button fullWidth variant="contained" onClick={handleCouponData}>
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
  /*********************************************/

  const openDialog = (rowData) => {
    setSubCategoryId(rowData.subcategoryid);
    setCouponId(rowData._id);
    setCouponCode(rowData.couponcode);
    setCouponName(rowData.couponname);
    setCompanyId(rowData.companyid);
    setCategoryId(rowData.categoryid);
    setCouponDescription(rowData.coupondescription);
    setCouponSubHeading(rowData.couponsubheading);
    setCouponType(rowData.coupontype);
    fetchAllCompany();
    fetchAllCategory();
    fetchAllSubCategory(rowData.categoryid);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const showDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{showCouponForm()}</DialogContent>

        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const fetchAllCoupon = async () => {
    var response = await getData("coupon/display_all_coupon");
    setCoupon(response.data);
  };

  useEffect(() => {
    fetchAllCoupon();
  }, []);

  function ShowAllCoupons() {
    return (
      <MaterialTable
        title="Coupon List"
        columns={[
          {
            title: "Coupon Id / Coupon Code",
            render: (rowData) => (
              <div>
                {rowData._id}/
                <br />
                {rowData.couponcode}
              </div>
            ),
          },
          {
            title: "Coupon Name / Type",
            render: (rowData) => (
              <div>
                {rowData.couponname}
                <br />/{rowData.coupontype}
              </div>
            ),
          },
          { title: "Coupon Sub-Heading", field: "couponsubheading" },
          // {
          //   title: "Company Name",
          //   render: (rowData) => <div>{rowData.companyData.companyname}</div>,
          // },
          {
            title: "Category / Sub-Category",
            render: (rowData) => (
              <div>
                {rowData.categoryData.categoryname}
                <br />/{rowData.subcategoryData.subcategoryname}
              </div>
            ),
          },
        ]}
        data={coupon}
        options={{
          pageSize: 3,
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
            icon: "add",
            tooltip: "Add Coupon",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboardadmin/coupon"),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.roott}>
      <div className={classes.boxx}>
        {ShowAllCoupons()}
        {showDialog()}
      </div>
    </div>
  );
}
