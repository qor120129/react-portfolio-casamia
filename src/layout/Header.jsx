import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import app from 'firebaseApp'
import { getAuth, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

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
  const name = auth?.currentUser?.email.substring(0, auth.currentUser.email.indexOf('@'))

  const onSignOut = async () => {
    try {
      const auth = getAuth(app)
      await signOut(auth)
      toast.success('로그아웃 되었습니다.', {
        position: "top-center",
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='border-b '>
      <div className='max-w-[80rem] m-auto p-4'>
        <div className='flex justify-between items-center '>
          <Link to="/">
            <h1 className='font-[Rokkitt] text-4xl'>casamia</h1>
          </Link>
          <div className='flex items-center gap-4 text-sm'>
            <div className='relative'>
              <label className="sr-only">
                검색
              </label>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md py-1.5 pl-7 pr-20 border text-main ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="검색-어를 입력하세요."
              />
              <button className='absolute right-4 top-1/2 -translate-y-1/2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
            <Link to="/Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

            </Link>
            {isAuth
              ?
              <>
                <span>{name}</span>
                <button type="button" className='hover:text-primaryHover hover:underline' onClick={onSignOut} >
                  로그아웃
                </button>
              </>
              :
              <>
                <Link to="/login">로그인</Link>
                <Link to="/join">회원가입</Link>
              </>
            }
          </div>
        </div>
      </div>
      <div className='border-t'>
        <nav className='max-w-[80rem] m-auto flex flex-wrap px-4'>
          {navigation.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className='hover:text-primary
                h-12 w-auto flex flex-shrink-0 items-center justify-start text-sm font-medium pr-12'
            // activeClassName="active"
            >
              {item.name}
            </NavLink>
          ))
          }
        </nav>
      </div>
    </header>
  )
}

export default Header