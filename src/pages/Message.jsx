import React, {useEffect} from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { Badge, Pagination, Button, Checkbox, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import {
  useGetSingleMessageQuery,
  useUpdateContactMutation,
} from "../store/services/items";

function Message() {
  const { id } = useParams();
  const { data: message, isLoading, isSuccess } = useGetSingleMessageQuery(id);
  const [markMessageRead, { isLoading: isUpdating, isSuccess: doneUpdating }] =
    useUpdateContactMutation();

    useEffect(() => {
      doneUpdating && toast.success('Marked as Read');
    },[doneUpdating])
  return (
    <Layout>
      {isLoading ? (
        <div className="text-center flex justify-center items-center h-screen w-full">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      ) : (
        <div className="flex md:w-10/12 mx-auto my-12 gap-3 capitalize justify-center">
          <ul className="bg-slate-100 rounded-lg border-gray-200 border-2 font-bold w-full ">
            <li className="w-full border-b font-bold border-t  border-slate-600 text-sm px-6 py-6 ">
              name: <span className="justify-center ml-5">{message.name}</span>
            </li>
            <li className="w-full border-b border-slate-600 text-sm px-6 py-6 ">
              Company name:
              <span className="justify-self-center ml-5">
                {message.company_name}
              </span>
            </li>
            <li className="w-full border-b border-slate-600 text-sm px-6 py-6  ">
              Company email:
              <span className="justify-self-center ml-5">
                {message.company_email}
              </span>
            </li>
            <li className="w-full border-b border-slate-600 text-sm px-6 py-6  ">
              Contact Number:
              <span className="justify-self-center ml-5">
                {message.contact_number}
              </span>
            </li>
            <li className="w-full border-b border-slate-600 text-sm px-6 py-6  ">
              city:
              <span className="justify-self-center ml-5">{message.city}</span>
            </li>
            <li className="w-full border- border-slate-600 text-sm px-6 py-6 rounded-b-lg  ">
              message:
              <p className="px-6 py-6 text-left">{message.content}</p>
            </li>

            <div className=" items-center flex gap-4 px-6 py-3">
              <Button onClick={()=>markMessageRead(message.id)} disabled={message.reviewed}>
                {isUpdating ? "Loading..." : "Mark as Read"}
              </Button>
              
            </div>
          </ul>
        </div>
      )}
    </Layout>
  );
}

export default Message;
