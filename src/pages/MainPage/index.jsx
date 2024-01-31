import React from 'react'
import Banner from 'components/Banner'
import NewList from 'components/NewList'
import LineBanner from 'components/LineBanner'

const MainPage = ({isAuth}) => {
  return (
    <div>
      <Banner />
      <NewList isAuth={isAuth}/>
      <LineBanner  />
    </div>
  )
}

export default MainPage