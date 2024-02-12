import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Banner from 'components/Banner'
import List from 'components/List'
import LineBanner from 'components/LineBanner'
import InteriorStory from 'components/InteriorStory'
import Brand from 'components/Brand'
import lineBannerImg from 'assets/img/lineBanner.jpg'
import lineBannerImg2 from 'assets/img/lineBanner2.jpg'

const MainPage = ({ isAuth }) => {
  return (
    <div>
      <Banner />
      <List isAuth={isAuth} category={'new'} />
      <LineBanner lineBannerImg={lineBannerImg} title={'드라마에서 만나는 까사미아'} subTitle={'드라마 속 주요 공간에 노출된 까사미아 제품들을 만나보세요!'} className={'h-64'} />
      <List isAuth={isAuth} category={'best'} />
      <Link to={'Store'}>
        <LineBanner lineBannerImg={lineBannerImg2} title={'STORE'} subTitle={'내 주변 가까운 오프라인 매장을 찾아 방문해 보세요.'} className={'h-52'} />
      </Link>
      <InteriorStory />
      <Brand />
    </div>
  )
}

export default MainPage