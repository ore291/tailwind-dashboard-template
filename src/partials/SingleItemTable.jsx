import React from "react";
import countriesData from "../tabledata/countries";
import { Badge, Pagination } from "flowbite-react";
import { formatDate, formatCurrency, check_status } from "../helper";

function SingleItemTable({ items }) {
  return (
    <div className="mt-5 relative">
      <div className="max-w-4xl mx-auto p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-1 py-3">
                  Item
                </th>
                <th scope="col" className="px-1 py-3">
                  Value
                </th>
                <th scope="col" className="px-1 py-3">
                  Min rental days
                </th>
                <th scope="col" className="px-1 py-3">
                  Location
                </th>
                <th scope="col" className="px-1 py-3">
                  Approved
                </th>
                <th scope="col" className="px-1 py-3">
                  Daily price
                </th>
                <th scope="col" className="px-1 py-3">
                  Weekly price
                </th>
                <th scope="col" className="px-1 py-3">
                  Monthly price
                </th>
                {/* <th scope="col" className="px-1 py-3">
                    <span className="sr-only">Edit</span>
                </th> */}
                {/* <th scope="col" className="px-1 py-3">
                          <span className="sr-only">Delete</span>
                        </th> */}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-1 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap capitalize"
                  >
                    {item.title}
                  </th>
                  <td className="px-1 py-4 truncate">
                    {formatCurrency(item.value)}
                  </td>
                  <td className="px-1 py-4 truncate text-center">
                    {item.min_rental_days}
                  </td>
                  <td className="px-1 py-4 truncate">{item.city}</td>
                  <td className="px-1 py-4 flex justify-start">
                    {" "}
                    {item.is_verified ? (
                      <Badge color="success" size="sm">
                        Approved
                      </Badge>
                    ) : (
                      <Badge color="info" size="sm">
                        Pending
                      </Badge>
                    )}
                  </td>

                  <td className="px-1 py-4 text-center">
                    {formatCurrency(item.daily_price)}
                  </td>
                  <td className="px-1 py-4 text-center">
                    {formatCurrency(item.weekly_price)}
                  </td>
                  <td className="px-1 py-4 text-center">
                    {formatCurrency(item.monthly_price)}
                  </td>

                  {/* <td className="px-1 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="my-3">
            <Pagination
              currentPage={1}
              // onPageChange={onPageChange}
              showIcons={true}
              totalPages={100}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SingleItemTable;
