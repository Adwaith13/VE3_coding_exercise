import { Link } from "react-router-dom";
import addTaskStyles from "../styles/addTaskBtn.module.css"

export default function AddBtn() {
  return (
    <>
      <Link to="/add"  className={addTaskStyles.button}>
        Add New Task
      </Link>
    </>
  );
}
