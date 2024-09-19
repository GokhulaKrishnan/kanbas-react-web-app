import Lab1 from "./lab1";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Lab2 from "./lab2";
import Lab3 from "./lab3";
import TOC from "./TOC";
import Kanbas from "../Kanbas";
export default function Labs() {
  return (
    <div>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Kanbas" />} />
        <Route path="Kanbas" element={<Kanbas />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
      {/* <Lab1 /> */}
    </div>
  );
}
