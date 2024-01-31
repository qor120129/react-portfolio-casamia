import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MainLayout from 'layout/MainLayout'
import MainPage from 'pages/MainPage'
import NotFound from 'pages/NotFound'
import StorePage from 'pages/StorePage'
import LivingPage from 'pages/LivingPage'
import LoginPage from 'pages/LoginPage'
import CartPage from 'pages/CartPage'
import JoinPage from 'pages/JoinPage'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { app, database } from 'firebaseApp'
import Loader from 'components/Loader'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { ref, query, onValue, } from "firebase/database"


function App() {
  const auth = getAuth(app)
  const [isAuth, setIsAuth] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [usersDB, setUsersDB] = useState([])

  useEffect(() => {
    const userList = query(ref(database, 'users'))
    onValue(userList, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setUsersDB(Object.values(data))
      }
    })

    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        setIsAuth(true)
        setIsLoading(false)
      } else {
        setIsAuth(false)
        setIsLoading(false)
      }
    })
  }, [])


  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout auth={auth} isAuth={isAuth} />,
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
          element: <StorePage />,
        },
        {
          path: '/Login',
          element: <LoginPage />,
        },
        {
          path: '/Join',
          element: <JoinPage usersDB={usersDB} />,
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
      {isLoading
        ? <Loader className={'w-20'} />
        : <RouterProvider router={router} />
      }
    </>
  )
}

export default App
