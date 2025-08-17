import { Route, Routes } from 'react-router-dom'

import HomePage from './HomePage'
import Dashboard from './Dashboard'

function PageRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/chart' element={<>Chart Page</>} />
      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default PageRoutes
