import React from 'react';
import { Modal, Button, Toast, Tooltip, Avatar, Dropdown } from "flowbite-react";
import  {FaCog } from "react-icons/fa"  

function Profile(props) {
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
          <Dropdown.Item>Edit profile</Dropdown.Item>
          <Dropdown.Item></Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
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
      <div className="border-white border-2 grid justify-between gap-5 py-7 text-lg">
        <h2 className="row-start-1  md:text-xl font-bold block uppercase tracking-wide text-slate-700">
          member since
        </h2>
        <h5 className="row-start-1  md:text-xl font-bold block uppercase tracking-wide text-slate-700">
          items registered
        </h5>
        <h5 className="row-start-1  md:text-xl font-bold block uppercase tracking-wide text-slate-700">
          Rentals
        </h5>
        <span className="row-start-2">{props.date}</span>
        <span className="row-start-2">{props.items}</span>
        <span className="row-start-2">{props.rentals}</span>
      </div>
    </div>
  );
}

export default Profile