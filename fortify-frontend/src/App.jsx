import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import DashboardPage from "./Components/Dashboard";
import CategoriesPage from "./Components/Category";
import BudgetsPage from "./Components/Budget";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/budget" element={<BudgetsPage />} />
      </Routes>
    </Router>
  );
}