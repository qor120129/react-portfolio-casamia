import { Outlet, useLocation } from 'react-router-dom'
import Header from 'layout/Header'
import Footer from 'layout/Footer'

const MainLayout = ({ auth, isAuth }) => {
  const { pathname } = useLocation()
  console.log('adfad', pathname)

  return (
    <>
      <Header auth={auth} isAuth={isAuth} />
      <div className='mt-[120px]'>
        <Outlet />
      </div>
      {pathname !== '/Store' && <Footer />}
    </>
  )
}

export default MainLayout