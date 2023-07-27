import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/loginpage";
import HomePage from "./components/homePage";
import RegisterPage from "./components/register";
import Error from "./components/error";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
