import React, { useState } from 'react'
import Banner from 'components/Banner'
import List from 'components/List'
import LineBanner from 'components/LineBanner'

const MainPage = ({ isAuth }) => {
  return (
    <div>
      <Banner />
      <List isAuth={isAuth} category={'new'}/>
      <LineBanner />
      <List isAuth={isAuth} category={'best'}/>
    </div>
  )
}

export default MainPage