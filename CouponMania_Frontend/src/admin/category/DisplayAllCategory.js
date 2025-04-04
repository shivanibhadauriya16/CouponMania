import { useStyles } from "./CategoryCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { postData, getData } from "../../services/FetchNodeServices";
import * as React from "react";
import MaterialTable from "@material-table/core"
import {Dialog, DialogActions ,DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory(){

    const classes = useStyles();
    const navigate = useNavigate()
    const [categoryName, setCategoryName] = useState("");
    const [formError, setformError] = useState("");
    const [categoryId, setCategoryId]= useState('')
    const [categoryList, setCategoryList] = useState([])
    const [open,setOpen] = useState(false)

    /*****************************Category Form***************************/
console.log(categoryList)
    
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

          var body = { "categoryname": categoryName , "_id":categoryId};
    
          var response = await postData("category/edit_category", body);
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
          fetchAllCategory()
    
        clearData();
      };

      const deleteData=async()=>{
        var body = {"id": categoryId};
        var response = await postData("category/delete_category", body);
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
          fetchAllCategory()
          setOpen(false)
        }
    
      const clearData = () => {
        setCategoryName("");
      };

      const showCategoryForm=()=>{
    
      return (
        <div >
          <div >
            <Grid container spacing={2}>
              <Grid size={12}>
                <TitleComponent title=" Edit Category Registartion" />
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
    }
    /*********************************************************************/

    const showDialog=()=>
        {
          return ( <Dialog open={open}>
      
            <DialogContent>
              {showCategoryForm()}
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
          setCategoryName(rowData.categoryname)
          setCategoryId(rowData._id)
          setOpen(true)
        }


        const fetchAllCategory = async () => {
          try {
            const response = await getData("category/display_all_category");
            if (response.status) {
              setCategoryList(response.result);
            } else {
              Swal.fire({
                icon: "error",
                text: "Failed to fetch categories.",
              });
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
            Swal.fire({
              icon: "error",
              text: "Something went wrong while fetching categories.",
            });
          }
        };
        
    
      useEffect(()=>{
        fetchAllCategory()
      },[])
    
    function ShowAllCategory() {
        return (
          <MaterialTable
            title="Category List"
            columns={[
              { title: 'Category Id', field: '_id' },
              { title: 'Category Name', field: 'categoryname' },
            ]}
            data={categoryList} 
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30 ,50, 75, 100 ],
              toolbar: true,
              paging: true
          }}    
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => openDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event) => navigate("/dashboardadmin/category")
              }
            ]}
          />
        )
      }

    return (
        <div className={classes.roott}>
            <div className={classes.boxx}>
                {ShowAllCategory()}
                {showDialog()}
            </div>
        </div>
    )
}