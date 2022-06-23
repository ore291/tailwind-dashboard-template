import React, { useState } from "react";
import Layout from "../Layout";
import { useParams } from "react-router-dom";
import {
  useGetCategoryBySlugQuery,
  useDeleteCategoryMutation,
} from "../../store/services/categories";
import { Link } from "react-router-dom";
import { Modal, Button, Toast } from "flowbite-react";
import { HiOutlineExclamationCircle, HiX } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const { slug } = useParams();
  const [show, setShow] = useState(false);
  const { data: category, isLoading } = useGetCategoryBySlugQuery(slug);
  const toggleModal = () => {
    setShow(!show);
  };
  const [
    deleteCategory, // This is the mutation trigger
    { isLoading: isDeleting, isSuccess }, // This is the destructured mutation result
  ] = useDeleteCategoryMutation();

  const onDelete = async (id) => {
    await deleteCategory(id);
    setShow(false);
    toast.error('Category deleted successfully!', {
      position: "top-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  return (
    <Layout>
      <div className="relative">
        {isLoading ? (
          <div className="row-container w-full h-screen text-center">
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
          <div className="mt-5 relative">
            <h1 className="text-2xl font-semibold text-center">
              {category.name}
            </h1>

            {category && category.children.length > 0 ? (
              <div className="max-w-4xl mx-auto p-5">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Category Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Slug
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th> */}
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.children.map((category) => (
                        <tr
                          key={category.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {category.name}
                          </th>
                          <td className="px-6 py-4 truncate">
                            {category.description}
                          </td>
                          <td className="px-6 py-4">{category.slug}</td>
                          {/* <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td> */}
                          <td className="px-6 py-4 text-right">
                            {/* <a
                              href="#"
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            >
                              Delete
                            </a> */}
                            <React.Fragment>
                              <Button
                                color="failure"
                                size="xs"
                                onClick={toggleModal}
                              >
                                Delete
                              </Button>
                              <Modal
                                show={show}
                                size="md"
                                popup={true}
                                onClose={toggleModal}
                              >
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
                                        Are you sure you want to delete this
                                        Category?
                                      </h3>
                                      <div className="flex justify-center gap-4">
                                        <Button
                                          color="failure"
                                          onClick={() => onDelete(category.id)}
                                        >
                                          Yes, I'm sure
                                        </Button>
                                        <Button
                                          color="gray"
                                          onClick={toggleModal}
                                        >
                                          No, cancel
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </Modal.Body>
                              </Modal>
                            </React.Fragment>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />
              </div>
            ) : (
              <div className="max-w-4xl mx-auto row-container">
                <Link to="/categories/add">
                  <button className="p-2 row-container shadow-md cursor-pointer bg-green-500 text-white rounded-md mt-10">
                    <span className="text-center text-2xl font-semibold ">
                      Add new sub-category
                    </span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Category;
