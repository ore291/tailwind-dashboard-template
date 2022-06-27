import React from 'react'

function Login() {
  return (
    <div className="bg-white shadow-md border-t-4 border-green-600 md:w-6/12 mx-auto mt-32 rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="text-3xl font-semibold text-center text-green-700">28 Bookings</h1>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Username"
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
        />
        <p className="text-red text-xs italic">
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className=" border md:w-96 w-48 font-bold py-2 px-4 text-white rounded-full bg-green-500 hover:bg-green-600 transition duration-900"
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login