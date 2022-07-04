import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./charts/ChartjsConfig";
import Category from "./components/categories/Category";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./css/style.scss";
import AddStaff from "./pages/AddStaff";
import Categories from "./pages/Categories";
// Import pages
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Dashboard1";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import Rentals from "./pages/Rentals";
import Settings from "./pages/Settings";
import SingleUser from "./pages/SingleUser";
import Staff from "./pages/Staff";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Withdrawals from "./pages/Withdrawals";
import AddCategory from "./partials/categories/AddCategory";










function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/withdraw"
          element={
            <ProtectedRoute>
              <Withdrawals />
            </ProtectedRoute>
          }
        />
        <Route exact path="/test" element={<Test />} />
        <Route
          exact
          path="/rentals"
          element={
            <ProtectedRoute>
              <Rentals />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/items"
          element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/staff"
          element={
            <ProtectedRoute>
              <Staff />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/users/:id"
          element={
            <ProtectedRoute>
              <SingleUser />
            </ProtectedRoute>
          }
        />

        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/withdrawals"
          element={
            <ProtectedRoute>
              <Withdrawals />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/categories/add"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/categories/:slug"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        

 

        <Route exact path="/login" element={<Login />} />

        
       
      
       
        <Route exact path="/staff/add" element={<AddStaff />} />
        <Route exact path="/Messages" element={<Messages />} />
        <Route exact path="/Messages/:id" element={<Message />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
