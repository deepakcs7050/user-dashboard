import { Routes, Route, Navigate } from 'react-router-dom'
import TaskList from '../pages/TaskList/TaskList'
import TaskDetails from '../pages/TaskDetails/TaskDetails'
import Dashboard from '../pages/Dashboard/Dashboard'
import ProcessDashboard from '../pages/ProcessDashboard/ProcessDashboard'
import LoginPage from '../pages/Auth/LoginPage'
import ProductListingPage from '../pages/Products/ProductListingPage'
import MainLayout from '../layouts/MainLayout'
import { RequireAuth } from '../components/RequireAuth'
import User from '../pages/User/User'
import UserDetails from '../pages/userDetails'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<RequireAuth><MainLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:id" element={<TaskDetails />} />
        <Route path="products" element={<ProductListingPage />} />
        <Route path="processes" element={<ProcessDashboard />} />
        <Route path="users" element={<User />} />
        <Route path="users/:id" element={<UserDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes