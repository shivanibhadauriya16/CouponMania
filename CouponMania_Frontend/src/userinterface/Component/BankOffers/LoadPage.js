import FooterComponent from "../footer/FooterComponent";
import Header from "../Header/Header";
import LoadPageHeading from "./LoadPageHeading";
import { useLocation, useParams } from "react-router-dom";

export default function LoadPage() {
  const params = useParams();
  const location = useLocation();
  // console.log(location.search);
  const keys = new URLSearchParams(location.search);
  // console.log("Keys:", keys);

  var bankid = keys.get("bankid");

  // console.log("id", bankid);

  return (
    <div>
      <Header />
      <LoadPageHeading bankid={bankid}/>
      <FooterComponent />
    </div>
  );
}
