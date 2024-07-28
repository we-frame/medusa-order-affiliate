import { EllipseSolid, User } from "@medusajs/icons";

export const CustomerDetailCard = () => {
  return (
    <div className="w-full bg-white p-6 flex items-center justify-between rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-[#eeeeee] p-5 rounded-full cursor-pointer">
          <User />
        </div>

        <div className="flex flex-col items-start justify-start">
          <p className="font-semibold">Johann Beishline</p>
          <p className="text-xs font-normal">jdbeishline@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-10">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">First seen</p>
          <p className="text-sm font-medium">21 May 2024</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Phone</p>
          <p className="text-sm font-medium">N/A</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-normal text-[#7c8088]">Orders</p>
          <p className="text-sm font-medium">4</p>
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
