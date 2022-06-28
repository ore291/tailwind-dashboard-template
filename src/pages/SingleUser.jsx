import React from "react";
import Layout from "../components/Layout";
import countriesData from "../tabledata/countries";
import { Badge, Pagination } from "flowbite-react";
import { Modal, Button, Toast, Tooltip, Avatar } from "flowbite-react";
import { HiUserCircle, HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "../partials/Profile";
import Image05 from "../images/user-36-09.jpg";

import SingleRentalTable from "../partials/SingleRentalTable";
import SingleItemTable from "../partials/SingleItemTable";
import SingleWithdrawalTable from "../partials/SingleWithdrawalTable";


const SingleUser = () => {
  return (
    <Layout>
      {/* profile div */}
      <div className="grid justify-center capitalize text-center py-10">
        <Profile
          img={Image05}
          name={"israel"}
          date={new Date().getMonth() + 1}
          items={3}
          rentals={5}
          email={"israelpadonu@gmail.com"}
        />
      </div>

      <Tabs>
        <TabList className=" flex text-center md:w-10/12 bg-slate-300 pl-  justify-around  gap-1 border-2 mx-auto border-slate-500">
          <Tab className="whitesapce-nowrap md:w-4/12 w-4/12 text-center px- py-2 text-2xl bg-slate-300 cursor-pointer">
            Rentals
          </Tab>
          <Tab className="whitesapce-nowrap md:w-4/12 w-4/12 text-center px- bg-slate-300 py-2 text-2xl cursor-pointer">
            Items
          </Tab>
          <Tab className="whitesapce-nowrap md:w-4/12 w-4/12 text-center px- py-2 bg-slate-300 text-2xl cursor-pointer">
            Withdrawal
          </Tab>
          {/* <Tab className="whitesapce-nowrap text-center px-8 py-2 text-2xl cursor-pointer">
            Transctions
          </Tab> */}
        </TabList>

        <TabPanel>
          <div>
            <SingleRentalTable />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <SingleItemTable />
            {/* <SingleUserTables
              title={"Items"}
              firstHeader={"Items"}
              secondHeader={"User"}
              thirdHeader={"Aprroved"}
              fourthHeader={"Daily Price"}
              fifthHeader={"Weekly price"}
              sixthHeader={"Monthly Price"}
              value={true}
              status={"items"}
            /> */}
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <SingleWithdrawalTable />
          </div>
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export default SingleUser;
