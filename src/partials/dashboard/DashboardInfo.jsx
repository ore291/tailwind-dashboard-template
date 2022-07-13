import React from "react";
import InfoCard from "../../components/InfoCard";
import { FaUsers, FaMoneyCheckAlt } from "react-icons/fa";
import { SiHandshake } from "react-icons/si";
import { GiSewingMachine } from "react-icons/gi";
import { MdPendingActions, MdMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../store/services/dashboard";
import { Spinner } from "flowbite-react";
import {formatCurrency} from "../../helper";

const DashboardInfo = ({ user }) => {
  const {
    data: info,
    isFetching,
    isLoading,
  } = useGetDashboardDataQuery({
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  return (
    <>
      {isLoading ? (
        <div className="w-full row-container">
          <Spinner color="info" aria-label="Info spinner example" size="lg" />
        </div>
      ) : (
        info && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5px]">
            <Link to="/users">
              <InfoCard
                Icon={FaUsers}
                text="Total Users"
                value={info.userCount}
                color="!bg-blue-500"
              />
            </Link>
            <Link to="/rentals">
              <InfoCard
                Icon={SiHandshake}
                text="Total Rentals"
                value={info.rentalCount}
                color="!bg-purple-500"
              />
            </Link>

            {localStorage.getItem("role") == 1 ? (
              <Link to="/items">
                <InfoCard
                  Icon={GiSewingMachine}
                  text="Total Items"
                  value={info.itemCount}
                  color="!bg-green-500"
                />
              </Link>
            ) : (
              <Link to="/messages">
                <InfoCard
                  Icon={MdMarkEmailUnread}
                  text="Unread Messages"
                  value={info.messageCount}
                  color="!bg-green-500"
                />
              </Link>
            )}

            {localStorage.getItem("role") == 1 ? (
            <Link to="/transactions">
             <InfoCard
                Icon={FaMoneyCheckAlt}
                text="Total Revenue"
                value={formatCurrency(info.revenue)}
                color="!bg-orange-500"
              />
            </Link>
             
            ) : (
              <Link to="/items">
              <InfoCard
                Icon={MdPendingActions}
                text="Pending Items"
                value={info.unapprovedItemCount}
                color="!bg-orange-500"
              />
              </Link>
              
            )}
          </div>
        )
      )}
    </>
  );
};

export default DashboardInfo;
