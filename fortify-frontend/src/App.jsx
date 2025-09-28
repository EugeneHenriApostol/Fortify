import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}