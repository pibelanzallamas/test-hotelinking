import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Form";
import Home from "../components/Home";
import Codes from "../components/Codes";

function AppRoutes() {
  return (
    <Routes>
      //rutas de las distintas páginas
      <Route path="/" element={<Form register={false} />} />
      <Route path="/register" element={<Form register={true} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/codes" element={<Codes />} />
    </Routes>
  );
}

export default AppRoutes;
