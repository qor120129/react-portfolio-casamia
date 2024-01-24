import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound';
import StorePage from 'pages/StorePage';
import LivingPage from 'pages/LivingPage';
import LoginPage from 'pages/LoginPage';
import CartPage from './pages/CartPage';
import JoinPage from './pages/JoinPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
