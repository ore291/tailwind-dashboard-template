import React, {useState} from "react";
import Layout from "../../components/Layout";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} from "../../store/services/categories";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { data: categories, error, isLoading } = useGetCategoriesQuery(1);

  const [
    createCategory, // This is the mutation trigger
    { isLoading: isCreating, isSuccess }, // This is the destructured mutation result
  ] = useCreateCategoryMutation();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("parent_id", data.parent_id);
    await createCategory(formData);
    navigate("/categories")
  };
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <h1 className="text-3xl font-semibold">Add New Category</h1>

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-6 group my-4">
              <input
                type="text"
                name="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
                {...register("name")}
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Category Name <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Category Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Enter a short description"
                {...register("description")}
              ></textarea>
            </div>

            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="parent"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Parent Category
                </label>
                <select
                  id="parent"
                  name="parent"
                  required
                 
                  {...register("parent_id")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="category_placeholder"
                >
                  Upload Category Placeholder
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="category_placeholder"
                  id="category_placeholder"
                  type="file"
                  accept="image/*"
                  required
                  {...register("file")}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isCreating ? (
                <Spinner color="success" aria-label="Success spinner example" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default AddCategory;
