import React from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { Badge, Pagination, Button,Checkbox } from "flowbite-react";

function Message() {
  const location = useLocation();
  return (
    <Layout>
      <div className="flex md:w-10/12 mx-auto my-12 gap-3 capitalize justify-center">
        <ul className="bg-slate-100 rounded-lg border-gray-200 border-2 font-bold w-full ">
          <li className="w-full border-b font-bold border-t  border-slate-600 text-sm px-6 py-6 ">
            name:{" "}
            <span className="justify-center ml-5">{location.state.name}</span>
          </li>
          <li className="w-full border-b border-slate-600 text-sm px-6 py-6 ">
            Company name:{" "}
            <span className="justify-self-center ml-5">
              {location.state.capital}
            </span>
          </li>
          <li className="w-full border-b border-slate-600 text-sm px-6 py-6  ">
            Company email:{" "}
            <span className="justify-self-center ml-5">padonu israel</span>
          </li>
          <li className="w-full border-b border-slate-600 text-sm px-6 py-6  ">
            Contact Number:{" "}
            <span className="justify-self-center ml-5">padonu israel</span>
          </li>
          <li className="w-full border-b border-slate-600 text-sm px-6 py-6  ">
            city:{" "}
            <span className="justify-self-center ml-5">padonu israel</span>
          </li>
          <li className="w-full border- border-slate-600 text-sm px-6 py-6 rounded-b-lg  ">
            message:{" "}
            <p className="px-6 py-6 text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus id
              pariatur voluptas, esse cumque, molestias, fugit dignissimos
              expedita provident vero doloribus ipsum? Omnis, cumque non culpa
              voluptatibus at obcaecati neque.
            </p>
          </li>

          <div className=" items-center flex gap-4 px-6 py-3">
            <Checkbox id="is-answered" />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="flexRadioDefault1"
            >
              is Answered?
            </label>
            {/* <input
              className="form-check-inpu appearance-none  h-4 w-4 border border-gray-300 bg-white checked:bg-blue-100 checked:border-blue-600 focus:outline-none transition duration-100 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 ml-2 cursor-pointer"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault20"
            /> */}
          </div>
        </ul>
      </div>
    </Layout>
  );
}

export default Message;
