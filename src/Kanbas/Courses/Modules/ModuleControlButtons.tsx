import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs"; // Importing BsPlus icon
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4 mx-2" /> {/* Adding the BsPlus icon */}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
