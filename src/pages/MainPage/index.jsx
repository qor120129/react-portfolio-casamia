import React from 'react'
import Banner from 'components/Banner'
import NewItem from 'components/NewItem'

const MainPage = () => {
  return (
    <div className='min-w-[calc(100vh-120px)]'>
      <Banner />
      <NewItem />
    </div>
  )
}

export default MainPage