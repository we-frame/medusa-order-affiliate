import { Button, IconButton } from "@medusajs/ui";
import { Adjustments, Funnel, CogSixTooth } from "@medusajs/icons";

export const Filters = () => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        className="bg-[#fefefe] hover:bg-[#ebebeb] border border-[#ebebeb] rounded-md shadow-sm active:text-black text-base text-black font-medium px-3 py-[6px]"
      >
        <Funnel />
        Filter
      </Button>

      <IconButton>
        <Adjustments />
      </IconButton>

      <IconButton>
        <CogSixTooth />
      </IconButton>
    </div>
  );
};
