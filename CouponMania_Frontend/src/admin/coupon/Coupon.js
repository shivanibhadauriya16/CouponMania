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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";

export default function Coupon() {
  const classes = useStyles();
  const [companyList, setCompanyList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [couponName, setCouponName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponType, setCouponType] = useState("");
  const [couponSubHeading, setCouponSubHeading] = useState("");
  const [couponDescription, setCouponDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [SubCategoryId, setSubCategoryId] = useState("");
  const [formError, setformError] = useState({ filename: "" });
  const [inputValue, setInputValue] = useState("");
  const [bankList, setBankList] = useState([]);
  const [walletList, setWalletList] = useState([]);
  const [mergedList, setMergedList] = useState([]); // Merged company + bank list
  const [selectedItem, setSelectedItem] = useState(null);

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
    if (categoryId.length === 0) {
      handleError("categoryid", "Category Name should not be blank...");
      error = true;
    }
    if (SubCategoryId.length === 0) {
      handleError("subcategoryid", "Sub Category Name should not be blank...");
      error = true;
    }
    if (selectedItem.length === 0) {
      handleError("companyid", "Company Name should not be blank...");
      error = true;
    }
    if (couponSubHeading.length === 0) {
      handleError(
        "couponsubheading",
        "coupon Sub-Heading should not be blank..."
      );
      error = true;
    }
    if (couponCode.length === 0) {
      handleError("couponcode", "couponcode should not be blank...");
      error = true;
    }
    if (couponType.length === 0) {
      handleError("coupontype", "coupon Type should not be blank...");
      error = true;
    }

    return error;
  };

  const handleClick = async () => {
    var error = validateData();
    if (error === false) {
      var body = {
        couponname: couponName,
        couponcode: couponCode,
        coupondescription: couponDescription,
        categoryid: categoryId,
        subcategoryid: SubCategoryId,
        companyid: selectedItem,
        couponsubheading: couponSubHeading,
        coupontype: couponType,
      };
      var response = await postData("coupon/submit_coupon", body);
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
    setCompanyId("");
    fetchAllCompany();
    setCategoryId("");
    fetchAllCategory();
    setSubCategoryId("");
    fetchAllSubCategory();
    setCouponName("");
    setCouponDescription("");
    setCouponSubHeading("");
    setCouponCode("");
    setCouponType("");
    setSelectedItem(null)
  };

  const fetchAllCompany = async () => {
    var response = await getData("coupon/display_all_company");
    setCompanyList(response.result);
  };

  const fetchAllWallet = async () => {
      var response = await getData("wallet/display_all");
      setWalletList(response.result);
    };

  const fetchAllBank = async () => {
    var response = await getData("bank/display_all");
    setBankList(response.result || []);
  };

  const fetchAllSubCategory = async (data) => {
    var response = await postData("coupon/display_all_subcategory", {
      id_category: data,
    });
    setSubCategoryList(response.result);
  };

  const fetchAllCategory = async () => {
    var response = await getData("coupon/display_all_category");
    setCategoryList(response.result);
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

  useEffect(() => {
    fetchAllCompany();
    fetchAllCategory();
    fetchAllBank();
    fetchAllWallet();
  }, []);

useEffect(() => {
    setMergedList([
      ...companyList.map((item) => ({
        _id: item._id,
        name: item.companyname,
        description: item.companydescription,
        icon: item.companyicon,
        type: "Company",
      })),
      ...bankList.map((item) => ({
        _id: item._id,
        name: item.bankname,
        description: item.bankdescription,
        icon: item.bankicon,
        type: "Bank",
      })),
      ...walletList.map((item) => ({
        _id: item._id,
        name: item.walletname,
        description: item.walletdescription,
        icon: item.walleticon,
        type: "Wallet",
      })),
    ]);
}, [companyList, bankList, walletList]);

  const handleCategory = (e) => {
    setCategoryId(e.target.value);
    fetchAllSubCategory(e.target.value);
  };

  const handleTypeChange = (event) => {
    setCouponType(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TitleComponent title="Coupon Registartion" />
          </Grid>

          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>

          <Grid size={6}>
            {/* <TextField
              variant="standard"
              error={formError.companyid}
              helperText={formError.companyid}
              onFocus={() => handleError("companyid", "")}
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              label="Company Name"
              fullWidth
            /> */}
            <Autocomplete
              value={selectedItem} // Store full object
              onChange={(event, newValue) => {
                setSelectedItem(newValue); // Store selected object
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="company-bank-autocomplete"
              options={mergedList} // Use merged list
              getOptionLabel={(option) => option?.name || "Unknown"} // Display company/bank name
              isOptionEqualToValue={(option, value) =>
                option?._id === value?._id
              }
              groupBy={(option) => option.type} // Group by "Company" or "Bank"
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company/Bank/Wallet"
                  variant="standard"
                  error={Boolean(formError.companyid)}
                  helperText={formError.companyid}
                  onFocus={() => handleError("companyid", "")}
                  fullWidth
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option._id}>
                  <img
                    src={`${serverURL}/images/${option.icon}`} // Change to your image URL path
                    alt={option.name}
                    width="30"
                    height="30"
                    style={{ marginRight: 10, borderRadius: "50%" }}
                  />
                  {option.name}
                </li>
              )}
            />
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel>Category Name</InputLabel>
              <Select
                error={formError.categoryid}
                onFocus={() => handleError("categoryid", "")}
                value={categoryId}
                onChange={(e) => handleCategory(e)}
                label="Category Name"
              >
                {fillCategoryMenu()}
              </Select>
              <div className={classes.helperTextStyle}>
                {formError.categoryid}
              </div>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel>Sub Category Name</InputLabel>
              <Select
                error={formError.subcategoryid}
                onFocus={() => handleError("subcategoryid", "")}
                value={SubCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                label="Sub Category Name"
              >
                {fillSubCategoryMenu()}
              </Select>
              <div className={classes.helperTextStyle}>
                {formError.subcategoryid}
              </div>
            </FormControl>
          </Grid>

          <Grid size={6}>
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

          <Grid size={6}>
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

          <Grid size={6}>
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

          <Grid size={6}>
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
            <Button fullWidth variant="contained" onClick={handleClick}>
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
