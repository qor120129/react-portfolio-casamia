import React, { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import clickOutside from '@/hooks/clickOutside'
import Search from 'components/search'
import { CartIcon, UserIcon } from 'assets/svgIcon/SvgIcon'

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

  const displayName = auth?.currentUser?.displayName
  const [open, setOpen] = useState(false)
  const dropdown = useRef()

  clickOutside(dropdown, () => setOpen(false))

  const onSignOut = async () => {
    try {
      // const auth = getAuth(app)
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
            <Search placeholder={'검색어를 입력하세요'} />
            <Link to="/Cart">
              <CartIcon className={'w-6 h-6'} />
            </Link>
            {isAuth
              ?
              <div ref={dropdown}  >
                <div
                  onClick={() => setOpen(!open)}
                  className='relative w-10 h-10 cursor-pointer'
                >
                  {auth?.currentUser?.photoURL
                    ?
                    <img src={auth.currentUser.photoURL} alt={auth.currentUser.photoURL}
                      className=' w-10 h-10 rounded-full'
                    />
                    :
                    <UserIcon fill='#CBCBCB' />
                  }
                </div>
                <div
                  className={`${open ? 'block opacity-1 animate-opacity' : 'hidden opacity-0'} 
                    absolute right-4 top-14 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black  ring-opacity-5 focus:outline-none  `}
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
      </div>
      <div className='border-t'>
        <nav className='max-w-[80rem] m-auto flex flex-wrap px-4'>
          {navigation.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className='hover:text-primary
                h-12 w-auto flex flex-shrink-0 items-center justify-start text-sm font-medium pr-12'
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