import FooterComponent from "../footer/FooterComponent";
import Header from "../Header/Header";
import { useLocation, useParams } from "react-router-dom";
import WalletLoadPageHeading from "./WalletLoadPageHeading";

export default function WalletLoadPage() {
  const params = useParams();
  const location = useLocation();
  // console.log(location.search);
  const keys = new URLSearchParams(location.search);
  // console.log("Keys:", keys);

  var walletid = keys.get("walletid");

  return (
    <div>
      <Header />
      <WalletLoadPageHeading walletid={walletid}/>
      <FooterComponent />
    </div>
  );
}
