import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LidTable from "./components/Admin/adminBody/adminBodyLid/LidTable/LidTable";
import AdminBody from "./components/Admin/adminBody/AdminBody";
import Pupil from "./components/Admin/adminBody/adminBodyLid/pupilTable/Pupil";
import GroupTable from "./components/Admin/adminBody/adminBodyLid/groupTable/GroupTable";
import Login from "./components/login/Login";
import React, { useState, useEffect } from "react";
import AddLids from "./components/Admin/adminBody/adminBodyLid/LidTable/addLids/AddLids";

function App() {




  // async function logMovies() {
  //   const response = await fetch("https://my-one-api-uvs4.onrender.com/api/books");
  //   const movies = await response.json();
  //   console.log(movies);
  // }
  // useEffect(() => {
  //   logMovies()
  // })

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="adminBody"
          element={
            <AdminBody
            />
          }
        >
          <Route
            path="lid"
            element={
              <LidTable />
            }
          >

          </Route>
          <Route path=":pupil" element={<Pupil />} />
          <Route path="groups" element={<GroupTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
