import { EllipseSolid, User } from "@medusajs/icons";
import { Customer } from "@medusajs/medusa";
import { SimpleConsoleLogger } from "typeorm";

interface AffiliateDetailCardPropsV2 {
  data: Customer;
}

export const CustomerDetailCard = ({ data }: AffiliateDetailCardPropsV2) => {
  console.log("data :::", data);
  return (
    <div className="w-full bg-white p-6 flex items-center justify-between rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-[#eeeeee] p-5 rounded-full cursor-pointer">
          <User />
        </div>

        <div className="flex flex-col items-start justify-start">
          <p className="font-semibold">
            {(data?.first_name != null) ? data?.first_name + " " + data?.last_name : data?.email}
          </p>
          <p className="text-xs font-normal">{data?.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-10">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">First seen</p>
          <p className="text-sm font-medium">
            {data?.created_at
              ? new Date(data?.created_at).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Phone</p>
          <p className="text-sm font-medium">{data?.phone ?? "N/A"}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Affiliate Orders</p>
          <p className="text-sm font-medium">{data?.orders?.length}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">User</p>
          <div className="bg-[#ffe9ea] flex items-center justify-center pr-2 rounded-3xl">
            <EllipseSolid color="#ff5660" />
            <p className="text-[#ff5660] text-xs font-medium -ml-1">
              {"Guest"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
