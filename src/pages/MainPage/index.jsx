import React from 'react'
import Banner from 'components/Banner'
import NewList from 'components/NewList'

const MainPage = ({isAuth}) => {
  console.log('어디가', isAuth)
  return (
    <div className='min-w-[calc(100vh-120px)]'>
      <Banner />
      <NewList isAuth={isAuth}/>
    </div>
  )
}

export default MainPage