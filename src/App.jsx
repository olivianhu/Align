import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Layout from './layout-components/Layout';
import LandingPage from './pages/LandingPage';
import ChoicePage from './pages/ChoicePage';
import SignupPage from './pages/SignupPage';

export default function App() {
    
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<LandingPage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/signup"
              element={<SignupPage />}
            />
            <Route
              path="/creation"
              element={<ChoicePage />}
            />
          </Route>
        </Routes>
      </Router>
    )
}