import { Header } from "../Small-fries/Header";
import { Name } from "../Small-fries/Name";
import { Button } from "../Small-fries/Button";
import { Option } from "../Small-fries/Option";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const navigate = useNavigate();

  return (
    <div className="flex h-screen justify-center items-center bg-blue-200">
      <div className="bg-white rounded-lg border-blue-400 border-2 shadow-black shadow-lg px-2 py-3">
        <Header title="Signin" subheading="Enter your information to login your account" />
        <Name onChange={(e) => {
          setUser(prevValue => ({ username: e.target.value, password: prevValue.password }))
        }} id="Email" placeholder="Enter your registered email" />

        <Name onChange={(e) => {
          setUser(prevValue => ({ username: prevValue.username, password: e.target.value }))
        }} id="Password" placeholder="Enter your password" />

        <Button onClick={() => {
          axios.post("http://localhost:3000/api/v1/user/signin", {
            username: user.username,
            password: user.password
          }).then((response) => {
            alert(response.data.message);
            localStorage.setItem("token", "Bearer " + response.data.token);
            navigate("/dashboard");
          })
        }} content="Signin" />

        <Option content="Don't have a account?" link="/signup" spanContent="Sign Up" />
      </div>
    </div>
  )

}
