// import { EllipseSolid, User } from "@medusajs/icons";
// import { Customer } from "@medusajs/medusa";

// interface CustomerDetailCardProps {
//   affiliateId: string;
// }

// export const CustomerDetailCard = ({ affiliateId }: CustomerDetailCardProps) => {

//   const [affiliate, setAffiliate] = useState<Customer | null>(null);

//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const response = await fetch(`http://localhost:9000/admin/customers/${affiliateId}`, {
//           credentials: "include",
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch customer data");
//         }
//         const data = await response.json();
//         console.log("data ==============: ", data);
//         setAffiliate(data);
//       } catch (error) {
//         console.error('Error fetching customer data:', error);
//       }
//     };

//     fetchCustomer();
//   }, [affiliateId]);

//   return (
//     <div className="w-full bg-white p-6 flex items-center justify-between rounded-lg shadow-sm">
//       <div className="flex items-center gap-2">
//         <div className="bg-[#eeeeee] p-5 rounded-full cursor-pointer">
//           <User />
//         </div>

//         <div className="flex flex-col items-start justify-start">
//           <p className="font-semibold">{`${affiliate.first_name} ${affiliate.last_name}`}</p>
//           <p className="text-xs font-normal">{affiliate.email}</p>
//         </div>
//       </div>

//       <div className="flex items-center justify-start gap-10">
//         <div className="flex flex-col items-start justify-start gap-1">
//           <p className="text-xs font-normal text-[#7c8088]">First seen</p>
//           <p className="text-sm font-medium">{affiliate?.created_at?.toLocaleDateString()}</p>
//         </div>

//         <div className="flex flex-col items-start justify-start gap-1">
//           <p className="text-xs font-normal text-[#7c8088]">Phone</p>
//           <p className="text-sm font-medium">{affiliate.phone ?? "N/A"}</p>
//         </div>

//         <div className="flex flex-col items-start justify-start gap-1">
//           <p className="text-xs font-normal text-[#7c8088]">Orders</p>
//           <p className="text-sm font-medium">{affiliate?.orders?.length ?? 0}</p>
//         </div>

//         <div className="flex flex-col items-start justify-start gap-1">
//           <p className="text-xs font-normal text-[#7c8088]">User</p>
//           <div className="bg-[#ffe9ea] flex items-center justify-center pr-2 rounded-3xl">
//             <EllipseSolid color="#ff5660" />
//             <p className="text-[#ff5660] text-xs font-medium -ml-1">Guest</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// function useState<T>(arg0: null): [any, any] {
//   throw new Error("Function not implemented.");
// }

// function useEffect(arg0: () => void, arg1: any[]) {
//   throw new Error("Function not implemented.");
// }


import React, { useState, useEffect } from "react";
import { EllipseSolid, User } from "@medusajs/icons";
import { Customer } from "@medusajs/medusa";

interface CustomerDetailCardProps {
  affiliateId: string;
}

export const CustomerDetailCard = ({ affiliateId }: CustomerDetailCardProps) => {
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

  if (!affiliate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-white p-6 flex items-center justify-between rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-[#eeeeee] p-5 rounded-full cursor-pointer">
          <User />
        </div>

        <div className="flex flex-col items-start justify-start">
          <p className="font-semibold">{`${affiliate.first_name} ${affiliate.last_name}`}</p>
          <p className="text-xs font-normal">{affiliate.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-10">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">First seen</p>
          <p className="text-sm font-medium">{affiliate.created_at ? new Date(affiliate.created_at).toLocaleDateString() : "N/A"}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Phone</p>
          <p className="text-sm font-medium">{affiliate.phone ?? "N/A"}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Orders</p>
          <p className="text-sm font-medium">{affiliate.orders?.length ?? 0}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">User</p>
          <div className="bg-[#ffe9ea] flex items-center justify-center pr-2 rounded-3xl">
            <EllipseSolid color="#ff5660" />
            <p className="text-[#ff5660] text-xs font-medium -ml-1">Guest</p>
          </div>
        </div>
      </div>
    </div>
  );
};
