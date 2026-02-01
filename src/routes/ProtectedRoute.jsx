import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    // Not logged in
    if (!user || !user.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Role check
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.userRole)
    ) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
