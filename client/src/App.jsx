/* eslint-disable no-constant-condition */
// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyOTP from "./components/VerifyOTP";
import Dashboard from "./components/Dashboard";

function App() {
  // const checkAuth = async () => {
  //   try {
  //     const response = await API.get("/auth/isAuthenticated");
  //     console.log(response.data);

  //     setIsAuthenticated(response.data.isAuthenticated);
  //   } catch (error) {
  //     console.error("Error checking authentication:", error);
  //     setIsAuthenticated(false);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route
          path="/dashboard"
          element={true ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
