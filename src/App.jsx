import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./counterSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => setUsers(response.data))
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const filteredData = users.filter((user) =>
    user.name.toLowerCase().includes(searchData.toLowerCase()),
  );
  const handleAsc = () => {
    const sortedData = filteredData.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    setUsers(sortedData);
  };
  const handleDsc = () => {
    const sortedData = filteredData.sort((a, b) =>
      b.name.localeCompare(a.name),
    );
    setUsers(sortedData);
  };
  return (
    <main>
      <button onClick={() => dispatch(increment())}>Increment</button>
      {count}
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <input
        tyle="text"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>username</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleAsc}>Ascending</button>
      <button onClick={handleDsc}>Descending</button>
    </main>
  );
}
