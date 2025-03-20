"use client";

import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { Users } from "@/types/Users";
import Alert from "@/components/Alert/Alert";
import { apiFetch } from "@/utils/api";
import { Badge } from "@/components/ui/badge";

const handleActivateUser = async (id: number, isActive: boolean) => {
  // api/admin/owners/{id}/activate
  const res = (await apiFetch(`/admins/owners/${id}/activate`, {
    method: "PATCH",
    body: JSON.stringify({ isActive: !isActive }),
  })) as Response;

  if (res.status === 200) {
    window.location.reload();
  }
};

const handleApproveUser = async (id: number, approved: boolean) => {
  // api/admin/owners/{id}/approve
  const res = (await apiFetch(`/admins/owners/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({ approved: !approved }),
  })) as Response;

  if (res.status === 200) {
    window.location.reload();
  }
};

const columns: ColumnDef<Users>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="font-medium">{row.getValue("name")}</div>
        </div>
      );
    },
    size: 180,
  },
  {
    header: "Email",
    accessorKey: "email",
    size: 200,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: () => {
      return (
        <div>
          <span className="leading-none capitalize">Owner</span>{" "}
        </div>
      );
    },
    size: 180,
  },
  {
    header: "Active",
    accessorKey: "active",
    cell: ({ row }) => <ActiveCell row={row} />,
    size: 120,
  },
  {
    header: "Approve",
    accessorKey: "approved",
    cell: ({ row }) => <ApprovedCell row={row} />,
    size: 120,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ApprovedCell = ({ row }: { row: any }) => {
  const [isApproved, setIsApproved] = useState(row.getValue("approved"));

  return !isApproved ? (
    <Alert
      label="Approve"
      modalTitle="Activate User"
      modalDescription="Are you sure you want to approve this user?"
      onConfirm={() => {
        handleApproveUser(row.original.id, row.original.approved);
        setIsApproved(!isApproved);
      }}
      className={cn(
        row.getValue("approved") === false &&
        "bg-muted-foreground/60 text-primary-foreground",
        "w-[120px] rounded-full"
      )}
    />
  ) : (
    <Badge>Approved</Badge>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActiveCell = ({ row }: { row: any }) => {
  const [isActive, setIsActive] = useState(row.getValue("active"));

  return (
    <Alert
      label={isActive === true ? "Deactivate" : "Activate"}
      modalTitle="Change User Status"
      modalDescription={
        isActive === true
          ? "Are you sure you want to deactivate this user?"
          : "Are you sure you want to activate this user?"
      }
      onConfirm={() => {
        handleActivateUser(row.original.id, row.original.isActive);
        setIsActive(!isActive);
      }}
      className={cn(
        {
          "bg-green-50 text-green-500": !isActive,
          "bg-red-50 text-red-500": isActive,
        }
      )}
    />
  );
};

const AdminTable = () => {
  const pageSize = 10;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const [data, setData] = useState<Users[]>([]);

  const fetchUsers = useCallback(async () => {
    const res = apiFetch(
      `/admins/owners?limit=${pagination.pageSize}&page=${pagination.pageIndex}`
    );
    const data = (await res) as { data: Users[]; meta: { totalPages: number } };
    setData(data.data);
    setNumberOfUsers(data.meta.totalPages);
  }, [pagination.pageIndex, pagination.pageSize]);

  const fetchNumberOfUsers = useCallback(async () => {
    const res = await fetch("/api/users/count");
    const data = await res.json();
    setNumberOfUsers(data.count);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, fetchNumberOfUsers]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: Math.ceil(numberOfUsers / table.getState().pagination.pageSize),
    paginationItemsToDisplay: 10,
  });

  return (
    <div className="space-y-4">
      <div className="bg-background overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                            "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3 max-sm:flex-col">
        {/* Page number information */}
        <p
          className="text-muted-foreground flex-1 text-sm whitespace-nowrap"
          aria-live="polite"
        >
          Page{" "}
          <span className="text-foreground">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of <span className="text-foreground">{table.getPageCount()}</span>
        </p>

        {/* Pagination buttons */}
        <div className="grow">
          <Pagination>
            <PaginationContent>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() =>
                    table.setPageIndex(
                      table.getState().pagination.pageIndex - 1
                    )
                  }
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>

              {/* Left ellipsis (...) */}
              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Page number buttons */}
              {pages.map((page) => {
                const isActive =
                  page === table.getState().pagination.pageIndex + 1;
                return (
                  <PaginationItem key={page}>
                    <Button
                      size="icon"
                      variant={`${isActive ? "outline" : "ghost"}`}
                      onClick={() => table.setPageIndex(page - 1)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                );
              })}

              {/* Right ellipsis (...) */}
              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() =>
                    table.setPageIndex(
                      table.getState().pagination.pageIndex + 1
                    )
                  }
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Results per page */}
        <div className="flex flex-1 justify-end">
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            aria-label="Results per page"
          >
            <SelectTrigger
              id="results-per-page"
              className="w-fit whitespace-nowrap"
            >
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminTable);
