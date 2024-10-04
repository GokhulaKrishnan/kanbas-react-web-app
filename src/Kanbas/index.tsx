import { Navigate, Route, Routes } from "react-router";
import "./styles.css";
import Account from "./Account";
import Dashboard from "./Account/Dashboard";
import Calendar from "./Calendar";
import Inbox from "./Inbox";
import Labs from "../labs";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";

export default function Kanbas() {
  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Inbox" element={<Inbox />} />
          <Route path="/Labs" element={<Labs />} />
        </Routes>
      </div>
    </div>
  );
}
