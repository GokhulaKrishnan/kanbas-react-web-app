import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Labs from "./labs";
import "./App.css";
import Kanbas from "./Kanbas";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
