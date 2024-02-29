import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MenuIcon, HomeIcon, HomeActiveIcon, WishIcon, WishActiveIcon, UserIcon, UserActiveIcon } from '../assets/svgIcon/SvgIcon'

const M_navigation = [
  { name: '카테고리', to: 'javascript:void(0)', icon: MenuIcon, activeIcon: WishActiveIcon },
  { name: '홈', to: '/', icon: HomeIcon, activeIcon: HomeActiveIcon },
  { name: '찜', to: 'javascript:void(0)', icon: WishIcon, activeIcon: WishActiveIcon },
  { name: '마이페이지', to: 'javascript:void(0)', icon: UserIcon, activeIcon: UserActiveIcon },
]

const M_menu = () => {
  const [first, setfirst] = useState(false)

  return (
    <div className='fixed z-[99999] bottom-0 right-0 left-0 bg-white flex justify-between px-4 border-t '>
      {M_navigation.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          // className='py-2 w-[25%] '
          className={({ isActive }) => "py-2 w-[25%] group " + (isActive ? "icon" : "activeIcon")}

        >
          <div className='flex flex-col items-center justify-center text-[11px]' >
            <item.activeIcon className={` w-4 h-4 group-[.activeIcon]:hidden`} />
            <item.icon className={` w-4 h-4  group-[.icon]:hidden`} />
            {item.name}
          </div>
        </NavLink>
      ))}

    </div>
  )
  // <ul className='fixed bottom-0 z-[99999] bg-white flex left-0 right-0'>
  //   <NavLink>
  //     <Link to="/">
  //       <HomeIcon />
  //       <span>홈</span>
  //     </Link>
  //   </NavLink>
  //   <li class="mobile_docbar">
  //     <a href="#"><i class="fas fa-user"></i><span>스토어</span></a>
  //   </li>
  //   <li>
  //     <a href="#"><i class="fas fa-shopping-bag cart" data-count="0"></i><span>cart</span></a>
  //   </li>
  //   <li>
  //     <a href="#"><i class="fas fa-heart"></i><span>장바구니</span></a>
  //   </li>
  //   <li class="top">
  //     <a href="#"><i class="fas fa-user"></i><span>마이페이지</span></a>
  //   </li>
  // </ul>
}

export default M_menu