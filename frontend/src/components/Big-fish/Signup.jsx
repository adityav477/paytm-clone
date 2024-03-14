import { Header } from "../Small-fries/Header"
import { Name } from "../Small-fries/Name";
import { Button } from "../Small-fries/Button";
import { Option } from "../Small-fries/Option";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState({
    username: "",
    irstname: "",
    lastname: "",
    password: "",
  });

  return (
    <div className="flex h-screen justify-center items-center bg-blue-200">
      <div className=" bg-white border-blue-400 shadow-black shadow-lg rounded-lg px-2 pb-3">
        <Header title="Signup" subheading="Enter your Information to create a new account" />

        <Name onChange={e => {
          setUsername(prevValue => ({ ...prevValue, firstname: e.target.value }))
        }} id="First name" placeholder="Enter your Firstname" />

        <Name onChange={e => {
          setUsername(prevValue => ({ ...prevValue, lastname: e.target.value }))
        }} id="Last name" placeholder="Enter your Lastname" />

        <Name onChange={e => {
          setUsername(prevValue => ({ ...prevValue, username: e.target.value }))
        }} id="Email" placeholder="Enter your Email" />

        <Name onChange={e => {
          setUsername(prevValue => ({ ...prevValue, password: e.target.value }))
        }} id="Password" placeholder="Enter your Password" />

        <Button content="Signup" onClick={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username: username.username,
            firstName: username.firstname,
            lastName: username.lastname,
            password: username.password,
          })
          if (response.data.token) {
            alert(response.data.message);
            localStorage.setItem("token", "Bearer " + response.data.token)
            navigate("/dashboard",)
          }
        }

        } />

        <Option content="Already have an account?" link="/signin" spanContent="Sign in" />

      </div>
    </div >
  )
}
// https://stackoverflow.com/questions/55056513/vertical-align-with-tailwind-css-across-full-screen-div
export default Signup;
