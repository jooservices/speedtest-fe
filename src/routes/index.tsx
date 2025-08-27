import { Route, Routes } from 'react-router-dom'

import HomePage from './HomePage'
import Dashboard from './Dashboard'
import SitePage from './SitePage'
import IpPage from './IpPage'
import ServicePage from './ServicePage'

function PageRoutes() {
  return (
    <Routes>
      {/* <Route path='/' element={<HomePage />} /> */}
      <Route path='/' element={<Dashboard />} />
      <Route path='/ip' element={<IpPage />} />
      <Route path='/service' element={<ServicePage/>} />
      <Route path='/site' element={<SitePage />} />
      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default PageRoutes
