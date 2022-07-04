import React, { useEffect } from "react";
import {
  Modal,
  Button,
  Toast,
  Tooltip,
  Avatar,
  Dropdown,
} from "flowbite-react";
import { FaCog } from "react-icons/fa";
import { useUpdateUserStatusMutation } from "../store/services/users";
import { useNavigate, useLocation } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const location = useLocation();



  const [
    updateUserStatus, // This is the mutation trigger
    { isLoading: isUpdating , isSuccess}, // This is the destructured mutation result
  ] = useUpdateUserStatusMutation();

  useEffect(() => {
    isSuccess && window.location.reload();
    // isSuccess && navigate(location.pathname, { replace: true })
    
  },[isSuccess])


  return (
    <div className="grid px-48 w-full py-6 justify-center relative max-w-md mx-auto md:max-w-9xl  min-w-0 whitespace-nowrap bg-white  mb-6 shadow-lg rounded-xl mt-6">
      <div className="md:justify-self-end justify-self-auto pl-9 md:pl-96">
        <Dropdown label={<FaCog />} inline={false} size="lg" color="succes">
          <Dropdown.Header>
            <span className="block text-sm">{props.name}</span>
            <span className="block truncate text-sm font-medium">
              {props.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Divider />
          {props.status ? (
            <Dropdown.Item
              className=""
              onClick={() => updateUserStatus({ id: props.id, status: false })}
            >
              <p className="hover:text-red-500">Ban user</p>
            </Dropdown.Item>
          ) : (
            <Dropdown.Item
              className=""
              onClick={() => updateUserStatus({ id: props.id, status: true })}
            >
              <p className="hover:text-red-500">Unban user</p>
            </Dropdown.Item>
          )}

          <Dropdown.Item></Dropdown.Item>
        </Dropdown>
      </div>
      <img
        src={props.img}
        alt=""
        srcSet=""
        className="shadow-xl rounded-full align-middle border-none w-52"
        style={{ borderRadius: "50%", justifySelf: "center" }}
      />
      <h1 className="text-center py-5 h1">{props.name}</h1>
      <div className="border-white border-2 grid  gap-1 md:gap-5 py-7 text- md:text-lg">
        <h5 className="row-start-1  text-xs md:text-xl font-bold block uppercase tracking-wide text-slate-700">
          member since
        </h5>
        <h5 className="row-start-1  text-xs md:text-xl font-bold block uppercase tracking-wide text-slate-700">
          items
        </h5>
        <h5 className="row-start-1  text-xs md:text-xl font-bold block uppercase tracking-wide text-slate-700">
          Rentals
        </h5>
        <h5 className="row-start-1 text-xs  md:text-xl font-bold block uppercase tracking-wide text-slate-700">
          Status
        </h5>
        <span className="row-start-2">{props.date}</span>
        <span className="row-start-2">{props.items}</span>
        <span className="row-start-2">{props.rentals}</span>
        {props.status ? (
          <span className="row-start-2 text-green-500">Active</span>
        ) : (
          <span className="row-start-2 text-red-500">Banned</span>
        )}
      </div>
    </div>
  );
}

export default Profile;
