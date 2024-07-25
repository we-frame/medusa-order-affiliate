import type { WidgetConfig } from "@medusajs/admin";
import { Button } from "@medusajs/ui";
import { Link } from "react-router-dom";

const CustomerWidget = () => {
  return (
    <div className="flex items-center justify-start gap-2 pb-4">
        <Button
          variant="transparent"
          className="bg-[#d3eaff] hover:bg-[#d3eaff] border border-[#2198ff] rounded-2xl text-base text-[#2198ff] font-medium px-4"
        >
          All
        </Button>

      <Link to={"/a/affiliate"}>
        <Button
          variant="transparent"
          className="bg-[#ffffff] hover:bg-[#ffffff] border border-[#ffffff] rounded-2xl text-base text-[#7c8088] font-medium px-4"
        >
          Affiliate
        </Button>
      </Link>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "customer.list.before",
};

export default CustomerWidget;
