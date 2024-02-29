import { Outlet, useLocation } from 'react-router-dom'
import Header from 'layout/Header'
import Footer from 'layout/Footer'
import M_menu from '../components/M_menu'

const MainLayout = ({ auth, isAuth, mobile }) => {
  const { pathname } = useLocation()
  console.log('adfad', pathname)

  return (
    <>
      <Header auth={auth} isAuth={isAuth} mobile={mobile} />
      <div className={`${mobile ? 'mt-[52px]' : 'max-sm:mt-[100px] mt-[120px]'} `}>
        <Outlet />
      </div >
      {mobile && <M_menu />
      }
      {pathname !== '/Store' && <Footer />}
    </>
  )
}

export default MainLayout