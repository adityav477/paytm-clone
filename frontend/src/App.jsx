import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Big-fish/Signup.jsx";
import { Signin } from "./components/Big-fish/Signin";
import { Dashboard } from "./components/Big-fish/Dashboard";
import "./App.css";
import { SendMoney } from "./components/Big-fish/SendMoney";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
      {/* <div > */}
      {/* <h1 className="bg-blue-400">Hi for tailwind</h1> */}
      {/* </div > */}
    </>

  )
}

export default App
