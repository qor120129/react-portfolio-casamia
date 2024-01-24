import { Outlet } from 'react-router-dom'
import React from 'react'
import Header from 'layout/Header'
import Footer from 'layout/Footer'

const MainLayout = () => {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>)
}

export default MainLayout