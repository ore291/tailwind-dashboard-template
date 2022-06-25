import React from "react";
import Layout from "../components/Layout";
import countriesData from "../tabledata/countries";
import { Badge, Pagination } from "flowbite-react";
import { Modal, Button, Toast, Tooltip } from "flowbite-react";
import { HiUserCircle, HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "../partials/Profile";
import Image05 from "../images/user-36-09.jpg";


const SingleUser = () => {
  return (
    <Layout>
      <div className="grid justify-center py-10">
        <Profile img={Image05} name={"israel"} />
      </div>

      <Tabs>
        <TabList className="flex justify-evenly">
          <Tab ClassName="px-52">Rentals</Tab>
          <Tab>Items</Tab>
          <Tab>Withdrawl Requests</Tab>
          <Tab>Transctions</Tab>
        </TabList>

        <TabPanel>
          <h2>
            {" "}
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
                          <td className="px-6 py-4 truncate">
                            {countries.capital}
                          </td>
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
          </h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export default SingleUser;
