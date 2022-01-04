import React, { useEffect } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import HomeProfile from "./home-profile/home-profile.component";

const Profile = () => {
  const location = useLocation();
  let id = location.pathname.split("/")[3];

  return (
    <div>
      <div className="">
        {/* <NavLink
          className={({ isActive }) => (isActive ? "" : "")}
          to={`/search/profile/${id}/test`}
        >
          Matches
        </NavLink> */}
      </div>
      <Routes>
        <Route path="/" element={<HomeProfile id={id} />} />
        <Route path="/test" element={<div>{id}</div>} />
      </Routes>
    </div>
  );
};

export default Profile;
