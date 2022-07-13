import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import { Badge, Pagination, Button, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table.jsx";
import { formatCurrency, formatDate, check_status } from "../helper";

import {
  useGetDashboardDisputesQuery,
  useUpdateDisputeMutation,
  useConfirmRefundMutation,
  useCancelBookingMutation,
} from "../store/services/dashboard";

const Disputes = () => {
  const navigate = useNavigate();

  const [resolveDispute, { isLoading: isSettling }] =
    useUpdateDisputeMutation();

  const [confirmRefund, { isLoading: isRefunding }] =
    useConfirmRefundMutation();

  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const formatRowData = (rawData) =>
    rawData.map((info) => ({
      id: info.id,
      user_type: info.user_type,
      name: info.user.first_name + " " + info.user.last_name,
      phone: info.user.phone,
      location: info.user.location,
      account: info.user.account_number,
      bank: info.user.bank,
      status: info.rental.rental_status,
      refund_status: info.status,
      paid: info.rental.paid === true ? "Paid" : "Pending",
      refund: {
        id: info.id,
        type: info.user_type,
        status: info.refund,
        dstatus: info.status,
      },
      rental: { id: info.rental.id, status: info.rental.status },
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(0);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const { data, isLoading, isFetching } = useGetDashboardDisputesQuery({
    query: query,
    page: currentPage,
    size: 15,
  });

  //   const [approveItem, { isLoading: isApproving, isSuccess: done }] =
  //     useUpdateItemMutation();

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "user type",
        accessor: "user_type",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      //   {
      //     Header: "Location",
      //     accessor: "location",
      //   },
      {
        Header: "Account Number",
        accessor: "account",
      },
      {
        Header: "Bank",
        accessor: "bank",
      },
      {
        Header: "Status",
        accessor: "refund_status",
        Cell: ({ cell: { value } }) => (
          <React.Fragment>
            {value === "pending" ? (
              <Badge>{value}</Badge>
            ) : (
              <Badge color="success">{value}</Badge>
            )}
          </React.Fragment>
        ),
      },
      //   {
      //     Header: "Fee Paid",
      //     accessor: "paid",
      //   },
      //   {
      //     Header: "Status",
      //     accessor: "status",
      //     Cell: ({ cell: { value } }) => (
      //       <React.Fragment>
      //         <Badge color={check_status(value)}>{value}</Badge>
      //       </React.Fragment>
      //     ),
      //   },
      {
        id: "settled-button",
        accessor: "refund",
        Cell: ({ cell: { value } }) => (
          <React.Fragment>
            <Button
              onClick={() =>
                resolveDispute({ id: value.id, body: { status: "resolved" } })
              }
              color="success"
              size="xs"
              disabled={value.dstatus === "resolved"}
            >
              {isSettling ? (
                <>
                  <Spinner size="sm" light={true} /> Loading...
                </>
              ) : (
                "Confirm Resolved"
              )}
            </Button>
          </React.Fragment>
        ),
      },
      {
        id: "refund-button",
        accessor: "refund",
        Cell: ({ cell: { value } }) => (
          <React.Fragment>
            {isRefunding ? (
              <>
                <Spinner size="sm" light={true} /> Loading...
              </>
            ) : (
              <Button
                size="xs"
                disabled={
                  value.type === "lender" ||
                  value.status === true ||
                  value.dStatus === "resolved"
                }
                onClick={() => confirmRefund(value.id)}
              >
                Confirm Refund
              </Button>
            )}
          </React.Fragment>
        ),
      },
      {
        id: "cancel-button",
        accessor: "rental",
        Cell: ({ cell: { value } }) => (
          <React.Fragment>
           
              <Button  disabled={value.status === "cancelled"} color="failure" size="xs" onClick={()=>cancelBooking(value.id)}>
                {isCancelling ? (
                  <>
                    <Spinner size="sm" light={true} /> Loading...
                  </>
                ) : (
                  "Cancel Rental"
                )}
              </Button>
            
          </React.Fragment>
        ),
      },

      //   {
      //     Header: "Approved",
      //     accessor: "approved",
      //     Cell: ({ cell: { value } }) => (
      //       <React.Fragment>
      //         <Badge color={value ? "success" : "info"}>
      //           {value ? "Approved" : "Pending"}
      //         </Badge>
      //       </React.Fragment>
      //     ),
      //   },

      //   {
      //     id: "approve-button",
      //     accessor: "approveButt",
      //     Cell: ({ cell: { value } }) => (
      //       <React.Fragment>
      //         {value.verify ? null : (
      //           <Button
      //             gradientDuoTone="greenToBlue"
      //             size="xs"
      //             onClick={() =>
      //               approveItem({
      //                 itemId: value.id,
      //                 body: {
      //                   is_verified: true,
      //                 },
      //               })
      //             }
      //           >
      //             {isApproving ? "loading..." : "Approve"}
      //           </Button>
      //         )}
      //       </React.Fragment>
      //     ),
      //   },
    ],
    []
  );

  return (
    <Layout>
      <div className="mt-5 relative">
        <h1 className="text-2xl font-semibold text-center">Disputes</h1>
        <div className="max-w-6xl mx-auto p-5">
          <form className="flex items-center my-5">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full md:w-[50%]">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                onChange={handleSearch}
                type="number"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
            </div>
            {/* <button
        type="submit"
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button> */}
          </form>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <p>Total Items: {data?.total}</p>
            {isFetching ? null : (
              <>
                <Table
                  columns={columns}
                  data={formatRowData(data?.items)}
                  isLoading={isLoading}
                  // onRowClick={onRowClick}
                />
                <div className="my-3 p-2">
                  {Math.ceil(data.total / data.size) == 1 ? null : (
                    <Pagination
                      currentPage={data?.page}
                      onPageChange={(page) => setCurrentPage(page)}
                      showIcons={true}
                      totalPages={Math.ceil(data.total / data.size)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Disputes;
