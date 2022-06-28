import React from "react";
import { useGetDashboardItemsQuery } from "../../store/services/dashboard";
import { Link } from "react-router-dom";
import { Spinner, Badge } from "flowbite-react";
import { formatDate, formatCurrency } from "../../helper";

import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";

function Items() {
  const {
    data: items,
    isFetching,
    isLoading,
  } = useGetDashboardItemsQuery(
    { skip: 0, limit: 6 },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center ">
        <h2 className="font-semibold text-slate-800">New Items</h2>
        <span className="cursor-pointer font-semibold text-slate-800">
          View All
        </span>
      </header>
      <div className="p-3">
        {isLoading ? (
          <div className="row-container">
            <Spinner
              color="success"
              size="lg"
              aria-label="Success spinner example"
            />
          </div>
        ) : (
          items && (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 cursor-grab hover:scrollbar-thumb-black scrollbar-track-gray-100">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Item</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">User</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Approved</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Daily Price</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Weekly Price
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Monthly Price
                      </div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {items.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800">
                              {item.title}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800">
                              {`${item.created_by.first_name} ${item.created_by.last_name}`}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {item.is_verified ? (
                              <Badge color="success" size="sm">
                                Approved
                              </Badge>
                            ) : (
                              <Badge color="failure" size="sm">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800">
                              {formatCurrency(item.daily_price)}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800">
                            {formatCurrency(item.weekly_price)}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800">
                            {formatCurrency(item.monthly_price)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Items;
