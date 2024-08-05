import {
  EllipsisHorizontal,
  Newspaper,
  PencilSquare,
  Plus,
  Trash,
} from "@medusajs/icons";
import { Customer } from "@medusajs/medusa";
import { Button, DropdownMenu, Table, toast } from "@medusajs/ui";
import { useState, useMemo } from "react";
import { formatDate } from "../../lib/formayDate";
import { useNavigate } from "react-router-dom";

interface TableContentTypes {
  data: any;
  refetch: Function;
}

export const TableContent = ({ data, refetch }: TableContentTypes) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pageCount = Math.ceil(data?.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentOrders = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, data?.length);

    return data.slice(offset, limit);
  }, [currentPage, pageSize, data]);

  const deleteAffiliate = async (affiliateId: string) => {
    try {
      const response = await fetch(
        `http://localhost:9000/admin/customer/${affiliateId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      console.log(response);
      if (response?.ok) {
        console.log(`Successfully deleted ${affiliateId}`);
        toast.success("Affiliate deleted successfully");
        refetch();
      } else {
        console.log("Failed to delete affiliate", response.statusText);
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  console.log("currentOrders ::", currentOrders);
  return (
    <div className="w-full border-t p-7 rounded-bl-xl rounded-br-xl">
      <div className="w-full flex gap-1 flex-col">
        <Table className="w-full">
          <Table.Header>
            <Table.Row className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Commission</Table.HeaderCell>
              <Table.HeaderCell>Total Sales</Table.HeaderCell>
              <Table.HeaderCell>Affiliate Code</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Last Login</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="w-full">
            {currentOrders?.length > 0 ? (
              currentOrders?.map((customer: Customer) => {
                return (
                  <Table.Row
                    key={customer?.id}
                    className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      handleNavigate(`/a/affiliate/${customer?.id}`)
                    }
                  >
                    <Table.Cell>
                      {customer?.first_name} {customer?.last_name}
                    </Table.Cell>
                    <Table.Cell>{customer?.email as string}</Table.Cell>
                    <Table.Cell>
                      {(customer?.commission ?? 0.0) as number}
                    </Table.Cell>
                    <Table.Cell>
                      {(customer?.total_sales ?? 0.0) as number}
                    </Table.Cell>
                    <Table.Cell>
                      {(customer?.affiliate_code ?? "") as string}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-col items-start justify-center gap-1 py-2">
                        <div>
                          {customer?.affiliate_status === "pending" ? (
                            <div>
                              <span className="px-2 py-1 rounded-3xl text-xs font-medium bg-[#fef2d5] text-[#ecab06]">
                                Pending
                              </span>
                            </div>
                          ) : customer?.affiliate_status === "active" ? (
                            <div>
                              <span className="px-2 py-1 rounded-3xl text-xs font-medium bg-[#cff5e5] text-[#0fce7e]">
                                Active
                              </span>
                            </div>
                          ) : customer?.affiliate_status === "inactive" ? (
                            <div>
                              <span className="px-2 py-1 rounded-3xl text-xs font-medium bg-[#cff5e5] text-[#0fce7e]">
                                Inactive
                              </span>
                            </div>
                          ) : customer?.affiliate_status === "denied" ? (
                            <div>
                              <span className="px-2 py-1 rounded-3xl text-xs font-medium bg-[#ffe9ea] text-[#ff5660]">
                                Denied
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {customer?.affiliate_verified_on && (
                          <div>
                            <span className="text-xs">
                              {formatDate(customer?.affiliate_verified_on)}
                            </span>
                          </div>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {(customer?.last_login ?? "") as string}
                    </Table.Cell>
                    <Table.Cell>
                      <DropdownMenu>
                        <DropdownMenu.Trigger asChild>
                          <Button
                            variant="transparent"
                            className="bg-transparent"
                          >
                            <EllipsisHorizontal />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="z-50">
                          {/* <DropdownMenu.Item className="gap-x-2">
                            <PencilSquare className="text-ui-fg-subtle" />
                            Edit
                          </DropdownMenu.Item> */}
                          {/* <DropdownMenu.Item
                            className="gap-x-2"
                            onClick={() =>
                              handleNavigate(`/a/affiliate/${customer?.id}`)
                            }
                          >
                            <Newspaper className="text-ui-fg-subtle" />
                            Details
                          </DropdownMenu.Item> */}
                          {/* <DropdownMenu.Separator /> */}
                          <DropdownMenu.Item
                            className="gap-x-2"
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteAffiliate(customer?.id);
                            }}
                          >
                            <Trash className="text-ui-fg-subtle" />
                            Delete
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center">
                <p className="text-center text-lg font-medium text-red-500">
                  No Data Found In Database
                </p>
              </div>
            )}
          </Table.Body>
        </Table>
        <Table.Pagination
          count={data?.length}
          pageSize={pageSize}
          pageIndex={currentPage}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
