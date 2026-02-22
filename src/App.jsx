import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import Home from "./pages/Public/Home";
import PackageList from "./pages/customer/PackageList";
import PackageDetail from "./pages/customer/PackageDetail";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
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
      </Route>
    </Routes>
  );
}

export default App;
