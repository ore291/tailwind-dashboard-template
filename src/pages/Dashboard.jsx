import React, { useState } from "react";
import {useSelector} from "react-redux";

import Layout from "../components/Layout";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardInfo from "../partials/dashboard/DashboardInfo";
import Users from "../partials/dashboard/Users";
import Rentals from "../partials/dashboard/Rentals";
import Items from "../partials/dashboard/Items";
import Income from "../partials/dashboard/Income";


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const localUser = JSON.parse(localStorage.getItem('user'))
  const user = useSelector((state)=>state.user.userData) 

  return (
    <Layout>
      {user && (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Welcome banner */}
        <WelcomeBanner  user={user.user || localUser}/>
        <DashboardInfo  />
        

        <div className="grid grid-cols-12 gap-6 mt-8">
          <Income/>
          <Users/>
          <Items/>
          <Rentals/>
            
        </div>
      </div>
      )}
      
    </Layout>
  );
}

export default Dashboard;
