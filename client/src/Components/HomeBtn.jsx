import { Link } from "react-router-dom";
import homeBtnStyle from "../styles/homeBtn.module.css"
export default function HomeBtn() {
  return (
    <>
      <Link to="/" className={homeBtnStyle.button}>Home</Link>
    </>
  );
}
