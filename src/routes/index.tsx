import { Route, Routes } from 'react-router-dom'

import HomePage from './HomePage'
import Dashboard from './Dashboard'

function PageRoutes() {
  return (
    <Routes>
      {/* <Route path='/' element={<HomePage />} /> */}
      <Route path='/' element={<Dashboard />} />
      <Route path='/ip' element={<>IP page</>} />
      <Route path='/service' element={<>Service page</>} />
      <Route path='/site' element={<>Site Page</>} />
      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default PageRoutes
