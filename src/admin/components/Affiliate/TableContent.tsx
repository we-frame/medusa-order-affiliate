import { Customer } from "@medusajs/medusa";
import { Table } from "@medusajs/ui";
import { useState, useMemo } from "react";

interface TableContentTypes {
  data: any;
}

export const TableContent = ({ data }: TableContentTypes) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;
  const pageCount = Math.ceil(data?.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);

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

  console.log("currentOrders ::", currentOrders);
  return (
    <div className="w-full border-t py-7 rounded-bl-xl rounded-br-xl">
      <div className="flex gap-1 flex-col">
        <Table>
          <Table.Header>
            <Table.Row>
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
          <Table.Body>
            {currentOrders?.length > 0 ? (
              data?.map((customer: Customer) => {
                return (
                  <Table.Row
                    key={customer?.id}
                    className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
                  >
                    <Table.Cell>
                      {customer?.first_name} {customer?.last_name}
                    </Table.Cell>
                    <Table.Cell>{customer?.email}</Table.Cell>
                    <Table.Cell>{(customer?.commission ?? 0.0) as number}</Table.Cell>
                    <Table.Cell>{(customer?.total_sales ?? 0.0) as number}</Table.Cell>
                    <Table.Cell>{(customer?.affiliate_code ?? "") as string}</Table.Cell>
                    <Table.Cell>{(customer?.affiliate_status ?? "") as string}</Table.Cell>
                    <Table.Cell>{(customer?.last_login ?? "") as string}</Table.Cell>
                    {/* <Table.Cell>{customer?.has_account}</Table.Cell> */}
                  </Table.Row>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-lg font-medium text-red-500">
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
          pageCount={data?.length}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
