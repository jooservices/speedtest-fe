import { Route, Routes } from 'react-router-dom'

import HomePage from './HomePage'
import Dashboard from './Dashboard'
import SitePage from './SitePage'

function PageRoutes() {
  return (
    <Routes>
      {/* <Route path='/' element={<HomePage />} /> */}
      <Route path='/' element={<Dashboard />} />
      <Route path='/ip' element={<>IP page</>} />
      <Route path='/service' element={<>Service page</>} />
      <Route path='/site' element={<SitePage />} />
      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default PageRoutes
