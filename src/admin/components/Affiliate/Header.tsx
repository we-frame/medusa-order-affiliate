import { Button } from "@medusajs/ui";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center justify-start gap-2 pb-4">
        <Link to={"/a/customers"}>
          <Button
            variant="transparent"
            className="bg-[#ffffff] hover:bg-[#ffffff] border border-[#ffffff] rounded-2xl shadow-sm text-base text-[#7c8088] font-medium px-4"
          >
            All
          </Button>
        </Link>

        <Button
          variant="transparent"
          className="bg-[#d3eaff] hover:bg-[#d3eaff] border border-[#2198ff] rounded-2xl shadow-sm text-base text-[#2198ff] font-medium px-4"
        >
          Affiliate
        </Button>
      </div>

      <div className="pb-4">
        <Button
          variant="secondary"
          className="bg-[#f80590] hover:bg-[#f80590] border border-[#f80590] rounded-xl shadow-sm active:text-[#f80590] text-base text-white font-medium px-3"
        >
          Add Affiliate
        </Button>
      </div>
    </div>
  );
};

export default Header;
