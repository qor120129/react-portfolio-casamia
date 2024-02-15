import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import clickOutside from '@/hooks/clickOutside'
import Search from 'components/Search'
import { CartIcon, UserIcon, NextIcon, PrevIcon } from 'assets/svgIcon/SvgIcon'
import { throttle } from 'lodash'

const navigation = [
  { name: '거실가구', to: '/Living' },
  { name: '침실가구', to: 'javascript:void(0)' },
  { name: '주방가구', to: 'javascript:void(0)' },
  { name: '키즈/학생가구', to: 'javascript:void(0)' },
  { name: '홈인테리어', to: 'javascript:void(0)' },
  { name: '기획전', to: 'javascript:void(0)' },
  { name: '매장찾기', to: '/Store' },
]

const Header = ({ auth, isAuth }) => {
  // const displayName = auth?.currentUser?.displayName
  const [open, setOpen] = useState(false)
  const [navScrollWidth, setNavScrollWidth] = useState(0)
  const [navOffsetWidth, setNavOffsetWidth] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [scrollBtn, setScrollBtn] = useState(true)
  const [scrollYSize, setScrollYSize] = useState(0)
  const [scrollUp, setScrollUp] = useState(true)

  const dropdown = useRef()
  const navScroll = useRef()

  clickOutside(dropdown, () => setOpen(false))


  useEffect(() => {
    setNavScrollWidth(navScroll.current.scrollWidth)
    setNavOffsetWidth(navScroll.current.offsetWidth)
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [windowWidth])


  useEffect(() => {
    // Scroll 변경에 따라 Header 변경
    const handleScrollY = throttle((e) => {
      e.preventDefault()
      e.stopPropagation()

      const scrollY = window.scrollY
      setScrollYSize(scrollY)

      if (scrollY > scrollYSize && scrollY > 0) {
        setScrollUp(false)
      } else if (scrollY < scrollYSize) {
        setScrollUp(true)
      } else if (scrollY < scrollYSize && scrollY === 0) {
        setScrollUp(true)
      }
    }, 200)
    
    window.addEventListener('wheel', handleScrollY, { passive: false })
    window.addEventListener('scroll', handleScrollY)
    return () => {
      window.removeEventListener('wheel', handleScrollY, { passive: false })
      window.removeEventListener('scroll', handleScrollY)
    }
  }, [scrollYSize])




  //로그아웃
  const onSignOut = async () => {
    try {
      await signOut(auth)
      setOpen(false)
      toast.success('로그아웃 되었습니다.', {
        position: "top-center",
      })
    } catch (error) {
      console.log(error)
      toast.error(err.message)
    }
  }


  // 화면 변경시 가로스크롤
  const resize = () => {
    setWindowWidth(window.innerWidth)
  }

  //  Nav 가로 스크롤
  const navScrollbar = (name) => {
    if (name === 'next') {
      navScroll.current.scrollLeft += (navScrollWidth - navOffsetWidth) / 2
      if (navScroll.current.scrollLeft >= (navScrollWidth - navOffsetWidth)) {
        setScrollBtn(false)
      }
    }
    if (name === 'prev') {
      navScroll.current.scrollLeft -= (navScrollWidth - navOffsetWidth) / 2
      if (navScroll.current.scrollLeft === 0) {
        setScrollBtn(true)
      }
    }
  }


  // Nav 휠 가로 스크롤 이벤트
  const onMouseOver = () => {
    navScroll.current.addEventListener('wheel', wheelScrollX, { passive: false })
    return () => {
      navScroll.current.removeEventListener('wheel', wheelScrollX, { passive: false })
    }
  }

  const wheelScrollX = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.wheelDeltaY > 0) {
      navScrollbar('prev')
    } else {
      navScrollbar('next')
    }
  }


  return (
    // <header className={` ${scrollUp && !scrollTop ? '  top-0 left-0 right-0  -translate-y-[73px] last:*:py-4' : `${scrollTop ? 'translate-y-0' : '-top-50 fixed'} `} border-b z-[9999]  bg-white  transition duration-700 delay-150 relative `}>
    <header className='fixed top-0 left-0 right-0 z-[999] mb-[120px]'>
      <nav className={`${scrollUp ? 'border-b ' : 'drop-shadow'} p-4 bg-white z-0 `}>
        <div className='max-w-[80rem] m-auto flex justify-between items-center relative'>
          <Link to="/">
            <h1 className='font-[Rokkitt] text-4xl'>casamia</h1>
          </Link>
          <div className='flex items-center gap-4 text-sm'>
            <Search placeholder={'검색어를 입력하세요'} />
            <Link to="/Cart">
              <CartIcon className={'w-6 h-6'} />
            </Link>
            {isAuth
              ?
              <div ref={dropdown}  >
                <div
                  onClick={() => setOpen(!open)}
                  className=' w-10 h-10 cursor-pointer'
                >
                  {auth?.currentUser?.photoURL
                    ?
                    <img src={auth?.currentUser?.photoURL} alt={auth?.currentUser?.photoURL}
                      className=' w-10 h-10 rounded-full'
                    />
                    :
                    <UserIcon fill='#CBCBCB' />
                  }
                </div>
                <div
                  className={`${open ? 'block opacity-1 animate-opacity' : 'hidden opacity-0'} 
                    absolute right-4 top-14 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black  ring-opacity-5 focus:outline-none  z-[9999]`}
                >
                  <Link
                    to="#"
                    className=" block px-4 py-2 text-sm hover:bg-slate-50 ">
                    마이페이지
                  </Link>
                  <button
                    type="button"
                    className='block px-4 py-2 text-sm w-full text-left hover:bg-slate-50'
                    onClick={onSignOut}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
              :
              <>
                <Link to="/login">로그인</Link>
                <Link to="/join">회원가입</Link>
              </>
            }
          </div>
        </div>
      </nav>
      <div className={`${scrollUp ? 'border-b drop-shadow translate-y-0' : '-translate-y-12'} absolute left-0 right-0 -z-[1] overflow-hidden bg-white -z-1 transition-all`}>
        <nav
          ref={navScroll}
          onMouseOver={onMouseOver}
          className={`${navScrollWidth > navOffsetWidth ? 'overflow-x-scroll scrollbar-hide ml-8' : ''} 
          max-w-[80rem] m-auto flex cursor-pointer transition scroll-smooth px-4`}
        >
          {navigation.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className='hover:text-primary h-12 w-auto flex flex-shrink-0 items-center justify-start text-sm font-medium pr-12  '
            >
              {item.name}
            </NavLink>
          ))
          }
        </nav>

        {navScrollWidth > navOffsetWidth &&
          <div className='*:absolute *:top-1/2 *:-translate-y-1/2 *:border-1  *:cursor-pointer  *:before:absolute *:before:inset-0 *:before:-top-1/3 *:before:-bottom-1/4 *:before:-right-full *:before:-left-full *:before:-z-[1]  *:before:from-transparent *:before:via-transparent *:before:via-10% *:before:to-white  *:before:to-50%  '>
            {scrollBtn
              ?
              < div
                className='relative right-2 before:bg-gradient-to-r '
                onClick={() => navScrollbar('next')}
              >
                <NextIcon className={'w-8 h-8 p-1 bg-white rounded-full shadow drop-shadow '} />
              </div>
              :
              <div
                className='relative left-2 before:bg-gradient-to-l '
                onClick={() => navScrollbar('prev')}
              >
                <PrevIcon className={'w-8 h-8 p-1 bg-white rounded-full shadow drop-shadow '} />
              </div>}
          </div>
        }
      </div>
    </header >
  )
}

export default Header