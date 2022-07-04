import React from "react";
import { useGetDashboardRentalsQuery } from "../../store/services/dashboard";
import { Link } from "react-router-dom";
import { Spinner, Badge } from "flowbite-react";
import { formatDate, formatCurrency , check_status} from "../../helper";

function Rentals() {
  const {
    data: rentals,
    isFetching,
    isLoading,
  } = useGetDashboardRentalsQuery(
    { skip: 0, limit: 6 },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center ">
        <h2 className="font-semibold text-slate-800">New Rentals</h2>
        <Link to="/rentals">
          <span className="cursor-pointer font-semibold text-slate-800">
            View All
          </span>
        </Link>
      </header>
      <div className="p-3">
        {/* Table */}
        {isLoading ? (
          <div className="row-container">
            <Spinner
              color="success"
              size="lg"
              aria-label="Success spinner example"
            />
          </div>
        ) : (
          rentals && (
            <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-200 cursor-grab hover:scrollbar-thumb-black scrollbar-track-gray-100">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Lender</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Lendee</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Item</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Rent Duration
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {rentals.map((rental) => {
                    return (
                      <tr key={rental.id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800">
                              {`${rental.lender.first_name} ${rental.lender.last_name}`}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800">
                              {`${rental.lendee.first_name} ${rental.lendee.last_name}`}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{rental.item.title}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {rental.duration} days
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            <Badge color={check_status(rental.rental_status)} size="sm">
                              {rental.rental_status}
                            </Badge>
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

export default Rentals;
