import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import countriesData from "../tabledata/countries";
import { Badge, Pagination, Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { useGetMessagesPagQuery } from "../store/services/items";
import Table from "../components/Table.jsx";
import { formatCurrency, formatDate } from "../helper";
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im"
function Messages() {
  const navigate = useNavigate();

  const singleMessage = (id) => {
    navigate(`/messages/${id}`);
  };

  const formatRowData = (rawData) =>
    rawData.map((info) => ({
      id: info.id,
      name: info.name,
      company_name: info.company_name,
      company_email: info.company_email,
      number: info.contact_number,
      city: info.city,
      message: info.content,
      received: formatDate(info.created_at),
      viewed : info.reviewed
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const { data, isLoading, isFetching } = useGetMessagesPagQuery({
    query: query,
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Company Name",
        accessor: "company_name",
      },
      {
        Header: "Company Email",
        accessor: "company_email",
      },
      {
        Header: "Contact Number",
        accessor: "number",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Message",
        accessor: "message",
        Cell: ({ cell: { value } }) => (
          <React.Fragment>
           
            <p className="w-[100px] text-xs font-medium text-left truncate ...">
              {value}
            </p>
           
          </React.Fragment>
        ),
      },

      {
        Header : "Replied",
        accessor: "viewed",
        Cell: ({ cell: { value } }) => (
          <React.Fragment>
           <div className="w-full flex items-center justify-center">
                {
              value ? (
                <ImCheckboxChecked className="w-4 h-4 text-center text-green-500" />
              ) : (
                <ImCheckboxUnchecked className="w-4 h-4 text-center text-red-500 " />
              )
            }
           </div>
         
           
          </React.Fragment>
        ),
      },
      {
        id: "messaged_received_date",
        accessor: "received",
      },
      {
        id: "view_button",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <React.Fragment>
            <Button
              gradientDuoTone="greenToBlue"
              size="xs"
              onClick={() => singleMessage(value)}
            >
              View
            </Button>
          </React.Fragment>
        ),
      },
    ],
    []
  );
  return (
    <Layout>
      <div className="mt-5 relative">
        <h1 className="text-2xl font-semibold text-center">Messages</h1>
        <div className="max-w-4xl md:max-w-6xl  mx-auto p-5">
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
                type="text"
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

export default Messages;
