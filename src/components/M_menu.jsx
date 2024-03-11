import React, { useEffect, useState } from 'react'
import { Link, NavLink, Routes, useLocation } from 'react-router-dom'
import { MenuIcon, HomeIcon, HomeActiveIcon, WishIcon, WishActiveIcon, UserIcon, UserActiveIcon } from '../assets/svgIcon/SvgIcon'
import CategoryMenu from 'components/CategoryMenu'

const M_navigation = [
  { name: '카테고리', to: '/CategoryMenu', icon: MenuIcon, activeIcon: MenuIcon, },
  { name: '홈', to: '/', icon: HomeIcon, activeIcon: HomeActiveIcon, },
  // { name: '스토어', to: '/', icon: HomeIcon, activeIcon: HomeActiveIcon, },
  { name: '찜', to: 'javascript:void(0)', icon: WishIcon, activeIcon: WishActiveIcon, },
  { name: '마이페이지', to: '/Mypage', icon: UserIcon, activeIcon: UserActiveIcon, },
]

const M_menu = () => {
  const [first, setfirst] = useState(false)
  const [slideOpen, setSlideOpen] = useState(false)
  const [isActiveName, setIsActiveName] = useState('/')
  const { pathname } = useLocation()

  useEffect(() => {
    setIsActiveName(pathname)
  }, [pathname])

  const onClick = (item) => {
    setIsActiveName(item)
    if (item === 'CategoryMenu') {
      setSlideOpen(true)
    } else {
      setSlideOpen(false)
    }
  }
  return (
    <>
      <div className='fixed z-[99999] bottom-0 right-0 left-0 bg-white flex justify-between px-4 border-t '>
        {M_navigation.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            onClick={() => onClick(item.to)}
            className={`py-2 w-[25%] ${isActiveName === item.to ? 'text-primary' : ''}`}
          >
            <div className='flex flex-col items-center justify-center text-[11px]'>
              {isActiveName === item.name && pathname === item.to
                ?
                <item.activeIcon className={` w-4 h-4 text-primary `} />
                :
                <item.icon className={`w-4 h-4`} />
              }
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      {slideOpen &&
        <CategoryMenu setSlideOpen={setSlideOpen} slideOpen={slideOpen} setIsActiveName={setIsActiveName}/>
      }
    </>

  )
}

export default M_menu