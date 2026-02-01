import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import Home from "./pages/Public/Home";

function App() {
  return (
    <>
      <Navbar />   {/* ✅ THIS IS THE FIX */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/customer/*"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute allowedRoles={["VENDOR"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
