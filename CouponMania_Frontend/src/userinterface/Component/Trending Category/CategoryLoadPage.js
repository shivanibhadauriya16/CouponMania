import FooterComponent from "../footer/FooterComponent";
import Header from "../Header/Header";
import { useLocation, useParams } from "react-router-dom";
import CategoryLoadPageHeading from "./CategoryLoadPageHeading";

export default function CategoryLoadPage() {
  const location = useLocation();
  const keys = new URLSearchParams(location.search);

  var categoryid = keys.get("categoryid");

  return (
    <div>
      <Header />
      <CategoryLoadPageHeading categoryid={categoryid}/>
      <FooterComponent />
    </div>
  );
}
