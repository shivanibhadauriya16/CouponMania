import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import category from "../../assets/category.png";
import subcategory from "../../assets/subcategory.png";
import company from "../../assets/company.png";
import coupon from "../../assets/coupon.png"
import bank from "../../assets/bank.png";
import wallet from "../../assets/wallet.png";
import slide from "../../assets/slides.png"
import shutdown from "../../assets/shutdown.png";
import Reports from "../../assets/reports.png"
import { Routes, Route, useNavigate } from "react-router";
import Companys from "../company/Companys"
import DisplayAllCompanys from "../company/DisplayAllCompanys"
import Category from "../category/Category"
import DisplayAllCategory from "../category/DisplayAllCategory"
import SubCategory from "../subcategory/SubCategory"
import DisplayAllSubCategory from "../subcategory/DisplayAllSubCategory"
import Coupon from "../coupon/Coupon"
import DisplayAllCoupon from "../coupon/DisplayAllCoupon"
import { serverURL } from "../../services/FetchNodeServices";
import BankReg from "../bank/BankReg";
import DisplayAllBankReg from "../bank/DisplayAllBankReg";
import DisplayAllSlides from "../slides/DisplayAllSlides";
import LandingPageTopSlides from "../slides/LandingPageTopSlides";
import WalletReg from "../wallet/WalletReg";
import DisplayAllWalletReg from "../wallet/DisplayAllWalletReg";

export default function DashboardAdmin() {
  const navigate = useNavigate()
  var adminData = JSON.parse(localStorage.getItem("ADMIN"))
  const menuList = () => {
    return (
      <Box
        sx={{
          margin: "35px 2px 0px 25px",
          padding: 1,
          width: "100%",
          maxWidth: 360,
          border: "1px #dfe6e9 solid",
          borderRadius: 8,
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/dashboardadmin/displayallcategory")}>
                <ListItemIcon>
                  <img src={category} alt="Category" style={{width:28}} />
                </ListItemIcon>
                <ListItemText primary="Category" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/dashboardadmin/displayallsubcategory")}>
                <ListItemIcon>
                  <img src={subcategory} alt="Sub-Category" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Sub-Category" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/dashboardadmin/displayallcompanys")}>
                <ListItemIcon>
                  <img src={company} alt="Company" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Company" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/dashboardadmin/displayallBank")}>
                <ListItemIcon>
                  <img src={bank} alt="Bank" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Bank" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/dashboardadmin/displayallwallet")}>
                <ListItemIcon>
                  <img src={wallet} alt="Wallet" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Wallet" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/dashboardadmin/displayallcoupon")}>
                <ListItemIcon>
                  <img src={coupon} alt="Coupon" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Coupon" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/dashboardadmin/displayallslides")}>
                <ListItemIcon>
                  <img src={slide} alt="Slides" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Slide" />
              </ListItemButton>
            </ListItem>

          </List>


        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  <img src={Reports} alt="Report" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/") }>
                <ListItemIcon>
                  <img src={shutdown} alt="Shut Down" style={{width:25}} />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <Box sx={{ flexGrow: 1, }}>
        <AppBar position="static" style={{ backgroundImage: 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)' }}>
          <Toolbar>
            <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <div style={{ marginLeft: 5, marginTop: 5 }}>
                <img src="/2.png" alt="Logo" style={{ width: 40,margin:8 }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 24 }}>Coupon Mania</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontWeight:'bolder',fontSize:23, marginRight: 8 }}>
                {adminData.firstname}
              </div>
              <Avatar alt="Nikhil" src={`${serverURL}/images/${adminData.adminimage}`} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={20}>
        <Grid item xs={4}>
          {menuList()}
        </Grid>
        <Grid item xs={8}>
          <Routes>
            <Route element={<DisplayAllSubCategory />} path={"displayallsubcategory"} />
            <Route element={<SubCategory />} path={"subcategory"} />
            <Route element={<DisplayAllCategory />} path={"displayallcategory"} />
            <Route element={<Category />} path={"category"} />
            <Route element={<DisplayAllCoupon />} path={"displayallcoupon"} />
            <Route element={<Coupon />} path={"coupon"} />
            <Route element={<DisplayAllCompanys />} path={"displayallcompanys"} />
            <Route element={<Companys />} path={"companys"} />
            <Route element={<BankReg/>} path={"/bankregistration"}/>
            <Route element={<DisplayAllBankReg/>} path={"/displayallbank"}/>
            <Route element={<WalletReg />} path={"/walletregistration"}/>
            <Route element={<DisplayAllWalletReg/>} path={"/displayallwallet"}/>
            <Route element={<DisplayAllSlides/>} path={"/displayallslides"}/>
            <Route element={<LandingPageTopSlides/>} path={"/landingpageslides"}/>
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}
