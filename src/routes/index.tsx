import { Route, Routes } from 'react-router-dom'

import HomePage from './HomePage'

function PageRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default PageRoutes
