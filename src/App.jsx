import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Layout from './layout-components/Layout';
import LandingPage from './pages/LandingPage';
import ChoicePage from './pages/ChoicePage';
import RegisterPage from './pages/RegisterPage';
import RecurringPage from './pages/RecurringPage';
import SpecificPage from './pages/SpecificPage';
import ViewingPage from './pages/ViewingPage';

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
              element={<RegisterPage />}
            />
            <Route
              path="/creation"
              element={<ChoicePage />}
            />
            <Route
              path="/creation/recurring"
              element={<RecurringPage />}
            />
            <Route
              path="/creation/specific"
              element={<SpecificPage />}
            />
            <Route
              path="/viewing"
              element={<ViewingPage />}
            />
          </Route>
        </Routes>
      </Router>
    )
}