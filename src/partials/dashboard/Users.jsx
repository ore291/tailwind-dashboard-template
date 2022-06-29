import React from "react";
import { useGetDashboardUsersQuery } from "../../store/services/dashboard";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { url, formatDate } from "../../helper";

function DashboardUsers() {
  const {
    data: users,
    isFetching,
    isLoading,
  } = useGetDashboardUsersQuery(
    { skip: 0, limit: 6 },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );



  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center ">
        <h2 className="font-semibold text-slate-800">New Users</h2>
        <Link to="/users">
          <span className="cursor-pointer font-semibold text-slate-800">
            View All
          </span>
        </Link>
      </header>
      <div className="p-3">
        {/* Table */}
        {isLoading ? (
          <Spinner
            color="success"
            size="lg"
            aria-label="Success spinner example"
          />
        ) : (
          users && (
            <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-200 cursor-grab hover:scrollbar-thumb-black scrollbar-track-gray-100">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Phone</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Items</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Location</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Joined</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src={`${url}${user.profile[0].picture}`}
                                width="40"
                                height="40"
                                alt={user.first_name}
                              />
                            </div>
                            <div className="font-medium text-slate-800">
                              {`${user.first_name} ${user.last_name}`}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{user.email}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{user.phone}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{user.items.length}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{user.location}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {formatDate(user.created_at)}
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

export default DashboardUsers;
