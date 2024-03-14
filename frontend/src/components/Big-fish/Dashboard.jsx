import { Appbar } from "../Small-fries/Appbar"
import { Balance } from "../Small-fries/Balance"
import { Users } from "../Small-fries/Users"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Dashboard() {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  //
  // if (token) {
  //   const response = await axios.get("http://localhost:3000/", { headers: { "Authorization": "Bearer " + token } });
  //
  //   if (response.data.result) {
  return (
    <div className="">
      <Appbar />
      <Balance />
      <Users />
    </div>
  )

  //     alert("token not verified signup");
  //     navigate("/signup");
  //   }
  // } else {
  //   alert("Signup");
  //   navigate("/signup");
  // }
}
