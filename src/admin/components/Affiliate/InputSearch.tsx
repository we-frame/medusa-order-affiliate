import { Input } from "@medusajs/ui";

export function InputSearch() {
  return (
    <div className="w-[250px]">
      <Input placeholder="Search" id="search-input" type="search" />
    </div>
  );
}
