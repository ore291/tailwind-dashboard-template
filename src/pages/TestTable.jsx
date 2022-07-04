import React, { useState, useEffect } from "react";
import Table from "../components/Table.jsx";
import Pagination from "../components/pagination";
import { useGetUsersPagQuery } from "../store/services/users";

export const columns = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
];

const formatRowData = (rawData) =>
  rawData.map((info) => ({
    id: info.id,
    name: info.first_name + " " + info.last_name,
  }));



const TestTable = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    totalPages: 0,
    totalUsers: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = useGetUsersPagQuery({
    page: currentPage,
    size: 10,
  });

  return (
    <div>
      {isFetching ? null : (
        <>
          <p>Total Passengers: {data?.total || "Loading..."}</p>
          <div style={{ height: "600px" }}>
            <Table
              columns={columns}
              data={formatRowData(data?.items)}
              isLoading={isLoading}
            />
          </div>
          <Pagination
            totalRows={data.total}
            pageChangeHandler={setCurrentPage}
            rowsPerPage={10}
          />
        </>
      )}
    </div>
  );
};

export default TestTable;
