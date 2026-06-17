import { Routes, Route, Navigate } from 'react-router-dom'
import TaskList from '../pages/TaskList/TaskList'
import TaskDetails from '../pages/TaskDetails/TaskDetails'
import Dashboard from '../pages/Dashboard/Dashboard'
import ProcessDashboard from '../pages/ProcessDashboard/ProcessDashboard'
import AgentList from '../pages/Agents/AgentList'
import LoginPage from '../pages/Auth/LoginPage'
import ProductListingPage from '../pages/Products/ProductListingPage'
import InvoiceReview from '../pages/InvoiceReview'
import InvoiceDetailsLog from '../pages/InvoiceDetailsLog'
import MainLayout from '../layouts/MainLayout'
import { RequireAuth } from '../components/RequireAuth'
import User from '../pages/User/User'
import UserDetails from '../pages/userDetails'
import RoleAccess from '../pages/RoleAccess/roleAccess'

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
        <Route path="invoice-review" element={<InvoiceReview />} />
        <Route path="invoice-details-log" element={<InvoiceDetailsLog />} />
        <Route path="processes" element={<ProcessDashboard />} />
        <Route path="agents" element={<AgentList />} />
        <Route path="users" element={<User />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="role-access" element={<RoleAccess />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes