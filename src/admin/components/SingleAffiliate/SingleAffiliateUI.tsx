import { ArrowLeftMini } from "@medusajs/icons";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { AffiliateDetailsCard } from "./AffiliateDetailsCard";
import { useNavigate } from "react-router-dom";
import { Customer } from "@medusajs/medusa";
import { useState, useEffect } from "react";
import { toast, Toaster } from "@medusajs/ui";

interface SingleAffiliateProps {
  affiliateId: string;
}

const SingleAffiliateUI = ({ affiliateId }: SingleAffiliateProps) => {
  // State to hold affiliate data
  const [affiliate, setAffiliate] = useState<Customer | null>(null);
  // State to hold the affiliate commission change value
  const [changeAffiliateCommission, setChangeAffiliateCommission] =
    useState<number>(null);
  // State to hold the affiliate's active status
  const [toggleAffiliateActive, setToggleAffiliateActive] =
    useState<boolean>(false);

  const navigate = useNavigate();

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Function to fetch customer data from the server
  const fetchCustomer = async () => {
    try {
      const response = await fetch(
        `/admin/customers/${affiliateId}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }
      const data = await response.json();
      setAffiliate(data?.customer); // Set affiliate data
      setChangeAffiliateCommission(
        parseFloat(data?.customer?.commission || null)
      ); // Set affiliate commission
      setToggleAffiliateActive(data?.customer?.affiliate_status === "active"); // Set affiliate status
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  // Function to handle affiliate commission change
  const handleChangeAffiliate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/admin/customer/${affiliateId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            commission: changeAffiliateCommission,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update affiliate data");
      }

      toast.success(`Commission percentage is updated successfully`); // Show success notification
      fetchCustomer(); // Re-fetch customer data after successful update
    } catch (error) {
      console.error("Error updating affiliate data:", error);
      toast.error("Something went wrong!"); // Show error notification
    }
  };

  // Function to handle commission input change
  const handleCommissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 100) {
      setChangeAffiliateCommission(value); // Update commission value
    }
  };

  // Function to handle affiliate active status toggle
  const handleToggleChange = async (checked: boolean) => {
    setToggleAffiliateActive(checked); // Update active status in the state
    setTimeout(async () => {
      try {
        const response = await fetch(
          `/admin/customer/${affiliateId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              affiliate_status: checked ? "active" : "inactive",
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update affiliate status");
        }

        if (checked) {
          toast.success("Affiliate commission is active");
        } else {
          toast.warning("Affiliate commission is disabled");
        }
        fetchCustomer(); // Re-fetch customer data after successful update
      } catch (error) {
        console.error("Error updating affiliate status:", error);
        toast.error("Something went wrong!");
      }
    }, 1000); // Delay of 3 seconds
  };

  // Fetch customer data when the component mounts or when the affiliateId changes
  useEffect(() => {
    fetchCustomer();
  }, [affiliateId]);

  console.log("Customer data ::", affiliate);

  return (
    <>
      <Toaster position="top-right" />
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

        <CustomerDetailCard data={affiliate} />
        <AffiliateDetailsCard
          affiliate_code={affiliate?.affiliate_code}
          affiliate_commission={changeAffiliateCommission}
          is_active={toggleAffiliateActive}
          handleChangeAffiliate={handleChangeAffiliate}
          handleCommissionChange={handleCommissionChange}
          handleToggleChange={handleToggleChange}
        />
      </div>
    </>
  );
};

export default SingleAffiliateUI;
