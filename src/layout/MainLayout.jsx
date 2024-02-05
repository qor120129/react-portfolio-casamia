import { Outlet } from 'react-router-dom'
import Header from 'layout/Header'
import Footer from 'layout/Footer'

const MainLayout = ({ auth, isAuth}) => {
  return (
    <>
      <Header auth={auth} isAuth={isAuth} />
      <Outlet/>
      <Footer />
    </>)
}

export default MainLayout