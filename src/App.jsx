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
import AccountViewingPage from './pages/AccountViewingPage';
import AccountEditPage from './pages/AccountEditPage';
import UserContextProvider from './UserContextProvider';

export default function App() {
    
    return (
      <UserContextProvider>
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
                path="/viewing/:meetingId"
                element={<ViewingPage />}
              />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>
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
            <Route
              path="/account"
              element={<AccountViewingPage />}
            />
            <Route
              path="/account/edit"
              element={<AccountEditPage />}
            />

          </Route>
        </Routes>
      </Router>
    )
}