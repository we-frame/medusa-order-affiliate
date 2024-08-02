import { ArrowLeftMini } from "@medusajs/icons";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { AffiliateDetailsCard } from "./AffiliateDetailsCard";
import { useNavigate } from "react-router-dom";
import { Customer } from "@medusajs/medusa";

interface SingleAffiliateProps {
  affiliateId: string;
}

const SingleAffiliateUI = ({ affiliateId }: SingleAffiliateProps) => {
  const [affiliate, setAffiliate] = useState<Customer | null>(null);
  
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:9000/admin/customers/${affiliateId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        console.log("data ==============: ", data);
        setAffiliate(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomer();
  }, [affiliateId]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  // console.log(" === Affiliate Data: ", affiliate);
  
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

      <CustomerDetailCard name={"Shikhar Yadav"} email="yshikharfzd10@gmail.com" created_at={new Date()} phone="960345667" order_count={10} user="Guest"  />
      <AffiliateDetailsCard affiliate_code="12345_#4567" affiliate_commission="20" />
    </div>
  );
};

export default SingleAffiliateUI;
function useState<T>(arg0: null): [any, any] {
  throw new Error("Function not implemented.");
}

function useEffect(arg0: () => void, arg1: string[]) {
  throw new Error("Function not implemented.");
}

