import React from 'react'
import { NextIcon, PrevIcon } from '../assets/svgIcon/SvgIcon'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

const Mypage = ({ auth, isAuth, mobile }) => {

  const onSignOut = async () => {
    if (isAuth) {
      try {
        await signOut(auth)
        toast.success('로그아웃 되었습니다.', {
          position: "top-center",
        })
      } catch (error) {
        console.log(error)
        toast.error(err.message)
      }
    }
  }

  return (
    <section className='bg-gray-100 flex flex-col gap-2'>
      {isAuth
        ?
        <div className='p-6 bg-white'>
          <div className='flex items-center justify-between '>
            <Link>
              <div className=' font-medium flex-1'>{auth?.currentUser?.displayName} 고객님</div>
            </Link>
            <NextIcon className={`w-4 h-4`} />
          </div>
          <div
            className='text-sm flex py-6 justify-between bg-primary bg-opacity-75 rounded-md *:flex *:flex-col *:items-center divide-x divide-slate-200  mt-6 *:flex-1 *:text-white'>
            <Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              <span>포인트</span>
              <span >0p</span>
            </Link>
            <Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
              </svg>
              <span>사용 가능 쿠폰</span>
              <span >0</span>
            </Link>
            <Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>

              <span>리뷰</span>
              <span >0건</span>
            </Link>
          </div>
        </div>
        :
        <div className='p-6 flex items-center justify-between bg-white'>
          <Link to={'/Login'} >
            <div className=' font-medium flex-1'>로그인 & 회원가입</div>
            <p className='text-[11px] text-sub mt-1'>회원가입하고 혜택받기</p>
          </Link>
          <NextIcon className={`w-4 h-4`} />
        </div>
      }
      <ul
        className='p-6 text-sm flex flex-col bg-white *:py-4 divide-y divide-slate-200 *:flex *:flex-col *:gap-6'>
        <li className='first:pt-0'>
          <div className='text-[11px] text-sub'>쇼핑</div>
          <Link>주문/배송 조회</Link>
          <Link>취소/교환 조회</Link>
          <Link>최근본 상품</Link>
        </li>
        <li>
          <div className='text-[11px] text-sub'>고객 서비스</div>
          <Link>1:1문의</Link>
          <Link>공지사항</Link>
          <Link>FAQ</Link>
          <Link>고객센터</Link>
        </li>
        <li className='last:pb-0' onClick={onSignOut}>
          <div >로그아웃</div>
        </li>
      </ul>
    </section>
  )
}

export default Mypage