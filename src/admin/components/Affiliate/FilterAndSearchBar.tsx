import { Filters } from "./Filters";
import { InputSearch } from "./InputSearch";

export const FilterAndSearchBar = () => {
  return (
    <div className="w-full bg-[#ffffff] flex items-center justify-between p-7 rounded-tl-xl rounded-tr-xl">
      <InputSearch />

      <Filters />
    </div>
  );
};
