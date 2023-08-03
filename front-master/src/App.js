import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import RentList from "./components/rent-list.component";
import SellList from "./components/sell-list.component";
import AddRent from "./components/add-rent.component";
import AddSell from "./components/add-sell.component";
import RentHouse from "./components/rent.component";
import SellHouse from "./components/sell.component";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/user/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/auth/dashboard" element={<Dashboard />} />
            <Route path="/auth/dashboard/rents" element={<RentList />} />
            <Route path="/auth/dashboard/sells" element={<SellList />} />
            <Route path="/auth/dashboard/rents/add" element={<AddRent />} />
            <Route path="/auth/dashboard/sells/add" element={<AddSell />} />
            <Route path="/auth/dashboard/rents/:id" element={<RentHouse />} />
            <Route path="/auth/dashboard/sells/:id" element={<SellHouse />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
