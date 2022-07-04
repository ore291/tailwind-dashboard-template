import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AppTable = ({ columns, data, isLoading, manualPagination = false , onViewClick}) => {
  
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columnData,
    data: rowData,
    manualPagination
  });

  return (
    <>
    {isLoading ? (
     <div className="text-center">
     <Spinner size="xl" aria-label="Center-aligned spinner example" />
   </div>
    ) : (
      <>
        <table {...getTableProps()} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} scope="col" className="px-1 py-3 text-center whitespace-nowrap">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          {/* onClick={()=>onRowClick(row.values)}  */}
          <tbody {...getTableBodyProps()} >
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}  className="bg-white border-b p-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" >
                  {row.cells.map((cell) => {
                    return (
                      <td className="px-2 py-3 truncate text-center "
                      style={{ width: "80px" }} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    )}
  </>
  );
};

export default AppTable;