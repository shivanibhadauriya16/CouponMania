import FooterComponent from "../footer/FooterComponent";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import TopStoreLoadPageHeading from "./TopStoreLoadPageHeading";

export default function TopStoreLoadPage() {
  const location = useLocation();
  const keys = new URLSearchParams(location.search);

  var storeid = keys.get("storeid");

  return (
    <div>
      <Header />
      <TopStoreLoadPageHeading storeid={storeid}/>
      <FooterComponent />
    </div>
  );
}
