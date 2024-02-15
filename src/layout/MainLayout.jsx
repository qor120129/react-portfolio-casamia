import { Outlet } from 'react-router-dom'
import Header from 'layout/Header'
import Footer from 'layout/Footer'

const MainLayout = ({ auth, isAuth }) => {
  return (
    <>
      <Header auth={auth} isAuth={isAuth} />
      <div className='mt-[120px]'>
        <Outlet />
      </div>
      <Footer />
    </>)
}

export default MainLayout