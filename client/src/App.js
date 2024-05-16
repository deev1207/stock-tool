import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Signup/signup";
import Home from "./Components/Home/home";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
