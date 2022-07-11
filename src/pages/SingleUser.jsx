import React from "react";
import Layout from "../components/Layout";

import { Badge, Pagination, Spinner } from "flowbite-react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "../partials/Profile";

import SingleRentalTable from "../partials/SingleRentalTable";
import SingleItemTable from "../partials/SingleItemTable";
import SingleWithdrawalTable from "../partials/SingleWithdrawalTable";
import {
  useGetUserQuery,
  useGetUserRentalsQuery,
} from "../store/services/users";
import { url, formatDate } from "../helper";

import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    error,
  } = useGetUserQuery(id);
  const { data: rentals, isLoading: isRentalDone } = useGetUserRentalsQuery(id);

  return (
    <Layout>
      <>
        {isLoading && isRentalDone ? (
          <div className="flex h-screen w-full items-center justify-center text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          user &&
          rentals && (
            <>
              {/* profile div */}
              <div className="grid justify-center capitalize text-center py-10">
                <Profile
                  id = {user.id}
                  img={`${url}${user.profile[0].picture}`}
                  name={user.first_name + " " + user.last_name}
                  date={formatDate(user.created_at)}
                  items={user.items.length}
                  rentals={rentals.length}
                  email={user.email}
                  status={user.is_active}
                />
              </div>

              <Tabs>
                <TabList className="  flex text-center md:w-10/12 bg-slate-300 pl-  justify-around  gap-1 border-2 mx-auto border-slate-500">
                  <Tab className="whitesapce-nowrap md:w-6/12 w-6/12 text-center px- py-2 text-lg md:text-2xl bg-slate-300 cursor-pointer">
                    Rentals
                  </Tab>
                  <Tab className="whitesapce-nowrap md:w-6/12 w-6/12 text-center px- bg-slate-300 py-2 text-lg md:text-2xl cursor-pointer">
                    Items
                  </Tab>
                  {/* <Tab className="whitesapce-nowrap md:w-4/12 w-4/12 text-center px- py-2 bg-slate-300 text-lg md:text-2xl cursor-pointer">
                    Withdrawals
                  </Tab> */}
                  {/* <Tab className="whitesapce-nowrap text-center px-8 py-2 text-lg md:text-2xl cursor-pointer">
            Transctions
          </Tab> */}
                </TabList>

                <TabPanel>
                  {rentals.length > 0 ? (
                    <div className="mb-10">
                      <SingleRentalTable rentals={rentals} />
                    </div>
                  ) : (
                    <h2 className="text-semibold text-center text-red-500 text-xl my-5">
                      No Rentals Found
                    </h2>
                  )}
                </TabPanel>
                <TabPanel>
                  {user.items.length > 0 ? (
                    <div className="mb-10">
                      <SingleItemTable items={user.items} />
                    </div>
                  ) : (
                    <h2 className="text-semibold text-center text-red-500 text-xl my-5">
                      No Items Found
                    </h2>
                  )}
                </TabPanel>
                {/* <TabPanel>
                  <div>
                    <SingleWithdrawalTable />
                  </div>
                </TabPanel> */}
              </Tabs>
            </>
          )
        )}
      </>
    </Layout>
  );
};

export default SingleUser;
