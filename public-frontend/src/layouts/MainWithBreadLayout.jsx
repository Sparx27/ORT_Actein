import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainWithBreadLayout = () => {
  return (
    <>
      <Header />
      {/* Poner crumb */}
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainWithBreadLayout