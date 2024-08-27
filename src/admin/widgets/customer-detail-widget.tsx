import type { WidgetConfig, CustomerDetailsWidgetProps } from "@medusajs/admin";
import { useState } from "react";

const CustomerDetailsWidget = ({
  customer,
  notify,
}: CustomerDetailsWidgetProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      await fetch(`/admin/customer/affiliate/${customer.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      notify.success(
        "success",
        "Customer successfully converted to affiliate."
      );
    } catch (error) {
      notify.error("success", "Failed to convert customer to affiliate.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-end">
      {!customer.is_affiliate ? (
        <button
          className="bg-black rounded p-1 text-white"
          onClick={handleConvert}
          disabled={isLoading}
        >
          Convert to Affiliate
        </button>
      ) : (
        <button
          className="bg-green-700 rounded p-1 text-white"
          onClick={handleConvert}
          disabled={true}
        >
          Affiliate Customer
        </button>
      )}
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "customer.details.before",
};

export default CustomerDetailsWidget;
