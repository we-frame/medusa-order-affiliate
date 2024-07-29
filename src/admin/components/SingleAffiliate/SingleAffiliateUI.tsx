import { ArrowLeftMini } from "@medusajs/icons";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { AffiliateDetailsCard } from "./AffiliateDetailsCard";
import { useNavigate } from "react-router-dom";

const SingleAffiliateUI = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // This navigates back to the previous page in the history stack
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

      <CustomerDetailCard />
      <AffiliateDetailsCard />
    </div>
  );
};

export default SingleAffiliateUI;
