import React from "react";
import Layout from "../components/Layout";
import Category from "../components/categories/Category"
import countriesData from "../tabledata/countries";
import { Badge, Pagination } from "flowbite-react";

const Rentals = () => {
  return (
    <Layout>
      <div className="mt-5 relative">
        <h1 className="text-2xl font-semibold text-center">rentals</h1>
        <div className="max-w-4xl mx-auto p-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Lender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lendee
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Id
                  </th> */}
                  {/* <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th> */}
                  {/* <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th> */}
                </tr>
              </thead>
              <tbody>
                {countriesData.map((countries) => (
                  <tr
                    key={countries.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {countries.name}
                    </th>
                    <td className="px-6 py-4 truncate">{countries.capital}</td>
                    <td className="px-6 py-4">{countries.language}</td>
                    <td className="px-6 py-4 flex justify-start">
                      {" "}
                      <Badge color="info" size="sm">
                        Default
                      </Badge>
                    </td>
                    {/* <td className="px-6 py-4">{countries.id}</td> */}

                    {/* <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-3">
              <Pagination
                currentPage={1}
                // onPageChange={onPageChange}
                showIcons={true}
                totalPages={100}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rentals;
