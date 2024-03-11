import { Outlet, ScrollRestoration, useLocation, useParams } from 'react-router-dom'
import Header from 'layout/Header'
import Footer from 'layout/Footer'
import M_menu from 'components/M_menu'

const MainLayout = ({ auth, isAuth, mobile }) => {
  const { pathname } = useLocation()

  return (
    <>
      <Header auth={auth} isAuth={isAuth} mobile={mobile} pathname={pathname} />
      <div className={`${mobile ? 'mt-[52px]' : 'max-sm:mt-[100px] mt-[120px]'} `}>
        <ScrollRestoration />
        <Outlet />
      </div >
      {mobile && (pathname === '/' || pathname === '/Mypage' || pathname === '/CategoryMenu') && <M_menu />}
      {pathname !== '/Store' && <Footer />}
    </>
  )
}

export default MainLayout