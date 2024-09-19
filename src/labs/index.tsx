import Lab1 from "./lab1";
import { Routes, Route, Navigate } from "react-router-dom";
import Lab2 from "./lab2";
import Lab3 from "./lab3";
import TOC from "./TOC";
import Kanbas from "../Kanbas";
export default function Labs() {
  return (
    <div>
      <h1>Gokhula Krishnan Thangavel</h1>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Kanbas" />} />
        <Route path="Kanbas" element={<Kanbas />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
      <a
        href="https://github.com/GokhulaKrishnan/kanbas-react-web-app"
        id="wd-github"
      ></a>
      {/* <Lab1 /> */}
    </div>
  );
}
