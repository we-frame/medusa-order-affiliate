import React, { useState, useEffect } from "react";
import { EllipseSolid, User } from "@medusajs/icons";
import { Customer } from "@medusajs/medusa";

interface AffiliateDetailCardPropsV2 {
  name: string;
  email: string;
  created_at: Date;
  phone: string;
  order_count: number;
  user: string;
}

interface CustomerDetailCardProps {
  affiliateId: string;
}

export const CustomerDetailCard = ({name, email, created_at, phone, order_count, user}: AffiliateDetailCardPropsV2) => {
  // const [affiliate, setAffiliate] = useState<Customer | null>(null);

  // useEffect(() => {
  //   const fetchCustomer = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:9000/admin/customers/${affiliateId}`, {
  //         credentials: "include",
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch customer data");
  //       }
  //       const data = await response.json();
  //       console.log("data ==============: ", data);
  //       setAffiliate(data);
  //     } catch (error) {
  //       console.error('Error fetching customer data:', error);
  //     }
  //   };

  //   fetchCustomer();
  // }, [affiliateId]);

  // if (!affiliate) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="w-full bg-white p-6 flex items-center justify-between rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-[#eeeeee] p-5 rounded-full cursor-pointer">
          <User />
        </div>

        <div className="flex flex-col items-start justify-start">
          <p className="font-semibold">{name}</p>
          <p className="text-xs font-normal">{email}</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-10">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">First seen</p>
          <p className="text-sm font-medium">{created_at ? new Date(created_at).toLocaleDateString() : "N/A"}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Phone</p>
          <p className="text-sm font-medium">{phone ?? "N/A"}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Orders</p>
          <p className="text-sm font-medium">{order_count ?? 0}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">User</p>
          <div className="bg-[#ffe9ea] flex items-center justify-center pr-2 rounded-3xl">
            <EllipseSolid color="#ff5660" />
            <p className="text-[#ff5660] text-xs font-medium -ml-1">{user}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
