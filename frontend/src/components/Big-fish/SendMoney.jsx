import { Header } from "../Small-fries/Header";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sent } from "./Sent";

export function SendMoney() {
  const [money, setMoney] = useState();
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const id = query.get("id");
  const name = query.get("name");
  // console.log(id, name);

  //useState for Modal(popup)
  const [modal, setModal] = useState(false);

  return (
    <div className="flex h-screen justify-center items-center bg-blue-200">
      <div className="flex flex-col justify-center bg-white shadow-black shadow-lg px-5 pb-5">
        <div className="pb-5">
          <Header title="Send Money" subheading="" />
        </div>
        <div className="">
          <div className="flex gap-2 m-2">
            <p className="flex justify-center items-center w-12 h-12 rounded-full text-white bg-green-300">A</p>
            <p className="flex justify-center items-center ">{name}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center font-semibold px-4 py-2">
            <p>Amount in Rs</p>
            <input onChange={(e) => {
              setMoney(e.target.value);
            }} className="border-2 p-1" type="number" placeholder="Enter amount" />
          </div>
          <div className="">
            <div className="flex justify-center">
              <button onClick={() => {
                axios.post("http://localhost:3000/api/v1/account/transfer", {
                  to: id,
                  amount: money,
                }, {
                  headers: {
                    token: localStorage.getItem("token"),
                  }
                }).then((response) => {
                  setModal(true);
                });
              }} className="bg-green-500 text-white text-md hover:bg-green-100 focus:outline-none focus:ring-red hover:text-black font-semibold text-bold w-full px-5 py-3 m-3 rounded-lg">Initiate Transfer</button>
            </div>
            <div>
              {modal && <Sent onClick={() => {
                setModal(false)

              }} />}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
