import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const url = window.location.href;
      const parts = url.split("/");
      const endpt = parts[parts.length - 1];
      console.log(endpt);
      const res = await axios.post(`http://localhost:8000/${endpt}`, {
        username,
        password,
      });
      console.log(res);
      localStorage.setItem("username", username);
      navigate("/");
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
