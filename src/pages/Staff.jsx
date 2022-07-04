import { Button, Modal, Pagination, Select, Label } from "flowbite-react";
import React, { useMemo, useState, useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Table from "../components/Table.jsx";
import { url } from "../helper";
import {
  useDeleteStaffMutation,
  useGetStaffsPagQuery,
  useUpdateUserMutation,
} from "../store/services/users";

function Staff() {
  const navigate = useNavigate();

  const [deleteStaff, { isLoading: isDeleting, isSuccess }] =
    useDeleteStaffMutation();

  const [
    updateRole,
    { isLoading: isUpdating, isSuccess: IsRoleUpdateSuccess },
  ] = useUpdateUserMutation();

  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [userRole, setUserRole] = useState(2);

  const onDelete = async () => {
    await deleteStaff(userId);
  };

  const onRoleUpdate = async () => {
    await updateRole({
      userId: userId,
      body: {
        role: userRole,
      },
    });
  };

  useEffect(() => {
    isSuccess && toggleModal();
  }, [isSuccess]);

  useEffect(() => {
    IsRoleUpdateSuccess && toggleModal();
  }, [IsRoleUpdateSuccess]);

  const openEditModal = async (value) => {
    setUserId(value);
    setEditModal(true);
  };

  const openDeleteModal = (value) => {
    setUserId(value);
    setShow(true);
  };
  const toggleModal = () => {
    setUserId(null);
    setEditModal(false);
    setShow(false);
  };
  const formatRowData = (rawData) =>
    rawData.map((info) => ({
      id: info.id,
      image: info.profile[0].picture,
      name: info.first_name + " " + info.last_name,
      email: info.email,
      phone: info.phone,
      location: info.location,
      role: info.role == 1 ? "Admin" : "Staff",
      // items: info.items.length,
      // acct_created: formatDate(info.created_at),
    }));

  const onRowClick = (row) => {
    navigate(`/users/${row.id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const { data, isLoading, isFetching } = useGetStaffsPagQuery({
    query: query,
    page: currentPage,
    size: 15,
  });

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <img
            src={`${url}${value}`}
            className="rounded-full object-cover w-12 h-12"
          />
        ),
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        id: "button-col",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <div className="row-container space-x-2">
            <React.Fragment>
              <Button
                color="success"
                size="xs"
                onClick={() => openEditModal(value)}
              >
                Edit
              </Button>
            </React.Fragment>
            <React.Fragment>
              <Button
                color="failure"
                size="xs"
                onClick={() => openDeleteModal(value)}
              >
                Delete
              </Button>
            </React.Fragment>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="mt-5 relative">
        <h1 className="text-2xl font-semibold text-center">Staff</h1>
        <div className="max-w-4xl mx-auto p-5">
          <form className="flex items-center my-5">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full md:w-[50%]">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                onChange={handleSearch}
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
            </div>
            {/* <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button> */}
          </form>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <p>Total Staffs: {data?.total}</p>
            {isFetching ? null : (
              <>
                <Table
                  columns={columns}
                  data={formatRowData(data?.items)}
                  isLoading={isLoading}
                  // onRowClick={onRowClick}
                />
                <div className="my-3 p-2">
                  {Math.ceil(data.total / data.size) == 1 ? null : (
                    <Pagination
                      currentPage={data?.page}
                      onPageChange={(page) => setCurrentPage(page)}
                      showIcons={true}
                      totalPages={Math.ceil(data.total / data.size)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <React.Fragment>
          <Modal show={show} size="md" popup={true} onClose={toggleModal}>
            <Modal.Header />
            <Modal.Body>
              {isDeleting ? (
                <div className="row-container w-full h-full text-center">
                  <svg
                    role="status"
                    className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to remove this Staff?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={onDelete}>
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={toggleModal}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal>
          <Modal show={editModal} size="sm" popup={true} onClose={toggleModal}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <div id="select" className="flex space-y-1 flex-col">
                  <div className="mb-2 block">
                    <Label htmlFor="roles" value="Change Staff role" />
                  </div>
                  <Select
                    id="roles"
                    required={true}
                    onChange={(e) => setUserRole(e.currentTarget.value)}
                  >
                    <option value={1}>Admin</option>
                    <option selected value={2}>
                      Staff
                    </option>
                  </Select>
                  <Button
                    color="success"
                    size="sm"
                    className="float-right "
                    onClick={onRoleUpdate}
                  >
                    {isUpdating ? "loading..." : "Save"}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      </div>
    </Layout>
  );
}

export default Staff;
