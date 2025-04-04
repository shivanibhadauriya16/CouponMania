import FooterComponent from "../footer/FooterComponent";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import CashBackLoadPageHeading from "./CashBackLoadPageHeading";

export default function HighCashBackLoadPage() {
  const location = useLocation();
  const keys = new URLSearchParams(location.search);
  var cashbackid = keys.get("cashbackid");

  return (
    <div>
      <Header />
      <CashBackLoadPageHeading cashbackid={cashbackid} />
      <FooterComponent />
    </div>
  );
}
