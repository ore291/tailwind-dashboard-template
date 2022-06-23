import React from 'react'
import InfoCard from "../../components/InfoCard";
import { FaUsers , FaMoneyCheckAlt} from "react-icons/fa";
import {SiHandshake} from "react-icons/si"
import {GiSewingMachine} from "react-icons/gi"

const DashboardInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5px]">
          <InfoCard
            Icon={FaUsers}
            text="Total Users"
            value="8"
            color="!bg-blue-500"
          />
          <InfoCard
            Icon={SiHandshake}
            text="Total Rentals"
            value="8"
            color="!bg-purple-500"
          />
          <InfoCard
            Icon={GiSewingMachine}
            text="Total Items"
            value="8"
            color="!bg-green-500"
          />
          <InfoCard
            Icon={FaMoneyCheckAlt}
            text="Total Revenue"
            value="₦8"
            color="!bg-orange-500"
          />
        </div>
  )
}

export default DashboardInfo