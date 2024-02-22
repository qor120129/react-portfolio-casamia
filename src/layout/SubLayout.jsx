import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'layout/Header'

const SubLayout = ({ auth, isAuth }) => {
  return (
    <>
      <Header auth={auth} isAuth={isAuth} />
      <div className='mt-[120px]'>
        <Outlet />
      </div>
    </>
  )
}

export default SubLayout