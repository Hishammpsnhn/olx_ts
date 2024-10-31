import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePage from "./pages/Create";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ViewPost from "./pages/ViewPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/post" element={<CreatePage />} />
      <Route path="/view" element={<ViewPost />} />
    </Routes>
  );
}

export default App;
