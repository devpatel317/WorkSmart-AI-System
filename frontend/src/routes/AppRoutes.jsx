import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ManagerDashboard from "../pages/ManagerDashboard"
import AdminDashboard from "../pages/AdminDashboard"
import ProtectedRoutes from "./ProtectedRoutes"
import EmployeeDashboard from "../pages/EmployeeDashboard"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route
            path = "/employee"
            element = {
                <ProtectedRoutes role="employee">
                    <EmployeeDashboard/>
                </ProtectedRoutes>
            }
        />
        <Route
            path = "/manager"
            element = {
                <ProtectedRoutes role="manager">
                    <ManagerDashboard/>
                </ProtectedRoutes>
            }
        />
        <Route
            path = "/admin"
            element = {
                // <ProtectedRoutes role="admin">
                //     <AdminDashboard/>
                // </ProtectedRoutes>
                <AdminDashboard/>
            }
        />
    </Routes>
  )
}

export default AppRoutes