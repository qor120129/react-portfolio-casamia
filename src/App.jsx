import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from 'layout/MainLayout'
import MainPage from 'pages/MainPage'
import NotFound from 'pages/NotFound'
import StorePage from 'pages/StorePage'
import LivingPage from 'pages/LivingPage'
import LoginPage from 'pages/LoginPage'
import CartPage from 'pages/CartPage'
import JoinPage from 'pages/JoinPage'
import Loader from 'components/Loader'

import { app, database } from 'firebaseApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, query, onValue, } from "firebase/database"
import { ArrowUp } from 'assets/svgIcon/SvgIcon'
import SubLayout from './layout/SubLayout'
import { throttle } from 'lodash'


function App() {
  const auth = getAuth(app)
  const [isAuth, setIsAuth] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [usersDB, setUsersDB] = useState([])
  const [mobile, setMobile] = useState(false)
  const [scrollBtn, setScrollBtn] = useState(false)

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // mobile
      setMobile(true);
    } else {
      // desktop
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    const userList = query(ref(database, 'users'))
    onValue(userList, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setUsersDB(Object.values(data))
      }
    })

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true)
        setIsLoading(false)
      } else {
        setIsAuth(false)
        setIsLoading(false)
      }
    })

  }, [])

  useEffect(() => {
    // Scroll 변경에 따라 btn 보여주기 변경
    const showscrollToTopBtn = throttle((e) => {
      e.preventDefault()

      const scrollY = window.scrollY

      if (scrollY > 600) {
        setScrollBtn(true)
      } else {
        setScrollBtn(false)
      }
    }, 300)

    window.addEventListener('scroll', showscrollToTopBtn)
    return () => {
      window.removeEventListener('scroll', showscrollToTopBtn)
    }
  }, [scrollY])

  // Scroll 상단이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'

    })
  }


  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout auth={auth} isAuth={isAuth} mobile={mobile} />,
      children: [
        {
          path: '/',
          element: (
            <MainPage isAuth={isAuth} />
          ),
        },
        {
          path: '/Living',
          element: (
            <LivingPage />
          ),
        },
        {
          path: '/Store',
          element: <StorePage mobile={mobile} />,
        },
        {
          path: '/Login',
          element: <LoginPage mobile={mobile} />,
        },
        {
          path: '/Join',
          element: <JoinPage usersDB={usersDB} mobile={mobile} />,
        },
        {
          path: '/Cart',
          element: <CartPage />,
        },
      ],
      errorElement: <NotFound />,
    },

  ])

  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true} className={` absolute z-[99999]`} />
      <div
        onClick={scrollToTop}
        className={`fixed z-[999] cursor-pointer animate-opacity ${scrollBtn ? 'block opacity-1' : 'hidden opacity-0'} ${mobile ? 'bottom-16 right-4' : 'bottom-4 right-4'}`}
      >
        <div className=' bg-white rounded-full shadow drop-shadow p-2 border '>
          <ArrowUp className={'w-5 h-5'} />
        </div>
      </div>
      {isLoading
        ? <Loader className={'w-20'} />
        : <RouterProvider router={router} />
      }
    </>
  )
}

export default App
