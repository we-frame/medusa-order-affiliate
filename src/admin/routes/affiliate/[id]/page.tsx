import SingleAffiliateUI from "../../../components/SingleAffiliate/SingleAffiliateUI";
import { useParams } from "react-router-dom";

const page = () => {
  const { id } = useParams();

  return <SingleAffiliateUI affiliateId={id} />;
};

export default page;
