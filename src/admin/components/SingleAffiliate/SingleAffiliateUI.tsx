import { ArrowLeftMini } from "@medusajs/icons";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { AffiliateDetailsCard } from "./AffiliateDetailsCard";
import { useNavigate } from "react-router-dom";

interface SingleAffiliateProps {
  affiliateId: string;
}

const SingleAffiliateUI = ({ affiliateId }: SingleAffiliateProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col gap-8 p-6">
      <div>
        <button
          onClick={handleBack}
          className="flex items-center justify-start gap-2 cursor-pointer"
        >
          <div className="bg-[#eeeeee] p-1 rounded-full">
            <ArrowLeftMini />
          </div>
          <div className="font-semibold text-sm">Back to Customer</div>
        </button>
      </div>

      <CustomerDetailCard affiliateId={affiliateId} />
      <AffiliateDetailsCard />
    </div>
  );
};

export default SingleAffiliateUI;
