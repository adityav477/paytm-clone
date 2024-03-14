import React from "react";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle } from "lucide-react";

export function Sent({ onClick }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-opacity-30  backdrop-blur-sm bg-black flex flex-col h-screen justify-center items-center">
      <div className="w-72 flex justify-end ">
        <button onClick={onClick} className="text-white"><X size={30} /></button>
      </div>
      <div className="h-72 w-72 bg-green-400 shadow-lg rounded-lg shadow-black flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center text-white">
          <div className="mb-5">
            <CheckCircle size={80} className="place-self-stretch"></CheckCircle>
          </div>
          <p>Transaction Completed</p>
        </div>

        <div>
          <button onClick={() => {
            navigate("/dashboard");
          }} className="rounded-lg border-black bg-white hover:bg-black hover:text-white px-5 py-2 mb-10">Dashboard</button>
        </div>
      </div>

    </div>
  )
}
