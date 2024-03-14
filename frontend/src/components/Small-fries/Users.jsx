import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";

export function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((response) => {
      setUsers(response.data.users);
    })
  }, [filter])

  return (
    <div className="px-8">
      <div className="font-bold text-lg py-2">
        Users
      </div>
      <div className="border-2 rounded-md p-1">
        <input onChange={e => {
          setFilter(e.target.value);
        }} className="w-full focus:outline-none text-sm" placeholder="Search Users....." />
      </div>
      <div>
        {users.map(user => <User user={user} />)}
      </div>
    </div>
  )

  function User({ user }) {
    return (
      <div className="flex justify-between py-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center font-semibold rounded-full bg-blue-200 h-8 w-8 m-2">
            H
          </div>
          <div className="font-semibold">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="text-xs">
          <Button onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }} content="Send Money" />
        </div>
      </div>
    )
  }
}
