import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePage from "./pages/Create";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ViewPost from "./pages/ViewPost";
import { CategoryPage } from "./pages/CategoryPage";
import Error404Page from "./pages/Error404Page";
import Map from "./components/Map/Map";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/post' element={<CategoryPage />} />
      <Route path="/post/attribute" element={<CreatePage />} />
      <Route path="/view/:id" element={<ViewPost />} />
  
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
