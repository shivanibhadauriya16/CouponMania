import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Loginpage from "./admin/login/LoginPage";
import DashboardAdmin from "./admin/login/DashboardAdmin";
import Companys from "./admin/company/Companys";
import Category from "./admin/category/Category";
import Coupon from "./admin/coupon/Coupon";
import SubCategory from "./admin/subcategory/SubCategory";
import LandingPage from "./userinterface/LandingPage";
import LandingPageTopSlides from "./admin/slides/LandingPageTopSlides";
import DisplayAllSlides from "./admin/slides/DisplayAllSlides";
import HighCashBackComponent from "./userinterface/Component/HighCashBcak/HighCashBackComponent";
import BankReg from "./admin/bank/BankReg";
import DisplayAllBankReg from "./admin/bank/DisplayAllBankReg";
import WalletReg from "./admin/wallet/WalletReg";
import DisplayAllWalletReg from "./admin/wallet/DisplayAllWalletReg";
import LoadPage from "./userinterface/Component/BankOffers/LoadPage";
import WalletLoadPage from "./userinterface/Component/Wallet/WalletLoadPage";
import HighCashBackLoadPage from "./userinterface/Component/HighCashBcak/HighCashBackLoadPage";
import TopStoreLoadPage from "./userinterface/Component/topstore/TopStoreLoadPage";
import CategoryLoadPage from "./userinterface/Component/Trending Category/CategoryLoadPage";

function App() {
  return (
    <div>
      <Router>

        <Routes>

        <Route element={<Companys />} path={"companys"}/>
        {/* <Route element={<DisplayAllCompanys/>} path={"displayallcompanys"}/> */}
        <Route element={<Category/>} path={"category"}/>
        {/* <Route element={<DisplayAllCategory/>} path={"displayallcategory"}/> */}
        <Route element={<Coupon/>} path={"coupon"}/>
        {/* <Route element={<DisplayAllCoupon/>} path={"displayallcoupon"}/> */}
        <Route element={<SubCategory/>} path={"subcategory"}/>
        {/* <Route element={<DisplayAllSubCategory/>} path={"displayallsubCategory"}/> */}
        <Route element={<Loginpage/>} path={"Loginpage"}/>
        <Route element={<DashboardAdmin/>} path={"dashboardadmin/*"}/>
        <Route element={<LandingPage/>} path={"/"}/>
        <Route element={<BankReg/>} path={"/bankregistration"}/>
        <Route element={<LoadPage />} path={"/loadpage"}/>
        <Route element={<CategoryLoadPage/>} path={"/categoryloadpage"}/>
        <Route element={<TopStoreLoadPage />} path={"/topstoreloadpage"}/>
        <Route element={<WalletLoadPage />} path={"/walletloadpage"}/>
        <Route element={<HighCashBackLoadPage />} path={"/highcashbackloadpage"}/>
        <Route element={<WalletReg/>} path={"/walletregistration"}/>
        <Route element={<DisplayAllBankReg/>} path={"/displayallbank"}/>
        <Route element={<DisplayAllWalletReg/>} path={"/displayallwallet"}/>
        <Route element={<HighCashBackComponent/>} path={"/highcashbackcomponent"}/>
        <Route element={<DisplayAllSlides/>} path={"/displayallslides"}/>
        <Route element={<LandingPageTopSlides/>} path={"/landingpageslides"}/>
       
          
        </Routes>

      </Router>
    </div>
  );
}

export default App;
