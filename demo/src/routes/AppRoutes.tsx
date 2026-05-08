import { Routes, Route, Navigate } from 'react-router-dom'
import TaskList from '../pages/TaskList/TaskList'
import TaskDetails from '../pages/TaskDetails/TaskDetails'
import Dashboard from '../pages/Dashboard/Dashboard'
import LoginPage from '../pages/Auth/LoginPage'
import ProductListingPage from '../pages/Products/ProductListingPage'
import MainLayout from '../layouts/MainLayout'
import { RequireAuth } from '../components/RequireAuth'

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
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes