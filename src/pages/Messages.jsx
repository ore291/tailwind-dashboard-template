import React from 'react'
import Layout from '../components/Layout';
import countriesData from "../tabledata/countries";
import { Badge, Pagination, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

function Messages() {
  const navigate = useNavigate();

  const singleMessage = (message) => {
    navigate(`/messages/${message.id}`, { state: message });

  }
    return (
      <Layout>
        <div className="mt-5 relative">
          <h1 className="text-2xl font-semibold text-center">Messages</h1>
          <div className="max-w-4xl md:max-w-6xl  mx-auto p-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 whitespace-nowrap uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Company Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Contact Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
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
                      <td className="px-6 py-4 truncat text-center">
                        {countries.capital}
                      </td>
                      <td className="px-6 py-4  text-center justify-star">
                        {countries.language}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {countries.language}
                      </td>
                      <td className="px- py-4 text-center">{countries.id}</td>
                      <td className="px py-4 max-h-1 text-center ">
                        <p className="text-ellipsis overflow-hidden ... w-40 max-h-16 ">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit.... Sapiente id, vitae eos fuga autem doloribus
                          architecto enim explicabo quibusdam dignissimos
                          necessitatibus fugit in unde voluptates neque iure
                          recusandae. At, quae.
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {" "}
                        <Button
                          onClick={() => {
                            singleMessage(countries);
                          }}
                          color="success"
                        >
                          View Message
                        </Button>
                      </td>

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
}

export default Messages