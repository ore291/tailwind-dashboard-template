import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store/services/auth";
import { ToastContainer, toast } from "react-toastify";


function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [
    userLogin, // This is the mutation trigger
    { isLoading: loading, isSuccess, isError, error, data}, // This is the destructured mutation result
  ] = useLoginUserMutation();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);
    await userLogin(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", JSON.stringify(data.access_token));
      localStorage.setItem("role", data.role);
      toast.success('You successfully logged in');
      navigate("/");
    }
    if (isError) {
      console.log(error)
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error(error.data.detail, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loading])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md border-t-4 border-green-600 md:w-6/12 md:mx-auto mt-32 rounded px-8 pt-6 pb-8 mb-4 mx-1  flex flex-col"
    >
      {/* <h1 class="text-3xl font-semibold text-center text-green-700">28 Bookings</h1> */}
      <div className="w-full flex items-center justify-center">
        <img className="w-28 h-28 object-contain" src="/logo.png" alt="logo" />
      </div>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="email"
          placeholder="Email"
          required
          {...register("email")}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
          required
          {...register("password")}
        />
        <p className="text-red-500 text-xs italic  flex justify-end items-center ">
          <a className="inline-block font-bold  hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className=" border md:w-96 w-48 font-bold py-2 px-4 text-white rounded-full bg-green-500 hover:bg-green-600 transition duration-900"
          type="submit"
        >
          {loading ? (
            <Spinner color="success" aria-label="Success spinner example" />
          ) : (
            "Login"
          )}
        </button>
      </div>
    </form>
  );
}

export default Login;
