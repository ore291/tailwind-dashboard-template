import React from "react";
import { useGetDashboardRevenueQuery } from "../../store/services/dashboard";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { formatDate, formatCurrency } from "../../helper";

function Income() {
  const {
    data: transactions,
    isFetching,
    isLoading,
  } = useGetDashboardRevenueQuery(
    { skip: 0, limit: 6 },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between Income-center ">
        <h2 className="font-semibold text-slate-800">Transactions</h2>
        <Link to="/transactions">
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
          transactions && (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 cursor-grab hover:scrollbar-thumb-black scrollbar-track-gray-100">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">User</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Amount</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Reference</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">information</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Date</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {transactions.map((transaction) => {
                    return (
                      <tr key={transaction.id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex Income-center">
                            <div className="font-medium text-slate-800 capitalize">
                              {`${transaction.user.first_name} ${transaction.user.last_name}`}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex Income-center">
                            <div className="font-medium text-slate-800">
                              {formatCurrency(transaction.amount)}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {transaction.reference}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{transaction.reason}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {formatDate(transaction.created_at)}
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

export default Income;
