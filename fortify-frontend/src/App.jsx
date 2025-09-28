import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login";
import LandingPage from "./Components/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}