import SingleAffiliateUI from "../../../components/SingleAffiliate/SingleAffiliateUI";
import { useParams } from "react-router-dom"

const page = () => {
  const { id } = useParams()
  console.log("id ================== ", id);
  
  return <SingleAffiliateUI affiliateId={id} />;
};

export default page;

// return <SingleAffiliateUI />;