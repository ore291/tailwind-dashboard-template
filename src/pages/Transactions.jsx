import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import countriesData from "../tabledata/countries";
import { Badge, Pagination } from "flowbite-react";
import { Modal, Button, Toast } from "flowbite-react";
import { useGetTransPagQuery } from "../store/services/items";
import { useNavigate, Link } from "react-router-dom";
import Table from "../components/Table.jsx";
import { formatCurrency, formatDate } from "../helper";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

function Transactions() {
  const formatRowData = (rawData) =>
    rawData.map((info) => ({
      id: info.id,
      name: info.user.first_name + " " + info.user.last_name,
      amount: formatCurrency(info.amount),
      reason: info.reason,
      date: formatDate(info.created_at),
      type: info.trans_type,
      initial: formatCurrency(info.initial_bal),
      current: formatCurrency(info.current_bal),
      reference : info.reference
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(0);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const { data, isLoading, isFetching } = useGetTransPagQuery({
    id: query || 0,
    page: currentPage,
    size: 15,
  });

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "User",
        accessor: "name",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Description",
        accessor: "reason",
      },
      {
        Header: "Reference",
        accessor: "reference",
      },
      {
        Header: "Transaction Type",
        accessor: "type",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "initial Balance",
        accessor: "initial",
      },
      {
        Header: "Current Balance",
        accessor: "current",
      },
      
    ],
    []
  );

  return (
    <Layout>
      <div className="mt-5 relative">
        <h1 className="text-2xl font-semibold text-center">Transactions</h1>
        <div className="max-w-5xl mx-auto p-5">
          <form className="flex items-center my-5">
            <label htmlFor="simple-search" className="sr-only">
              Search by transaction ID
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
}

export default Transactions;
