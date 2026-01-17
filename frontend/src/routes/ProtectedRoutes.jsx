import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const ProtectedRoutes = ({children, role}) => {
    const user = getUser();

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // ❌ Role mismatch
    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    // ✅ Allowed
    return children;
}

export default ProtectedRoutes