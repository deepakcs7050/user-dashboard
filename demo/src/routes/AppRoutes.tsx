import { Routes, Route } from 'react-router-dom'
import TaskList from '../pages/TaskList/TaskList'
import TaskDetails from '../pages/TaskDetails/TaskDetails'
import Dashboard from '../pages/Dashboard/Dashboard'
import MainLayout from '../layouts/MainLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:id" element={<TaskDetails />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes