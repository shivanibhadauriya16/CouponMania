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
import MaterialTable from "@material-table/core";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllSubCategory() {
  const classes = useStyles();
  const navigate = useNavigate()
  const [categoryId, setCategoryId] = useState("");
 
  const [subCategoryName, setSubCategoryName] = useState("");
  const [formError, setformError] = useState("");
  const [categoryList, setCategoryList] = useState([]);
 
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [open,setOpen] = useState(false)
  const [subCategoryId, setSubCategoryId]= useState('')

  const showDialog=()=>
    {
      return ( <Dialog open={open}>
  
        <DialogContent>
          {showSubCategoryForm()}
        </DialogContent>
  
        <DialogActions>
          <Button onClick={()=>closeDialog()}>
            Close
          </Button>
        </DialogActions>
  
      </Dialog>)
    }

const closeDialog =()=>
    {
      setOpen(false)
    }

const openDialog =(rowData)=>
    {
     
      setSubCategoryName(rowData.subcategoryname)
      setSubCategoryList(rowData.subcategoryid)
      setCategoryId(rowData.categoryid)
      setSubCategoryId(rowData._id)
      setOpen(true)
    }

  const fetchAllSubCategory = async () => {
    var response = await getData("subcategory/display_all_subcategory");
    setSubCategoryList(response.data);
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllSubCategory();
  }, []);

  /*********************Sub Category Form***********************/

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
      var body = {"_id": subCategoryId,"categoryid": categoryId,"subcategoryname": subCategoryName,};

      var response = await postData("subcategory/edit_subcategory", body);
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
    fetchAllSubCategory()
  };

  const deleteData=async()=>{
    var body = {"id": subCategoryId};
    var response = await postData("subcategory/delete_subcategory", body);
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
      fetchAllSubCategory()
      setOpen(false)
    }


  const fillCategoryMenu = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item._id}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchAllCategory = async () => {
    var response = await getData("subcategory/display_all_category");
    setCategoryList(response.result);
  };

  const showSubCategoryForm = () => {
    return (
      <div >
        <div >
          <Grid container spacing={2}>
            <Grid size={12}>
              <TitleComponent title="Edit Sub-Category Registartion" />
            </Grid>

            <Grid
              size={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
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
              <Button fullWidth variant="contained" onClick={deleteData}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  /************************************************************/

  function ShowAllSubCategory() {
    return (
      <MaterialTable
        title="Sub Category List"
        columns={[
          { title: "Sub-Category Id", field: "_id" },
          { title: "Sub Category Name", field: "subcategoryname" },
          {
            title: "Category Name",
            render: (rowData) => <div>{rowData.categoryData.categoryname}</div>,
          },
        ]}
        data={subCategoryList}
        options={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 30 ,50, 75, 100 ],
          toolbar: true,
          paging: true
      }}   
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Sub-category",
            onClick: (event, rowData) =>  openDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Sub-Category',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboardadmin/subcategory")
          }
        ]}
      />
    );
  }

  return (
    <div className={classes.roott}>
      <div className={classes.boxx}>
        {ShowAllSubCategory()}
        {showDialog()}
        </div>
    </div>
  );
}
