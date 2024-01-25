import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MainLayout from 'layout/MainLayout'
import MainPage from 'pages/MainPage'
import NotFound from 'pages/NotFound'
import StorePage from 'pages/StorePage'
import LivingPage from 'pages/LivingPage'
import LoginPage from 'pages/LoginPage'
import CartPage from './pages/CartPage'
import JoinPage from './pages/JoinPage'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from 'firebaseApp'


function App() {
  const auth = getAuth(app)
  const [isAuth, setIsAuth] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
      // setInit(true)
    })
  })
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout auth={auth} isAuth={isAuth} />,
      children: [
        {
          path: '/',
          element: (
            <MainPage />
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
          element: <StorePage />,
        },
        {
          path: '/Login',
          element: <LoginPage />,
        },
        {
          path: '/Join',
          element: <JoinPage />,
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
      <ToastContainer autoClose={1000} limit={3} />
      <RouterProvider router={router} auth={auth} isAuth={isAuth} />
    </>
  )
}

export default App
