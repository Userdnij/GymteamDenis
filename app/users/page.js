"use client"

import { useEffect, useState} from "react";


export default function Users() {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    const response = await fetch('/api/getAllData', {
      method: 'GET',
    });

    const data = await response.json();
    setUsers(data.users);
    console.log(data);
  };

  const displayData = () => {
    if(!users || users.length < 1) return null;
    return (
      <ul>
        {users.map((item) => (
          <li key={item._id}>{item.data}</li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {displayData()}
    </div>
  );
}