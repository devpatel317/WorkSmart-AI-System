import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ManagerDashboard from "../pages/ManagerDashboard"
import AdminDashboard from "../pages/AdminDashboard"
import ProtectedRoutes from "./ProtectedRoutes"
import EmployeeDashboard from "../pages/EmployeeDashboard"
import ManagerLayout from "../theme/ManagerLayout"
import TasksPage from "../pages/managerPages/TaskPage"
import AssignTaskPage from "../pages/managerPages/AssignTaskPage"
import InsightsPage from "../pages/managerPages/InsightsPage"  

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
        <Route path="/manager" element={<ManagerLayout />}>
            <Route path="tasks" element={<TasksPage />} />
            <Route path="assign" element={<AssignTaskPage />} />
            <Route path="insights" element={<InsightsPage />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes