import React from 'react'

function Profile(props) {
  return (
    <div>
      <img
        src={props.img}
        alt=""
        srcset=""
        className="rounded w-52"
        style={{ borderRadius: "50%" }}
      />
      <h1 className="text-center py-5 h1" >
        {props.name}
      </h1>
    </div>
  );
}

export default Profile